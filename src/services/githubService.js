import { Octokit } from '@octokit/rest';
import { collection, addDoc, updateDoc, doc, query, where, getDocs } from 'firebase/firestore';
import { db } from '../utils/firebase';

class GitHubService {
  constructor(accessToken) {
    this.octokit = new Octokit({ auth: accessToken });
    this.owner = null;
    this.repo = null;
  }

  parseRepoUrl(url) {
    const regex = /github\.com\/([^\/]+)\/([^\/]+)/;
    const match = url.match(regex);
    if (match) {
      return { owner: match[1], repo: match[2] };
    }
    throw new Error('Invalid GitHub repository URL');
  }

  async connectRepo(repoUrl, companyId) {
    const { owner, repo } = this.parseRepoUrl(repoUrl);
    this.owner = owner;
    this.repo = repo;

    try {
      const repository = await this.octokit.repos.get({ owner, repo });
      
      const connectionData = {
        companyId,
        owner,
        repo,
        url: repository.data.html_url,
        name: repository.data.name,
        connectedAt: new Date(),
        lastSync: null
      };

      await addDoc(collection(db, 'github_connections'), connectionData);
      
      return {
        success: true,
        data: repository.data
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async fetchCommits(since = null) {
    if (!this.owner || !this.repo) {
      throw new Error('Repository not connected');
    }

    const params = {
      owner: this.owner,
      repo: this.repo,
      per_page: 100
    };

    if (since) params.since = since.toISOString();

    try {
      const commits = await this.octokit.paginate(
        this.octokit.repos.listCommits,
        params
      );

      return commits.map(commit => ({
        sha: commit.sha,
        message: commit.commit.message,
        author: {
          name: commit.commit.author.name,
          email: commit.commit.author.email,
          username: commit.author?.login
        },
        date: new Date(commit.commit.author.date),
        url: commit.html_url
      }));
    } catch (error) {
      throw new Error(`Failed to fetch commits: ${error.message}`);
    }
  }

  async analyzeContributors() {
    if (!this.owner || !this.repo) {
      throw new Error('Repository not connected');
    }

    try {
      const contributors = await this.octokit.repos.listContributors({
        owner: this.owner,
        repo: this.repo,
        per_page: 100
      });

      return contributors.data.map(contributor => ({
        username: contributor.login,
        contributions: contributor.contributions,
        avatar: contributor.avatar_url,
        profileUrl: contributor.html_url
      }));
    } catch (error) {
      throw new Error(`Failed to analyze contributors: ${error.message}`);
    }
  }

  async identifyModules() {
    if (!this.owner || !this.repo) {
      throw new Error('Repository not connected');
    }

    try {
      const tree = await this.octokit.git.getTree({
        owner: this.owner,
        repo: this.repo,
        tree_sha: 'HEAD',
        recursive: true
      });

      const modules = new Map();
      const fileExtensions = ['.js', '.jsx', '.ts', '.tsx', '.py', '.java'];

      tree.data.tree.forEach(item => {
        if (item.type === 'blob' && fileExtensions.some(ext => item.path.endsWith(ext))) {
          const pathParts = item.path.split('/');
          const module = pathParts[0];
          
          if (!modules.has(module)) {
            modules.set(module, {
              name: module,
              files: []
            });
          }

          modules.get(module).files.push(item.path);
        }
      });

      return Array.from(modules.values());
    } catch (error) {
      throw new Error(`Failed to identify modules: ${error.message}`);
    }
  }

  async generateClaimLines(companyId, startDate, endDate) {
    const commits = await this.fetchCommits(startDate, endDate);
    const modules = await this.identifyModules();
    const contributors = await this.analyzeContributors();

    const claimLines = [];

    for (const module of modules) {
      const moduleCommits = commits.filter(commit => 
        commit.message.toLowerCase().includes(module.name.toLowerCase())
      );

      if (moduleCommits.length > 0) {
        const claimLine = {
          companyId,
          title: `${module.name} Development`,
          description: `Development work on ${module.name} module involving ${moduleCommits.length} commits`,
          stuCategory: 'Core R&D',
          startDate: moduleCommits[moduleCommits.length - 1].date,
          endDate: moduleCommits[0].date,
          evidence: {
            type: 'github',
            commits: moduleCommits.length,
            module: module.name
          },
          effort: {
            commits: moduleCommits.length,
            contributors: contributors.filter(c => 
              moduleCommits.some(commit => commit.author.username === c.username)
            ).length
          },
          status: 'draft',
          createdAt: new Date(),
          source: 'github'
        };

        claimLines.push(claimLine);
      }
    }

    // Save claims
    for (const claimLine of claimLines) {
      await addDoc(collection(db, 'claims'), claimLine);
    }

    return claimLines;
  }
}

export default GitHubService;
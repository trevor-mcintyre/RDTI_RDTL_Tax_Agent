import React, { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthContext';
import { CompanyContext } from '../../context/CompanyContext';
import GitHubService from '../../services/githubService';
import auditLogger, { AuditAction } from '../../services/auditLogger';

const GitHubConnector = () => {
  const [repoUrl, setRepoUrl] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  const [analysis, setAnalysis] = useState(null);
  
  const { user } = useContext(AuthContext);
  const { company } = useContext(CompanyContext);

  const handleConnect = async () => {
    if (!repoUrl || !accessToken) {
      toast.error('Please enter both repository URL and access token');
      return;
    }

    setIsConnecting(true);

    try {
      const githubService = new GitHubService(accessToken);
      const result = await githubService.connectRepo(repoUrl, company.id);

      if (result.success) {
        toast.success('Repository connected successfully!');
        
        const commits = await githubService.fetchCommits();
        const contributors = await githubService.analyzeContributors();
        const modules = await githubService.identifyModules();

        setAnalysis({
          commits: commits.length,
          contributors: contributors,
          modules: modules
        });

        await auditLogger.log(AuditAction.GITHUB_CONNECTED, {
          repository: repoUrl
        });
      } else {
        toast.error(`Failed to connect: ${result.error}`);
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setIsConnecting(false);
    }
  };

  const generateClaims = async () => {
    try {
      const githubService = new GitHubService(accessToken);
      const endDate = new Date();
      const startDate = new Date();
      startDate.setFullYear(startDate.getFullYear() - 1);

      const claims = await githubService.generateClaimLines(
        company.id,
        startDate,
        endDate
      );

      toast.success(`Generated ${claims.length} claim lines`);
      window.location.href = '/claims';
    } catch (error) {
      toast.error(`Failed to generate claims: ${error.message}`);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Connect GitHub Repository</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Repository URL
          </label>
          <input
            type="url"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            placeholder="https://github.com/owner/repo"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            GitHub Access Token
          </label>
          <input
            type="password"
            value={accessToken}
            onChange={(e) => setAccessToken(e.target.value)}
            placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          <p className="mt-1 text-sm text-gray-500">
            Create a token at GitHub Settings → Developer settings → Personal access tokens
          </p>
        </div>

        <button
          onClick={handleConnect}
          disabled={isConnecting}
          className={`w-full py-2 px-4 rounded-md text-white font-medium ${
            isConnecting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isConnecting ? 'Connecting...' : 'Connect Repository'}
        </button>
      </div>

      {analysis && (
        <div className="mt-8 p-6 bg-green-50 rounded-lg">
          <h3 className="text-lg font-semibold text-green-800 mb-4">
            Repository Connected
          </h3>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg">
              <div className="text-sm text-gray-600">Commits</div>
              <div className="text-2xl font-bold">{analysis.commits}</div>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <div className="text-sm text-gray-600">Contributors</div>
              <div className="text-2xl font-bold">{analysis.contributors.length}</div>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <div className="text-sm text-gray-600">Modules</div>
              <div className="text-2xl font-bold">{analysis.modules.length}</div>
            </div>
          </div>

          <button
            onClick={generateClaims}
            className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700"
          >
            Generate R&D Claims
          </button>
        </div>
      )}
    </div>
  );
};

export default GitHubConnector;
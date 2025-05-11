import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../utils/firebase';

class ExportService {
  constructor(companyId) {
    this.companyId = companyId;
  }

  async generateCompletePackage() {
    const zip = new JSZip();

    try {
      const claims = await this.fetchClaims();
      const companyInfo = await this.fetchCompanyInfo();

      zip.file('claims.csv', this.generateCSV(claims));
      zip.file('claims.json', JSON.stringify(claims, null, 2));
      zip.file('summary.txt', this.generateSummary(claims, companyInfo));

      const metadata = {
        exportDate: new Date().toISOString(),
        companyId: this.companyId,
        companyName: companyInfo.name,
        claimsCount: claims.length,
        totalValue: claims.reduce((sum, claim) => sum + (claim.value || 0), 0)
      };
      zip.file('metadata.json', JSON.stringify(metadata, null, 2));

      const content = await zip.generateAsync({ type: 'blob' });
      saveAs(content, `rdti-claims-${companyInfo.name}-${new Date().toISOString().split('T')[0]}.zip`);

      return { success: true };
    } catch (error) {
      console.error('Export error:', error);
      return { success: false, error: error.message };
    }
  }

  async fetchClaims() {
    const claimsQuery = query(
      collection(db, 'claims'),
      where('companyId', '==', this.companyId)
    );
    
    const snapshot = await getDocs(claimsQuery);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  }

  async fetchCompanyInfo() {
    const companyDoc = await getDoc(doc(db, 'companies', this.companyId));
    return companyDoc.data();
  }

  generateCSV(claims) {
    const headers = [
      'Title',
      'Description',
      'STU Category',
      'Start Date',
      'End Date',
      'Status'
    ];

    const rows = claims.map(claim => [
      claim.title,
      claim.description,
      claim.stuCategory,
      claim.startDate ? new Date(claim.startDate.toDate()).toISOString().split('T')[0] : '',
      claim.endDate ? new Date(claim.endDate.toDate()).toISOString().split('T')[0] : '',
      claim.status
    ]);

    return [headers, ...rows]
      .map(row => row.join(','))
      .join('\n');
  }

  generateSummary(claims, companyInfo) {
    return `R&D TAX INCENTIVE CLAIM SUMMARY
=====================================

Company: ${companyInfo.name}
Export Date: ${new Date().toISOString().split('T')[0]}

CLAIM OVERVIEW
--------------
Total Claims: ${claims.length}

DETAILED CLAIMS
---------------
${claims.map((claim, index) => `
${index + 1}. ${claim.title}
   Category: ${claim.stuCategory}
   Status: ${claim.status}
   Description: ${claim.description}
`).join('\n')}

=====================================
End of Summary
`;
  }
}

export default ExportService;
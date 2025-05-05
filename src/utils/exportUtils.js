
// 🚫 Exclude or flag evidence tagged as 'exclusion'
if (!evidenceList || !Array.isArray(evidenceList)) throw new Error('Missing or invalid evidenceList');
console.log('Exporting evidenceList:', evidenceList);
const filteredEvidence = evidenceList.filter(entry => entry.tag !== 'exclusion');
const exclusionEvidence = evidenceList.filter(entry => entry.tag === 'exclusion');
// TODO: Add exclusionEvidence as reviewer notes or warnings

import { getFirestore, collection, getDocs } from 'firebase/firestore';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export async function generateClaimExportZip(companyId) {
  const db = getFirestore();
  const zip = new JSZip();
  const summary = [];
  const csvRows = [['Activity ID', 'Type', 'Description', 'Cost', 'STU Tags']];
  const jsonOutput = [];

  const snapshot = await getDocs(collection(db, `companies/${companyId}/activities`));
  snapshot.forEach(doc => {
    const data = doc.data();
    const line = {
      id: doc.id,
      type: data.type,
      description: data.description,
      cost: data.cost || 0,
      stuTags: data.stuTags || []
    };
    summary.push(\`- \${line.type}: \${line.description}\`);
    csvRows.push([line.id, line.type, line.description, line.cost, (line.stuTags || []).join(';')]);
    jsonOutput.push(line);
  });

  zip.file('summary.txt', summary.join('\n'));
  zip.file('claim.json', JSON.stringify(jsonOutput, null, 2));
  zip.file('claim.csv', csvRows.map(r => r.join(',')).join('\n'));

  const blob = await zip.generateAsync({ type: 'blob' });
  saveAs(blob, 'rdti_claim_export.zip');
}
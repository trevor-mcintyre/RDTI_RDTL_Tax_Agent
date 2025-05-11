import { getFirestore, collection, getDocs } from 'firebase/firestore';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export async function generateClaimExportZip(companyId) {
  if (!companyId) throw new Error('Missing companyId');

  const db = getFirestore();
  const zip = new JSZip();
  const summary = [];
  const csvRows = [['Activity ID', 'Type', 'Description', 'Cost', 'STU Tags']];
  const jsonOutput = [];

  const snapshot = await getDocs(collection(db, `companies/${companyId}/activities`));
  if (snapshot.empty) throw new Error('No activities found for this company');

  snapshot.forEach(doc => {
    const data = doc.data();
    const entry = {
      id: doc.id,
      type: data.type || 'N/A',
      description: data.description || '',
      cost: data.cost || 0,
      stuTags: Array.isArray(data.stuTags) ? data.stuTags : [],
      tag: data.tag || null,
    };

    if (entry.tag === 'exclusion') {
      // Add as footnote in summary
      summary.push(`⚠️ [Excluded] ${entry.type}: ${entry.description}`);
      return;
    }

    summary.push(`- ${entry.type}: ${entry.description}`);
    csvRows.push([
      entry.id,
      entry.type,
      entry.description,
      entry.cost,
      entry.stuTags.join(';'),
    ]);
    jsonOutput.push(entry);
  });

  zip.file('summary.txt', summary.join('\n'));
  zip.file('claim.json', JSON.stringify(jsonOutput, null, 2));
  zip.file('claim.csv', csvRows.map(row => row.join(',')).join('\n'));

  const blob = await zip.generateAsync({ type: 'blob' });
  saveAs(blob, 'rdti_claim_export.zip');
}

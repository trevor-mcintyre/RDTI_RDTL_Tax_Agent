import { getFirestore, collection, getDocs } from 'firebase/firestore';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export async function generateTaggedExport(companyId) {
  const db = getFirestore();
  const zip = new JSZip();
  const rows = [['Activity ID', 'Type', 'Description', 'Cost', 'STU Tags', 'Evidence URLs', 'IR1240 Reference']];
  
  const snapshot = await getDocs(collection(db, `companies/${companyId}/activities`));
  snapshot.forEach(doc => {
    const data = doc.data();
    const urls = (data.evidence || []).map(f => f.url).join(' | ');
    const stuTags = (data.stuTags || []).join(';');
    const irTags = (data.ir1240Tags || []).join(';');
    
    rows.push([
      doc.id,
      data.type || '',
      data.description || '',
      data.cost || '',
      stuTags,
      urls,
      irTags
    ]);
  });

  zip.file('tagged_export.csv', rows.map(r => r.join(',')).join('\n'));
  const blob = await zip.generateAsync({ type: 'blob' });
  saveAs(blob, 'tagged_evidence_export.zip');
}
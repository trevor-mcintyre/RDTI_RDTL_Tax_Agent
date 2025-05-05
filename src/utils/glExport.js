import { getFirestore, collection, getDocs } from 'firebase/firestore';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export async function generateGLCompatibleExport(companyId) {
  const db = getFirestore();
  const zip = new JSZip();
  const glCsvRows = [
    ['Date', 'Reference', 'Description', 'AccountCode', 'Amount', 'Tracking'],
  ];

  const snapshot = await getDocs(collection(db, `companies/${companyId}/activities`));
  snapshot.forEach(doc => {
    const data = doc.data();
    const amount = parseFloat(data.cost || 0).toFixed(2);
    const date = new Date().toISOString().split('T')[0];
    const ref = `RDTI-${doc.id}`;
    const desc = `${data.type || 'R&D'} - ${data.description || ''}`.substring(0, 70);
    const code = 'R&D Expense'; // Placeholder Account Code
    const tracking = data.module || 'General';

    glCsvRows.push([date, ref, desc, code, amount, tracking]);
  });

  zip.file('gl_export.csv', glCsvRows.map(row => row.join(',')).join('\n'));
  const blob = await zip.generateAsync({ type: 'blob' });
  saveAs(blob, 'gl_ready_rdti_export.zip');
}
const express = require('express');
const fs = require('fs-extra');
const archiver = require('archiver');
const path = require('path');

const router = express.Router();

router.get('/:companyId', async (req, res) => {
  const companyId = req.params.companyId;
  const folderPath = path.join(__dirname, '..', '..', 'data', 'claims', companyId);

  if (!await fs.pathExists(folderPath)) {
    return res.status(404).send('Company folder not found');
  }

  res.setHeader('Content-Type', 'application/zip');
  res.setHeader('Content-Disposition', `attachment; filename=${companyId}_claim_export.zip`);

  const archive = archiver('zip', { zlib: { level: 9 } });
  archive.pipe(res);
  archive.directory(folderPath, false);
  archive.finalize();
});

module.exports = router;

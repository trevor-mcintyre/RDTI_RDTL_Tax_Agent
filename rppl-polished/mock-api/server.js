
const express = require('express');
const app = express();
const port = 3001;

app.use(express.json());

// Mock GET /claims
app.get('/claims', (req, res) => {
  res.json([{ id: '123', title: 'Claim One' }, { id: '124', title: 'Claim Two' }]);
});

// Mock POST /claims
app.post('/claims', (req, res) => {
  const { title } = req.body;
  res.status(201).json({ id: 'new-claim', title });
});

// Mock GET /activities
app.get('/activities', (req, res) => {
  res.json([{ id: 'a1', type: 'upload', detail: 'File uploaded' }]);
});

app.listen(port, () => {
  console.log(`Mock API server running at http://localhost:${port}`);
});

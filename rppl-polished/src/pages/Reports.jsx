
import React, { useState } from 'react';
import Button from '../components/Button';
import EmptyState from '../components/EmptyState';

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

ChartJS.register(BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend);


const mockClaims = [
  { id: '001', title: 'AI Automation', status: 'Approved', amount: 12000, date: '2024-01-12', type: 'Software', user: 'Alice', reviewer: 'David', region: 'NZ' },
  { id: '002', title: 'Data Pipeline', status: 'Pending', amount: 8800, date: '2024-02-20', type: 'Infrastructure', user: 'Bob', reviewer: 'Sarah', region: 'AU' },
  { id: '003', title: 'ML Research', status: 'Rejected', amount: 15000, date: '2024-03-18', type: 'Research', user: 'Alice', reviewer: 'David', region: 'NZ' },

  { id: '001', title: 'AI Automation', status: 'Approved', amount: 12000, date: '2024-01-12' },
  { id: '002', title: 'Data Pipeline', status: 'Pending', amount: 8800, date: '2024-02-20' },
  { id: '003', title: 'ML Research', status: 'Rejected', amount: 15000, date: '2024-03-18' },
];

export default function Reports() {
  const [filter, setFilter] = useState('All');
  const [type, setType] = useState('All');
  const [user, setUser] = useState('All');
  const [reviewer, setReviewer] = useState('All');
  const [region, setRegion] = useState('All');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  const filtered = mockClaims.filter(c => {
    return (
      (filter === 'All' || c.status === filter) &&
      (type === 'All' || c.type === type) &&
      (user === 'All' || c.user === user) &&
      (reviewer === 'All' || c.reviewer === reviewer) &&
      (region === 'All' || c.region === region) &&
      (!start || new Date(c.date) >= new Date(start)) &&
      (!end || new Date(c.date) <= new Date(end))
    );
  });


  const filtered = filter === 'All' ? mockClaims : mockClaims.filter(c => c.status === filter);

  const handleExport = () => {
    
    const filterMeta = `Filters: Status=${filter}, Type=${type}, User=${user}, Reviewer=${reviewer}, Region=${region}, Start=${start}, End=${end}`;
    const csv = [`${filterMeta}`, "ID,Title,Status,Amount,Date"].concat(
      filtered.map(c => `${c.id},${c.title},${c.status},${c.amount},${c.date}`)
    ).join("\n");
    (c => `${c.id},${c.title},${c.status},${c.amount},${c.date}`).join("\n");
    const blob = new Blob([`ID,Title,Status,Amount,Date\n${csv}`], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `claim-report-${Date.now()}.csv`;
    link.click();
  };

  return (
    <div className="p-6">
      
<h2 className="text-2xl font-bold mb-4">📈 Reports & Insights</h2>

<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
  <div className="p-4 border rounded shadow bg-white">
    <h3 className="font-semibold mb-2">💸 Claim Totals</h3>
    <p>Total Claims: {filtered.length}</p>
    <p>Total Amount: ${filtered.reduce((sum, c) => sum + c.amount, 0)}</p>
  </div>

  <div className="p-4 border rounded shadow bg-white">
    <h3 className="font-semibold mb-2">📊 Claims by Status</h3>
    <Pie data={{
      labels: ['Approved', 'Pending', 'Rejected'],
      datasets: [{
        label: 'Claims',
        data: [
          filtered.filter(c => c.status === 'Approved').length,
          filtered.filter(c => c.status === 'Pending').length,
          filtered.filter(c => c.status === 'Rejected').length
        ],
        backgroundColor: ['#4caf50', '#ff9800', '#f44336']
      }]
    }} />
  </div>
</div>


      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block font-medium mb-1">Filter by Status</label>
          <select className="w-full p-2 border rounded" value={filter} onChange={e => setFilter(e.target.value)}>
            {['All', 'Approved', 'Pending', 'Rejected'].map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="block font-medium mb-1">Filter by Claim Type</label>
          <select className="w-full p-2 border rounded" onChange={e => setType(e.target.value)}>
            {['All', 'Software', 'Infrastructure', 'Research'].map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="block font-medium mb-1">Filter by Submitter</label>
          <select className="w-full p-2 border rounded" onChange={e => setUser(e.target.value)}>
            {['All', 'Alice', 'Bob'].map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="block font-medium mb-1">Filter by Reviewer</label>
          <select className="w-full p-2 border rounded" onChange={e => setReviewer(e.target.value)}>
            {['All', 'David', 'Sarah'].map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="block font-medium mb-1">Filter by Region</label>
          <select className="w-full p-2 border rounded" onChange={e => setRegion(e.target.value)}>
            {['All', 'NZ', 'AU'].map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="block font-medium mb-1">Date Range</label>
          <input type="date" onChange={e => setStart(e.target.value)} className="p-2 mr-2 border rounded" />
          <input type="date" onChange={e => setEnd(e.target.value)} className="p-2 border rounded" />
        </div>
      </div>

        <label className="font-semibold">Filter by Status:</label>
        {['All', 'Approved', 'Pending', 'Rejected'].map(status => (
          <button
            key={status}
            className={`px-3 py-1 rounded ${filter === status ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setFilter(status)}
          >
            {status}
          </button>
        ))}
      
<div className="p-4 border rounded shadow bg-white col-span-1 md:col-span-2">
  <h3 className="font-semibold mb-2">📆 Claims Over Time</h3>
  <Bar data={{
    labels: ['Jan', 'Feb', 'Mar', 'Apr'],
    datasets: [{
      label: 'Total Claim $',
      data: [12000, 8800, 15000, 0], // static for mock
      backgroundColor: '#3b82f6'
    }]
  }} />
</div>

</div>

      <table className="w-full text-left border mb-6">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Amount</th>
            <th className="p-2 border">Date</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 ? <tr><td colSpan={5}><EmptyState message='No claims match your filters 👀' /></td></tr> : filtered.map(claim => (
            <tr key={claim.id}>
              <td className="p-2 border">{claim.id}</td>
              <td className="p-2 border">{claim.title}</td>
              <td className="p-2 border">{claim.status}</td>
              <td className="p-2 border">${claim.amount}</td>
              <td className="p-2 border">{claim.date}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={handleExport} className="bg-green-600">
        📤 Export to CSV
      </button>
    </div>
  );
}

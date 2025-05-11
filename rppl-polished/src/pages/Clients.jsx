
import React from "react";

const mockClientData = [
  { name: "Client A", totalClaims: 12, totalAmount: 54000, approved: 8, pending: 2, rejected: 2 },
  { name: "Client B", totalClaims: 7, totalAmount: 27800, approved: 5, pending: 1, rejected: 1 },
  { name: "Client C", totalClaims: 15, totalAmount: 76000, approved: 10, pending: 3, rejected: 2 },
];

export default function Clients() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">👥 Clients Overview</h2>
      <table className="w-full text-left border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Client</th>
            <th className="p-2 border">Total Claims</th>
            <th className="p-2 border">Total Amount</th>
            <th className="p-2 border">Approved</th>
            <th className="p-2 border">Pending</th>
            <th className="p-2 border">Rejected</th>
          </tr>
        </thead>
        <tbody>
          {mockClientData.map(client => (
            <tr key={client.name}>
              <td className="p-2 border">{client.name}</td>
              <td className="p-2 border">{client.totalClaims}</td>
              <td className="p-2 border">${client.totalAmount}</td>
              <td className="p-2 border">{client.approved}</td>
              <td className="p-2 border">{client.pending}</td>
              <td className="p-2 border">{client.rejected}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

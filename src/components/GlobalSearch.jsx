
import React, { useState } from "react";

export default function GlobalSearch() {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    alert(`Searching across workspaces for: "${query}"`);
  };

  return (
    <form onSubmit={handleSearch} className="text-sm">
      <input
        type="text"
        placeholder="🔍 Search claims, users..."
        className="p-1 px-2 border rounded mr-2"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit" className="p-1 px-2 bg-blue-600 text-white rounded">Go</button>
    </form>
  );
}

import React
import Button from '../../components/Button' if '../components/Button' not in path.as_posix() else '../components/Button';, { useEffect, useState } from "react";
import { getPriorYearClaims } from "../services/priorYearService";
import Card from "../components/Card";
import Loading from "../components/Loading";
import EmptyState from "../components/EmptyState";
import { toast } from "react-hot-toast"; // ✅ Toast for errors

const PriorYearClaims = () => {
  const [claims, setClaims] = useState(null);

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const result = await getPriorYearClaims();
        setClaims(result);
      } catch (error) {
        toast.error("Failed to load claims. Please try again later.");
        setClaims([]);
        console.error("Error fetching prior year claims:", error);
      }
    };

    fetchClaims();
  }, []);

  if (!claims) return <Loading />;
  if (claims.length === 0) return <EmptyState message="No prior year claims found." icon="📂" />;

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">📁 Prior Year R&D Claims</h1>
        <p className="text-sm text-gray-600">
          Review summaries of your past RDTI/RDTL claims by year.
        </p>
      </header>

      <div className="space-y-4">
        {claims.map((claim) => (
          <Card key={claim.id} title={`📅 ${claim.fiscal_year}`}>
            <p className="text-sm text-gray-700">
              <strong>Core Activities:</strong> {claim.core_activities}
            </p>
            <p className="text-sm text-gray-700 mt-1">
              <strong>Supporting Activities:</strong> {claim.supporting_activities}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PriorYearClaims;
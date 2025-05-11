import React from "react";
import { Link } from "react-router-dom";

import AnimatedPage from "../../components/AnimatedPage";
import EmptyState from "../../components/EmptyState";
import MotivationBanner from "../../components/MotivationBanner";
import ProgressBar from "../../components/ProgressBar";
import Card from "../../components/Card";

export default function AdminDashboard() {
  const hasData = false; // Placeholder: replace with admin-specific checks
  const claimProgress = 65;
  const daysToDeadline = 42;

  return (
    <AnimatedPage>
      <div className="space-y-8">
        <header className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">🛠️ Admin Dashboard</h1>
          <p className="text-gray-600">
            Admin view: Overview of claims, deadlines, and submissions.
          </p>
        </header>

        <MotivationBanner message="Your team is progressing well. Keep an eye on key deadlines." />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Card title="Claim Progress Overview">
            <ProgressBar percentage={claimProgress} />
            <p className="text-sm text-gray-600">{claimProgress}% average completion</p>
          </Card>

          <Card title="Upcoming Deadline">
            <p className="text-gray-700">
              General Approval deadline in <strong>{daysToDeadline} days</strong>.
            </p>
            <Link
              to="/claims"
              className="inline-block mt-2 text-blue-600 hover:underline text-sm"
            >
              View All Claims
            </Link>
          </Card>
        </div>

        {!hasData && (
          <EmptyState message="No admin-level activity to display yet. 👀" />
        )}

        <Card title="Admin Actions">
          <div className="flex gap-4 flex-wrap">
            <Link
              to="/reports"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              View Reports
            </Link>
            <Link
              to="/clients"
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
            >
              Manage Clients
            </Link>
          </div>
        </Card>
      </div>
    </AnimatedPage>
  );
}

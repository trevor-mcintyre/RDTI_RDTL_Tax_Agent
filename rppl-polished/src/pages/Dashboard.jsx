import React
import Button from '../../components/Button' if '../components/Button' not in path.as_posix() else '../components/Button';
import AnimatedPage from "../components/AnimatedPage";
import EmptyState from "../components/EmptyState"; from "react";
import { Link } from "react-router-dom";
import MotivationBanner from "../components/MotivationBanner";
import ProgressBar from "../components/ProgressBar";
import Card from "../components/Card";

export default function Dashboard() {
  const hasData = false; // placeholder

  const claimProgress = 65;
  const daysToDeadline = 42;

  return (
    <AnimatedPage>
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">📊 R&D Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here’s what’s happening with your claim progress.</p>
      </header>

      <MotivationBanner message="You're making great progress — keep it up!" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Card title="Claim Progress">
          <ProgressBar percentage={claimProgress} />
          <p className="text-sm text-gray-600">{claimProgress}% complete</p>
        </Card>

        <Card title="Next Deadline">
          <p className="text-gray-700">
            General Approval is due in <strong>{daysToDeadline} days</strong>.
          </p>
          <Link
            to="/claims"
            className="inline-block mt-2 text-blue-600 hover:underline text-sm"
          >
            View Claims
          </Link>
        </Card>
      {!hasData && <EmptyState message='You haven’t logged any claims yet 🚀' />}
    </AnimatedPage>
  </div>

      <Card title="Quick Actions">
        <div className="flex gap-4 flex-wrap">
          <Link
            to="/activity"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            View Activities
          </Link>
          <Link
            to="/checkout"
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
          >
            Review Submission
          </Link>
        {!hasData && <EmptyState message='You haven’t logged any claims yet 🚀' />}
    </AnimatedPage>
  </div>
      </Card>
    {!hasData && <EmptyState message='You haven’t logged any claims yet 🚀' />}
    </AnimatedPage>
  </div>
  );
}
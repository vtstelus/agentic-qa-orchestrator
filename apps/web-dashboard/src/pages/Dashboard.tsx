import React, { useState, useEffect } from 'react';
import MetricsPanel from '../components/MetricsPanel';
import ReportViewer from '../components/ReportViewer';

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => { setLoading(false); }, []);

  return (
    <main>
      <h1>Agentic QA Orchestrator — Dashboard</h1>
      {loading ? <p>Loading...</p> : (
        <>
          <MetricsPanel />
          <ReportViewer />
        </>
      )}
    </main>
  );
};

export default Dashboard;

import React, { FC } from 'react';

interface Metric { label: string; value: string; delta?: string; }

const metrics: Metric[] = [
  { label: 'Pass Rate', value: '97.2%', delta: '+2.1%' },
  { label: 'Tests Run Today', value: '1,248' },
  { label: 'Critical Failures', value: '0' },
  { label: 'Avg Execution Time', value: '4m 32s', delta: '-18s' }
];

const MetricsPanel: React.FC = () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
    {metrics.map(m => (
      <div key={m.label} style={{ padding: 16, border: '1px solid #e5e7eb', borderRadius: 8 }}>
        <p style={{ color: '#6b7280', fontSize: 12 }}>{m.label}</p>
        <p style={{ fontSize: 24, fontWeight: 700 }}>{m.value}</p>
        {m.delta && <p style={{ color: '#22c55e', fontSize: 12 }}>{m.delta}</p>}
      </div>
    ))}
  </div>
);

export default MetricsPanel;

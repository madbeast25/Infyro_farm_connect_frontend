import { useEffect, useState } from 'react';
import { api } from '../lib/api';

const demoSummary = {
  farmId: 1,
  farmName: 'North Field',
  totalFields: 3,
  totalPlantings: 18,
  plantingsByStatus: { PLANNED: 5, ACTIVE: 8, HARVESTING: 4, COMPLETED: 1 },
  totalExpenses: 14500,
  expensesByCategory: { LABOR: 4200, SEED: 2600, FERTILIZER: 3900, IRRIGATION: 3800 },
  harvestQuantityByUnit: { KG: 520, BAG: 30 },
  harvestRecordCount: 12,
};

export function DashboardPage() {
  const [summary, setSummary] = useState(demoSummary);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await api.get('/ifc/v1/farms/1/summary');
        setSummary(response.data || demoSummary);
      } catch {
        setSummary(demoSummary);
      }
    };

    load();
  }, []);

  return (
    <div style={{ display: 'grid', gap: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ color: '#627266', fontWeight: 600 }}>Overview</div>
          <h1 style={{ margin: '8px 0 0', fontSize: 36 }}>{summary.farmName}</h1>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
        <div className="card" style={{ padding: 20 }}>
          <div style={{ color: '#627266', fontSize: 14 }}>Active farms</div>
          <div style={{ fontSize: 28, fontWeight: 800, marginTop: 10 }}>{summary.totalFields}</div>
        </div>
        <div className="card" style={{ padding: 20 }}>
          <div style={{ color: '#627266', fontSize: 14 }}>Plantings</div>
          <div style={{ fontSize: 28, fontWeight: 800, marginTop: 10 }}>{summary.totalPlantings}</div>
        </div>
        <div className="card" style={{ padding: 20 }}>
          <div style={{ color: '#627266', fontSize: 14 }}>Harvest records</div>
          <div style={{ fontSize: 28, fontWeight: 800, marginTop: 10 }}>{summary.harvestRecordCount}</div>
        </div>
        <div className="card" style={{ padding: 20 }}>
          <div style={{ color: '#627266', fontSize: 14 }}>Expenses</div>
          <div style={{ fontSize: 28, fontWeight: 800, marginTop: 10 }}>${summary.totalExpenses.toLocaleString()}</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 0.7fr', gap: 20 }}>
        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ marginTop: 0 }}>Planting health</h3>
          {Object.entries(summary.plantingsByStatus).map(([key, value]) => (
            <div key={key} style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span>{key}</span>
                <strong>{value}</strong>
              </div>
              <div style={{ background: '#e7efe9', borderRadius: 999, overflow: 'hidden' }}>
                <div
                  style={{
                    width: `${Math.min((value / summary.totalPlantings) * 100, 100)}%`,
                    height: 10,
                    background: '#1f7a46',
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ marginTop: 0 }}>Quick actions</h3>
          <div style={{ display: 'grid', gap: 12 }}>
            {['Create farm', 'Add field', 'Log expense', 'Add harvest record'].map((item) => (
              <button
                key={item}
                style={{
                  textAlign: 'left',
                  padding: '12px 14px',
                  border: '1px solid #dfe8df',
                  borderRadius: 10,
                  background: '#f6faf7',
                  fontWeight: 600,
                }}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

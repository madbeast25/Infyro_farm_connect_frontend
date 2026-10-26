import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import type { FarmSummary } from '../types/api';

const fallbackSummary: FarmSummary = {
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

export function ReportsPage() {
  const [summary, setSummary] = useState<FarmSummary | null>(fallbackSummary);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await api.get('/ifc/v1/farms/1/summary');
        setSummary(response.data || fallbackSummary);
      } catch {
        setSummary(fallbackSummary);
      }
    };

    load();
  }, []);

  if (!summary) return <div>Loading report...</div>;

  const statusEntries = Object.entries(summary.plantingsByStatus || {});
  const expenseEntries = Object.entries(summary.expensesByCategory || {});
  const harvestEntries = Object.entries(summary.harvestQuantityByUnit || {});

  return (
    <div style={{ display: 'grid', gap: 20 }}>
      <div>
        <div style={{ color: '#627266', fontWeight: 600 }}>Reports</div>
        <h1 style={{ margin: '8px 0 0', fontSize: 34 }}>{summary.farmName}</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 18 }}>
        <div className="card" style={{ padding: 22 }}>
          <div style={{ color: '#627266' }}>Total fields</div>
          <div style={{ fontSize: 28, fontWeight: 800, marginTop: 8 }}>{summary.totalFields}</div>
        </div>
        <div className="card" style={{ padding: 22 }}>
          <div style={{ color: '#627266' }}>Plantings</div>
          <div style={{ fontSize: 28, fontWeight: 800, marginTop: 8 }}>{summary.totalPlantings}</div>
        </div>
        <div className="card" style={{ padding: 22 }}>
          <div style={{ color: '#627266' }}>Expense total</div>
          <div style={{ fontSize: 28, fontWeight: 800, marginTop: 8 }}>${summary.totalExpenses.toLocaleString()}</div>
        </div>
        <div className="card" style={{ padding: 22 }}>
          <div style={{ color: '#627266' }}>Harvest records</div>
          <div style={{ fontSize: 28, fontWeight: 800, marginTop: 8 }}>{summary.harvestRecordCount}</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ marginTop: 0 }}>Plantings by status</h3>
          <div style={{ display: 'grid', gap: 12 }}>
            {statusEntries.map(([status, value]) => (
              <div key={status}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span>{status}</span>
                  <strong>{value}</strong>
                </div>
                <div style={{ background: '#e9f0eb', borderRadius: 999, overflow: 'hidden' }}>
                  <div
                    style={{
                      width: `${Math.min((value / Math.max(summary.totalPlantings, 1)) * 100, 100)}%`,
                      height: 8,
                      background: '#1f7a46',
                      borderRadius: 999,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ marginTop: 0 }}>Expenses by category</h3>
          <div style={{ display: 'grid', gap: 12 }}>
            {expenseEntries.map(([category, value]) => (
              <div key={category} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>{category}</span>
                <strong>${value.toLocaleString()}</strong>
              </div>
            ))}
          </div>
        </div>

        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ marginTop: 0 }}>Harvest quantity by unit</h3>
          <div style={{ display: 'grid', gap: 12 }}>
            {harvestEntries.map(([unit, value]) => (
              <div key={unit} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>{unit}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

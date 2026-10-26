import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getFarmById } from '../api/farmApi';
import type { Farm } from '../types/api';

const fallbackFarm: Farm = {
  id: 1,
  farmName: 'North Field',
  createdAt: '2024-01-10',
  updatedAt: '2024-01-10',
};

export function FarmDetailPage() {
  const { farmId } = useParams();
  const [farm, setFarm] = useState<Farm>(fallbackFarm);

  useEffect(() => {
    const load = async () => {
      if (!farmId) return;
      try {
        const response = await getFarmById(Number(farmId));
        setFarm(response || fallbackFarm);
      } catch {
        setFarm(fallbackFarm);
      }
    };

    load();
  }, [farmId]);

  return (
    <div style={{ display: 'grid', gap: 20 }}>
      <div>
        <div style={{ color: '#627266', fontWeight: 600 }}>Farm detail</div>
        <h1 style={{ margin: '8px 0 0', fontSize: 34 }}>{farm.farmName}</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 18 }}>
        <div className="card" style={{ padding: 22 }}>
          <div style={{ color: '#627266' }}>Fields</div>
          <div style={{ fontSize: 30, fontWeight: 800, marginTop: 8 }}>3</div>
        </div>
        <div className="card" style={{ padding: 22 }}>
          <div style={{ color: '#627266' }}>Plantings</div>
          <div style={{ fontSize: 30, fontWeight: 800, marginTop: 8 }}>18</div>
        </div>
        <div className="card" style={{ padding: 22 }}>
          <div style={{ color: '#627266' }}>Status</div>
          <div style={{ fontSize: 24, fontWeight: 800, marginTop: 8 }}>Healthy</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ marginTop: 0 }}>Quick links</h3>
          <div style={{ display: 'grid', gap: 12 }}>
            <Link to={`/farms/${farm.id}/fields`} style={{ fontWeight: 700, color: '#1f7a46' }}>View fields</Link>
            <Link to={`/farms/${farm.id}/plantings`} style={{ fontWeight: 700, color: '#1f7a46' }}>View plantings</Link>
            <Link to="/reports" style={{ fontWeight: 700, color: '#1f7a46' }}>Open reports</Link>
          </div>
        </div>

        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ marginTop: 0 }}>Activity</h3>
          <ul style={{ margin: 0, paddingLeft: 18, display: 'grid', gap: 8, color: '#35463a' }}>
            <li>Field maintenance completed</li>
            <li>Harvest record added</li>
            <li>Expense log generated</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

import { useMemo } from 'react';
import { Link } from 'react-router-dom';

const mockFarms = [
  { id: 1, farmName: 'North Field' },
  { id: 2, farmName: 'Green Valley' },
  { id: 3, farmName: 'River Plot' },
];

export function FarmsPage() {
  const items = useMemo(() => mockFarms, []);

  return (
    <div style={{ display: 'grid', gap: 22 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ color: '#627266', fontWeight: 600 }}>Operations</div>
          <h1 style={{ margin: '8px 0 0', fontSize: 34 }}>Farms</h1>
        </div>

        <button
          style={{
            padding: '12px 16px',
            border: 'none',
            borderRadius: 12,
            background: '#1f7a46',
            color: '#fff',
            fontWeight: 700,
          }}
        >
          + New farm
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 18 }}>
        {items.map((farm) => (
          <Link
            key={farm.id}
            to={`/farms/${farm.id}`}
            className="card"
            style={{
              padding: 22,
              minHeight: 180,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ fontSize: 12, color: '#627266', textTransform: 'uppercase', letterSpacing: 1 }}>Farm</div>
              <h3 style={{ margin: '10px 0 6px', fontSize: 24 }}>{farm.farmName}</h3>
              <div style={{ color: '#627266' }}>8 fields • 24 plantings</div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#1f7a46', fontWeight: 700 }}>Open farm</span>
              <span style={{ fontSize: 13, color: '#627266' }}>Updated today</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

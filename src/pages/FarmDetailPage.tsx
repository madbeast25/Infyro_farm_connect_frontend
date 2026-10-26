import { useParams } from 'react-router-dom';

const mockFarmDetails = {
  1: { name: 'North Field', fields: ['North Plot A', 'North Plot B', 'North Plot C'], plantings: 24 },
  2: { name: 'Green Valley', fields: ['Grove East', 'Grove West'], plantings: 16 },
  3: { name: 'River Plot', fields: ['River Bed 1', 'River Bed 2', 'River Bed 3'], plantings: 29 },
};

export function FarmDetailPage() {
  const { farmId } = useParams();
  const farm = mockFarmDetails[Number(farmId) as keyof typeof mockFarmDetails];

  if (!farm) {
    return <div>Farm not found</div>;
  }

  return (
    <div style={{ display: 'grid', gap: 20 }}>
      <div>
        <div style={{ color: '#627266', fontWeight: 600 }}>Farm detail</div>
        <h1 style={{ margin: '8px 0 0', fontSize: 34 }}>{farm.name}</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 18 }}>
        <div className="card" style={{ padding: 22 }}>
          <div style={{ color: '#627266' }}>Total fields</div>
          <div style={{ fontSize: 30, fontWeight: 800, marginTop: 8 }}>{farm.fields.length}</div>
        </div>

        <div className="card" style={{ padding: 22 }}>
          <div style={{ color: '#627266' }}>Plantings</div>
          <div style={{ fontSize: 30, fontWeight: 800, marginTop: 8 }}>{farm.plantings}</div>
        </div>

        <div className="card" style={{ padding: 22 }}>
          <div style={{ color: '#627266' }}>Summary status</div>
          <div style={{ fontSize: 24, fontWeight: 800, marginTop: 8 }}>Healthy</div>
        </div>
      </div>

      <div className="card" style={{ padding: 24 }}>
        <h3 style={{ marginTop: 0 }}>Fields</h3>
        <div style={{ display: 'grid', gap: 12 }}>
          {farm.fields.map((field) => (
            <div
              key={field}
              style={{
                border: '1px solid #e1e9e2',
                borderRadius: 12,
                padding: '14px 16px',
                background: '#f9fbfa',
              }}
            >
              {field}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

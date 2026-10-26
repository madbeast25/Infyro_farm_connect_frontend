import { Activity, ArrowRight, DollarSign, Sprout, Tractor } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatCurrency, formatNumber } from '../lib/utils';

const metrics = [
  { label: 'Active farms', value: '12', icon: Tractor },
  { label: 'Fields under cultivation', value: '38', icon: Sprout },
  { label: 'Plantings in progress', value: '64', icon: Activity },
  { label: 'Monthly expense', value: formatCurrency(48240), icon: DollarSign },
];

export function DashboardPage() {
  return (
    <div style={{ display: 'grid', gap: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ color: '#627266', fontWeight: 600 }}>Overview</div>
          <h1 style={{ margin: '8px 0 0', fontSize: 36 }}>Farm dashboard</h1>
        </div>

        <Link
          to="/farms"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '12px 16px',
            borderRadius: 12,
            background: '#1f7a46',
            color: '#fff',
            fontWeight: 700,
          }}
        >
          View farms
          <ArrowRight size={16} />
        </Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
        {metrics.map(({ label, value, icon: Icon }) => (
          <div key={label} className="card" style={{ padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <div style={{ color: '#627266', fontSize: 14 }}>{label}</div>
              <div style={{ background: '#eef7f1', padding: 10, borderRadius: 12 }}>
                <Icon size={18} color="#1f7a46" />
              </div>
            </div>
            <div style={{ fontSize: 28, fontWeight: 800 }}>{value}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 0.7fr', gap: 20 }}>
        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ marginTop: 0 }}>Farm summary</h3>
          <div style={{ display: 'grid', gap: 16 }}>
            {[
              { name: 'North Field', plantings: 18, area: '24.5 acres', spend: formatCurrency(5300) },
              { name: 'Green Valley', plantings: 13, area: '19.2 acres', spend: formatCurrency(4100) },
              { name: 'River Plot', plantings: 21, area: '31.0 acres', spend: formatCurrency(7600) },
            ].map((farm) => (
              <div
                key={farm.name}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  border: '1px solid #e3ece4',
                  borderRadius: 12,
                  padding: '12px 14px',
                }}
              >
                <div>
                  <div style={{ fontWeight: 700 }}>{farm.name}</div>
                  <div style={{ color: '#627266', fontSize: 13 }}>{farm.area}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 700 }}>{formatNumber(farm.plantings)} plantings</div>
                  <div style={{ color: '#627266', fontSize: 13 }}>{farm.spend}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ marginTop: 0 }}>Quick actions</h3>
          <div style={{ display: 'grid', gap: 12 }}>
            {['Create farm', 'Add field', 'Log expense', 'Add harvest record'].map((action) => (
              <button
                key={action}
                style={{
                  textAlign: 'left',
                  padding: '12px 14px',
                  border: '1px solid #dfe8df',
                  borderRadius: 10,
                  background: '#f6faf7',
                  fontWeight: 600,
                }}
              >
                {action}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

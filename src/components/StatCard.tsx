import { Card } from '../components/StatCard';

export type StatCardProps = {
  label: string;
  value: string;
  helper?: string;
};

export function StatCard({ label, value, helper }: StatCardProps) {
  return (
    <div className="card" style={{ padding: 20 }}>
      <div style={{ color: '#627266', fontSize: 14 }}>{label}</div>
      <div style={{ fontSize: 30, fontWeight: 800, marginTop: 12 }}>{value}</div>
      {helper ? (
        <div style={{ color: '#627266', fontSize: 13, marginTop: 8 }}>{helper}</div>
      ) : null}
    </div>
  );
}

export { StatCard as default };

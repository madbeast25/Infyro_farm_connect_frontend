import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getFieldsByFarm } from '../api/fieldApi';
import type { FieldItem } from '../types/api';

const fallbackFields: FieldItem[] = [
  { id: 1, fieldName: 'North Plot A', totalArea: 14.5, availableArea: 8.3, farmId: 1, createdAt: '2024-01-10', updatedAt: '2024-01-10' },
  { id: 2, fieldName: 'North Plot B', totalArea: 11.2, availableArea: 6.5, farmId: 1, createdAt: '2024-01-10', updatedAt: '2024-01-10' },
  { id: 3, fieldName: 'North Plot C', totalArea: 18.6, availableArea: 10.1, farmId: 1, createdAt: '2024-01-10', updatedAt: '2024-01-10' },
];

export function FieldsPage() {
  const { farmId } = useParams();
  const [fields, setFields] = useState<FieldItem[]>(fallbackFields);

  useEffect(() => {
    const load = async () => {
      if (!farmId) return;
      try {
        const response = await getFieldsByFarm(Number(farmId));
        setFields(response);
      } catch {
        setFields(fallbackFields);
      }
    };

    load();
  }, [farmId]);

  return (
    <div style={{ display: 'grid', gap: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ color: '#627266', fontWeight: 600 }}>Field management</div>
          <h1 style={{ margin: '8px 0 0', fontSize: 34 }}>Fields</h1>
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
          + Add field
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 18 }}>
        {fields.map((field) => (
          <div key={field.id} className="card" style={{ padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0 }}>{field.fieldName}</h3>
              <span style={{ fontSize: 12, color: '#627266', background: '#edf6ef', padding: '6px 8px', borderRadius: 999 }}>
                {field.availableArea} available
              </span>
            </div>

            <div style={{ marginTop: 18, display: 'grid', gap: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="muted">Total area</span>
                <strong>{field.totalArea} acres</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="muted">Available</span>
                <strong>{field.availableArea} acres</strong>
              </div>
            </div>

            <div style={{ marginTop: 18, background: '#edf4ef', borderRadius: 999, overflow: 'hidden' }}>
              <div
                style={{
                  width: `${Math.min((field.availableArea / Math.max(field.totalArea, 1)) * 100, 100)}%`,
                  height: 8,
                  background: '#1f7a46',
                }}
              />
            </div>

            <div style={{ marginTop: 18, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Link to={`/farms/${field.farmId}/plantings`} style={{ fontWeight: 700, color: '#1f7a46' }}>
                View plantings
              </Link>
              <span style={{ color: '#627266', fontSize: 13 }}>Updated today</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCropPlantingsByField } from '../api/cropPlantingApi';
import type { CropPlanting } from '../types/api';

const fallbackPlantings: CropPlanting[] = [
  { id: 1, fieldId: 1, cropTypeId: 101, cropArea: 4.8, plantedOn: '2025-01-15', expectedHarvestOn: '2025-04-02', maturityTimeInDays: 78, status: 'ACTIVE' },
  { id: 2, fieldId: 1, cropTypeId: 104, cropArea: 2.6, plantedOn: '2025-02-01', expectedHarvestOn: '2025-05-12', maturityTimeInDays: 101, status: 'PLANNED' },
  { id: 3, fieldId: 1, cropTypeId: 105, cropArea: 5.1, plantedOn: '2024-11-15', expectedHarvestOn: '2025-02-25', maturityTimeInDays: 102, status: 'HARVESTING' },
];

export function CropPlantingsPage() {
  const { farmId } = useParams();
  const [plantings, setPlantings] = useState<CropPlanting[]>(fallbackPlantings);

  useEffect(() => {
    const load = async () => {
      if (!farmId) return;
      try {
        const response = await getCropPlantingsByField(Number(farmId));
        setPlantings(response);
      } catch {
        setPlantings(fallbackPlantings);
      }
    };

    load();
  }, [farmId]);

  return (
    <div style={{ display: 'grid', gap: 20 }}>
      <div>
        <div style={{ color: '#627266', fontWeight: 600 }}>Crop operations</div>
        <h1 style={{ margin: '8px 0 0', fontSize: 34 }}>Crop plantings</h1>
      </div>

      <div className="card" style={{ overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ background: '#edf6ef' }}>
            <tr>
              <th style={{ textAlign: 'left', padding: 14 }}>Crop type</th>
              <th style={{ textAlign: 'left', padding: 14 }}>Area</th>
              <th style={{ textAlign: 'left', padding: 14 }}>Planted</th>
              <th style={{ textAlign: 'left', padding: 14 }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {plantings.map((planting) => (
              <tr key={planting.id} style={{ borderTop: '1px solid #e5ece6' }}>
                <td style={{ padding: 14 }}>{planting.cropTypeId}</td>
                <td style={{ padding: 14 }}>{planting.cropArea} acres</td>
                <td style={{ padding: 14 }}>{planting.plantedOn}</td>
                <td style={{ padding: 14 }}>
                  <span
                    style={{
                      display: 'inline-flex',
                      padding: '6px 10px',
                      borderRadius: 999,
                      background: planting.status === 'ACTIVE' ? '#e9f8ec' : '#edf4ef',
                      color: '#173d2a',
                      fontWeight: 700,
                    }}
                  >
                    {planting.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

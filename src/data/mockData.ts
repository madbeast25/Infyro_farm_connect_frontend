export const mockFarmSummary = {
  farmId: 1,
  farmName: 'North Field',
  totalFields: 3,
  totalPlantings: 18,
  plantingsByStatus: {
    PLANNED: 5,
    ACTIVE: 8,
    HARVESTING: 4,
    COMPLETED: 1,
  },
  totalExpenses: 14500,
  expensesByCategory: {
    LABOR: 4200,
    SEED: 2600,
    FERTILIZER: 3900,
    IRRIGATION: 3800,
  },
  harvestQuantityByUnit: {
    KG: 520,
    BAG: 30,
  },
  harvestRecordCount: 12,
};

export const mockFarmList = [
  { id: 1, farmName: 'North Field', createdAt: '2024-01-10', updatedAt: '2024-01-10' },
  { id: 2, farmName: 'Green Valley', createdAt: '2024-02-05', updatedAt: '2024-02-05' },
  { id: 3, farmName: 'River Plot', createdAt: '2024-03-12', updatedAt: '2024-03-12' },
];

export const mockFieldList = [
  { id: 1, fieldName: 'North Plot A', totalArea: 14.5, availableArea: 8.3, farmId: 1, createdAt: '2024-01-10', updatedAt: '2024-01-10' },
  { id: 2, fieldName: 'North Plot B', totalArea: 11.2, availableArea: 6.5, farmId: 1, createdAt: '2024-01-10', updatedAt: '2024-01-10' },
  { id: 3, fieldName: 'North Plot C', totalArea: 18.6, availableArea: 10.1, farmId: 1, createdAt: '2024-01-10', updatedAt: '2024-01-10' },
];

export const mockPlantingList = [
  { id: 1, fieldId: 1, cropTypeId: 101, cropArea: 4.8, plantedOn: '2025-01-15', expectedHarvestOn: '2025-04-02', maturityTimeInDays: 78, status: 'ACTIVE' },
  { id: 2, fieldId: 1, cropTypeId: 104, cropArea: 2.6, plantedOn: '2025-02-01', expectedHarvestOn: '2025-05-12', maturityTimeInDays: 101, status: 'PLANNED' },
  { id: 3, fieldId: 1, cropTypeId: 105, cropArea: 5.1, plantedOn: '2024-11-15', expectedHarvestOn: '2025-02-25', maturityTimeInDays: 102, status: 'HARVESTING' },
];

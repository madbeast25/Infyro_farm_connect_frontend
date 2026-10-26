export type User = {
  id: number;
  username: string;
  email: string;
};

export type AuthResponse = {
  token: string;
  user: User;
};

export type Farm = {
  id: number;
  farmName: string;
  createdAt: string;
  updatedAt: string;
};

export type FieldItem = {
  id: number;
  fieldName: string;
  totalArea: number;
  availableArea: number;
  farmId: number;
  createdAt: string;
  updatedAt: string;
};

export type CropPlanting = {
  id: number;
  fieldId: number;
  cropTypeId: number;
  cropArea: number;
  plantedOn: string;
  expectedHarvestOn?: string;
  completedOn?: string;
  maturityTimeInDays: number;
  status: 'PLANNED' | 'ACTIVE' | 'HARVESTING' | 'COMPLETED';
  createdAt: string;
  updatedAt: string;
};

export type Expense = {
  id: number;
  farmId: number;
  cropPlantingId?: number;
  amount: number;
  expenseDate: string;
  category: string;
  description: string;
  voided: boolean;
  statusLabel?: string;
  createdAt: string;
  updatedAt: string;
};

export type HarvestRecord = {
  id: number;
  cropPlantingId: number;
  harvestDate: string;
  quantity: number;
  unit: string;
  notes?: string;
  voided: boolean;
  statusLabel?: string;
  createdAt: string;
  updatedAt: string;
};

export type FarmSummary = {
  farmId: number;
  farmName: string;
  totalFields: number;
  totalPlantings: number;
  plantingsByStatus: Record<string, number>;
  totalExpenses: number;
  expensesByCategory: Record<string, number>;
  harvestQuantityByUnit: Record<string, number>;
  harvestRecordCount: number;
};

import { api } from '../lib/api';
import { mockFieldList } from '../data/mockData';

export const getFieldsByFarm = async (farmId: number) => {
  try {
    const response = await api.get(`/ifc/v1/field/farm/${farmId}`);
    return response.data;
  } catch {
    return mockFieldList.filter((field) => field.farmId === farmId);
  }
};

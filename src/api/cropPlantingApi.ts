import { api } from '../lib/api';
import { mockPlantingList } from '../data/mockData';

export const getCropPlantingsByField = async (fieldId: number) => {
  try {
    const response = await api.get(`/ifc/v1/crop-plantings/fields/${fieldId}`);
    return response.data;
  } catch {
    return mockPlantingList.filter((planting) => planting.fieldId === fieldId);
  }
};

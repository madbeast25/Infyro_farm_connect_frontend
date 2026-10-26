import { api } from '../lib/api';
import { mockFarmList, mockFieldList, mockPlantingList, mockFarmSummary } from '../data/mockData';

export const getOwnedFarms = async () => {
  try {
    const response = await api.get('/ifc/v1/farm/owned-farms');
    return response.data;
  } catch {
    return mockFarmList;
  }
};

export const getFarmById = async (farmId: number) => {
  try {
    const response = await api.get(`/ifc/v1/farm/${farmId}`);
    return response.data;
  } catch {
    return mockFarmList.find((farm) => farm.id === farmId) || mockFarmList[0];
  }
};

export const getFarmSummary = async (farmId: number) => {
  try {
    const response = await api.get(`/ifc/v1/farms/${farmId}/summary`);
    return response.data;
  } catch {
    return mockFarmSummary;
  }
};

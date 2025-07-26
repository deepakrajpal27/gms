import axios from 'axios';
import { API_BASE_URL } from './config';

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  price: number;
}

export const getInventory = async (): Promise<InventoryItem[]> => {
  const response = await axios.get(`${API_BASE_URL}/inventory`);
  return response.data;
};

export const getInventoryItem = async (id: string): Promise<InventoryItem> => {
  const response = await axios.get(`${API_BASE_URL}/inventory/${id}`);
  return response.data;
};

export const createInventoryItem = async (item: Omit<InventoryItem, 'id'>): Promise<InventoryItem> => {
  const response = await axios.post(`${API_BASE_URL}/inventory`, item);
  return response.data;
};

export const updateInventoryItem = async (id: string, item: Partial<Omit<InventoryItem, 'id'>>): Promise<InventoryItem> => {
  const response = await axios.put(`${API_BASE_URL}/inventory/${id}`, item);
  return response.data;
};

export const deleteInventoryItem = async (id: string): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/inventory/${id}`);
};

import axios from 'axios';
import { API_BASE_URL } from './config';

export interface InventoryItem {
  id: number;
  product: {
    id: number;
    name: string;
    description: string;
    price: number;
    category: {
      id: number;
      name: string;
      description: string;
    };
  };
  quantity: number;
}

export const getInventory = async (): Promise<InventoryItem[]> => {
  const response = await axios.get(`${API_BASE_URL}/inventory`);
  return response.data;
};
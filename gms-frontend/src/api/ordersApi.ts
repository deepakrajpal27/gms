import axios from 'axios';
import { API_BASE_URL } from './config';

export interface Order {
  id: string;
  customerName: string;
  items: Array<{
    productId: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  status: string;
  createdAt: string;
}

export const getOrders = async (): Promise<Order[]> => {
  const response = await axios.get(`${API_BASE_URL}/orders`);
  return response.data;
};

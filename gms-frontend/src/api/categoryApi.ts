import axios from 'axios';
import { API_BASE_URL } from './config';

export interface Category {
  id: string;
  name: string;
  description?: string;
}

export const getCategories = async (): Promise<Category[]> => {
  const response = await axios.get(`${API_BASE_URL}/categories`);
  return response.data;
};
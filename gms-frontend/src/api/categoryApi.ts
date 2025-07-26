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

export const getCategoryById = async (id: string): Promise<Category> => {
  const response = await axios.get(`${API_BASE_URL}/categories/${id}`);
  return response.data;
};

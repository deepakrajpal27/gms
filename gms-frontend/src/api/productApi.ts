import axios from 'axios';
import { API_BASE_URL } from './config';

export interface ProductPayload {
  name: string;
  description: string;
  price: number;
  categoryId: number;
  quantity: number;
}

export const createProduct = async (product: ProductPayload) => {
  const response = await axios.post(`${API_BASE_URL}/products`, product);
  return response.data;
};

export const updateProduct = async (id: number, product: Partial<ProductPayload>) => {
  const response = await axios.put(`${API_BASE_URL}/products/${id}`, product);
  return response.data;
};

export const deleteProduct = async (id: number) => {
  const response = await axios.delete(`${API_BASE_URL}/products/${id}`);
  return response.data;
};

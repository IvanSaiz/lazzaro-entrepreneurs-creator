import http from "@/api/core/http";
import { Product } from "./types";

export default {
  getAllByMemberId: async (id: string): Promise<Product[]> => {
    return http.get(`product/member/${id}`, { noAuth: false });
  },
  getById: async (id: string): Promise<Product> => {
    return http.get(`product/${id}`, { noAuth: false });
  },
  create: async (product: Omit<Product, "id">): Promise<Product> => {
    return http.post("product", product);
  },
  update: async (id: string, product: Partial<Product>): Promise<Product> => {
    return http.patch(`product/${id}`, product);
  },
  delete: async (id: string): Promise<void> => {
    return http.delete(`product/${id}`);
  }
};

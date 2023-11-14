/* eslint-disable */
import http from "@/api/core/http";

const getProducts = function(ongId: string): Promise<any> {
  return http.get(`private/products/ong/${ongId}/all`, { noAuth: false });
};

const getProduct = function(productId: string): Promise<any> {
  return http.get(`public/products/${productId}`, { noAuth: false });
};

const deleteProduct = function(ongId: string, productId: string): Promise<any> {
  return http.delete(`private/ongs/${ongId}/products/${productId}`, {
    noAuth: false
  });
};

const updateProduct = function(productId: string, body: any): Promise<any> {
  return http.put(`private/products/${productId}`, body, { noAuth: false });
};

const getProductImages = function(productId: string): Promise<any> {
  return http.get(`public/products/${productId}/images`, { noAuth: false });
};

const getOrders = function(ongId: string): Promise<any> {
  return http.get(`private/orders/ong/${ongId}`, { noAuth: false });
};

const updateOrder = function(orderId: string, body: any): Promise<any> {
  return http.put(`private/orders/${orderId}`, body, { noAuth: false });
};

const postProduct = function(body: any): Promise<any> {
  return http.post(`private/products`, body, { noAuth: false });
};

export default {
  getProducts,
  getOrders,
  getProduct,
  deleteProduct,
  postProduct,
  getProductImages,
  updateProduct,
  updateOrder
};

/* eslint-disable */
import http from "@/api/core/http";

export default {
  getAllByOngId: function(ongId: string): Promise<Service[]> {
    return http.get(`service/org/${ongId}`, { noAuth: false });
  },
  getById: function(serviceId: string): Promise<Service> {
    return http.get(`service/${serviceId}`, { noAuth: false });
  },
  delete: function(serviceId: string): Promise<[number]> {
    return http.delete(`service/${serviceId}`, {
      noAuth: false
    });
  },
  patch: function(serviceId: string, body: Partial<Service>): Promise<any> {
    return http.patch(`service/${serviceId}`, body, { noAuth: false });
  },
  create: function(body: ServicePostDTO): Promise<any> {
    return http.post(`service`, body, { noAuth: false });
  },
  reserve: {
    create: function(body: Omit<Reservation, "id">): Promise<any> {
      return http.post(`service/reserve`, body, { noAuth: false });
    },
    getByOngId: function(ongId: string): Promise<Reservation[]> {
      return http.get(`service/${ongId}/reservations`, {
        noAuth: false
      });
    }
  }
};

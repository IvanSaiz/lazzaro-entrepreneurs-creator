/* eslint-disable */
import http from "@/api/core/http";

export default {
  getAllByOngId: function(ongId: string): Promise<TEvents> {
    return http.get(`private/events/ong/${ongId}/all`, { noAuth: false }); //CHECK
  },
  getById: function(serviceId: string): Promise<TEvent> {
    return http.get(`private/events/${serviceId}`, { noAuth: false });
  },
  delete: function(ongId: string, serviceId: string): Promise<any> {
    return http.delete(`private/ongs/${ongId}/events/${serviceId}`, {
      noAuth: false
    });
  },
  update: function(serviceId: string, body: any): Promise<any> {
    return http.put(`private/events/${serviceId}`, body, { noAuth: false });
  },
  create: function(ongId: string, body: any): Promise<any> {
    return http.post(`private/events/ong/${ongId}`, body, { noAuth: false });
  }
};

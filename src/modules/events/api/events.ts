/* eslint-disable */
import http from "@/api/core/http";

const getEvents = function(ongId: string): Promise<TEvents> {
  return http.get(`private/events/ong/${ongId}/all`, { noAuth: false }); //CHECK
};

const getEvent = function(eventId: string): Promise<TEvent> {
  return http.get(`public/events/${eventId}`, { noAuth: false });
};

const deleteEvent = function(ongId: string, eventId: string): Promise<any> {
  return http.delete(`private/ongs/${ongId}/events/${eventId}`, {
    noAuth: false
  });
};

const updateEvent = function(eventId: string, body: any): Promise<any> {
  return http.put(`private/events/${eventId}`, body, { noAuth: false });
};

const getEventImages = function(eventId: string): Promise<TEventImages> {
  return http.get(`public/events/${eventId}/images`, { noAuth: false });
};

const getCourses = function(ongId: string): Promise<any> {
  return http.get(`private/courses/ong/${ongId}/all`, { noAuth: false }); //CHECK
};

const postEvent = function(ongId: string, body: any): Promise<any> {
  return http.post(`private/events/ong/${ongId}`, body, { noAuth: false });
};

export default {
  getEvents,
  getCourses,
  postEvent,
  getEvent,
  deleteEvent,
  getEventImages,
  updateEvent
};

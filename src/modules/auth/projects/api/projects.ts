/* eslint-disable */
import http from "@/api/core/http";

const getProjects = function(ongId: string): Promise<any> {
  return http.get(`/public/projects/ong/${ongId}`, { noAuth: false });
};

const postProject = function(body: any): Promise<any> {
  return http.post(`/private/projects`, body, { noAuth: false });
};

const postContact = function(ongId: string, body: any): Promise<any> {
  return http.post(`/private/ongs/${ongId}/contact`, body, { noAuth: false });
};

const postPlatformFeatures = function(ongId: string, body: any): Promise<any> {
  return http.post(`/private/ongs/${ongId}/platform-features`, body, {
    noAuth: false
  });
};

export default {
  getProjects,
  postProject,
  postContact,
  postPlatformFeatures
};

/* eslint-disable */
import http from "@/api/core/http";

const getProjects = function(ongId: string): Promise<TProjects> {
  return http.get(`private/projects/ong/${ongId}/all`, { noAuth: false });
};

const getProject = function(projectId: string): Promise<TProject> {
  return http.get(`public/projects/${projectId}`, { noAuth: false });
};

const deleteProject = function(ongId: string, projectId: string): Promise<any> {
  return http.delete(`private/ongs/${ongId}/projects/${projectId}`, {
    noAuth: false
  });
};

const getProjectImages = function(projectId: string): Promise<TProjectImages> {
  return http.get(`public/projects/${projectId}/images`, { noAuth: false });
};

const updateProject = function(
  projectId: string,
  body: TProjectForm
): Promise<any> {
  return http.put(`private/projects/${projectId}`, body, { noAuth: false });
};

const postProject = function(body: TProjectForm): Promise<any> {
  return http.post(`private/projects`, body, { noAuth: false });
};

const postContact = function(ongId: string, body: any): Promise<any> {
  return http.post(`private/ongs/${ongId}/contact`, body, { noAuth: false });
};

const postPlatformFeatures = function(ongId: string, body: any): Promise<any> {
  return http.post(`private/ongs/${ongId}/platform-features`, body, {
    noAuth: false
  });
};

const getOrganizationPlan = function(
  ongId: string
): Promise<TOrganizationPlan> {
  return http.get(`private/ongs/${ongId}/subscription-plan`, { noAuth: false });
};

export default {
  getProjects,
  postProject,
  postContact,
  postPlatformFeatures,
  getProject,
  deleteProject,
  updateProject,
  getProjectImages,
  getOrganizationPlan
};

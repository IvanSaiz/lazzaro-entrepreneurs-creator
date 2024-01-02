/* eslint-disable */
import http from "@/api/core/http";

const getProjects = function(ongId: string): Promise<TProject[]> {
  return http.get(`portfolio/ong/${ongId}`, { noAuth: false });
};

const getProject = function(projectId: string): Promise<TProject> {
  return http.get(`portfolio/${projectId}`, { noAuth: false });
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
  body: Partial<TProjectPutBody>
): Promise<any> {
  return http.put(`portfolio/${projectId}`, body, { noAuth: false });
};

const postProject = function(body: TProjectPostBody): Promise<any> {
  return http.post(`portfolio`, body, { noAuth: false });
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
  memberId: string
): Promise<OrganizationPlan> {
  return http.get(`subscriptions/${memberId}/plan`, { noAuth: false });
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

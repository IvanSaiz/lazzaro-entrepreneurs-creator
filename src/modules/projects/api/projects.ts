/* eslint-disable */
import http from "@/api/core/http";

const getProjects = function(memberId: string): Promise<TProject[]> {
  return http.get(`projects/member/${memberId}`, { noAuth: false });
};

const getProject = function(projectId: string): Promise<TProject> {
  return http.get(`projects/${projectId}`, { noAuth: false });
};

const deleteProject = function(projectId: string): Promise<any> {
  return http.delete(`projects/${projectId}`, {
    noAuth: false
  });
};

const updateProject = function(
  projectId: string,
  body: Partial<TProjectPutBody>
): Promise<any> {
  return http.put(`projects/${projectId}`, body, { noAuth: false });
};

const postProject = function(body: TProjectPostBody): Promise<any> {
  return http.post(`projects`, body, { noAuth: false });
};

export default {
  getProjects,
  postProject,
  getProject,
  deleteProject,
  updateProject
};

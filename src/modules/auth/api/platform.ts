/* eslint-disable */
import http from "@/api/core/http";

const post = (memberId: string, body: any): Promise<any> => {
  return http.post(`/website`, body, { noAuth: true });
};

const get = (websiteId: string, sectionType: string): Promise<any> => {
  return http.get(`websites/${websiteId}/section/${sectionType}`, {
    noAuth: false
  });
};

export default {
  post,
  get
};

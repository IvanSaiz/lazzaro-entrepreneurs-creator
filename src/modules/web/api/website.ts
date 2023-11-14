import http from "@/api/core/http";

const getWebsiteSections = (
  websiteId: string,
  sectionType: string
): Promise<any> => {
  return http.get(`websites/${websiteId}/section/${sectionType}`, {
    noAuth: false
  });
};

const publishWebsite = (websiteId: string): Promise<any> => {
  return http.post(`websites/${websiteId}/publish`, { noAuth: false });
};

const unpublishWebsite = (websiteId: string): Promise<any> => {
  return http.post(`websites/${websiteId}/unpublish`, { noAuth: false });
};

export default {
  getWebsiteSections,
  publishWebsite,
  unpublishWebsite
};

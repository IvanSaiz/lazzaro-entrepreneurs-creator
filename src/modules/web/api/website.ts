import http from "@/api/core/http";

const getWebsiteSection = (
  websiteId: string,
  sectionType: string
): Promise<any> => {
  return http.get(`websites/${websiteId}/section/${sectionType}`, {
    noAuth: false
  });
};

const postWebsiteSection = (sectionBody: any): Promise<any> => {
  return http.patch("websites/section", sectionBody, {noAuth: false});
}

const publishWebsite = (websiteId: string): Promise<any> => {
  return http.post(`websites/${websiteId}/publish`, { noAuth: false });
};

const unpublishWebsite = (websiteId: string): Promise<any> => {
  return http.post(`websites/${websiteId}/unpublish`, { noAuth: false });
};

export default {
  getWebsiteSection,
  postWebsiteSection,
  publishWebsite,
  unpublishWebsite
};

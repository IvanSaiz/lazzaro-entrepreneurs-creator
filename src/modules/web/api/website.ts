import http from "@/api/core/http";

export default {
  section: {
    get: <Props = Record<string, unknown>>(
      websiteId: string,
      sectionType: string
    ): Promise<Section<Props>> => {
      return http.get(`websites/${websiteId}/section/${sectionType}`, {
        noAuth: false
      });
    },
    post: (sectionBody: any): Promise<any> => {
      return http.post("websites/section", sectionBody, { noAuth: false });
    },
    put: (sectionBody: any): Promise<any> => {
      return http.put("websites/section", sectionBody, { noAuth: false });
    }
  },
  website: {
    publish: (websiteId: string): Promise<any> => {
      return http.post(`websites/${websiteId}/publish`, { noAuth: false });
    },
    unpublish: (websiteId: string): Promise<any> => {
      return http.post(`websites/${websiteId}/unpublish`, { noAuth: false });
    }
  }
};

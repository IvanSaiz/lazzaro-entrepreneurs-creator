import http from "@/api/core/http";

export default {
  section: {
    get: <Props = Record<string, unknown>>(
      websiteId: string,
      sectionType: string,
      attributes?: (keyof Section<Props>)[]
    ): Promise<Section<Props>> => {
      let url = `websites/${websiteId}/section/${sectionType}`;

      if (attributes) {
        url += `?attributes=${attributes.join(",")}`;
      }

      return http.get(url, {
        noAuth: false
      });
    },
    post: (websiteId: string, sectionBody: any): Promise<any> => {
      return http.post(`websites/${websiteId}/section`, sectionBody, {
        noAuth: false
      });
    },
    put: (websiteId: string, sectionBody: any): Promise<any> => {
      return http.put(`websites/${websiteId}/section`, sectionBody, {
        noAuth: false
      });
    },
    toggle: (websiteId: string, section: string): Promise<any> => {
      return http.patch(`websites/${websiteId}/section/toggle/${section}`, {
        noAuth: false
      });
    }
  },
  website: {
    publish: (websiteId: string): Promise<any> => {
      return http.post(`websites/${websiteId}/publish`, { noAuth: false });
    },
    unpublish: (websiteId: string): Promise<any> => {
      return http.post(`websites/${websiteId}/unpublish`, { noAuth: false });
    },
    setStyle: (websiteId: string, body: SetStyleDto): Promise<any> => {
      return http.put(`websites/${websiteId}/style`, body, { noAuth: false });
    }
  },
  templates: {
    getAll: (): Promise<Template[]> => {
      return http.get("websites/templates", { noAuth: false });
    }
  }
};

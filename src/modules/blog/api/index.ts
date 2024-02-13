import http from "@/api/core/http";

export default {
  getArticlesByMemberId: async (memberId: string): Promise<Article[]> => {
    return http.get(`/blog/member/${memberId}`, { noAuth: true });
  },
  create: async (article: ArticlePostDTO) => {
    return http.post(`/blog`, article, { noAuth: true });
  },
  update: async (id: string, article: Partial<Article>) => {
    return http.patch(`/blog/${id}`, article, { noAuth: true });
  },
  delete: async (articleId: string) => {
    return http.delete(`/blog/${articleId}`, { noAuth: true });
  },
  getById: async (articleId: string): Promise<Article> => {
    return http.get(`/blog/${articleId}`, { noAuth: true });
  }
};

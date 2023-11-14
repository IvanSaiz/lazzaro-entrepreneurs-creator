/* eslint-disable */
import http from "@/api/core/http";

const getStatistics = function(ongId: string): Promise<any> {
  return http.get(`public/ongs/${ongId}/statistics`, { noAuth: false });
};

export default getStatistics;

/* eslint-disable */
import http from "@/api/core/http";

const getDashboard = function(ongId: string): Promise<any> {
  return http.get(`public/ongs/${ongId}/dashboard`, { noAuth: false });
};

export default getDashboard;

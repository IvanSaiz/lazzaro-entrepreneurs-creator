/* eslint-disable */
import http from "@/api/core/http";

const getDashboard = function(memberId: string): Promise<DashboardData> {
  return http.get(`data/${memberId}`, { noAuth: false });
};

export default getDashboard;

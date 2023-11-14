/* eslint-disable */
import http from "@/api/core/http";

const getOng = function(ongId: string): Promise<any> {
  return http.get(`public/ongs/${ongId}`, { noAuth: false });
};

const getMember = function(memberId: string): Promise<any> {
  return http.get(`members/${memberId}`, { noAuth: false });
};

const getPlatformFeatures = function(ongId: string): Promise<any> {
  return http.get(`private/ongs/${ongId}/platform-features`, { noAuth: false });
};

const getWallet = function(walletId: string): Promise<any> {
  return http.get(`private/wallet/${walletId}`, { noAuth: false });
};

const getOrganizationPlan = function(
  orgId: string
): Promise<TOrganizationPlan> {
  return http.get(`/subscriptions/org/${orgId}/plan`, { noAuth: false });
};

export default {
  getOng,
  getMember,
  getPlatformFeatures,
  getWallet,
  getOrganizationPlan
};

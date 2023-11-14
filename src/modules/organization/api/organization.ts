/* eslint-disable */
import http from "@/api/core/http";

const getOrganization = function(ongId: string): Promise<any> {
  return http.get(`public/ongs/${ongId}`, { noAuth: false });
};

const putOrganization = function(ongId: string, body: any): Promise<any> {
  return http.put(`public/ongs/${ongId}`, body, { noAuth: false });
};

const getOrganizationPlan = function(
  memberId: string
): Promise<TOrganizationPlan> {
  return http.get(`/subscriptions/${memberId}/plan`, { noAuth: false });
};

const getSubscriptionPlans = function(): Promise<SubscriptionPlans> {
  return http.get(`/subscriptions/plans`, { noAuth: false });
};

const postOrganizationPlan = function(ongId: string, body: any): Promise<any> {
  return http.post(`private/ongs/${ongId}/subscription-plan`, body, {
    noAuth: false
  });
};

const getPlatformConfig = function(ongId: string): Promise<any> {
  return http.get(`public/ongs/${ongId}/all-platform-config`, {
    noAuth: false
  });
};

const postCurrencyUpdate = function(ongId: string, body: any): Promise<any> {
  return http.post(`private/ongs/${ongId}/update-currency`, body, {
    noAuth: false
  });
};

export default {
  getOrganization,
  getOrganizationPlan,
  postOrganizationPlan,
  getSubscriptionPlans,
  putOrganization,
  getPlatformConfig,
  postCurrencyUpdate
};

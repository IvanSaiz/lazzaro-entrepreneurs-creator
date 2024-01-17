/* eslint-disable */
import http from "@/api/core/http";

const getOrganization = function(memberId: string): Promise<any> {
  return http.get(`members/${memberId}`, { noAuth: false });
};

const putOrganization = function(memberId: string, body: any): Promise<any> {
  return http.put(`members/${memberId}`, body, { noAuth: false });
};

const getOrganizationPlan = function(
  memberId: string
): Promise<OrganizationPlan> {
  return http.get(`/subscriptions/${memberId}/plan`, { noAuth: false });
};

const getSubscriptionPlans = function(): Promise<SubscriptionPlans> {
  return http.get(`/subscriptions/plans`, { noAuth: false });
};

const postOrganizationPlan = function(memberId: string, body: any): Promise<any> {
  return http.post(`private/members/${memberId}/subscription-plan`, body, {
    noAuth: false
  });
};

const getPlatformConfig = function(memberId: string): Promise<any> {
  return http.get(`public/members/${memberId}/all-platform-config`, {
    noAuth: false
  });
};

const postCurrencyUpdate = function(memberId: string, body: any): Promise<any> {
  return http.post(`private/members/${memberId}/update-currency`, body, {
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

/* eslint-disable */
import http from "@/api/core/http";

const getOrganization = function(memberId: string): Promise<Member> {
  return http.get(`members/${memberId}`, { noAuth: false });
};

const putOrganization = function(
  memberId: string,
  body: Partial<Member>
): Promise<any> {
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

export default {
  getOrganization,
  getOrganizationPlan,
  getSubscriptionPlans,
  putOrganization
};

/* eslint-disable */
import http from "@/api/core/http";

const getDonationsProjects = function(
  ongId: string
): Promise<TProjectDonations> {
  return http.get(`private/projects/ong/${ongId}/donations`, { noAuth: false });
};

const getDonationsEvents = function(ongId: string): Promise<TEventDonations> {
  return http.get(`private/events/ong/${ongId}/donations`, { noAuth: false });
};

const getDonationsCourses = function(ongId: string): Promise<TEventDonations> {
  return http.get(`private/courses/ong/${ongId}/donations`, { noAuth: false });
};

const getDonationsProducts = function(
  ongId: string
): Promise<TProductDonation> {
  return http.get(`private/orders/ong/${ongId}`, { noAuth: false });
};

const getDonationsSubscriptions = function(
  ongId: string
): Promise<TSubscriptionDonations> {
  return http.get(`private/subscriptions/ong/${ongId}/donations`, {
    noAuth: false
  });
};

const getDonationsSingle = function(ongId: string): Promise<TSingleDonations> {
  return http.get(`private/ongs/${ongId}/donations`, { noAuth: false });
};

const getWallet = function(walletId: string): Promise<any> {
  return http.get(`private/wallet/${walletId}`, { noAuth: false });
};

const cashOut = function(ongId: string, body: any): Promise<any> {
  return http.post(`private/cashout/${ongId}`, body, { noAuth: false });
};

export default {
  cashOut,
  getDonationsProjects,
  getDonationsEvents,
  getDonationsSubscriptions,
  getDonationsSingle,
  getDonationsCourses,
  getDonationsProducts,
  getWallet
};

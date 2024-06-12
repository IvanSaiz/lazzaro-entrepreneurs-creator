/* eslint-disable */
import http from "@/api/core/http";

const getWallet = function(walletId: string): Promise<any> {
  return http.get(`private/wallet/${walletId}`, { noAuth: false });
};

const stripeApi = {
  updateClientId: function(memberId: string, clientId: string): Promise<any> {
    return http.put(`members/${memberId}`, { stripe_account_id: clientId });
  }
};

export default {
  stripeApi,
  getWallet
};

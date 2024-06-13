/* eslint-disable */
import http from "@/api/core/http";

const getWallet = function(walletId: string): Promise<any> {
  return http.get(`private/wallet/${walletId}`, { noAuth: false });
};

const stripeApi = {
  updateClientId: function(memberId: string, clientId: string): Promise<any> {
    return http.put(`members/${memberId}`, { stripe_account_id: clientId });
  },
  getConnectLink: function(memberId: string): Promise<any> {
    const params = new URLSearchParams({
      return_url: window.location.href
    });

    return http.get(`payment/connect/${memberId}?${params}`, { noAuth: false });
  }
};

export default {
  stripe: stripeApi,
  getWallet
};

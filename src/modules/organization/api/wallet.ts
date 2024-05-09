/* eslint-disable */
import http from "@/api/core/http";

const getWallet = function(walletId: string): Promise<any> {
  return http.get(`private/wallet/${walletId}`, { noAuth: false });
};

const stripeApi = {
  postConfig: function(ongId: string, authCode: string): Promise<any> {
    return http.put(`public/ongs/stripe/${authCode}/${ongId}`, {});
  }
};

export default {
  stripeApi,
  getWallet
};

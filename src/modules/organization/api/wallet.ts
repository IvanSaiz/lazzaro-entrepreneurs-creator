/* eslint-disable */
import http from "@/api/core/http";

const getWallet = function(walletId: string): Promise<any> {
  return http.get(`private/wallet/${walletId}`, { noAuth: false });
};

const iocashApi = {
  postCertificate: function(ongId: string, body: any): Promise<any> {
    return http.post(`public/ongs/${ongId}/iocash-account/certificate`, body, {
      noAuth: false
    });
  },
  postPhone: function(ongId: string, phone: string): Promise<any> {
    debugger;
    return http.post(
      `public/ongs/${ongId}/iocash-account/`,
      { mobilePhone: phone },
      { noAuth: false }
    );
  },
  postOtp: function(ongId: string, otp: any): Promise<any> {
    return http.post(
      `public/ongs/${ongId}/validate`,
      { otp },
      { noAuth: false }
    );
  }
};

const paypalApi = {
  postConfig: function(
    ongId: string,
    id: string,
    secret: string
  ): Promise<any> {
    return http.post(`private/paypal/ong/${ongId}`, {
      paypal_client_id: id,
      paypal_client_secret: secret
    });
  }
};

const stripeApi = {
  postConfig: function(ongId: string, authCode: string): Promise<any> {
    return http.put(`public/ongs/stripe/${authCode}/${ongId}`, {});
  }
};

const mollieApi = {
  postConfig: function(ongId: string, orgApiKey: string): Promise<void> {
    return http.put(`public/ongs/mollie/${ongId}`, { orgApiKey });
  }
};

export default {
  iocashApi,
  paypalApi,
  stripeApi,
  getWallet,
  mollieApi
};

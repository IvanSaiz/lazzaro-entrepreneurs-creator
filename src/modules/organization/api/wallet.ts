/* eslint-disable */
import http from "@/api/core/http";

const getWallet = function(walletId: string): Promise<any> {
  return http.get(`private/wallet/${walletId}`, { noAuth: false });
};

interface AccountStatus {
  enabled: boolean;
  charges_enabled?: boolean;
  details_submitted?: boolean;
  payouts_enabled?: boolean;
  requirements?: Record<string, any>;
}

const stripeApi = {
  updateClientId: function(memberId: string, clientId: string): Promise<any> {
    return http.put(`members/${memberId}`, { stripe_account_id: clientId });
  },
  getConnectLink: function(
    memberId: string,
    type: "account_onboarding" | "account_update"
  ): Promise<any> {
    const params = new URLSearchParams({
      return_url: window.location.href,
      type
    });

    return http.get(`payment/connect/${memberId}?${params}`, { noAuth: false });
  },
  getAccountStatus: function(memberId: string): Promise<AccountStatus> {
    return http.get(`payment/stripe/${memberId}/status`, { noAuth: false });
  }
};

export default {
  stripe: stripeApi,
  getWallet
};

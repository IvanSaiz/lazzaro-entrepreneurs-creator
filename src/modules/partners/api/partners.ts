/* eslint-disable */
import http from "@/api/core/http";
import { filterPartnersBasedOnEmails } from "@/utils";

const getPartners = async function(ongId: string): Promise<TPartners> {
  const { data: partners } = await http.get(
    `private/subscriptions/ong/${ongId}/donations`,
    {
      noAuth: false
    }
  );

  return { data: filterPartnersBasedOnEmails(partners) };
};

const getPartner = function(subscriptionId: string): Promise<TPartner> {
  return http.get(`private/subscriptions/${subscriptionId}/detail`, {
    noAuth: false
  });
};

const deletePartner = function(ongId: string, partnerId: string): Promise<any> {
  return http.delete(`private/${ongId}/${partnerId}`, { noAuth: false }); //CHECK
};

const deleteType = function(ongId: string, typeId: string): Promise<any> {
  return http.delete(`private/${ongId}/${typeId}`, { noAuth: false }); //CHECK
};

const getDonationOptions = function(ongId: string): Promise<TDonationOptions> {
  return http.get(`public/ongs/${ongId}/donations-options`, { noAuth: false });
};

const postDonationOption = function(
  ongId: string,
  body: TPayload
): Promise<any> {
  return http.post(`private/ongs/${ongId}/donations-options`, body, {
    noAuth: false
  });
};

const deleteDonationOption = function(
  ongId: string,
  id: string,
  stripePlanId: string | null
): Promise<any> {
  return http.delete(
    `private/ongs/${ongId}/donations-options/${id}/${stripePlanId}`,
    {
      noAuth: false
    }
  );
};

export default {
  deleteDonationOption,
  getPartners,
  getPartner,
  deletePartner,
  deleteType,
  postDonationOption,
  getDonationOptions
};

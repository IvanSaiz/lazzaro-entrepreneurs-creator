/* eslint-disable */
import http from "@/api/core/http";

const getAllPlatformConfig = function(
  ongId: string
): Promise<AllPlatformConfig> {
  return http.get(`public/ongs/${ongId}/all-platform-config`, {
    noAuth: false
  });
};

const getMember = function(memberId: string): Promise<any> {
  return http.get(`members/${memberId}`, { noAuth: false });
};

const postPlatformConfig = function(ongId: string, body: any): Promise<any> {
  return http.post(`private/ongs/${ongId}/platform-config`, body, {
    noAuth: false
  });
};

const postPlatformInit = function(memberId: string, body: any): Promise<any> {
  return http.post(`/members/${memberId}/platform`, body, { noAuth: false });
};

const postContact = function(ongId: string, body: any): Promise<any> {
  return http.post(`private/ongs/${ongId}/contact`, body, { noAuth: false });
};

const postPlatformFeatures = function(ongId: string, body: any): Promise<any> {
  return http.post(`private/ongs/${ongId}/platform-features`, body, {
    noAuth: false
  });
};

const postTermsAndConditions = function(
  ongId: string,
  body: any
): Promise<any> {
  return http.post(`private/ongs/${ongId}/terms-and-conditions`, body, {
    noAuth: false
  });
};

const getLogos = function(ongId: string): Promise<Logos> {
  return http.get(`public/ongs/${ongId}/logos`, { noAuth: false });
};

const postLogos = function(
  ongId: string,
  body: { logo: string }
): Promise<any> {
  return http.post(`private/ongs/${ongId}/logos`, body, { noAuth: false });
};

const deleteLogo = function(
  ongId: string,
  body: { logoId: string }
): Promise<any> {
  return http.patch(`private/ongs/${ongId}/logos`, body, { noAuth: false });
};

const postTeam = function(ongId: string, body: any): Promise<any> {
  return http.post(
    `private/ongs/${ongId}/team`,
    { team: body },
    { noAuth: false }
  );
};

const postRRSS = function(ongId: string, body: any): Promise<any> {
  return http.post(`private/ongs/${ongId}/rrss`, body, { noAuth: false });
};

const getTransparency = function(ongId: string): Promise<Transparency> {
  return http.get(`public/ongs/${ongId}/transparency`, { noAuth: false });
};

const postTransparency = function(ongId: string, body: any): Promise<any> {
  return http.post(`private/ongs/${ongId}/transparency`, body, {
    noAuth: false
  });
};

const postRrss = function(ongId: string, body: any): Promise<any> {
  return http.post(`private/ongs/${ongId}/rrss`, body, { noAuth: false });
};

const postImpactData = function(ongId: string, body: any): Promise<any> {
  return http.post(`private/ongs/${ongId}/impact-data`, body, {
    noAuth: false
  });
};

const postDescription = function(ongId: string, body: any): Promise<any> {
  return http.post(`private/ongs/${ongId}/description`, body, {
    noAuth: false
  });
};

const getTemplates = function(): Promise<any> {
  return http.get(`templates`, { noAuth: true });
};

const publishWebsite = function({
  ongId,
  templateId
}: Record<"ongId" | "templateId", string>): Promise<void> {
  return http.put(`private/ongs/${ongId}/publish-website/${templateId}`, {
    noAuth: false
  });
};

const unpublishWebsite = function({
  ongId,
  templateId
}: Record<"ongId" | "templateId", string>): Promise<void> {
  return http.put(`private/ongs/${ongId}/unpublish-website/${templateId}`, {
    noAuth: false
  });
};

export default {
  getAllPlatformConfig,
  postPlatformConfig,
  postPlatformInit,
  postContact,
  postPlatformFeatures,
  postTermsAndConditions,
  postTeam,
  postRRSS,
  getTransparency,
  postTransparency,
  postRrss,
  postDescription,
  postImpactData,
  getTemplates,
  postLogos,
  getLogos,
  deleteLogo,
  publishWebsite,
  unpublishWebsite,
  getMember
};

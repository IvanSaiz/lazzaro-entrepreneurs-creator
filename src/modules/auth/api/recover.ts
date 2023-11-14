/* eslint-disable */
import http from "@/api/core/http";

export function recover(body: any): Promise<any> {
  return http.post("members/passwordRecovery", body, {
    noAuth: true
  });
}

export function checkHash(body: any): Promise<any> {
  return http.post("members/passwordRecovery/check", body, { noAuth: true });
}

export function updatePasswordByHash(body: any): Promise<any> {
  return http.post("members/passwordRecovery/complete", body, { noAuth: true });
}

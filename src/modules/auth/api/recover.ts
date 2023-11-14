/* eslint-disable */
import http from "@/api/core/http";

export function recover(body: any): Promise<any> {
  return http.post("public/recover", body, {
    noAuth: true
  });
}

export function checkHash(body: any): Promise<any> {
  return http.post("public/recover/check", body, { noAuth: true });
}

export function updatePasswordByHash(body: any): Promise<any> {
  return http.post("public/recover/complete", body, { noAuth: true });
}

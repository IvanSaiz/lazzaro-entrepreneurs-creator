/* eslint-disable */
import http from "@/api/core/http";

export default function(body: any): Promise<any> {
  return http.post("/auth/login", body, { noAuth: true });
}

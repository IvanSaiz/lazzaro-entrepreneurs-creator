/* eslint-disable */
import http from "@/api/core/http";

export default function(memberId: string, body: any): Promise<any> {
  return http.post(`/members/${memberId}/tools`, body, {
    noAuth: false
  });
}

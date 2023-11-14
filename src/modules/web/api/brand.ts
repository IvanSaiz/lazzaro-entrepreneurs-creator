/* eslint-disable */
import http from "@/api/core/http";

export default function(ongId: string, body: any): Promise<any> {
  return http.post(`private/ongs/${ongId}/brand`, body, { noAuth: false });
}

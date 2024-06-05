/* eslint-disable */
import http from "@/api/core/http";

type CreateMemberDto = {};

export function create(body: CreateMemberDto): Promise<any> {
  return http.post("/members", body, { noAuth: true });
}

export function getById(id: string) {
  return http.get(`/members/${id}`, { noAuth: true });
}

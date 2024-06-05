/* eslint-disable */
import http from "@/api/core/http";

export type CreateMemberDto = {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  companyName: string;
  mobilePhone: string;
  cif: string;
  gender: string;
  organization: string;
  websiteId?: string;
  dni?: string;
  tools?: Member["tools"];
  stripeId?: string;
  recoverHash?: string;
  recoverDate?: Member["recoverDate"];
  deleted?: boolean;
};

export type GetMemberDto = CreateMemberDto & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

export function create(body: CreateMemberDto): Promise<any> {
  return http.post("/members", body, { noAuth: true });
}

export function update(id: string, body: Partial<CreateMemberDto>) {
  return http.put(`/members/${id}`, body, { noAuth: true });
}

export function getById(id: string): Promise<GetMemberDto> {
  return http.get(`/members/${id}`, { noAuth: true });
}

// DEPRECATED --- DONT USE, JUST PUT /MEMBERS WITH THE MODIFIED TOOLS ARRAY
export function createTools(memberId: string, body: any): Promise<any> {
  return http.post(`/members/${memberId}/tools`, body, {
    noAuth: false
  });
}

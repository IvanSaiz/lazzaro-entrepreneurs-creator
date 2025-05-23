/* eslint-disable */
import http from "@/api/core/http";

export default {
  async getAll() {
    const response = await http.get("/events", { noAuth: false });
    return response;
  },
  async getAllByMemberId(memberId: string): Promise<CalendarEvent[]> {
    const response = await http.get(`/events/member/${memberId}`, {
      noAuth: false
    });
    return response;
  },
  async get(id: string): Promise<CalendarEvent> {
    const response = await http.get(`/events/${id}`, { noAuth: false });
    return response;
  },
  async create(event: CalendarEventPostBody) {
    const response = await http.post("/events", event);
    return response;
  },
  async update(id: string, event: Partial<CalendarEvent>) {
    const response = await http.put(`/events/${id}`, event);
    return response;
  },
  async delete(id: string) {
    const response = await http.delete(`/events/${id}`, { noAuth: false });
    return response;
  }
};

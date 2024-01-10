/* eslint-disable */
import http from "@/api/core/http";

export default {
  async getAll() {
    const response = await http.get("/events");
    return response.data;
  },
  async getAllByMemberId(memberId: string): Promise<CalendarEvent[]> {
    const response = await http.get(`/events/member/${memberId}`);
    return response.data;
  },
  async get(id: string): Promise<CalendarEvent> {
    const response = await http.get(`/events/${id}`);
    return response.data;
  },
  async create(event: CalendarEventPostBody) {
    const response = await http.post("/events", event);
    return response.data;
  },
  async update(id: string, event: Partial<CalendarEvent>) {
    const response = await http.put(`/events/${id}`, event);
    return response.data;
  }
};

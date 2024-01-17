declare interface CalendarEventForm {
  name: string;
  description: string;
  main_image: [{ url: string }] | "";
  images: { url: string }[] | "";
  location: "online" | "onsite";
  url: string;
  tickets: EventTicket[];
  dates: [EventDates];
}
declare interface CalendarEvent {
  id: string;
  member_id: string;
  name: string;
  description: string;
  images: {
    url: string;
    default: boolean;
  }[];
  location: "online" | "onsite";
  url: string;
  tickets: EventTicket[];
  dates: EventDates;
}

declare type CalendarEventPostBody = Omit<CalendarEvent, "id">;

declare interface EventTicket {
  name: string;
  ammount: number;
  price: number;
}

declare interface EventDates {
  inscription_start: string;
  inscription_end: string;
  event_start: string;
  event_end: string;
}

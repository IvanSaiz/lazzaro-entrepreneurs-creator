declare namespace Calendly {
  function initInlineWidget(config: unknown): void;
}

declare type Service = {
  id: string;
  member_id: string;
  service_name: string;
  description: string;
  image_url: string;
  payment_in_advance: boolean;
  price: string;
  calendly_url: string;
};

declare type ServicePostDTO = {
  member_id: string;
  service_name: string;
  description: string;
  image_url: string;
  payment_in_advance?: boolean;
  price?: string;
  calendly_url?: string;
};

declare type Reservation = {
  id: string;
  member_id: string;
  service_id: string;
  reservation_date: Date;
};

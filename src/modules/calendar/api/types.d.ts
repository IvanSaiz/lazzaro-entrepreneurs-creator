declare type TEvent = {
  data: {
    course: boolean;
    id: string;
    title: string;
    description: string;
    imageURL: string;
    start_time: string;
    location: string;
    link: string;
    end_time: string;
    stock: number;
    amount: number;
    price: number | null;
    donated: number | null;
    salesStartDate: string;
    salesEndDate: string;
    recurrent: boolean;
    type: "Presencial" | "Online";
    stripe_id: string;
    video_url: string;
    isPremium: boolean;
    frecuency: "Semanal" | "weekly" | null;
    status: "Activo";
    EventTickets: {
      amount: number;
      id: string;
      price: number;
      type: string;
      stock: number;
    }[];
  };
};

declare type TEvents = {
  data: TEvent["data"][];
};

declare type TEventImage = {
  id: string;
  event_id: string;
  img_url: string;
  default: string;
};

declare type TEventImages = {
  data: TEventImage[];
};

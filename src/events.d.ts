export type CalendarEvents = CalendarEvent[];

export interface CalendarEvent {
  key: string;
  dates: string;
  popover: Popover;
  customData: CustomData;
}

export interface Popover {
  label: string;
}

export interface CustomData {
  id: string;
  ong_id: string;
  title: string;
  subtitle: string;
  description: string;
  location: string;
  amount: number;
  donated: number;
  price: number;
  imageURL: string;
  stripe_id: string;
  video_url: string;
  start_time: string;
  end_time: string;
  salesStartDate: string;
  salesEndDate: string;
  course: boolean;
  recurrent: boolean;
  frecuency: string;
  stock: number;
  status: string;
  type: string;
  isPremium: boolean;
  createdAt: string;
  updatedAt: string;
  Ong: Ong;
  EventTickets: any[];
  dot: string;
  icon: string;
}

export interface Ong {
  id: string;
  name: string;
  email: string;
  password: string;
  description: string;
  img_url: string;
  home_url: string;
  ambit: string;
  type: string;
  address: string;
  stripe_id: string;
  nif: string;
  ioCashUserId: string;
  walletId: string;
  walletStatus: string;
  walletCertificateFile: string;
  crypto_wallet_address: string;
  bankAccount: string;
  dltAddress: string;
  pk: string;
  mobilePhone: string;
  url: string;
  port: number;
  active: boolean;
  zohoId: string;
  hasPaypal: boolean;
  paypal_client_id: string;
  paypal_client_secret: string;
  mollie_org_api_key: string;
  recoverHash: any;
  recoverDate: any;
  createdAt: string;
  updatedAt: string;
}

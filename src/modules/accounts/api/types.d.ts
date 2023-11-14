declare type TUser = {
  id: string;
  firstName: string;
  lastName: string;
  birthDay: string;
  email: string;
  password: string;
  customer_id: string;
  nif: string;
  home_address: string;
  gender: "male" | "female";
  phrase: string;
  stripe_id: string;
  img_url: string;
  ioCashUserId: string;
  walletId: string;
  dltAddress: string;
  pk: string;
  mobilePhone: string;
  promotion: boolean;
  terms_and_conditions: boolean;
  newsletter: boolean;
  image_rights: boolean;
  certificate: boolean;
};

declare type TOng = {
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
  crypto_wallet_address: string;
  walletCertificateFile: string;
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
  recoverHash: string;
  recoverDate: string;
};

declare type TDonatedProject = TProject["data"] & {
  Ong: Ong;
};

declare type TProjectDonations = {
  data: {
    id: string;
    user_id: string;
    project_id: string;
    amount: number;
    ong_id: string;
    tx: string;
    event: boolean;
    certificate: boolean;
    User: TUser | null;
    Ong: TOng | null;
    Project: TDonatedProject | null;
    createdAt: string;
    updatedAt: string;
  }[];
};

declare type TDonatedEvent = Omit<TEvent["data"], "EventTickets"> & {
  createdAt: string;
  updatedAt: string;
  Ong: Ong;
};

declare type TEventDonations = {
  data: {
    Event: TDonatedEvent;
    User: TUser;
    event_id: string;
    id: string;
    ong_id: string;
    total_amount: number;
    tx: string;
    certificate: boolean;
    user_id: string;
    createdAt: string;
    updatedAt: string;
  }[];
};

declare type TProduct = {
  id: string;
  ong_id: string;
  title: string;
  description: string;
  amount: number;
  price: number;
  default_img: string;
  discount: number;
  delivery_time: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
};

declare type TOrderDetails = {
  id: string;
  order_id: string;
  product_id: string;
  amount: number;
  discount: number;
  price: number;
  createdAt: string;
  updatedAt: string;
  Product: TProduct;
};

declare type TProductDonation = {
  data: {
    id: string;
    user_id: string;
    ong_id: string;
    cp: number;
    country: string;
    city: string;
    address: string;
    amount: number;
    status: string;
    tx: string;
    shipment_method_url: string | null;
    tracking_code: string | null;
    certificate: boolean;
    createdAt: string;
    updatedAt: string;
    User: User;
    Ong: Ong;
    OrderDetails: TOrderDetails[];
  }[];
};

declare type TSingleDonations = {
  data: {
    id: string;
    user_id: string;
    amount: number;
    ong_id: string;
    tx: string;
    certificate: boolean;
    createdAt: string;
    updatedAt: string;
    User: User;
    Ong: Ong;
  }[];
};

declare type TSubscriptionDonations = TSingleDonations;

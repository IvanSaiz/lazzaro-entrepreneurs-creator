declare type SubscriptionPlan = {
  id: string;
  name: PlatformSubscription["name"];
  description: Record<string, boolean>;
  payment_url: string;
  /**
   * @deprecated to delete
   */
  period: string;
  price: number;
  createdAt: string;
  updatedAt: string;
};

declare type SubscriptionPlans = {
  data: SubscriptionPlan[];
};

declare type PaymentMethod = "mollie" | "stripe" | "paypal";

declare interface Member {
  id: string;
  firstName: string;
  lastName: string;
  companyName: string;
  email: string;
  address: string;
  cif: string;
  gender: string;
  websiteId: string;
  dni: string;
  roles: string[];
  tools: (
    | "portfolio"
    | "shop"
    | "events"
    | "services"
    | "reviews"
    | "bookings"
  )[];
  styleId: null | string;
  url: string;
  mobilePhone: null | string;
  zohoId: null | string;
  currency: string;
  currencySymbol: string;
  recoverHash: null | string;
  recoverDate: null | string;
  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
  isActive: boolean;
  stripe_account_id: null | string;
  SubscriptionMembershipId: null | string;
}

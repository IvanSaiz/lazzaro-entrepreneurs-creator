declare type SubscriptionPlan = {
  id: string;
  name: PlatformSubscription["name"];
  description: string;
  payment_url: string;
  period: string;
  price: number;
  createdAt: string;
  updatedAt: string;
};

declare type SubscriptionPlans = {
  data: SubscriptionPlan[];
};

declare type PaymentMethod = "mollie" | "stripe" | "paypal";

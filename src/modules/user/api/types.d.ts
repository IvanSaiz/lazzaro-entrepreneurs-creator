declare type TOrganizationPlan = {
  data: {
    id: string;
    ong_id: string;
    platform_subscription_id: string;
    freeDays: string;
    payment_type: "monthly" | "yearly" | "semiannual";
    expiration_date: Date;
    PlatformSubscription: PlatformSubscription;
    createdAt: string;
    updatedAt: string;
  };
};

declare type PlatformSubscription = {
  id: string;
  name:
    | "Plan Básico Mensual"
    | "Plan Básico Semestral"
    | "Plan Básico Anual"
    | "Plan Premium Mensual"
    | "Plan Premium Semestral"
    | "Plan Premium Anual";
  payment_url: string;
  period: "monthly" | "yearly";
  price: number;
};

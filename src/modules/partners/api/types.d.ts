declare type TDonationOption = {
  id: string;
  name: string;
  type: string;
  amount: number | 0;
  stripe_plan_id: string | null;
};
declare type TDonationOptions = {
  data: TDonationOption[];
};

declare type TPartner = {
  data: {
    id: string;
    user_id: string;
    amount: number;
    ong_id: string;
    certificate: boolean;
    createdAt: string;
    updatedAt: string;
    User: TUser;
    Ong: TOng;
    comunications: boolean;
    status: string;
  };
};

declare type TPartners = {
  data: TPartner["data"][];
};

declare type TPayload = {
  type: "1 month" | "12 months";
  name: string;
  amount: number;
};

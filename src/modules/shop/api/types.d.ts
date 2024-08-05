// src/modules/shop/api/types.ts

export type Product = {
  id: string;
  member_id: string;
  title: string;
  active: boolean;
  description: string;
  price: number;
  stock: number;
  default_img: string;
  images: string[];
  delivery_time: string;
  discount: number;
};

export type ProductForm = {
  member_id: string;
  title: string;
  status: "enabled" | "disabled";
  description: string;
  price: string;
  stock: string;
  default_img: [{ url: string; name?: string }] | "";
  images: { url: string; name?: string }[] | "";
  delivery_time: string;
  discount: string;
};

export type Order = {
  id: string;
  member_id: string;
  product_id: string;
  payment_id: string;
  createdAt: Date;
  updatedAt: Date;
  Member: Member;
  Product: Product;
  Payment: Payment;
};

export type Member = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

export type Payment = {
  id: string;
  amount: number;
  paid: boolean;
};

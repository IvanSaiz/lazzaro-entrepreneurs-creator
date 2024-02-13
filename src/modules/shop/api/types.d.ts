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

declare type TProject = {
  data: {
    title: string;
    id: string;
    active: boolean;
    description: string;
    imageURL: string;
    amount: number;
    limitDate: string;
    startDate: string;
    address: string;
    beneficiaries: number;
    donated: number;
    location: string;
    subtitle: string;
    catastrophe: string;
    isPremium: boolean;
    ods: [string, string];
    ambit:
      | "Infantil"
      | "Educación"
      | "Salud"
      | "Animales"
      | "Otro"
      | "Medio Ambiente"
      | "Catástrofe natural"
      | "Desarrollo económico";
  };
};

declare type TProjects = {
  data: TProject["data"][];
};

declare type TProjectImage = {
  default: boolean;
  id: string;
  img_url: string;
  project_id: string;
};

declare type TProjectImages = {
  data: TProjectImage[];
};

declare type TProjectForm = {
  title: string;
  description: string;
  category: TProject["data"]["ambit"];
  status: "enabled" | "disabled";
  active: boolean;
  startDate: string;
  limitDate: string;
  amount: number;
  imageUrlToConvert: { url: string }[];
  imagesToConvert: { url: string }[];
  ongId: string;
  imageUrl: string;
  images: string[];
  isPremium: boolean;
};

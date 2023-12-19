declare type TProject = {
  id: string;
  status: "enabled" | "disabled";
  title: string;
  description: string;
  skills: string;
  date: string;
  image_url: string;
  images: string[];
};

declare type TProjectPostBody = {
  ong_id: string;
  title: string;
  description: string;
  date: string;
  skills: string;
  status: "enabled" | "disabled";
  image_url: string;
  images: string[];
};

declare type TProjectPutBody = TProjectPostBody;

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
  status: "enabled" | "disabled";
  date: string;
  skills: string;
  imageUrlToConvert: { url: string }[];
  imagesToConvert: { url: string }[];
  ongId: string;
  imageUrl: string;
  images: string[];
};

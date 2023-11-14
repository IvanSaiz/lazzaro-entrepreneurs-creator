declare type AllPlatformConfig = {
  data: {
    team: Team[];
    impactData: ImpactData[];
    rrss: Rrss;
    platformConfig: PlatformConfig;
    contact: Contact;
    brand: Brand;
    description: PlatFormDescription;
    features: Features;
  };
};

type Features = {
  id: string;
  ong_id: string;
  causes: boolean;
  events: boolean;
  market: boolean;
  partners: boolean;
  donations: boolean;
  courses: boolean;
  volunteers: boolean;
  impact: boolean;
  logos: boolean;
  createdAt: string;
  updatedAt: string;
};

type PlatFormDescription = {
  id: string;
  ong_id: string;
  title_description: string;
  description: string;
  title: string;
  subtitle: string;
  img_url: string;
  createdAt: string;
  updatedAt: string;
};

type Brand = {
  id: string;
  ong_id: string;
  logo: string;
  default_img: string;
  name: string;
  text_color: string;
  text_header1: string;
  text_header2: string;
  primary_color_hex: string;
  secondary_color_hex: string;
  primary_color_rgb: string;
  secondary_color_rgb: string;
  terms_and_conditions: string;
  favicon: string;
  createdAt: string;
  updatedAt: string;
};

type Contact = {
  id: string;
  ong_id: string;
  address: string;
  email: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
};

type PlatformConfig = {
  id: string;
  ong_id: string;
  active: boolean;
  url: string;
  language: string;
  powered_by_lazzaro: boolean;
  currency: string;
  currency_symbol: string;
  template_id: string;
  payment_method: string;
  google_analytics_id: string | null;
  createdAt: string;
  updatedAt: string;
};

type Rrss = {
  id: string;
  ong_id: string;
  linkedin: string;
  facebook: string;
  twitter: string;
  instagram: string;
  web: string;
  createdAt: string;
  updatedAt: string;
};

type ImpactData = {
  id: string;
  ong_id: string;
  name: string;
  amount: string;
  createdAt: string;
  updatedAt: string;
};

type Team = {
  id: string;
  ong_id: string;
  name: string;
  position: string;
  linkedin: string;
  img_url: string;
  order: number;
  createdAt: string;
  updatedAt: string;
};

type TransparencyDescription = {
  id: string;
  ong_id: string;
  transparency_description: string;
  createdAt: string;
  updatedAt: string;
};

type Files = {
  id: string;
  ong_id: string;
  title: string;
  file_url: string;
  createdAt: string;
  updatedAt: string;
}[];

declare type Transparency = {
  data: { files: Files; description: TransparencyDescription };
};

type Logo = {
  id: string;
  ong_id: string;
  logo: string;
  createdAt: string;
  updatedAt: string;
};

declare type Logos = {
  data: Logo[];
};

declare type PublicWebForm = {
  active: boolean;
  url: string;
  powered_by_lazzaro: boolean;
  logo: any;
  mainImage: any;
  textColor: string;
  primaryColor: string;
  secondaryColor: string;
  orgname: string;
  phone: string;
  address: string;
  causes: boolean;
  events: boolean;
  volunteers: boolean;
  courses: boolean;
  market: boolean;
  partners: boolean;
  donations: boolean;
  impact: boolean;
  facebook: string;
  linkedin: string;
  instagram: string;
  twitter: string;
  web: string;
  team: any[];
  description: string;
  mission: string;
  vision: string;
  values: string;
  accountability: any;
  desc_title: string;
  desc_subtitle: string;
  desc_title_description: string;
  desc_image: {};
  desc_description: string;
  impact_field_one: string;
  impact_field_two: string;
  impact_field_three: string;
  impact_field_four: string;
  impact_value_one: number;
  impact_value_two: number;
  impact_value_three: number;
  impact_value_four: number;
  terms_description: string;
  transparency_description: string;
  logos: { id: string; logo: string }[];
  chosenTemplateId: string;
  google_analytics_id: string | null;
};

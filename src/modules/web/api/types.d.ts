// TODO: enable sytles as they are ready
declare type Layout = "modern"; //| "classic" | "minimalist";

declare type AllPlatformConfig = {
  data: {
    team: Section.Web.TeamMember[];
    impactData: Section.Web.ImpactDataProperties[];
    rrss: Section.Web.Rrss;
    platformConfig: Section.Web.PlatformConfig;
    contact: Section.Web.Contact;
    brand: Section.Web.Brand;
    description: Section.Web.PlatFormDescription;
    features: Section.Web.Features;
  };
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
  team: Member[];
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

interface Feature {
  id: string | number;
  url: string;
  title: string;
  description: string;
}

interface Button {
  id: string | number;
  text: string;
  link: string;
}

interface DataItem {
  id: string | number;
  url: string;
  text: string;
  amount: string | number;
}

interface Design {
  layout?: string;
  backgroundColor?: string;
  backgroundImage?: string;
}

interface GeneralProperties {
  url: string;
}

interface StyleProperties {
  logo: string;
  menuColor: string;
  buttonColor: string;
  footerColor: string;
  mainTypography: string;
  secondaryTypography: string;
}

interface HomeDesign {
  layout?: string;
  backgroundColor: string;
}

interface HomeProperties {
  title: string;
  design: HomeDesign;
  subTitle: string;
  mainImage: string;
  moreImages: string;
  titleColor: string;
  subTitleColor: string;
  firstButtonLink: string;
  firstButtonText: string;
  secondButtonLink: string;
  secondButtonText: string;
}

interface AboutUsProperties {
  title: string;
  imgUrl: string;
  subTitle: string;
  titleColor: string;
  subTitleColor: string;
  description: string;
  features: {
    icons: Feature[];
    buttons: Button[];
  };
}

interface WhyChooseUsProperties {
  title: string;
  imgUrl: string;
  titleColor: string;
  description: string;
  subtitles: {
    id: number;
    title: string;
    description: string;
  }[];
  design: Design;
}

interface BookingsProperties {
  imgUrl: string;
  title: string;
  titleColor: string;
  subtitle: string;
  subtitleColor: string;
  buttonUrl: string;
  buttonText: string;
  design: Design;
}

interface ReviewsProperties {
  title: string;
  titleColor: string;
  subtitle: string;
  subtitleColor: string;
  url: string;
}

interface ImpactDataProperties {
  data: DataItem[];
  design: Design;
}

interface TeamProperties {
  title: string;
  subTitle: string;
  titleColor: string;
  subtitleColor: string;
  members: Member;
  design: {
    backgroundColor: string;
  };
}

interface ContactProperties {
  title: string;
  subTitle: string;
  titleColor: string;
  subtitleColor: string;
  design: {
    backgroundColor: string;
  };
}

interface SocialProperties {
  twitter: string;
  facebook: string;
  linkedIn: string;
  whatsapp: string;
  instagram: string;
  secondaryWeb: string;
}

interface TransparencyInfo {
  fileUrl: string | undefined;
  description: string;
}

interface FooterProperties {
  info: {
    terms: string;
    transparency: TransparencyInfo;
  };
  social: SocialProperties;
  design: Design;
}

declare interface PublicWebFormData {
  active: boolean;
  templateId: string;
  websiteId: string;
  type: string;
  properties: {
    general: GeneralProperties;
    style: StyleProperties;
    homePage: HomeProperties;
    aboutUs: AboutUsProperties;
    whyChooseUs: WhyChooseUsProperties;
    bookings: BookingsProperties;
    reviews: ReviewsProperties;
    impact: ImpactDataProperties;
    team: TeamProperties;
    contact: ContactProperties;
    footer: FooterProperties;
  };
}

declare type Section<Props> = {
  id: string;
  websiteId: string;
  templateId: string;
  type: string;
  properties: Props;
  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
  active: boolean;
};

interface WebProps {
  team: Team;
  style: Style;
  footer: Footer;
  impact: Impact;
  aboutUs: AboutUs;
  contact: Contact;
  general: General;
  reviews: Reviews;
  bookings: Bookings;
  homePage: HomePage;
  whyChooseUs: WhyChooseUs;
}

interface AboutUs {
  title: string;
  imgUrl: string;
  features: Features;
  subTitle: string;
  titleColor: string;
  description: string;
  subTitleColor: string;
}

interface Features {
  icons: Subtitle[];
  buttons: Button[];
}

interface Button {
  id: number;
  link: string;
  text: string;
}

interface Subtitle {
  id: number;
  url?: string;
  title: string;
  description: string;
}

interface Bookings {
  title: string;
  design: BookingsDesign;
  imgUrl: string;
  subtitle: string;
  buttonUrl: string;
  buttonText: string;
  titleColor: string;
  subtitleColor: string;
}

interface BookingsDesign {
  layout: string;
  backgroundColor: string;
}

interface Contact {
  title: string;
  design: ContactDesign;
  subTitle: string;
}

interface ContactDesign {
  backgroundColor: string;
}

interface Footer {
  info: Info;
  design: FooterDesign;
  social: Social;
}

interface Info {
  terms: string;
  transparency: Transparency;
}

interface Transparency {
  description: string;
}

interface Social {
  twitter: string;
  facebook: string;
  linkedIn: string;
  whatsapp: string;
  instagram: string;
  secondaryWeb: string;
}

interface General {
  url: string;
}

interface HomePage {
  title: string;
  design: FooterDesign;
  subTitle: string;
  mainImage: string;
  titleColor: string;
  subTitleColor: string;
  firstButtonLink: string;
  firstButtonText: string;
  secondButtonLink: string;
  secondButtonText: string;
}

interface Impact {
  data: Datum[];
  design: FooterDesign;
}

interface Datum {
  id: number;
  url: string;
  text: string;
  amount: string;
}

interface Reviews {
  url: string;
  title: string;
  subtitle: string;
  titleColor: string;
  subtitleColor: string;
}

interface Style {
  logo: string;
  menuColor: string;
  buttonColor: string;
  footerColor: string;
  mainTypography: string;
  secondaryTypography: string;
}

interface Team {
  title: string;
  design: FooterDesign;
  members: Member[];
  subTitle: string;
  titleColor: string;
  subtitleColor: string;
}

interface WhyChooseUs {
  title: string;
  design: BookingsDesign;
  imgUrl: string;
  subtitles: Subtitle[];
  titleColor: string;
  description: string;
}

// TODO: enable sytles as they are ready
declare type Layout = "modern"; //| "classic" | "minimalist";

type Image = string | { url: string }[];

declare interface PublicWebFormData {
  active: boolean;
  templateId: string;
  websiteId: string;
  type: string;
  properties: WebProps;
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
  enabled: boolean;
  title: string;
  imgUrl: Image;
  features: Features;
  subTitle: string;
  titleColor: string;
  description: string;
  subTitleColor: string;
  design: {
    layout: "left" | "right";
    backgroundColor: string;
  };
}

interface Features {
  enabled: boolean;
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
  url?: Image;
  title: string;
  description: string;
}

interface Bookings {
  enabled: boolean;
  title: string;
  design: BookingsDesign;
  imgUrl: Image;
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
  titleColor: string;
  subTitle: string;
  subTitleColor: string;
  design: {
    backgroundColor: string;
  };
}
interface Footer {
  info: Info;
  design: {
    backgroundColor: string;
    backgroundImage: Image;
  };
  social: Social;
}

interface Info {
  terms: string;
  transparency: Transparency;
}

interface Transparency {
  description: string;
  accountability: string;
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
  active: boolean;
  url: string;
  templateId: string;
}

interface HomePage {
  title: string;
  design: {
    layout: string;
    backgroundColor: string;
  };
  subTitle: string;
  mainImage: Image;
  titleColor: string;
  subTitleColor: string;
  firstButtonLink: string;
  firstButtonText: string;
  secondButtonLink: string;
  secondButtonText: string;
}

interface Impact {
  enabled: true;
  data: Datum[];
  design: {
    color: string;
    backgroundColor: string;
    backgroundImage: Image;
    cardTextColor: string;
    cardAmountColor: string;
  };
}

interface Datum {
  id: number;
  url: Image;
  text: string;
  amount: string;
}

interface Reviews {
  enabled: true;
  url: string;
  title: string;
  subtitle: string;
  titleColor: string;
  subtitleColor: string;
}

interface Style {
  logo: Image;
  menuColor: string;
  menuTextColor: string;
  buttonColor: string;
  footerColor: string;
  mainTypography: string;
  secondaryTypography: string;
}

interface Team {
  enabled: boolean;
  title: string;
  design: {
    backgroundColor: string;
  };
  members: TeamMember[];
  subTitle: string;
  titleColor: string;
  subtitleColor: string;
}

interface TeamMember {
  id: number;
  picture: Image;
  name: string;
  position: string;
  linkedin: string;
}

interface WhyChooseUs {
  enabled: boolean;
  title: string;
  design: BookingsDesign;
  imgUrl: Image;
  subtitles: Subtitle[];
  titleColor: string;
  description: string;
}

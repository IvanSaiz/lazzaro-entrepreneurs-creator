declare namespace Section {
  // TODO: Check congruency of these types with functionality
  namespace Web {
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
      text: string;
      ammount: string;
      url: { url: string }[];
    };

    type TeamMember = {
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
  }

  namespace Portfolio {
    type Portfolio = {
      id: string;
      ong_id: string;
      title: string;
      description: string;
      img_url: string;
      createdAt: string;
      updatedAt: string;
    };
  }
}

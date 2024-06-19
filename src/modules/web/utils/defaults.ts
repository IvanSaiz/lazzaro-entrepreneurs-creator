export const defaultWebProps: WebProps = {
  general: {
    templateId: "9bdd56dc-edf8-432a-bff4-fb5f2fc0e90c", // Deprecated field
    active: false,
    url: ""
  },
  style: {
    logo: "",
    menuColor: "#000000",
    buttonColor: "#000000",
    mainTypography: "roboto",
    secondaryTypography: "roboto",
    menuTextColor: "#FFFFFF"
  },
  homePage: {
    title: "",
    design: {
      layout: "left",
      backgroundColor: "#EFEFEF"
    },
    subTitle: "",
    mainImage: "",
    // moreImages: [], //TODO: Add to the model and the dto
    titleColor: "#000000",
    subTitleColor: "#000000",
    firstButtonLink: "",
    firstButtonText: "",
    secondButtonLink: "",
    secondButtonText: ""
  },
  aboutUs: {
    enabled: false,
    design: {
      backgroundColor: "#F0F0F0",
      layout: "left"
    },
    title: "",
    imgUrl: "",
    features: {
      enabled: false,
      icons: [],
      buttons: []
    },
    subTitle: "",
    titleColor: "#000000",
    description: "",
    subTitleColor: "#000000"
  },
  whyChooseUs: {
    enabled: false,
    title: "",
    design: {
      layout: "right",
      backgroundColor: "#F0F0F0"
    },
    imgUrl: "",
    subtitles: [],
    titleColor: "#FFFFFF",
    description: ""
  },
  bookings: {
    enabled: false,
    title: "",
    design: {
      layout: "center",
      backgroundColor: "#F0F0F0",
      bannerColor: "#000000"
    },
    imgUrl: "",
    subtitle: "",
    buttonUrl: "",
    buttonText: "",
    titleColor: "#000000",
    subtitleColor: "#FFFFFF"
  },
  reviews: {
    enabled: false,
    url: "",
    title: "",
    subtitle: "",
    titleColor: "#000000",
    subtitleColor: "#000000"
  },
  impact: {
    enabled: false,
    data: [],
    design: {
      backgroundColor: "#FFFFFF",
      backgroundImage: "",
      amountColor: "#000000",
      color: "#000000"
    }
  },
  team: {
    enabled: false,
    title: "",
    design: {
      backgroundColor: "#F0F0F0"
    },
    members: [],
    subTitle: "",
    titleColor: "#000000",
    subtitleColor: "#000000"
  },
  contact: {
    title: "",
    design: {
      backgroundColor: "#EFEFEF"
    },
    subTitle: "",
    subTitleColor: "#000000",
    titleColor: "#000000"
  },
  footer: {
    info: {
      terms: "",
      transparency: {
        accountability: "",
        description: ""
      }
    },
    design: {
      backgroundColor: "#FFFFFF",
      backgroundImage: ""
    },
    social: {
      twitter: "",
      facebook: "",
      linkedIn: "",
      whatsapp: "",
      instagram: "",
      secondaryWeb: ""
    }
  }
};

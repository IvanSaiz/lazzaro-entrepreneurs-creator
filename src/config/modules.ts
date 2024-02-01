export const LZ_MODULES = {
  web: {
    moduleName: "web",
    label: "Web",
    active: true,
    icon: "device-laptop-icon"
  },
  projects: {
    moduleName: "projects",
    label: "Portfolio",
    active: true,
    icon: "clipboard-list-icon"
  },
  shop: {
    moduleName: "shop",
    label: "Tienda",
    active: true,
    icon: "building-store-icon"
    // features: ["market"]
  },
  events: {
    moduleName: "events",
    label: "Eventos",
    active: true,
    icon: "calendar-event-icon",
    features: ["events"]
  },
  // accounts: {
  //   moduleName: "accounts",
  //   label: "Cuentas",
  //   active: true,
  //   icon: "wallet-icon"
  // },
  // partners: {
  //   moduleName: "partners",
  //   label: "Socios",
  //   active: true,
  //   icon: "users-icon",
  //   features: ["partners"]
  // },
  organization: {
    moduleName: "organization",
    label: "Organización",
    active: true,
    icon: "building-warehouse-icon"
  },
  services: {
    moduleName: "services",
    label: "Servicios",
    active: true,
    icon: "file-like-icon"
  },
  blog: {
    moduleName: "blog",
    label: "Blog",
    active: true,
    icon: "browser-icon"
  },
  consultant: {
    moduleName: "consultant",
    label: "Asesor",
    active: true,
    icon: "heart-icon"
  }
  // NFTs: {
  //   moduleName: "NFTs",
  //   label: "NFTs",
  //   active: true,
  //   icon: EthereumIcon
  // },
  // data: {
  //   moduleName: "data",
  //   label: "Datos",
  //   active: true,
  //   icon: "chart-pie-icon",
  //   features: ["impact"]
  // },
  // improve: {
  //   moduleName: "improve",
  //   label: "Mejora",
  //   active: true,
  //   icon: "certificate-icon"
  // }
} as const;

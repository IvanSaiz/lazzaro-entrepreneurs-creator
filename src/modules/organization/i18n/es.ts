export default {
  read: {
    title: "Organización",
    subtitle: "Aquí puedes configurar los datos de tu organización",
    steps: {
      general: "General",
      paymentGateway: "Pasarelas de pago",
      subscription: "Suscripción"
    },
    generalForm: {
      name: "Nombre",
      nif: "NIF",
      phone: "Teléfono",
      address: "Dirección",
      orgType: {
        label: "Tipo de organización",
        options: {
          ong: "ONG",
          foundation: "Fundación",
          company: "Empresa",
          other: "Otro"
        }
      },
      sector: {
        label: "Sector",
        options: {
          children: "Infantil",
          education: "Educación",
          health: "Salud",
          animals: "Animales",
          environment: "Medio Ambiente",
          naturalDisaster: "Catástrofe natural",
          economicDev: "Desarrollo económico",
          other: "Otro"
        }
      },
      currency: "Divisa"
    },
    paymentGateway: {
      chooseYourPaymentMethod: "Elige tu método de pago",
      configurePayment: "Configura aquí tu configuración Paypal",
      configureStripePayment: "Configura aquí tu configuración Stripe",
      paypal: {
        howToOpenAnAccount: "Como abrir una cuenta Paypal para tu ONG",
        howToGetPaypalCredentials:
          'Como obtener el "client" y "secret" de Paypal'
      },
      stripe: {
        sixStepsToConfigureStripe: "Seis pasos para configurar Stripe"
      },
      mollie: {
        howToCreateAnAccount: "Cómo crear una cuenta mollie para su ONG",
        howToGetApiKey: "Cómo obtener la clave Api de la mollie"
      }
    },
    paymentCards: {
      Paypal: {
        features: ["Válido en cualquier país", "Multidivisa"],
        odds: [
          "La integracción tarda varias semanas",
          "Los donantes a veces tienen que registrarse para llevar a cabo el pago",
          "Pagos de socios anuales (no automatizado)"
        ]
      },
      Stripe: {
        features: [
          "Registro para poder usarlo sencillo y rápido",
          "La integracción tarda menos de 10 minutos",
          "Pagos de socios en periodos editables y automatizados",
          "Multidivisa"
        ],
        odds: []
      },
      Mollie: {
        features: [
          "Registro para poder usarlo sencillo y rápido aunque un poco más complicado que Stripe",
          "La integracción tarda menos de 15 minutos",
          "Pagos de socios en periodos editables y automatizados",
          "Multidivisa"
        ]
      },
      button: "Conectar"
    },
    subscriptionForm: {
      description: "Este es el detalle de la suscripción actual",
      options: {
        monthly: "MENSUAL",
        semiannual: "6 MESES",
        yearly: "ANUAL"
      },
      payMethod: {
        label: "Tipo de pago",
        options: {
          card: "Tarjeta"
        }
      },
      cardNumber: "Número de tarjeta",
      tax: "IVA incluido"
    },
    priceText: "{currency} / mes",
    blockAdvise: "Por favor, seleccione un plan antes de continuar.",

    planNames: {
      "Plan Básico Mensual": "Plan Básico Mensual",
      "Plan Básico Semestral": "Plan Básico Semestral",
      "Plan Básico Anual": "Plan Básico Anual",
      "Plan Premium Mensual": "Plan Premium Mensual",
      "Plan Premium Semestral": "Plan Premium Semestral",
      "Plan Premium Anual": "Plan Premium Anual"
    },
    planDescription: {
      "Set-up plataforma": "Set-up plataforma",
      "Funcionalidades de captación activas":
        "Funcionalidades de captación activas",
      "Tecnología blockchain integrada": "Tecnología blockchain integrada",
      "4 sesiones de consultoría personalizada":
        "4 sesiones de consultoría personalizada",
      "Reportes de actividad": "Reportes de actividad",
      "Integración con dominio web": "Integración con dominio web",
      "2 sesiones de consultoría personalizada":
        "2 sesiones de consultoría personalizada",
      "\nReportes de actividad": "\nReportes de actividad",
      "\nIntegración con dominio web": "\nIntegración con dominio web",
      "1 video promocional gratis para redes sociales":
        "1 video promocional gratis para redes sociales",
      "Destacar proyecto": "Destacar proyecto"
    }
  }
};

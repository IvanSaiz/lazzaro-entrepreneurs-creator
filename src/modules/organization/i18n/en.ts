export default {
  read: {
    title: "Company",
    subtitle: "Configure your company details.",
    steps: {
      general: "General",
      paymentGateway: "Payment gateways",
      subscription: "Subscription"
    },
    generalForm: {
      name: "Name",
      nif: "Tax Identification Number",
      phone: "Phone no.",
      address: "Address",
      orgType: {
        label: "Type of organisation",
        options: {
          ong: "NGO",
          foundation: "Foundation",
          company: "Enterprise",
          other: "Other"
        }
      },
      sector: {
        label: "Area",
        options: {
          children: "Children",
          education: "Education",
          health: "Health",
          animals: "Animals",
          environment: "Environment",
          naturalDisaster: "Natural disasters",
          economicDev: "Economic development",
          other: "Other"
        }
      },
      currency: "Currency"
    },
    paymentGateway: {
      chooseYourPaymentMethod: "Choose your payment method",
      configurePayment: "Configure here your Paypal settings",
      configureStripePayment: "Configure here your Stripe settings",
      paypal: {
        howToOpenAnAccount: "How to open a Paypal account for your NGO",
        howToGetPaypalCredentials: "How to get Paypal's client and secret id"
      },
      stripe: {
        sixStepsToConfigureStripe: "Six steps to configure Stripe"
      },
      mollie: {
        howToCreateAnAccount: "How to create a mollie account for your NGO",
        howToGetApiKey: "How to get a mollie Api key"
      }
    },
    paymentCards: {
      Paypal: {
        features: ["Valid in any country", "Multicurrency"],
        odds: [
          "Integration takes several weeks",
          "Donors sometimes have to register to make payments",
          "Annual membership payments not automated"
        ]
      },
      Stripe: {
        features: [
          "Quick and easy registration for use",
          "Integration takes less than 10 minutes",
          "Partner payments in editable and automated periods",
          "Multicurrency"
        ],
        odds: []
      },
      Mollie: {
        features: [
          "Registration to use is simple and quick, although a little more complicated than Stripe",
          "Integration takes less than 15 minutes",
          "Partner payments in editable and automated periods",
          "Multicurrency"
        ]
      },
      button: "Connect"
    },
    subscriptionForm: {
      description: "Your current subscription is",
      options: {
        monthly: "Monthly",
        semiannual: "6 months",
        yearly: "Yearly"
      },
      payMethod: {
        label: "Pay method",
        options: {
          card: "Card"
        }
      },
      cardNumber: "Card no.",
      tax: "TAX included"
    },
    priceText: "{currency} / month",
    blockAdvise: "Please, choose a plan before continuing.",

    planNames: {
      "Plan Básico Mensual": "Monthly Basic Plan",
      "Plan Básico Semestral": "semiannual Basic Plan",
      "Plan Básico Anual": "Annual Basic Plan",
      "Plan Premium Mensual": "Monthly Premium Plan",
      "Plan Premium Semestral": "semiannual Premium Plan",
      "Plan Premium Anual": "Annual Premium Plan"
    },

    planDescription: {
      "Set-up plataforma": "Platform set-up",
      "Funcionalidades de captación activas": "Active donation features",
      "Tecnología blockchain integrada": "Integrated blockchain technology. ",
      "4 sesiones de consultoría personalizada":
        "4 personalized consulting sessions.",
      "Reportes de actividad": "Activity reports",
      "Integración con dominio web": "Integration with web domain.",
      "2 sesiones de consultoría personalizada":
        "2 personalized consulting sessions.",
      "1 video promocional gratis para redes sociales":
        "add 1 free promotioal video for social media",
      "Destacar proyecto": "Highlight Project"
    }
  }
};

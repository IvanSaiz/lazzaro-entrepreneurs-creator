export default {
  recover: {
    title: "Recover your password",
    resetTitle: "reset your password",
    resetDetails: "Set your new password",
    completedTitle: "Password updated successfully",
    completedDetails: "You can now go to the login and access your account",
    details:
      "Enter your email and we will send you an email to recover your password",
    completed:
      "We have sent you an email to your email to complete the process.",
    form: {
      email: "Email",
      password: "Password",
      repeatPassword: "Repeat password"
    },
    errors: {
      wrongCredentials: "The access data is not correct."
    }
  },
  signin: {
    access: "Login",
    accessWebsite: "Access your website and enjoy!",
    haveAccount: "Already have an account?",
    title: "Access your website",
    rememberPassword: "I forgot my password",
    form: {
      email: "Email Address",
      password: "Password"
    },
    errors: {
      wrongCredentials: "Wrong email or password!"
    }
  },
  signup: {
    title: "Don't have an account yet?",
    subtitle: "Create your Website and enjoy!",
    modal: {
      message:
        "In order to finish the registration process, it is necessary to enter the verification code that we have sent by SMS:",
      verifCode: "Verification code"
    },
    createWeb: "Create your Web",
    form: {
      firstName: "Name",
      lastName: "Surname",
      mobilePhone: "Phone number",
      name: "Company name",
      choose: "Choose",
      gender: {
        label: "Gender",
        man: "Man",
        woman: "Woman",
        other: "Other"
      },
      organizations: {
        label: "Type of organization",
        none: "None"
      },
      password: "Password",
      repeatPW: "Repeat password",
      email: "Email address",
      terms: "I accept the terms and conditions",
      acceptTerms: "Accept terms and conditions",
      dni: "DNI",
      cif: "CIF"
    },
    createBtn: "Sign up",
    notifications: {
      required: "Phone no is required",
      matches: "Invalid phone format",
      success: "User successfully validated",
      failCode: "Invalid code"
    }
  },
  onboarding: {
    steps: {
      stepWelcome: "Welcome",
      stepTools: "Choose the tools",
      stepStyle: "Define your identity",
      stepSubscription: "Choose your plan"
    },
    stepWelcome: {
      title: "Welcome",
      subtitle:
        "Your digital adventure has already begun, in just a few minutes you will have your website set up."
    },
    stepTools: {
      title: "Your tools",
      subtitle: "Select the tools you want to create your portal with",
      tools: {
        portfolio: "Portfolio",
        shop: "Shop",
        events: "Events",
        services: "Services",
        reviews: "Reviews",
        bookings: "Bookings"
      },
      notifications: "Tools successfully added"
    },
    stepStyle: {
      title: "Your style",
      subtitle: "Define what makes you different",
      form: {
        logo: {
          label: "Upload your logo",
          help: "Add a png or jpg image."
        },
        textColour: "Choose text colour",
        buttonColour: "Choose button colour",
        style: "Choose your style",
        styleOptions: {
          classic: "Classic",
          modern: "Modern",
          minimalist: "Minimalist"
        }
      },
      successIdentity: "Identity successfully added"
    }
  }
};

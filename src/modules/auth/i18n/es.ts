export default {
  recover: {
    title: "Recupera tu contraseña",
    resetTitle: "Restablece tu contraseña",
    resetDetails: "Establece tu nueva contraseña",
    completedTitle: "Contraseña actualizada correctamente",
    completedDetails: "Ya puedes ir al login y acceder a tu cuenta",
    details:
      "Introduce tu email y te enviaremos un correo para recuperar tu contraseña",
    completed:
      "Te hemos enviado un email a tu correo electrónico para completar el proceso.",
    form: {
      email: "Correo electrónico",
      password: "Contraseña",
      repeatPassword: "Repetir contraseña"
    },
    errors: {
      userNotFound: "No se ha encontrado una cuenta asociada a este correo."
    }
  },
  signin: {
    access: "Accede",
    accessWebsite: "¡Accede a tu Web y disfruta!",
    haveAccount: "¿Ya tienes cuenta?",
    title: "Accede a tu Web",
    rememberPassword: "He olvidado mi contraseña",
    form: {
      email: "Correo Electrónico",
      password: "Contraseña"
    },
    errors: {
      wrongCredentials: "Los datos de acceso no son correctos."
    }
  },
  signup: {
    title: "¿Aún no tienes cuenta?",
    subtitle: "¡Crea tu Web y disfruta!",
    modal: {
      message:
        "Para poder finalizar con el proceso de registro es necesario que introduzca el código de verificación que hemos enviado por SMS:",
      verifCode: "Código de verificación"
    },
    createWeb: "Crea tu Web",
    form: {
      firstName: "Nombre",
      lastName: "Apellidos",
      mobilePhone: "Teléfono móvil",
      name: "Nombre de la organización",
      choose: "Elige",
      gender: {
        label: "Género",
        man: "Hombre",
        woman: "Mujer",
        other: "Otro"
      },
      organizations: {
        label: "Nombre de la organización",
        none: "Ninguno"
      },
      password: "Contraseña",
      repeatPW: "Repetir contraseña",
      email: "Correo electrónico",
      terms: "términos y condiciones",
      acceptTerms: "Acepto los términos y condiciones",
      ndi: "DNI",
      cif: "CIF"
    },
    createBtn: "Regístrate",
    notifications: {
      required: "Teléfono es requerido",
      matches:
        "Formato de teléfono inválido, debe ser del formato +XXXXXXXXX",
      success: "Usuario validado con éxito",
      failCode: "Código no válido",
      error: "Ha ocurrido un error",
      emailExists: "Ya existe una cuenta con este email",
      companyExists: "Ya existe una empresa con este nombre",
      duplicateCIF: "Ya existe una empresa con este CIF"
    }
  },
  onboarding: {
    steps: {
      stepWelcome: "Bienvenido",
      stepTools: "Elige las herramientas",
      stepStyle: "Define tu identidad",
      stepSubscription: "Elige tu plan"
    },
    stepWelcome: {
      title: "Bienvenido",
      subtitle:
        "Tu aventura digital ya ha comenzado, en pocos minutos tendrás configurada tu web"
    },
    stepTools: {
      title: "Tus herramientas",
      subtitle:
        "Selecciona las herramientas con las que quieres crear tu portal",
      tools: {
        portfolio: "Portfolio",
        shop: "Tienda",
        events: "Eventos",
        services: "Servicios",
        reviews: "Reseñas",
        bookings: "Reservas"
      },
      notifications: "Herramientas añadidas con éxito"
    },
    stepStyle: {
      title: "Tu estilo",
      subtitle: "Define lo que te hace diferente",
      form: {
        logo: {
          label: "Sube tu logo",
          help: "Añade una imagen en png o jpg."
        },
        textColour: "Elige color para el texto",
        buttonColour: "Elige color para los botones",
        style: "Escoge tu estilo",
        styleOptions: {
          classic: "Clásico",
          modern: "Moderno",
          minimalist: "Minimalista"
        }
      },
      successIdentity: "Identidad añadida con éxito"
    }
  }
};

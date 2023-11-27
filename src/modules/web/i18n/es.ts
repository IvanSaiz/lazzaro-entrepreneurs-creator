export default {
  public: {
    title: "Web pública",
    subtitle: "Configura aquí tu web pública",
    generalForm: {
      title: "General",
      publicate: "Publicar web",
      status: {
        label: "Estado de la publicación",
        options: {
          enabled: "Activado",
          disabled: "Desactivado"
        }
      },
      seeWeb: "Ver web",
      url: "URL de tu portal",
      powered: {
        title: 'Quitar "Powered by Lázzaro" del pie de página',
        under: "Se mostrará el mensaje al final de la web",
        options: {
          enabled: "Activado",
          disabled: "Desactivado"
        }
      }
    },
    logosForm: {
      title: "Logos",
      subtitle:
        "Hemos dejado este espacio para que añadas logos de cosas chulas",
      logo: {
        label: "Logotipo",
        help: "180x60, máx 25MB",
        limit: "No puedes agregar más de 10 logos",
        delete: "Logotipo eliminado correctamente",
        error: "Error al eliminar el logotipo"
      }
    },
    chooseTemplate: {
      title: "Plantilla",
      template1: "Moderna",
      template2: "Clásica",
      modalText: "Minimalista",
      templateChangeModal: {
        title: "La plantilla está siendo cambiada.",
        subtitle:
          "¡Genial, vas a ver la nueva plantilla! esto puede tardar unos minutos. Es el momento perfecto para preparar el café."
      }
    },

    googleAnalytics: {
      title: "ID Google Analytics"
    },

    websiteStatus: {
      publishWebsite: {
        title: "Estamos publicando tu web, esto puede tardar hasta 5 minutos.",
        subtitle:
          'Recuerda que puedes volver a ocultarla otra vez cuando quieras pulsando el mismo botón y dándole a "guardar"'
      },

      unpublishWebsite: {
        title: "Estamos ocultando tu web, esto puede tardar hasta 5 minutos.",
        subtitle:
          "Recuerda que puedes volver a publicarla cuando quieras clicando el mismo botón y después dándole al botón “guardar”."
      }
    },
    brandForm: {
      title: "Marca",
      logo: {
        label: "Logotipo",
        help: "180x60, máx 25MB"
      },
      mainImg: {
        label: "Imagen principal",
        help: "180x60, máx 25MB"
      },
      orgName: "Nombre de la organización",
      colour: {
        first: "Color destacado 1",
        second: "Color destacado 2"
      }
    },
    contactForm: {
      title: "Formulario de contacto",
      subtitle:
        "Permite que un posible cliente pueda ponerse en contacto contigo. Configura el título y subtítulo de tu página de contacto",
      phone: "Teléfono",
      location: "Ubicación"
    },
    contentForm: {
      title: "Contenido",
      subtitle:
        "Selecciona qué secciones quieres que aparezcan en tu web pública.",
      sectionStatus: {
        title: "Estado de la sección",
        options: {
          enabled: "Activado",
          disabled: "Desactivado"
        }
      },
      projects: "Proyectos",
      donations: "Donaciones",
      partners: "Socios",
      market: "Tienda online",
      courses: "Cursos",
      reviews: "Reseñas",
      impact: "Datos de impacto",
      events: "Eventos",
      volunteers: "Voluntarios"
    },
    footer: {
      title: "Footer",
      subtitle:
        "Permite que un posible cliente pueda ponerse en contacto contigo.",
      socialForm: {
        title: "Redes sociales",
        facebook: "Link de Facebook",
        twitter: "Link de Twitter",
        whatsapp: "Link de Whatsapp",
        linkedin: "Link de LinkedIn",
        web: "Link de Web Secundaria",
        instagram: "Link de Instagram"
      },
      termsForm: {
        title: "Términos y condiciones, aviso legal y política de privacidad",
        add: "Seleccionar archivos",
        terms:
          "Sube tus términos y condiciones, aviso legal y política de privacidad para que tus usuarios las acepten",
        transparencyDescription: "Descripción de transparencia",
        accountability: "Transparencia y rendición de cuentas"
      }
    },

    teamForm: {
      title: "Equipo",
      subtitle: "Muestra a todo el mundo de que tipo de pasta estás hecho.",
      header: {
        title: "Título",
        subtitle: "Subtítulo",
        titleHelperText: "(Máx 80 caracteres)",
        subtitleHelperText: "(Máx 180 caracteres)"
      },
      teamMembers: {
        title: "Miembros del equipo",
        subtitle:
          "Crea el perfil de cada uno de los integrantes de tu empresa. Con el link a su Linkedin será mucha más fácil darle visibilidad a ellos y la empresa."
      },
      photo: {
        label: "Foto de perfil",
        help: "180x60, máx 25MB"
      },
      name: "Nombre y apellidos",
      position: "Cargo",
      linkedin: "Link a LinkedIn",
      newMember: "Añadir miembro",
      table: "Tu equipo",
      delete: ""
    },

    descriptionForm: {
      title: "Descripción",
      subtitle:
        "Acompaña la web de una descripción de tu organización, de tu visión, de tu misión y de tus valores.",
      motto: {
        label: "Lema de la organización",
        help: "Máx. 40 caracteres."
      },
      description: "Descripción corta de la organización",
      titleDescription: {
        label: "Título de la descripción",
        help: "Máx. 40 caracteres."
      },
      secondaryImg: {
        label: "Imagen secundaria",
        help: "180x60, máx 25MB"
      },
      largeDescription: "Descripción larga"
    },

    personalizeWebForm: {
      title: "Personaliza tu web",
      subtitle: "Elige los elementos que encajan contigo",
      form: {
        logo: "Logotipo*",
        mainTypography: "Tipografía principal",
        secondTypography: "Tipografía secundaria",
        fonts: {
          label: "Font",
          roboto: "Roboto",
          arial: "Arial",
        },
        buttonsColor: "Color botones",
        menuColor: "Color menú",
        footerColor: "Color Footer",
        logoHelper: "60x60. Máx 25MB"
      }
    },

    homepageForm: {
      title: "Portada",
      subtitle: "Las primeras impresiones son las que importan",
      form: {
        image: "Imagen principal*",
        title: "Título",
        subtitle: "Subtítulo",
        imageHelper: "180x60. Máx 25MB",
        titleHelper: "(Máx 80 characters)",
        subtitleHelper: "(Máx 140 characters)",
        buttons: {
          1: "Boton 1*",
          2: "Boton 2*"
        },
        links: {
          1: "Link Botón 1*",
          2: "Link Botón 2*"
        }
      }
    },

    whoWeAreForm: {
      title: "Quienes somos",
      subtitle: "Muestra lo que haces al mundo",
      form: {
        image: "Imagen principal**",
        title: "Título",
        subtitle: "Subtítulo",
        imageHelper: "180x60. Máx 25MB",
        titleHelper: "(Máx 80 caracteres)",
        subtitleHelper: "(Máx 140 caracteres)",
        description: "Descripción*"
      },
      features: {
        title: "Características de la empresa",
        icon: {
          1: "Icon 1",
          2: "Icon 2",
          3: "Icon 3",
          4: "Icon 4",
          help: "60x60. Max 25MB"
        },
        titles: {
          1: "Title 1*",
          2: "Title 2*",
          3: "Title 3",
          4: "Title 4",
          helper: "(Max 30 characters)"
        },
        descriptions: {
          1: "Descriptive text 1*",
          2: "Descriptive text 2*",
          3: "Descriptive text 3",
          4: "Descriptive text 4"
        },
        button: "Button",
        link: "Link of the button"
      }
    },

    whyChooseUsForm: {
      title: "¿Por qué elegirnos?",
      subtitle: "Escribe aquí lo que te diferencia del resto",
      image: "Imagen principal*",
      imageHelperText: "180x60. Máx 25MB",
      formTitle: "Título",
      titleHelperText: "(Máx 80 caracteres)",
      description: "Descripción*",
      titles: {
        1: "Título 1*",
        2: "Título 2*",
        3: "Título 3",
        4: "Título 4",
        helper: "(Máx 30 caracteres)"
      },
      descriptions: {
        1: "Texto descriptivo 1*",
        2: "Texto descriptivo 2*",
        3: "Texto descriptivo 3",
        4: "Texto descriptivo 4"
      }
    },

    bookingsForm: {
      title: "Reservas",
      subtitle:
        "Dá la oportunidad a tus usuarios a que puedan reunirse contigo.",
      image: "Imagen",
      formTitle: "Título",
      formSubtitle: "Subtítulo*",
      imageHelper: "180x60. Máx 25MB",
      titleHelper: "(Máx 80 caracteres)",
      subtitleHelper: "(Máx 140 caracteres)",
      button: "Botón* ",
      link: "Link a tu página de reserva*"
    },

    reviewsForm: {
      title: "Reseñas",
      subtitle:
        "Vincula tu web con tu perfil de Google y permite que tus usuarios vean tus reseñas.",
      formTitle: "Título",
      formSubtitle: "Subtítulo",
      titleHelper: "(Máx 80 caracteres)",
      subtitleHelper: "(Máx 140 caracteres)",
      link: "Link a tu perfil de Google My Business*"
    },

    impactForm: {
      title: "Datos de impacto",
      subtitle: "Modifica los datos de impacto visibles en la web.",
      icon: {
        1: "Icono 1",
        2: "Icono 2",
        3: "Icono 3",
        4: "Icono 4",
        help: "60x60. Máx 25MB"
      },
      text: {
        1: "Texto impacto 1",
        2: "Texto impacto 2",
        3: "Texto impacto 3",
        4: "Texto impacto 4"
      },
      amount: {
        1: "Cantidad impacto 1",
        2: "Cantidad impacto 2",
        3: "Cantidad impacto 3",
        4: "Cantidad impacto 4"
      }
    },
    notify: {
      success: "Cambios guardados con éxito",
      error: "Ha ocurrido un error al guardar"
    }
  }
};

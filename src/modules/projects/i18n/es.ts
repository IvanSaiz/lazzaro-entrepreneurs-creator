export default {
  read: {
    title: "Proyectos",
    subtitle: "Todos tus proyectos de recaudación",
    table: {
      name: "Nombre",
      time: {
        label: "Tiempo restante",
        options: {
          days: "Días",
          today: "Hoy",
          expired: "Expirado",
          noLimit: "Sin límite"
        }
      },
      percent: "% conseguido",
      total: "Total",
      status: {
        label: "Estado",
        options: {
          enabled: "ACTIVADO",
          disabled: "DESACTIVADO"
        }
      },
      actions: "Acciones"
    },
    newProject: "Nuevo proyecto"
  },
  create: {
    title: "Nuevo proyecto de recaudación",
    subtitle:
      "Configura aquí tu proyecto. Para cualquier duda o consulta contacta con tu asesor.",
    highlight: {
      label: "Destacar proyecto",
      under: "Proyecto destacado"
    },
    mainImg: "Imagen principal",
    images: {
      label: "Imágenes",
      add: "Añadir imagen"
    },
    form: {
      name: "Nombre del proyecto",
      description: "Descripción",
      category: {
        label: "Categoría",
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
      status: {
        label: "Estado",
        options: {
          enabled: "Activado",
          disabled: "Desactivado"
        }
      },
      startDate: "Fecha de inicio",
      limitDate: {
        label: "Fecha final",
        help: "Puede dejarlo sin fecha final"
      },
      amount: "Cantidad objetivo"
    },
    notifications: {
      projectCreated: "Proyecto creado con éxito",
      projectEdited: "Cambios guardados con éxito",
      projectRemoved: "Proyecto eliminado con éxito",
      alreadyPremium: "ya tienes una sección destacada",
      projectHasDonations:
        "No puedes eliminar este proyecto porque ha recibido donaciones"
    }
  }
};

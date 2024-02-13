export default {
  read: {
    title: "Portfolio",
    subtitle: "Todos tus proyectos para mostarlos a tus potenciales clientes.",
    see: "Ver portfolio",
    design: "Diseño",
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
      skills: "Competencias",
      status: {
        label: "Estado",
        options: {
          enabled: "Activado",
          disabled: "Desactivado"
        }
      },
      actions: "Acciones"
    },
    deleteModal: {
      title: "Eliminar proyecto",
      subtitle:
        "¿Estás seguro de que quieres eliminar este proyecto? Esta acción no se puede deshacer."
    },
    newProject: "Nuevo proyecto"
  },
  create: {
    title: "Nuevo proyecto",
    subtitle:
      "Rellena todos los datos de tus proyectos ya realizados y muestra tu trabajo en tu web.",
    mainImg: {
      label: "Imagen principal",
      maxSize: "Tamaño máximo: 100MB",
      suportedFormats: "Archivos aceptados: JPG, PNG y GIF."
    },
    images: {
      label: "Imágenes",
      add: "Añadir imagen"
    },
    form: {
      name: "Nombre del proyecto",
      description: {
        label: "Descripción",
        subtitle:
          "La decripción se incluirá en la página de detalles del proyecto debajo de las imágenes."
      },
      date: "Fecha",
      skills: "Destrezas",
      status: {
        label: "Estado",
        options: {
          enabled: "Activado",
          disabled: "Desactivado"
        }
      }
    }
  },
  notifications: {
    projectCreated: "Proyecto creado con éxito",
    projectEdited: "Cambios guardados con éxito",
    projectRemoved: "Proyecto eliminado con éxito",
    alreadyPremium: "ya tienes una sección destacada",
    projectHasDonations:
      "No puedes eliminar este proyecto porque ha recibido donaciones"
  }
};

export default {
  read: {
    title: "Calendario · Eventos y formaciones",
    subtitle:
      "Crea eventos o cursos en el calendario o formaciones sin fecha de caducidad",
    createNewBtn: "Crear nuevo"
  },
  create: {
    title: "Nuevo evento o formación",
    subtitle:
      "Configura aquí tu proyecto. Para cualquier duda o consulta contacta con tu asesor.",
    generalForm: {
      title: "General",
      mainImg: "Imagen principal",
      images: {
        label: "Imágenes",
        add: "Añadir imagen"
      },
      name: "Nombre",
      description: "Descripción",
      type: "Tipo",
      typeOptions: {
        event: "Evento",
        training: "Formación"
      },
      mode: "Medio",
      modeOptions: {
        onsite: "Presencial",
        online: "Online"
      },
      status: "Estado",
      statusOptions: {
        draft: "Borrador",
        active: "Activo"
      }
    },
    dateForm: {
      title: "Fechas",
      startInscription: "Inicio de inscripciones",
      endInscription: "Fin de inscripciones",
      startEvent: "Inicio del evento",
      endEvent: "Fin del evento",
      recurrent: {
        label: "¿Es recurrente?",
        under: "Evento recurrente"
      },
      frequency: {
        label: "¿Qué frecuencia tiene?",
        options: {
          weekly: "Semanal",
          monthly: "Mensual",
          annual: "Anual"
        }
      }
    },
    locationForm: {
      title: "Acceso / Ubicación",
      link: "Link del acceso",
      location: "Añade la URL de acceso o localización"
    },
    ratesForm: {
      title: "Tarifas",
      amount: "Cantidad",
      cost: "Precio",
      name: "Nombre",
      rateTable: "Tabla de tarifas",
      delete: ""
    },
    notifications: {
      createdEvent: "Evento creado con éxito",
      editedEvent: "Evento actualizado con éxito",
      removedEvent: "Evento eliminado con éxito"
    },
    highlight: {
      label: "Destacar evento",
      under: "Evento destacado"
    }
  }
};

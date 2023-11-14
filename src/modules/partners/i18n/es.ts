export default {
  read: {
    title: "Socios & Donaciones",
    subtitle:
      "Listado de socios de la organización y la configuración de las donaciones",
    steps: {
      partners: "Socios",
      types: "Tipos de donaciones"
    },
    partnersFields: {
      form: {
        name: "Nombre",
        email: "Email",
        amount: "Cantidad",
        status: "Estado",
        date: "Fecha de alta",
        actions: ""
      }
    },
    form: {
      category: "Nombre de categoría",
      partnerType: {
        label: "Período de facturación",
        options: {
          partner: "Socio"
        },
        annualAmount: "Cantidad",
        period: {
          oneMonth: "Mensual",
          oneYear: "Anual"
        }
      }
    },
    donations: {
      title: "Tipos de donaciones de socios",
      form: {
        name: "Nombre",
        price: "Precio",
        period: "Período de facturación",
        actions: ""
      },
      status: "Activo"
    },
    other: {
      label: "Deja al donante decidir cuánto donar",
      under: "Todas las cantidades a elegir son fijas"
    },
    notifications: {
      deleteDonation: "Donación eliminada con éxito",
      createDonation: "Donación creada con éxito"
    }
  },
  detail: {
    title: "Perfil del socio",
    subtitle: "Aquí tienes todos los datos de contacto del socio",
    form: {
      image: "Foto de perfil",
      name: "Nombre",
      birthDay: "Fecha de nacimiento",
      surname: "Apellidos",
      email: "Email",
      phone: {
        label: "Teléfono",
        message: "Formato de teléfono inválido"
      },
      address: "Dirección",
      dni: "DNI",
      date: "Fecha de adhesión",
      status: {
        label: "Estado",
        options: {
          active: "Activo",
          inactive: "Inactivo"
        }
      },
      amount: "Cantidad",
      comunications: "Comunicaciones"
    },
    yes: "Si",
    no: "No",
    deletePartner: "Eliminar socio",
    notifications: {
      projectRemoved: "Proyecto eliminado con éxito"
    }
  }
};

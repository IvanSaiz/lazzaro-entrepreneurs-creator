export default {
  read: {
    title: "Cuentas",
    subtitle: "Aquí puedes ver todos los movimientos generados en tu portal",
    steps: {
      all: "Todos",
      projects: "Proyectos",
      events: "Eventos",
      courses: "Formaciones",
      single: "Donaciones",
      donations: "Donaciones",
      products: "Productos",
      subscriptions: "Suscripciones",
      columns: {
        name: "Nombre",
        email: "Correo",
        amount: "Cantidad",
        state: "Estado",
        certificate: "Certificado",
        date: "Fecha",
        event: "Evento",
        course: "Curso",
        project: "Proyecto",
        item: "Producto"
      }
    },
    modal: {
      title: "¿Cuánto dinero quieres retirar?",
      subtitle: `El dinero recaudado en tu portal Lázzaro irá a la cuenta configurada en el perfil de tu
        <br> organización. El 5% del mismo será descontado.`,
      available: "disponibles",
      collected: "€ recaudados - 5% de Lázzaro",
      warn:
        "Para realizar la retirada de fondos, se debe realizar desde tu cuenta de Paypal asociada. Por favor, pulsa en retirar para poder acceder."
    },
    notifications: {
      withdrawSuccess: "Dinero retirado con éxito"
    }
  }
};

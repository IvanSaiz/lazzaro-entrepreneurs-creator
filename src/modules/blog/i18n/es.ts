export default {
  read: {
    title: "Blog",
    subtitle: "Configura tu blog",
    content: {
      title: "Artículos",
      subtitle: "Crea tus artículos"
    },
    table: {
      headers: {
        title: "Artículo",
        status: "Estado",
        date: "Publicado",
        actions: "Acciones"
      },
      item: {
        status: {
          enabled: "Activado",
          disabled: "Desactivado"
        }
      }
    },
    newArticle: "Nuevo artículo"
  },
  create: {
    title: "Crear artículo",
    subtitle: "Crea un nuevo artículo",
    form: {
      article: "Artículo",
      title: "Título",
      subtitle: "Las primeras impresiones son las que importan",
      description: "Descripción",
      mainImg: "Imagen",
      status: "Estado",
      publish: "Publicar",
      submit: "Guardar",
      cancel: "Cancelar",
      delete: "Eliminar"
    },
    notifications: {
      created: "Artículo guardado con éxito",
      deleted: "Artículo eliminado con éxito"
    },
    modal: {
      title: "Eliminar artículo",
      content: '¿Seguro que quieres eliminar el articulo "{title}"?',
      cancel: "Cancelar",
      delete: "Eliminar"
    }
  }
};

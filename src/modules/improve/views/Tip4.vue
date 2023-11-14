<template lang="pug">
  .improve-tip
    header
      h1 Sección web
      p Personaliza tu plataforma web

    .improve-tip__body
      p Es momento de redecorar y personalizar la manera en la que se ve nuestra página en Lázzaro:
      p En 4ª posición de arriba hacia abajo, en el menú de la izquierda, encontramos un botón llamado Web. Al hacer clic en él, aparecerá la siguiente pantalla:

      img(src="./img/C4.png")

      p Veamos las secciones

      h2 General

      p Puede que una de las áreas más importantes:
      p ¿Publicar Web? Este botón cambia entre que tu página sea pública o no. Si el puntito negro está a la derecha, significa que está publicada y que se puede ver. De lo contrario, no será posible encontrar su web de Lázzaro.
      p Para previsualizar la web, a la derecha, tenemos un link que pone Ver Web. Nos será muy útil para ir viendo los cambios que vamos haciendo.
      p Personalizar tu URL es una buena estrategia, para posicionamiento y claridad y también a nivel personalización corporativa, da más confianza y es más fácil de recordar y compartir.
      p Esto junto a quitar la marca de “powered by Lázzaro” del pié de página, son funcionalidades premium a considerar. 
      h2 Marca  
      h3 Logotipo
      p Preferiblemente en formato cuadrado con una proporción de:
      p tamaño máx de archivo, resolución recomendable: 180x60 - 25MB
      p formatos admitidos: JPG, PNG
      h3 Imagen principal
      p Esto sería como la cabecera de Facebook u otra red social.
      p tamaño máx de archivo, resolución recomendable: JPG, PNG
      p formatos admitidos: 180x60 - 25MB
  
      h3 Nombre de la organización
      p Vuestro nombre por el que se os conoce. Aunque legalmente la asociación esté constituida como Fundación Menganita y Zutanito, si el nombre comercial es Ayudando a Ayudar, es este último el que debemos poner en el apartado nombre de la organización.

      h3 Color destacado 1
      p Aquí elegimos los colores de los botones principales 

      h3 Color Destacado 2
      p Aquí elegimos el color de los puntos destacados de una lista y otros pequeños detalles.

      h2 Contacto
      h3 Teléfono
      p Sería conveniente poner el código de país: +34 en el caso de España antes del resto de la numeración.

      h3 Ubicación
      p Aquí pondremos la dirección principal de su oficina.

      h3 Contenido
      p Aquí seleccionaremos las secciones que queremos habilitar, recuerda: bolita negra a la derecha = activado, en blanco y a la izquierda = desactivado.

      h2 Redes sociales
      h3 Link de Facebook
      ol
        li Inicia sesión en tu perfil/página.
        li En la parte superior derecha de la pantalla podrás ver donde dice Perfil. Haz clic en esta opción.
        li Selecciona Copiar acceso directo o Copiar ubicación de enlace. Pégalo aquí :) Listo.
      
      h3 Link de Linkedin
      ol
        li 1. Haz clic en el icono de Yo , en la parte superior de tu página de inicio de LinkedIn.
        li 2. Haz clic en Ver perfil.
        li 3. En tu página de perfil, haz clic en la derecha para Editar URL y perfil público.
        li 4. En la sección Editar URL, a la derecha, busca la URL de tu perfil público. Será una dirección que comienza con www.linkedin.com/in.
        li 5. Copia y pega este enlace para compartirlo con otras personas.

      h3 Link de Instagram
      p Desde un ordenador:
      p Para copiar la URL de tu publicación simplemente tienes que hacer lo siguiente:
      ol
        li Entra a tu perfil.
        li Busca la imagen con la que has participado.
        li Haz clic en la imagen, cuando hagas esto se desplegará la imagen con su descripción y notarás que la url ha cambiado, por favor copia dicha dirección ya que esta es la url que necesitas para validar tu publicación.

      p Desde la app:
      ol
        li Desde tu celular entra a la app de Instagram.
        li Busca la imagen con la que participaste.
        li Haz "tap" en los 3 puntos que aparecen en la parte superior derecha de la imagen y selecciona "compartir".
        li Se mostrará una lista de opciones donde seleccionaremos "Copiar URL".

      h3 Link de Twitter
      p Para encontrar tu URL de Twitter:
      ol
        li Inicia sesión en el sitio web de Twitter.
        li Después de iniciar sesión, aparece tu fuente de noticias. Selecciona "Ver mi página de perfil", que se encuentra cerca de tu nombre y foto de perfil.
        li Echa un vistazo a la dirección web en la barra de direcciones de tu navegador. Esta es tu URL de Twitter. Copia el enlace y pégalo aquí.

      h2 Términos y condiciones
      p Sube tu PDF o .DOCX donde especifiques estos detalles. Es recomendable tener este documento bien actualizado y si hace falta que te asesores legalmente.

      h2 Equipo
      p ¡Aquí estará tu equipo! A sacar fotos donde salgáis guapos.
      p Recuerda darle a “añadir miembro” para guardar los datos que has introducido.
      p Abajo aparecen listados, en la “x” de la derecha puedes quitar miembros de esta lista.

      h2 Descripción
      p Aquí puedes poner cómo te defines, La misión de una ONG o empresa describe la actividad. Dicha identidad es clave en la organización para el logro de su visión, que son las metas o logros que constituyen la razón de ser de la ONG o empresa.
      p ¡Y llegamos al botón de guardar final!

</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";

  @Component({})
  export default class Tip2 extends Vue {}
</script>

<style lang="scss" scoped>
  section {
    min-height: 100%;
    min-width: 100%;

    @import "../scss/tip.scss";
  }
</style>

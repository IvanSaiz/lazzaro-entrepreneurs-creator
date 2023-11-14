<template lang="pug">
  .improve-tip
    header
      h1 Tienda online
      p Las ventajas de una tienda online son enormes

    .improve-tip__body
      p El “alquiler” del espacio es mucho más económico, llegas a todo el mundo, está abierta las 24 horas del día, recibir pagos a distancia… En fin, muchos beneficios y vamos a aprender a configurar nuestra propia tienda online con Lazzaro. ¡Vamos!
      p Para empezar nos dirigimos al menú lateral y hacemos clic en Tienda.
      p Y nos aparecerá una vista similar a esta:

      img(src="./img/C22.png")

      h3 Nombre del producto
      p El nombre del producto ha de ser descriptivo y fácil de buscar, que se relacione con la imágen, ¿Cómo buscaría este producto su donante?
      p Por ejemplo, si quisiéramos vender unas mascarillas personalizadas con obras de artistas para ayudar con las donaciones a niños y jóvenes en situación de vulnerabilidad, podemos ser originales y ponerles un nombre como Kidscarillas o MascArillas o cualquier otra cosa.
      p Pero lo mejor sería poner “Mascarillas con estampado artístico” ya luego en la descripción es otra cosa.

      img(src="./img/C23.png")

      h3 Descripción
      p En la descripción debemos concretar de qué producto vendemos y para qué vale, materiales, etc. Aquí nos podemos extender un poco más en cuanto a detalles, peso, un buen consejo en general es ponerse en la piel del que va a comprar ¿qué preguntas espera responder del producto? ¿Resuelve esta descripción las preguntas?

      img(src="./img/C24.png")

      h3 Información destacada
      p En relación a lo de antes, tenemos que pensar qué información puede ser más relevante: material con que está hecho, procedencia, contiene piezas pequeñas, alérgenos, inflamable, mantenga alejado del alcance de los niños, explosivo, radioactivo… (bueno, esperemos que no haya muchos de esto último, pero básicamente si el dato es importante, ponlo aquí).

      img(src="./img/C25.png")

      h3 Stock, Estado y Descuento

      img(src="./img/C26.png")

      h4 Stock
      p Es el número de unidades de producto que tenemos, así cuando se estén agotando las unidades nos mandará un aviso e incluso los clientes podrán estar informados en tiempo real.

      h4 Estado
      p No se refiere a la forma de gobierno sino al estado en el que se encuentra. Los posibles estados son disponible o no disponible.

      h4 Descuento
      p Aquí facilitamos las opciones, no es un campo obligatorio pero puede ayudar a impulsar las ventas en algún momento, En caso de tener algún tipo de descuento, se puede añadir en este campo.

      h4 Imagen
      p Una buena iluminación y encuadre son importantes. Lo ideal es que sea sin fondo o con fondo blanco. Hay varios programas gratuitos para editar fotos, ¡Algunos incluso desde el teléfono móvil!
      p Añade unas imágenes del producto en cuestión, en los formatos que son compatibles para su correcta visualización y que sean descriptivas.
      p Si quieres destacar tu proyecto y que aparezca en portada, podrás hacerlo con tu suscripción premium.
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

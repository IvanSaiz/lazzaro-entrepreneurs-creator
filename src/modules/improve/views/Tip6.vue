<template lang="pug">
  .improve-tip
    header
      h1 Socios
      p Tipos de socio

    .improve-tip__body
      p Aquí podemos establecer los niveles o categorías de membresía de nuestros socios y su coste, vamos a verlo:
      p Para ello nos vamos a Socios en el menú:

      img(src="./img/C6.png")

      p Y vemos que en la barrita verde donde pone Socios y Tipos de Socio, le damos a este último y vemos como la pantalla cambia y el puntito verde se va con esta palabra.
      p Por ejemplo si yo quisiera crear tres niveles de membresía, pondría lo siguiente para cada tipo de membresía, algo así como:
      p Nombre: Oro; Tipo: Socio; Cantidad: 50€
      p Y apretaría el botón de crear, repetiría la acción con todos los tipos de membresía que necesitara.
      p También hay un interruptor que permite que se puedan poner una cantidad a voluntad.
      p Recordad, activado= bolita negra y a la derecha, Activado, bolita blanca y a la izquierda=Desactivado.
      p En este apartado puedes también establecer tus donaciones estándar.
      p Ahora sería bueno que anuncies en tus redes los beneficios de cada una ¡y pegues el link de tu página pública en Innovaslab para que la gente pueda hacerse socio!

</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";

  @Component({})
  export default class Tip6 extends Vue {}
</script>

<style lang="scss" scoped>
  section {
    min-height: 100%;
    min-width: 100%;

    @import "../scss/tip.scss";
  }
</style>

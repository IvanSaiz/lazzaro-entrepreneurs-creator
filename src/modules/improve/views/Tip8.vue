<template lang="pug">
  .improve-tip
    header
      h1 Asesor
      p Sácale partido a tu asesor

    .improve-tip__body
      p En el corazoncito del menú, si le das clic te aparece un calendario.
      
      img(src="./img/8.png")
      
      p Los días con un recuadrito gris, están disponibles. Si haces clic sobre el que te interese, te aparecen los horarios disponibles.

      img(src="./img/83.png")
      img(src="./img/84.png")
      img(src="./img/85.png")


      p Añade los nombres completos y correos de los participantes por vuestro lado.

      img(src="./img/81.png")

      p Si nos adelantas de qué va a tratar la reunión, podemos tenerlo más preparado para que sea más productiva la reunión.

      p Elige la vía de comunicación que prefieras y coméntanos en la última casilla lo que consideres.


      img(src="./img/86.png")
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";

  @Component({})
  export default class Tip8 extends Vue {}
</script>

<style lang="scss" scoped>
  section {
    min-height: 100%;
    min-width: 100%;

    @import "../scss/tip.scss";
  }
</style>

<template lang="pug">
  .improve-tip
    header
      h1 Datos
      p Entiende tus datos
      
    .improve-tip__body
      img(src="./img/7.png")

      p Los que de verdad saben, analizan bien sus datos para poder entender qué está sucediendo y poder mejorar.
      p Esta es una funcionalidad muy útil que puedes utilizar si tienes una cuenta premium, que puedes contratar aquí.
      p El apartado principal son los Ingresos:
      p Se divide en Ingresos en diagrama de barras (CANTIDAD) (Ahí podrás ver por mes cómo van tus campañas de recaudación) Y un diagrama circular, representando las fuentes de ingresos. (FUENTE)
      p También se verán los ingresos totales.

      img(src="./img/71.png")

      p Luego tenemos la proporción de proyectos que han alcanzado el objetivo marcado.

      p Al lado, las donaciones que han entrado en el último periodo, desde ...

      p El siguiente parámetro es el número de nuevos socios desde
      p Así puedes ir vinculando qué campañas te han traído más socios,
      p Y justo al lado tienes el total de socios, que se irá actualizando de manera dinámica.

      img(src="./img/72.png")

      p En la fila inferior encontramos el producto más vendido de la tienda.
      p En números bien grandes, aparece lo recaudado este mes.
      p Y siguiendo con otros datos de interés como el número de donantes, el número de proyectos de recaudación en activo,  y las personas apuntadas a eventos y formaciones y el número de donantes por área.

      img(src="./img/73.png")

      p Estamos trabajando para mejorar día a día este apartado y que encuentres en él todos los datos que necesitas.
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";

  @Component({})
  export default class Tip7 extends Vue {}
</script>

<style lang="scss" scoped>
  section {
    min-height: 100%;
    min-width: 100%;

    @import "../scss/tip.scss";
  }
</style>

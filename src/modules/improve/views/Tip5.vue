<template lang="pug">
  .improve-tip
    header
      h1 Cuentas
      p Gestiona tus cuentas y saca dinero

    .improve-tip__body
      p Como dice el dicho “lo que no son cuentas, los cuentos”: Nos referimos a las cuentas de dinero. Para gestionar toda esta parte nos vamos hasta el icono en forma de cartera o billetera que tenemos en el menú, este: 

      img(src="./img/C5.png")

      p Una vez aquí, podremos ver todo lo recaudado por cada una de las herramientas que se han habilitado.
      p Hay funcionalidades que pueden resultar  muy útiles como buscar una transacción en concreto o descargar todos estos datos, para poder llevarlos a tu programa de contabilidad favorito o para lo que necesites.
      p A la izquierda de cada transacción aparece una casilla de verificación, marca las que necesites exportar, si las hubiera, puedes ver las siguientes páginas navegando por los números de más abajo.
      p Para #[strong retirar] una cantidad de dinero, le damos clic a retirar y nos abrirá un diálogo emergente donde podremos poner la cantidad que deseamos a retirar, al darle a aceptar, ¡Voila!, ya está el dinero viajando a tu cuenta.
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";

  @Component({})
  export default class Tip5 extends Vue {}
</script>

<style lang="scss" scoped>
  section {
    min-height: 100%;
    min-width: 100%;

    @import "../scss/tip.scss";
  }
</style>

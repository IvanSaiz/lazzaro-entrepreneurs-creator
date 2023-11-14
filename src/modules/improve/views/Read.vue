<template lang="pug">
.improve-read
  header
    h1 Mejora
    p Consejos y lecturas que impulsarán tu organización a su mejor versión

  .improve-read__grid
    lz-box.improve-read__item(v-for="(card, number) in cards" :key="number")
      .improve-read__number {{ number + 1 }}
      .improve-read__title {{ card.title }}
      .improve-read__preview {{ card.preview }}
      .improve-read__icons
        .improve-read__icon-item(v-if="number < 8" @click="$router.push({ name: `tip${number+1}`})")
          Article
        a.improve-read__icon-item(v-if="card.link", :href="card.link", target="_blank")
          div
            Video
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import LzBox from "@/components/Box.vue";
  import { namespace } from "vuex-class";
  import Article from "../../../components/Icons/Article.vue";
  import Video from "../../../components/Icons/Video.vue";
  const auth = namespace("auth");

  @Component({ components: { LzBox, Article, Video } })
  export default class Read extends Vue {
    @auth.State("id")
    public ongId!: string;

    cards = [
      {
        title: "Cómo crear mi primer proyecto de recaudación",
        preview:
          "Cuando hay una causa que nos mueve y buscamos llegar a otras personas para apelar a su solidaridad," +
          "si buscamos maximizar resultados hay ciertos consejos a tener en cuenta.",
        link: "https://www.youtube.com/watch?v=38fnNJPNflU"
      },
      {
        title: "Las ventajas de una tienda online son enormes",
        preview:
          "El “alquiler” del espacio es mucho más económico, llegas a todo el mundo, está abierta las 24 horas" +
          "Vamos a aprender a configurar nuestra propia tienda online con Lazzaro. ¡Vamos!",
        link: "https://www.youtube.com/watch?v=NyQYd5lee_k"
      },
      {
        title: "Nuevo evento o formación",
        preview:
          "Queremos crear un nuevo evento o planificar una nueva formación. ¿Cómo lo hacemos? " +
          "Siguiendo paso a paso esta fabulosa guía. Empezaremos accendiendo al Calendario.",
        link: "https://www.youtube.com/watch?v=NBKdVDcuxxU"
      },
      {
        title: "Personaliza tu plataforma web",
        preview:
          "Es momento de redecorar y personalizar la manera en la que se ve nuestra página en Lázzaro. " +
          "Para ello, podemos acceder a múltiples opciones accediendo a Web.",
        link: "https://www.youtube.com/watch?v=PLmpniwqmjM"
      },
      {
        title: "Gestiona tus cuentas y saca dinero",
        preview:
          "Como dice el dicho “lo que no son cuentas, los cuentos”: Nos referimos a las cuentas de" +
          "dinero. Para gestionar toda esta parte nos vamos hasta el icono en forma de cartera o billetera que tenemos en el menú."
      },
      {
        title: "Tipos de socio",
        preview:
          "Aquí podemos ver los niveles o categorías de membresía de nuestros socios y su coste. " +
          "Podremos ver el listado de socios y configurar los tipos de donaciones.",
        link: "https://www.youtube.com/watch?v=LK2p4xzsZRg"
      },
      {
        title: "Entiendes tus datos",
        preview:
          "Los que de verdad saben, analizan bien sus datos para poder entender qué está sucediendo " +
          "y poder mejorar. Esta es una funcionalidad muy útil que puedes utilizar si tienes una cuenta premium."
      },
      {
        title: "Sácale partido a tu asesor",
        preview:
          "¿Tienes dudas? ¿Necesitas algún hechizo que haga subir tus donaciones?" +
          "En el corazoncito del menú, si le das clic te aparece un calendario para concertar una cita.",
        link: "https://www.youtube.com/watch?v=rJKTRvR2GX0"
      },
      {
        title: "Elije el estilo de te web que más te guste",
        preview:
          "En Lázzaro tenemos múltiples plantillas para que puedas elegir el tema que más te guste para atraer a tus donantes. Cambio de estilo sin problema en cuestión de minutos.",
        link: "https://www.youtube.com/watch?v=rNxbqZiPqKY"
      },
      {
        title: "Conoce todo lo que pasa con Google Analytics",
        preview:
          "Ver todo el tráfico y estadísticas que genera tu web ya es posible con la integración de Google Analytics. Configúrala y accede ya a todos los datos de tu web.",
        link: "https://www.youtube.com/watch?v=GXaAcn9hnRk"
      },
      {
        title: "Descubre donde ver tus donaciones online",
        preview:
          "Tener tus donaciones en un solo lugar nunca ha sido tan sencillo. Aquí te explicamos paso a paso cómo funciona la sección más potente de la plataforma.",
        link: "https://www.youtube.com/watch?v=qN6YU6GaEzA"
      },
      {
        title: "Configura tu pasarela de pago favorita",
        preview:
          "Paypal, Stripe o Mollie. Elije la pasarela de pago que mejor se adapte a tus donantes y configúrala en apenas 5 minutos para tener tu web lista al 100%.",
        link:
          "https://www.youtube.com/playlist?list=PLT-xqW1vABp6f_BSkul-J9OGDCya3z-VS"
      },
      {
        title: "¿Tienes algún problema? Contacta con el equipo técnico",
        preview:
          "Siempre puedes contar con nosotros y es que cada página de la plataforma tienes tu icono de ayuda para poder contactar con nuestro equipo técnico en tiempo real.",
        link: "https://www.youtube.com/watch?v=yuRsOGdg51s"
      }
    ];
  }
</script>

<style lang="scss">
  .improve-read {
    &__grid {
      display: flex;
      flex-wrap: wrap;
      margin: 20px -10px;

      & > * {
        flex-basis: calc(50% - 20px);
        margin: 10px;
      }
    }

    &__item {
      position: relative;
      padding-left: 50px;
    }

    &__number {
      font-size: 21px;
      font-weight: bold;
      color: $color-black-01;
      position: absolute;
      left: 25px;
      top: 38px;
    }

    &__title {
      color: $color-black-01;
      font-family: Muli;
      font-size: 15px;
      font-weight: bold;
      line-height: 1.27;
      margin-left: 13px;
    }

    &__preview {
      color: $color-black-01;
      font-size: 12px;
      line-height: 1.25;
      margin-top: 10px;
      padding: 5px 0;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    &__icons {
      margin-top: 10px;
      display: flex;
    }
    &__icon-item {
      padding: 10px;
      margin-right: 10px;
      box-sizing: border-box;
      border: 2px solid $color-black-07;
      background-color: $color-black-07;
      border-radius: 50px;
      transition: border $transition-default;
      transition: fill $transition-default;
      svg {
        height: 25px;
        stroke: $color-black-03;
        stroke-width: 1.25px;
        width: 25px;
        transition: stroke $transition-default;
      }
      div > svg {
        path:last-child {
          fill: $color-black-03;
        }
      }
      &:hover {
        border: 2px solid $color-pink;
        cursor: pointer;
        svg {
          stroke: $color-pink;
        }
        div > svg {
          path:last-child {
            fill: $color-pink;
          }
        }
      }
    }
  }
</style>

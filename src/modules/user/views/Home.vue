<template lang="pug">
.user-home
  header
    h1 {{ $t('user.home.hello') }} {{ firstName }}!
    p {{ $t('user.home.description') }}
  lz-box.advice(:tight="true" :shadow="true" @click="() => redirectTo('/training/home')")
    h1 {{ $t('user.home.advice.name') }}
    .body
      .icon
        certificate-icon(size=91)
      .text
        h1 {{ $t('training.home.cards.Web.title') }}
        p {{ $t('training.home.cards.Web.subtitle') }}
  lz-box.tools
    h1 {{ $t("user.home.tools.title") }}
    .grid
      .tool(v-for="({icon,title,route}) in tools" @click="() => redirectTo(route)")
        component(:is="`${icon}-icon`" size="38")
        span {{ title }}
  .ybs-logo
    p {{ $t('user.home.ybs') }}
    img(src="@/assets/images/ybs-logo.png" alt="YBS Logo")
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import LzButton from "@/components/Button.vue";
  import LzBox from "@/components/Box.vue";
  import { namespace } from "vuex-class";
  const auth = namespace("auth");

  @Component({
    components: { LzButton, LzBox }
  })
  export default class Home extends Vue {
    @auth.State("firstName")
    public firstName!: string;

    tools = {
      web: {
        title: this.$t("user.home.tools.web"),
        icon: "device-laptop",
        route: "web/public"
      },
      shop: {
        title: this.$t("user.home.tools.shop"),
        icon: "building-store",
        route: "shop/read"
      },
      events: {
        title: this.$t("user.home.tools.events"),
        icon: "calendar",
        route: "events/read"
      },
      blog: {
        title: this.$t("user.home.tools.blog"),
        icon: "calendar",
        route: "blog/read"
      },
      // reviews: {
      //   title: this.$t("user.home.tools.reviews"),
      //   icon: "clipboard-text",
      //   route: "web/public#reviews"
      // },
      bookings: {
        title: this.$t("user.home.tools.bookings"),
        icon: "address-book",
        route: "web/public#bookings"
      },
      projects: {
        title: this.$t("user.home.tools.projects"),
        icon: "clipboard-text",
        route: "projects/read"
      },
      services: {
        title: this.$t("user.home.tools.services"),
        icon: "file-like",
        route: "services/read"
      }
    } as const;

    capitalizeFirstLetter(str: string) {
      return str.charAt(0).toUpperCase() + str.substring(1);
    }

    redirectTo(path: string) {
      this.$router.push({ path: `/${path}` });
    }
  }
</script>

<style lang="scss">
  .user-home {
    display: grid;
    grid-template-areas:
      "h h h h h h"
      "p p p p p p"
      "a a a a a a"
      "t t t t t t"
      "l l l l l l";
    grid-gap: 25px;

    header {
      grid-area: h;
      height: 100%;
      width: 100%;

      h1 {
        font-family: Jost;
        font-size: 35px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
        color: $color-black-01;
      }
    }

    .lz-box {
      padding: 30px 50px;

      h1 {
        color: $color-black-02;
        font-family: Mulish;
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
      }

      &.advice {
        grid-area: a;
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 5px;
        cursor: pointer;
        user-select: none;
        transition: all 0.3s ease-in-out;

        &:hover {
          filter: brightness(0.97);
        }

        .body {
          display: flex;
          gap: 30px;
          align-items: center;

          h1 {
            font-family: Mulish;
            font-size: 16px;
            font-weight: 600;
            color: $color-black-02;
            margin-bottom: 0.8rem;
          }
          p {
            color: $color-black-02;
            font-family: Mulish;
            font-size: 12px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
          }
          .icon {
            margin: 0;

            svg {
              stroke-width: 0.7px;
              stroke: $color-black-02;
            }
          }
        }
      }

      &.tools {
        grid-area: t;
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 34px;

        h1 {
          font-family: Mulish;
          font-size: 16px;
          font-weight: 600;
          color: $color-black-02;
          margin-bottom: 0;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;

          .tool {
            display: flex;
            gap: 10px;
            align-items: center;
            user-select: none;
            cursor: pointer;
            transition: all 0.1s ease-in-out;

            &:hover {
              transform: scale(1.02);
            }

            svg {
              stroke-width: 1.2px;
              stroke: $color-black-02;
            }

            span {
              font-family: Mulish;
              font-size: 16px;
              font-style: normal;
              font-weight: 600;
              line-height: normal;
              color: $color-black-02;
            }
          }
        }
      }
    }

    .ybs-logo {
      grid-area: l;
      width: max-content;
      margin-left: auto;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      justify-content: end;
      align-items: end;
      margin-top: 6rem;

      img {
        width: 100%;
        max-width: 200px;
      }

      p {
        font-family: Mulish;
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
        align-self: center;
        color: $color-black-02;
      }
    }
  }
</style>

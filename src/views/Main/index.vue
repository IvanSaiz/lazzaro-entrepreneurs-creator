<template lang="pug">
  #main
    //- nav
    nav.lz-nav
      img.lz-nav__logo(
        alt="Lazzaro logo"
        src="@/assets/images/logo-z-Blue.png"
        height=50
        @click="$router.push({ name: 'Home' })"
      )

      //- ul.lz-nav__list
      //-   router-link(
      //-     tag="li"
      //-     :to="{ name: lzModule.moduleName }"
      //-     v-slot="{ navigate, isActive }"
      //-     v-for="lzModule in visibleLzModules"
      //-     :key="lzModule.moduleName"
      //-     :title="lzModule.label"
      //-   )
      //-     lz-nav-icon.lz-nav__item(
      //-       :active="isActive"
      //-       @click="navigate"
      //-     )
      //-       template(slot="icon")
      //-         component(:is="lzModule.icon")
      //-       template(slot="label")  {{ $t(`common.nav.${lzModule.label}`) }}    

      ul.lz-nav__user
        lz-nav-icon.lz-nav__item(
          tag="li"
          @click="$router.push({ name: 'Logout' }).catch(() => {});"
        )
          template(slot="icon")
            logout-icon
          template(slot="label") {{$t('common.logout')}}

    //- modules view
    transition(name="fade" mode="out-in")
      router-view.lz-module
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import LzNavIcon from "./components/NavIcon.vue";
  import { DeviceLaptopIcon } from "vue-tabler-icons";
  import { LZ_MODULES } from "@/config/modules";
  import { namespace } from "vuex-class";

  const auth = namespace("auth");

  type Features = {
    causes: boolean;
    courses: boolean;
    donations: boolean;
    events: boolean;
    impact: boolean;
    market: boolean;
    NFTs: boolean;
    partners: boolean;
    volunteers: boolean;
  };

  @Component({
    components: { LzNavIcon, DeviceLaptopIcon }
  })
  export default class Main extends Vue {
    @auth.State("features")
    public features!: Features;

    get lzModules() {
      return LZ_MODULES;
    }

    get visibleLzModules() {
      return Object.keys(this.lzModules).reduce((lzModules, moduleKey) => {
        const features = this.lzModules[moduleKey].features;
        if (!features || features.some((key: string) => this.features[key])) {
          lzModules[moduleKey] = this.lzModules[moduleKey];
        }
        return lzModules;
      }, {} as typeof LZ_MODULES);
    }
  }
</script>

<style lang="scss" scoped>
  #main {
    $mainPadding: 16px;
    $navWidth: 92px;

    background-color: $color-black-07;
    height: 100%;
    min-height: 100vh;
    overflow: hidden;
    padding: $mainPadding;
    width: 100%;

    .lz-nav {
      background-color: $color-white;
      border-radius: $border-radius-default;
      box-shadow: 20px 35px 50px 0 rgba(70, 74, 180, 0.15);
      display: inline-block;
      height: calc(100vh - 2 * #{$mainPadding});
      width: $navWidth;
      overflow-y: hidden;
      padding: 20px 0;
      position: fixed;
      z-index: 2;

      & > * {
        display: block;
        margin: 0 auto;
      }

      &__logo {
        cursor: pointer;
      }

      @media (max-height: 800px) {
        height: auto;

        &__list {
          display: flex;
          flex-wrap: wrap;
          margin-top: 20px;

          & > * {
            width: 100%;
          }
        }
      }

      @media (max-height: 600px) {
        &__list {
          & > * {
            width: 50%;
          }
        }
      }
    }

    .lz-module {
      height: 100%;
      padding-top: calc(80px - #{$mainPadding});
      padding-left: calc(#{$navWidth} + 80px - #{$mainPadding});
    }
  }
</style>

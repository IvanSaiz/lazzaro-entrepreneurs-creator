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
    ul.lz-nav__list
      router-link(
        tag="li"
        :to="{ name: lzModule.moduleName }"
        v-slot="{ navigate, isActive }"
        v-for="lzModule in visibleLzModules"
        :key="lzModule.moduleName"
        :title="lzModule.label"
      )
        lz-nav-icon.lz-nav__item(
          :active="isActive"
          @click="navigate"
        )
          template(slot="icon")
            component(:is="lzModule.icon")
          template(slot="label")  {{ $t(`common.nav.${lzModule.label}`) }}    
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

  type Tools = string[];

  @Component({
    components: { LzNavIcon, DeviceLaptopIcon }
  })
  export default class Main extends Vue {
    @auth.State("tools")
    public tools: Tools;

    get lzModules() {
      return LZ_MODULES;
    }

    collapsed = false;

    get visibleLzModules() {
      return Object.keys(this.lzModules).reduce((lzModules, moduleKey) => {
        const features = this.lzModules[moduleKey].features;
        if (
          !features ||
          features.some((key: string) => this.tools?.includes?.(key))
        ) {
          lzModules[moduleKey] = this.lzModules[moduleKey];
        }
        return lzModules;
      }, {} as typeof LZ_MODULES);
    }
  }
</script>

<style lang="scss" scoped>
  #main {
    $mainPadding: 20px;
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
      display: flex;
      flex-direction: column;
      max-height: calc(100vh - 2 * #{$mainPadding});
      width: $navWidth;
      position: fixed;
      z-index: 2;
      padding-bottom: #{$mainPadding};
      overflow-y: hidden;

      & > * {
        display: block;
        margin: 0 auto;
      }

      &__logo {
        cursor: pointer;
        margin: #{$mainPadding} auto;
      }
      &__list {
        max-height: 100%;
        display: grid;
        grid-template-columns: 1fr;
        gap: 1rem;
        justify-content: space-between;

        @media (max-height: 700px) {
          grid-template-columns: 1fr 1fr;
        }
      }

      @media (max-width: $br-md) {
        padding: 0;
        .lz-nav__list {
          display: none;
        }

        &:active,
        &:hover,
        &:focus-within {
          .lz-nav__list {
            display: grid !important;
          }
        }
      }
    }

    .lz-module {
      height: 100%;
      padding-top: calc(80px - #{$mainPadding});
      padding-left: calc(#{$navWidth} + 80px - #{$mainPadding});

      @media (max-width: $br-md) {
        padding-top: 100px;
        padding-left: 0;
      }
    }
  }
</style>

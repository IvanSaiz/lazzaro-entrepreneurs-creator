<template lang="pug">
  #step-tools
    .step-tools__img
      img(src="./assets/herramientas_paso2.svg" height=340)
    .step-tools__title {{ $t('auth.onboarding.stepTools.title') }}
    .step-tools__description {{ $t('auth.onboarding.stepTools.subtitle') }}
    .step-tools__tools
      .step-tools__block
        lz-tool(
          @click.native="() => { tools.portfolio = !tools.portfolio; }"
          :checked="tools.portfolio"
        )
          template(slot="icon")
            ClipboardListIcon(size=30 stroke-width=1.25)
          template(slot="label") {{ $t('auth.onboarding.stepTools.tools.portfolio') }}

        lz-tool(
          @click.native="() => { tools.shop = !tools.shop; }"
          :checked="tools.shop"
        )
          template(slot="icon")
            BuildingStoreIcon(size=30 stroke-width=1.25)
          template(slot="label") {{ $t('auth.onboarding.stepTools.tools.shop') }}

        lz-tool(
          @click.native="() => { tools.events = !tools.events; }"
          :checked="tools.events"
        )
          template(slot="icon")
            CalendarEventIcon(size=30 stroke-width=1.25)
          template(slot="label") {{ $t('auth.onboarding.stepTools.tools.events') }}

        lz-tool(
          @click.native="() => { tools.services = !tools.services; }"
          :checked="tools.services"
        )
          template(slot="icon")
            FileLikeIcon(size=30 stroke-width=1.25)
          template(slot="label") {{ $t('auth.onboarding.stepTools.tools.services') }}

        lz-tool(
          @click.native="() => { tools.reviews = !tools.reviews; }"
          :checked="tools.reviews"
        )
          template(slot="icon")
            img(src="./assets/star-half-filled.svg" height=61)
          template(slot="label") {{ $t('auth.onboarding.stepTools.tools.reviews') }}

        lz-tool(
          @click.native="() => { tools.bookings = !tools.bookings; }"
          :checked="tools.bookings"
        )
          template(slot="icon")
            AddressBookIcon(size=30 stroke-width=1.25)
          template(slot="label") {{ $t('auth.onboarding.stepTools.tools.bookings') }}
        
    .step-tools__actions
      slot(name="actions" :click="sendStepTools" :disabled="disableStepToolsButton")
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import LzTool from "./components/Tool.vue";
  import LzButton from "@/components/Button.vue";
  import { apiTools } from "../../../../api";
  import { namespace } from "vuex-class";

  const auth = namespace("auth");

  @Component({
    components: { LzTool, LzButton }
  })
  export default class StepTools extends Vue {
    tools = {
      portfolio: false,
      shop: false,
      events: false,
      services: false,
      reviews: false,
      bookings: false
    };

    loadingPostStepTools = false;

    @auth.State("id")
    public ongId!: string;

    @auth.Mutation
    public setTools!: (payload: any) => void;

    private get disableStepToolsButton(): boolean {
      return (
        !Object.values(this.tools).some(value => value === true) ||
        this.loadingPostStepTools
      );
    }

    sendStepTools() {
      this.loadingPostStepTools = true;

      const selectedTools = Object.keys(this.tools).filter(
        key => this.tools[key]
      );

      this.setTools(selectedTools);
      this.loadingPostStepTools = false;
    }
  }
</script>

<style lang="scss" scoped>
  #step-tools {
    text-align: center;
    .step-tools {
      &__title {
        color: $color-black-02;
        font-family: Jost;
        font-size: 35px;
        font-weight: 600;
        line-height: normal;
      }

      &__img {
        margin-bottom: 15px;
      }

      &__description {
        color: $color-black-03;
        font-family: Muli;
        font-weight: 700;
        font-size: 20px;
        line-height: 1.5;
      }

      &__tools {
        margin-top: 65px;
        display: flex;
        justify-content: center;
      }

      &__row {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
      }

      &__block {
        display: flex;
        width: 455px;
        align-items: flex-start;
        align-content: flex-start;
        justify-content: center;
        gap: 25px 40px;
        flex-wrap: wrap;
      }

      &__button {
        margin-top: 18px;
      }

      &__actions {
        position: absolute;
        bottom: -40px;
        width: calc(100% - 80px);
      }
    }
  }
</style>

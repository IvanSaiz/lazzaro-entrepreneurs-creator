<template lang="pug">
section.public-impact
  .public-impact__header
    .title
      formulate-input(
        type="toggle"
        name="impactEnabled"
        v-model="props.enabled"
      )
      h2.h2--dash {{ $t('web.public.impactForm.title') }}
    .subtitle
      p {{ $t('web.public.impactForm.subtitle') }}
      design-modal(section="impact")
        template(#header)
          h4 {{ $t('web.public.impactForm.design.title') }}
        template(#form)
          .row
            h2.h2--dash {{ $t('web.public.impactForm.design.image') }}
            formulate-input(
              type="image"
              v-model="props.design.backgroundImage"
              :help="$t('web.public.impactForm.design.imageHelper')"
            )
          .row
            h2.h2--dash {{ $t('web.public.impactForm.design.color') }}
            formulate-input#primary-color(
              type="textColor"
              v-model="props.design.color"
            )
          .row
            h2.h2--dash {{ $t('web.public.impactForm.design.backgroundColor') }}
            formulate-input#primary-color(
              type="textColor"
              v-model="props.design.backgroundColor"
            )
          .row
            h2.h2--dash {{ $t('web.public.impactForm.design.cardTextColor') }}
            formulate-input#primary-color(
              type="textColor"
              v-model="props.design.cardTextColor"
            )
          .row
            h2.h2--dash {{ $t('web.public.impactForm.design.cardAmountColor') }}
            formulate-input#primary-color(
              type="textColor"
              v-model="props.design.cardAmountColor"
            )
  formulate-input(
    type="group"
    name="impactData"
    :value="props.data"
    #default="{index}"
  ).public-impact__content
    formulate-input.impact-item(
          type="image"
          name= "url"
          :label="$t(`web.public.impactForm.icon.${index+1}`)"
          :help="$t('web.public.impactForm.icon.help')"
        )
    formulate-input.impact-item(
          type="text"
          name= "text"
          :label="$t(`web.public.impactForm.text.${index+1}`)"
        )
    formulate-input.impact-item(
          type="text"
          name= "amount"
          :label="$t(`web.public.impactForm.amount.${index+1}`)"
        )
  
</template>

<script lang="ts">
  import { Component, Vue, VModel } from "vue-property-decorator";
  import DesignModal from "@/components/DesignModal.vue";

  type ImpactProps = WebProps["impact"];

  @Component({ name: "Impact", components: { DesignModal } })
  export default class Impact extends Vue {
    @VModel() props!: ImpactProps; // TODO: Map to inputs
  }
</script>

<style lang="scss">
  .public-impact {
    &__header {
      .subtitle {
        display: flex;
        justify-content: space-between;
        margin-bottom: 1rem;
        p {
          font-size: 16px;
        }
      }
    }
    &__content {
      .formulate-input-grouping {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        align-items: flex-start;
        gap: 44px;

        .formulate-input-group-repeatable {
          height: 100%;
          display: flex;
          flex-direction: column;
        }
      }

      .impact-item {
        display: flex;
        flex-direction: column;

        &[data-type="image"] {
          margin-bottom: auto !important;
        }

        &:not(:last-child) {
          margin-bottom: 1rem;
        }

        formulate-input {
          width: 100%;
        }
      }
    }
    .design-modal {
      h2 {
        margin-bottom: 0.4rem;
      }
      .row {
        margin-bottom: 1.4rem;
      }
    }
  }
</style>

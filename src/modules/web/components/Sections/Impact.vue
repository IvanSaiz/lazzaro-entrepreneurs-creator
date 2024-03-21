<template lang="pug">
section.public-impact
  .public-impact__header
    h2.h2--dash {{ $t('web.public.impactForm.title') }}
    .subtitle
      p {{ $t('web.public.impactForm.subtitle') }}
      design-modal(section="impact")
        template(#header)
          h4 {{ $t('web.public.impactForm.design.title') }}
        template(#form)
          h2.h2--dash {{ $t('web.public.impactForm.design.image') }}
          formulate-input(
            type="image"
            v-model="props.design.backgroundImage"
            :help="$t('web.public.impactForm.design.imageHelper')"
          )
          h2.h2--dash {{ $t('web.public.impactForm.design.color') }}
          formulate-input#primary-color(
            type="textColor"
            v-model="props.design.backgroundColor"
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

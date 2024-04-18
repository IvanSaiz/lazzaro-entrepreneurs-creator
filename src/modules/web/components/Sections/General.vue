<template lang="pug">
section.public-general
  .public-general__header
    h2.h2--dash {{ $t('web.public.generalForm.title') }}
  .public-general__publish
    .form__row
      formulate-input(
        type="toggle"
        :label="$t('web.public.generalForm.publicate')"
        :under-label="$t('web.public.generalForm.status.label')"
        name="active"
        v-model="props.active"
      )
      .public-general__view-btn
        a(:href="props.url" target="_blank")
          span {{ $t('web.public.generalForm.seeWeb') }}
          ArrowUpRightIcon
    .form__row
      formulate-input(
        type="url"
        :label="$t('web.public.generalForm.url')"
        name="url"
        :value="props.url"
        disabled
      )
  <choose-template :chosenTemplateId='props.templateId' :handleChooseTemplate='handleChooseTemplate' />      
</template>

<script lang="ts">
  import { Component, Vue, VModel } from "vue-property-decorator";
  import ChooseTemplate from "../ChooseTemplate/index.vue";

  type GeneralProps = WebProps["general"];

  @Component({ name: "General", components: { ChooseTemplate } })
  export default class General extends Vue {
    @VModel() props!: GeneralProps;

    handleChooseTemplate(e: Event & { target: HTMLInputElement }) {
      this.props.templateId = e.target.value;
    }
  }
</script>

<style lang="scss">
  section.public-general {
    & > * {
      margin-bottom: 20px;
    }

    &__view-btn {
      text-align: right;

      span {
        color: $color-black-01;
        font-size: 16px;
        text-decoration: underline;

        &:hover {
          cursor: pointer;
        }
      }

      svg {
        stroke: $color-black-01;
      }

      a {
        display: flex;
        justify-content: flex-end;
        align-items: center;
      }
    }
  }
</style>

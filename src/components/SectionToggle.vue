<template>
  <FormulateInput
    type="toggle"
    v-model="this.active"
    @change="this.handleToggle"
  />
</template>

<script lang="ts">
  import { Component, Vue, Prop } from "vue-property-decorator";
  import { namespace } from "vuex-class";
  import { apiWebsite } from "@/modules/web/api";
  const auth = namespace("auth");

  @Component
  export default class SectionToggle extends Vue {
    @auth.State("websiteId") websiteId!: string;

    @Prop({ type: String, required: true }) section!: string;

    active = false;

    mounted() {
      apiWebsite.section
        .get(this.websiteId, this.section, ["active"])
        .then(({ active }) => {
          this.active = active;
        });
    }

    handleToggle() {
      apiWebsite.section
        .toggle(this.websiteId, this.section)
        .then(({ active }) => {
          this.active = active;
        });
    }
  }
</script>

<template>
  <FormulateInput type="toggle" v-model="active" @change="handleToggle" />
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
        .then(res => {
          this.active = res.active;
        });
    }

    async handleToggle() {
      const { active } = await apiWebsite.section.toggle(
        this.websiteId,
        this.section
      );
      // console.log(res);
      this.active = active;
    }
  }
</script>

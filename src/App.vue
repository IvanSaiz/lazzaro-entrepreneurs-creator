<template lang="pug">
#app
  transition(name="fade")
    lz-loader(v-if="loading")
  notifications
  router-view
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import { namespace } from "vuex-class";
  import { getAuth, hasAuth } from "./api/core/auth";
  import LzLoader from "@/modules/loader/components/Loader.vue";
  import http from "@/api/core/http";
  const auth = namespace("auth");

  @Component({
    components: { LzLoader }
  })
  export default class App extends Vue {
    @auth.Action
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public updateData!: (payload: any) => void;

    @auth.Action
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public refreshMemberData: () => Promise<void>;

    // @auth.State("id")
    // public memberId!: string;
    @auth.Mutation("setBlockedBySubscriptionPlan")
    public setBlockedBySubscriptionPlan!: (payload: boolean) => void;

    @auth.Action
    public setTemplateFeatures!: () => Promise<void>;

    @auth.Getter("websiteId")
    websiteId: string;

    async mounted() {
      if (hasAuth()) {
        this.updateData(getAuth());
        await this.refreshMemberData();
        // await this.updateFeatures(this.memberId);

        //TODO: to be updated
        // await this.checkBlockedStatus(this.memberId).catch(() => {
        //   this.$notify({
        //     type: "error",
        //     text: this.$tc("common.error.generic")
        //   });
        // });
      }

      http.client.interceptors.request.use(
        config => {
          this.setLoading(true);
          return config;
        },
        error => {
          this.setLoading(false);
          return Promise.reject(error);
        }
      );

      http.client.interceptors.response.use(
        config => {
          this.setLoading(false);
          return config;
        },
        error => {
          this.setLoading(false);
          return Promise.reject(error);
        }
      );
    }

    // async checkBlockedStatus(memberId: string) {
    //   const {
    //     data: { PlatformSubscription } = {}
    //   } = await apiOngs.getOrganizationPlan(memberId);

    //   if (!PlatformSubscription) {
    //     this.setBlockedBySubscriptionPlan(true);

    //     if (this.$route.name !== "organizationRead") {
    //       this.$router.push({ name: "organizationRead" });
    //     }
    //   }
    // }
  }
</script>

<style lang="scss" src="@/styles/app/index.scss"></style>

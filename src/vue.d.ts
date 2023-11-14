import Vue from "vue";

declare module "vue/types/vue" {
  interface Vue {
    public loading: boolean;
    public setLoading: (payload: boolean) => void;
  }
}

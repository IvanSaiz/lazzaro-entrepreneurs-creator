import Vue from "vue";

declare module "vue/types/vue" {
  interface Vue {
    public loading: boolean;
    public setLoading: (payload: boolean) => void;
    public models: { data: string; event: string }[];
  }
}

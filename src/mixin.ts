//inside src/mixins.ts
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

const loader = namespace("loader");

@Component
export default class Mixin extends Vue {
  @loader.State("loading")
  public loading!: boolean;

  @loader.Mutation("setLoading")
  public setLoading!: (payload: boolean) => void;
}

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import { VuexModule, Module, Mutation, config } from "vuex-module-decorators";

config.rawError = true;
@Module({ namespaced: true, name: "loader" })
class Loader extends VuexModule {
  // state
  loading = false;

  // mutations
  @Mutation
  public setLoading(payload: boolean): void {
    this.loading = payload;
  }
}

export default Loader;

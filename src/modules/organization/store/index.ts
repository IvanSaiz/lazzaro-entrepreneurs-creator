import Vue from "vue";
import Vuex from "vuex";
import keysToCamel from "@/utils/keysToCamel";
import store from "@/store";

Vue.use(Vuex);

import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule,
  config
} from "vuex-module-decorators";

config.rawError = true;
@Module({ namespaced: true, name: "organization", dynamic: true, store })
class Organization extends VuexModule {
  // state
  planId = "";

  // mutations
  @Mutation
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public setData(planId: string): void {
    this.planId = planId;
  }

  // actions
  @Action
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public updatePlan(planId: string): void {
    this.context.commit("setData", planId);
  }
}

export default getModule(Organization);

import Vue from "vue";
import Vuex from "vuex";
import store from "@/store";

Vue.use(Vuex);

import { VuexModule, Module, getModule, config } from "vuex-module-decorators";

config.rawError = true;
@Module({ namespaced: true, name: "web", dynamic: true, store })
class Web extends VuexModule {}

export default getModule(Web);

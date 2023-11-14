import Vue from "vue";
import Vuex from "vuex";
import store from "@/store";

Vue.use(Vuex);

import { VuexModule, Module, getModule, config } from "vuex-module-decorators";

config.rawError = true;
@Module({ namespaced: true, name: "projects", dynamic: true, store })
class Proyect extends VuexModule {}

export default getModule(Proyect);

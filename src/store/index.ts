import Vue from "vue";
import Vuex from "vuex";
import { loadModuleStore } from "@/modules/loader";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  actions: {},
  mutations: {},
  modules: {
    loader: loadModuleStore
  }
});

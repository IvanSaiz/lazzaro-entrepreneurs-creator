import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueI18n from "vue-i18n";
import VueNotification from "vue-notification";
import VueFormulate from "@braid/vue-formulate";
import VueTablerIcons from "vue-tabler-icons";
import VueTelInput from "vue-tel-input";
import "vue-tel-input/dist/vue-tel-input.css";
// config
import i18nConfig from "@/plugins/i18n/config";
import { es } from "@braid/vue-formulate-i18n";
import uploader from "@/plugins/formulate/uploader";

// components
import FormulateInputToggle from "@/components/Input/FormulateInputToggle.vue";
import FormulateInputTextColor from "@/components/Input/FormulateInputTextColor.vue";
import LzLevelUpButton from "@/components/LevelUpButton.vue";
import Mixin from "./mixin";

// plugins
Vue.use(VueI18n);
Vue.use(VueNotification);
Vue.use(VueTablerIcons);
Vue.use(VueTelInput);

// formulate
Vue.component("FormulateInputToggle", FormulateInputToggle);
Vue.component("FormulateInputTextColor", FormulateInputTextColor);
Vue.use(VueFormulate, {
  plugins: [es],
  locale: "es",
  uploader,
  library: {
    toggle: {
      classification: "toggle",
      component: "FormulateInputToggle",
      slotProps: {
        component: ["underLabel"]
      }
    },
    textColor: {
      classification: "text-color",
      component: "FormulateInputTextColor"
    }
  }
});

Vue.config.productionTip = false;

// Level Up component
Vue.component("LzLevelUpButton", LzLevelUpButton);

// Global mixin
Vue.mixin(Mixin);

new Vue({
  i18n: i18nConfig,
  router,
  store,
  render: h => h(App)
}).$mount("#app");

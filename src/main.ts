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
import ColorText from "./components/Input/ColorText.vue";
import Mixin from "./mixin";
import { Chrome } from "vue-color";
import Vue2MultipleVModels from "vue2-multiple-vmodels";
import ColorPicker from "./components/Input/ColorPicker.vue";

// plugins
Vue.use(VueI18n);
Vue.use(VueNotification);
Vue.use(VueTablerIcons);
Vue.use(VueTelInput);
Vue.use(Vue2MultipleVModels);

// formulate
Vue.component("FormulateInputToggle", FormulateInputToggle);
Vue.component("FormulateInputTextColor", FormulateInputTextColor);
Vue.component("ColorText", ColorText);

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
    },
    colorText: {
      classification: "color-text",
      component: "ColorText"
    }
  }
});

Vue.config.productionTip = false;

// Level Up component
Vue.component("LzLevelUpButton", LzLevelUpButton);

Vue.component("chrome-picker", Chrome);
Vue.component("ColorPicker", ColorPicker);

// Global mixin
Vue.mixin(Mixin);

new Vue({
  i18n: i18nConfig,
  router,
  store,
  render: h => h(App)
}).$mount("#app");

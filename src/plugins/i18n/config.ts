import Vue from "vue";
import VueI18n from "vue-i18n";
import messages from "./messages";

Vue.use(VueI18n);

const numberFormats = {
  en: {
    currency: {
      style: "currency",
      currency: "EUR"
    }
  },
  es: {
    currency: {
      style: "currency",
      currency: "EUR"
    }
  }
};

export default new VueI18n({
  locale: navigator.language || "es",
  messages,
  numberFormats
});

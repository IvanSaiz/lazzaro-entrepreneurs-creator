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
import { apiOngs } from "@/modules/web/api";
import { getAuth } from "@/api/core/auth";
import { apiPlatform } from "@/modules/auth/api";

config.rawError = true;
@Module({ namespaced: true, name: "auth", dynamic: true, store })
class Auth extends VuexModule {
  // state
  roles = null;
  currency = null;
  currencySymbol = null;
  isDeleted = null;
  isActive = null;
  id: string | null = null;
  password = null;
  organizationId = null;
  email = null;
  url = null;
  companyName = null;
  firstName = null;
  lastName = null;
  cif = null;
  gender = null;
  dni = null;
  updatedAt = null;
  createdAt = null;
  tools: string[] | null = null;
  imgUrl = null;
  styleId = null;
  stripeId = null;
  templateId: string | null = null;
  websiteId: string | null = null;
  section: any = null;
  zohoId = null;
  style = null;
  //
  active = null;
  address = null;
  ambit = null;
  description = null;
  dltAddress = null;
  homeUrl = null;
  ioCashUserId = null;
  mobilePhone = null;
  name = null;
  nif = null;
  pk = null;
  type = null;
  features = {
    causes: false,
    courses: false,
    donations: false,
    events: false,
    impact: false,
    market: false,
    partners: false,
    volunteers: false
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ongConfiguration: any = {
    currency: this.currency,
    currency_symbol: this.currencySymbol
  };
  paypalClientId: string | null = null;
  paypalClientSecret: string | null = null;
  stripe_id: string | null = null;
  mollie_org_api_key: string | null = null;
  crypto_wallet_address: string | null = null;

  // subscription plan
  blockedBySubscriptionPlan = false;

  // mutations
  @Mutation
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public setData(payload: any): void {
    Object.keys(payload).forEach(v => {
      this[v] = payload[v];
    });
  }

  @Mutation
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public setFeatures(payload: any): void {
    Object.keys(payload).forEach(v => {
      this.features[v] = payload[v];
    });
  }

  @Mutation
  public setTools(payload: string[]): void {
    this.tools = payload;
  }

  @Mutation
  public setStyle(payload: any): void {
    this.style = payload;
  }

  @Mutation
  public setSections(payload: any): void {
    this.section = payload;
  }

  @Mutation
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public setPaypalConfig(payload: any) {
    this.paypalClientId = payload.id;
    this.paypalClientSecret = payload.secret;

    // updates auth in localStorage
    localStorage.setItem(
      "auth",
      JSON.stringify({
        ...getAuth(),
        paypalClientId: payload.id,
        paypalClientSecret: payload.secret
      })
    );
  }

  @Mutation
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public setOngConfig(payload: any): void {
    Object.keys(payload).forEach(v => {
      this.ongConfiguration[v] = payload[v];
    });
  }

  @Mutation
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public setBlockedBySubscriptionPlan(payload: boolean): void {
    this.blockedBySubscriptionPlan = payload;
  }

  // actions
  @Action
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public updateData(payload: any): void {
    this.context.commit("setData", keysToCamel(payload));
  }

  @Action
  public async updateFeatures(): Promise<void> {
    if (this.id) {
      return await apiOngs.getAllPlatformConfig(this.id).then(
        ({
          data: {
            features: {
              causes,
              courses,
              donations,
              events,
              impact,
              market,
              partners,
              volunteers
            },
            platformConfig: {
              currency,
              currency_symbol,
              language,
              url,
              payment_method,
              active,
              powered_by_lazzaro,
              template_id
            }
          }
        }: // eslint-disable-next-line @typescript-eslint/no-explicit-any
        any) => {
          this.context.commit("setFeatures", {
            causes,
            courses,
            donations,
            events,
            impact,
            market,
            partners,
            volunteers
          });
          this.context.commit("setOngConfig", {
            currency,
            currency_symbol,
            language,
            url,
            payment_method,
            active,
            powered_by_lazzaro,
            template_id
          });
        }
      );
    }
  }

  @Action
  public async setTemplateFeatures(): Promise<void> {
    if (this.id) {
      return await apiPlatform
        .post(this.id, {
          tools: this.tools,
          style: this.style,
          domain: this.url
        })
        .then(response => this.context.commit("setSections", response.section));
    }
  }

  @Action
  public async getWebTemplateFeatures() {
    if (this.id && this.section) {
      return await apiPlatform.get(this.section.websiteId, "web");
    }
  }

  @Action
  public async refreshMemberData() {
    if (this.id) {
      return await apiOngs.getMember(this.id).then(data => {
        this.context.commit("setData", data);
      });
    }
  }
}

export default getModule(Auth);

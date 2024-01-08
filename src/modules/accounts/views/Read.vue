<template lang="pug">
.accounts-read
    //- lz-modal
    lz-modal(v-if="showPullModal" @close="onModalClose")
      h2.accounts-read-modal__title {{ $t('accounts.read.modal.title') }}
      p(v-html="$t('accounts.read.modal.subtitle')")

      article.accounts-read-modal__amount
        p.accounts-read-modal__available {{ pullAvailable - pullAvailable * 0.031 }}
        p.accounts-read-modal__available.accounts-read-modal__available--strong {{ $t('accounts.read.modal.available') }}
        p.accounts-read-modal__detail {{ pullAvailable }} {{ $t('accounts.read.modal.collected') }}
      
      p.accounts-read-modal__warn {{ $t('accounts.read.modal.warn')}}

      article.accounts-read-modal__actions
        lz-button(type="secondary" @click="onModalClose") {{ $t('common.actions.cancel') }}
        lz-button(
          type="primary"
          @click="onModalPull"
        ) {{ $t('common.actions.withdraw') }}

    header
      h1 {{ $t('accounts.read.title') }}
      p {{ $t('accounts.read.subtitle') }}

    .accounts-read__stepper
      lz-stepper(
        :steps="['all', 'projects', 'events', 'courses', 'products', 'single', 'subscriptions']"
        :active="active"
        @click="(step) => { this.active = step; }"
      )
        template(#default="{ step }") {{ $t('accounts.read.steps.' + step) }}

    section
      article.accounts-read__create-btn
        lz-button(type="primary" @click="onModalOpen" :smaller="true") {{ $t('common.actions.withdraw') }}

      lz-table(
        title=""
        :fields="listFields[active]"
        :items="computedList[active]"
      )
        template(#name="{ row: { name }}") {{ name }}
        template(#email="{ row: { email }}") {{ email }}
        template(#nif="{ row: { nif }}") {{ nif }}
        template(#item="{ row: { item }}") {{ item }}
        template(#total="{ row: { total }}") {{ total }}
        template(#date="{ row: { date }}") {{ formatDate(date) }}
        template(#certificate="{ row: { certificate }}") {{ certificate }}

</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import LzButton from "@/components/Button.vue";
  import LzTable from "@/components/Table.vue";
  import LzStepper from "@/components/Stepper.vue";
  import LzModal from "@/components/Modal.vue";
  import { apiAccounts } from "../api";
  import { namespace } from "vuex-class";
  import type VueI18n from "vue-i18n";
  type TDonation = {
    name: string;
    email: string | undefined;
    nif: string | undefined;
    item?: string;
    certificate: VueI18n.TranslateResult;
    date:string;
  };
  type TList = Record<'projects' | "events" | 'courses' | 'single' | 'products' | 'subscriptions', TDonation[]>
  const auth = namespace("auth");
  @Component({ components: { LzButton, LzTable, LzStepper, LzModal } })
  export default class Read extends Vue {
    @auth.State("id")
    public ongId!: string;
    @auth.State("walletId")
    public walletId!: string;
    @auth.State("ongConfiguration")
    public ongConfiguration!: any;
    // view
    active = "all";
    accountsQuery = "";
    wallet = {} as any;
    listFields = {
      all: [
        { id: "name", label: this.$t("accounts.read.steps.columns.name") },
        { id: "email", label: this.$t("accounts.read.steps.columns.email") },
        { id: "nif", label: "NIF" },
        { id: "total", label: this.$t("accounts.read.steps.columns.amount") },
        { id: "date", label: this.$t("accounts.read.steps.columns.date") },
        {
          id: "certificate",
          label: this.$t("accounts.read.steps.columns.certificate")
        }
      ],
      projects: [
        { id: "name", label: this.$t("accounts.read.steps.columns.name") },
        { id: "email", label: this.$t("accounts.read.steps.columns.email") },
        { id: "nif", label: "NIF" },
        { id: "item", label: this.$t("accounts.read.steps.columns.project") },
        { id: "total", label: this.$t("accounts.read.steps.columns.amount") },
        { id: "date", label: this.$t("accounts.read.steps.columns.date") },
        {
          id: "certificate",
          label: this.$t("accounts.read.steps.columns.certificate")
        }
      ],
      events: [
        { id: "name", label: this.$t("accounts.read.steps.columns.name") },
        { id: "email", label: this.$t("accounts.read.steps.columns.email") },
        { id: "nif", label: "NIF" },
        { id: "item", label: this.$t("accounts.read.steps.columns.event") },
        { id: "total", label: this.$t("accounts.read.steps.columns.amount") },
        { id: "date", label: this.$t("accounts.read.steps.columns.date") }
      ],
      courses: [
        { id: "name", label: this.$t("accounts.read.steps.columns.name") },
        { id: "email", label: this.$t("accounts.read.steps.columns.email") },
        { id: "item", label: this.$t("accounts.read.steps.columns.course") },
        { id: "total", label: this.$t("accounts.read.steps.columns.amount") },
        { id: "date", label: this.$t("accounts.read.steps.columns.date") }
      ],
      products: [
        { id: "name", label: this.$t("accounts.read.steps.columns.name") },
        { id: "email", label: this.$t("accounts.read.steps.columns.email") },
        { id: "nif", label: "NIF" },
        { id: "item", label: this.$t("accounts.read.steps.columns.item") },
        { id: "total", label: this.$t("accounts.read.steps.columns.amount") },
        { id: "date", label: this.$t("accounts.read.steps.columns.date") }
      ],
      single: [
        { id: "name", label: this.$t("accounts.read.steps.columns.name") },
        { id: "email", label: this.$t("accounts.read.steps.columns.email") },
        { id: "nif", label: "NIF" },
        { id: "total", label: this.$t("accounts.read.steps.columns.amount") },
        { id: "date", label: this.$t("accounts.read.steps.columns.date") },
        {
          id: "certificate",
          label: this.$t("accounts.read.steps.columns.certificate")
        }
      ],
      subscriptions: [
        { id: "name", label: this.$t("accounts.read.steps.columns.name") },
        { id: "email", label: this.$t("accounts.read.steps.columns.email") },
        { id: "nif", label: "NIF" },
        { id: "total", label: this.$t("accounts.read.steps.columns.amount") },
        { id: "date", label: this.$t("accounts.read.steps.columns.date") },
        {
          id: "certificate",
          label: this.$t("accounts.read.steps.columns.certificate")
        }
      ]
    };

    list: TList = {
      projects: [],
      events: [],
      subscriptions: [],
      single: [],
      products: [],
      courses: []
    };

    protected get computedList() {
      return {
        all: Object.keys(this.list)
          .reduce((acc, listItem) => acc.concat(this.list[listItem]), [] as TDonation[])
          .sort(
            (a, b) =>
              new Date(b.date).getTime() - new Date(a.date).getTime()
          ),
        ...this.list
      };
    }

    // modal
    showPullModal = false;
    pullAvailable = 0;

    onModalClose(): void {
      this.showPullModal = false;
      this.pullAvailable = 0;
    }

    onModalOpen(): void {
      if(this.ongConfiguration.payment_method === 'paypal') {
        window.open("https://www.paypal.com/mep/dashboard", "_blank");
      } else {
        window.open("https://dashboard.stripe.com/login", "_blank");
      }

      // this.pullAvailable = isNaN(this.wallet.availableBalance)
      //   ? 0
      //   : this.wallet.availableBalance;
    }

    onModalPull() {
      window.open("https://www.paypal.com/mep/dashboard", "_blank");
      this.showPullModal = false;
    }

    formatDate(date: string): string {
      const newDate = new Date(date);
      return `${newDate.getUTCDate()}/${newDate.getUTCMonth() +
        1}/${newDate.getFullYear()}`;
    }

    mounted() {
      this.getDonationsProjects();
      this.getDonationsEvents();
      this.getDonationsSubscriptions();
      this.getDonationsCourses();
      this.getDonationsProducts();
      this.getDonationsSingle();
      this.getWallet();
    }

    getWallet() {
      apiAccounts
        .getWallet(this.walletId)
        .then(response => {
          this.wallet = response;
        })
        .catch((err: any) => {
          //console.error(err);
        });
    }

    async getDonationsProjects() {
      const { data: projectDonations } = await apiAccounts.getDonationsProjects(
        this.ongId
      );

      this.list.projects = projectDonations.map(
        ({ User, Project, amount, createdAt, certificate }) => ({
          name: `${User?.firstName} ${User?.lastName}`,
          email: User?.email,
          nif: User?.nif,
          item: Project?.title,
          total: amount,
          date: createdAt,
          certificate: certificate
            ? this.$t("common.actions.yes")
            : this.$t("common.actions.no")
        })
      );
    }
    async getDonationsEvents() {
      const { data: eventDonations } = await apiAccounts.getDonationsEvents(
        this.ongId
      );
      this.list.events = eventDonations.map(
        ({ User, Event, total_amount, createdAt, certificate }) => ({
          name: `${User?.firstName} ${User?.lastName}`,
          email: User?.email,
          nif: User?.nif,
          item: Event?.title,
          total: total_amount,
          date: createdAt,
          certificate: certificate
            ? this.$t("common.actions.yes")
            : this.$t("common.actions.no")
        })
      );
    }

    async getDonationsCourses() {
      const {data:courseDonation} = await apiAccounts.getDonationsCourses(this.ongId)
      this.list.courses = courseDonation.map(
            ({ User, Event, total_amount, createdAt, certificate }) => ({
              name: `${User?.firstName} ${User?.lastName}`,
              email: User?.email,
              nif: User?.nif,
              item: Event?.title,
              total: total_amount,
              date: createdAt,
              certificate: certificate
                ? this.$t("common.actions.yes")
                : this.$t("common.actions.no")
            })
        );

        }

    async getDonationsProducts() {
      const { data:productsDonation } = await apiAccounts.getDonationsProducts(this.ongId)

        this.list.products = productsDonation.map(({User,OrderDetails,amount,createdAt,certificate}) => ({
          name: `${User?.firstName} ${User?.lastName}`,
          email: User?.email,
          nif: User?.nif,
          item : OrderDetails[0]?.Product.title,
          total : amount,
          date :createdAt,
          certificate: certificate
            ? this.$t("common.actions.yes")
            : this.$t("common.actions.no")
          })
        );
    }
    async getDonationsSingle() {
      const {data:singleDonations} = await apiAccounts.getDonationsSingle(this.ongId);

          this.list.single = singleDonations.map(({User,amount,createdAt,certificate}) => ({
          name: `${User?.firstName} ${User?.lastName}`,
          email: User?.email,
          nif: User?.nif,
          total:amount,
          date :createdAt,
          certificate: certificate
            ? this.$t("common.actions.yes")
            : this.$t("common.actions.no")
        }))
    }

    async getDonationsSubscriptions() {
      const {data: subscriptionDonations}  = await apiAccounts.getDonationsSubscriptions(this.ongId)

          this.list.subscriptions =  subscriptionDonations?.map(({User,amount,createdAt,certificate}) => ({
          name: `${User?.firstName} ${User?.lastName}`,
          email: User?.email,
          nif: User?.nif,
          total:amount,
          date :createdAt,
          certificate: certificate
            ? this.$t("common.actions.yes")
            : this.$t("common.actions.no")
        }))
    }
  }
</script>

<style lang="scss">
  .accounts-read {
    &__content {
      height: 100%;
      margin-top: 40px;

      .lz-table {
        &__th--actions {
          display: flex;
          justify-content: space-around;
          text-align: center;

          svg:hover {
            cursor: pointer;
            stroke: $color-black-01;
          }
        }
      }
    }

    .checkbox {
      label {
        color: #2c3e50 !important;
        font-weight: bold;
      }
    }

    &__table-actions {
      display: flex;
      justify-content: flex-end;
      margin: 20px 0;

      .formulate-input {
        margin-right: 20px;
      }
    }

    &__create-btn {
      text-align: left;
      margin: 0;
    }

    &__stepper {
      margin: 40px 0;
    }

    &-modal {
      &__title {
        margin: 15px 0;
      }

      &__amount {
        margin: 30px 0;
      }

      &__available {
        color: $color-black-02;
        font-size: 35px;
        font-weight: bold;
        text-align: center;

        &--strong {
          font-size: 30px;
          font-weight: 400;
        }
      }

      &__detail {
        text-align: center;
        margin: 10px 0;
      }

      &__actions {
        text-align: center;
        margin-top: 20px;
      }

      &__input {
        margin: 0 auto;
        text-align: center;
        max-width: 200px;
      }
    }
  }
</style>

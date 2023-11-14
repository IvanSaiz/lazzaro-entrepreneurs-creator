<template lang="pug">
  .user-home
    .user-home__header
      header
        h1 {{ $t('user.home.hello') }} {{ name }}!
        p {{ $t('user.home.description') }}


    //- lz-box.user-home__advice(:tight="true")
    //-   h3 {{ $t('user.home.advice.name') }}
    //-   .user-home-advice
    //-     .user-home-advice__icon
    //-       certificate-icon(size=80)
    //-     div
    //-       p.user-home-advice__title {{ $t('user.home.advice.title') }}
    //-       p.user-home-advice__description {{ $t('user.home.advice.description') }}
    //-       p.user-home-advice__more(@click="$router.push({ name: 'tip1' })") {{ $t('user.home.advice.more') }}
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import LzButton from "@/components/Button.vue";
  import LzBox from "@/components/Box.vue";
  import { namespace } from "vuex-class";
  import { apiOngs } from "../api";
  const auth = namespace("auth");

  @Component({
    components: { LzButton, LzBox }
  })
  export default class Home extends Vue {
    @auth.State("id")
    public memberId!: string;

    balance = "0";
    netBalance = "0";
    features = {};
    plan = {} as any;
    free = false;
    name = "";

    capitalizeFirstLetter(str) {
      return str.charAt(0).toUpperCase() + str.substring(1);
    }

    mounted() {
      apiOngs.getMember(this.memberId).then(data => {
        this.name = this.capitalizeFirstLetter(data.firstName);

        // apiOngs.getWallet(data.walletId).then(response => {
        //   this.balance = response.availableBalance.toString();
        //   this.netBalance = (
        //     parseInt(this.balance) -
        //     parseInt(this.balance) * 0.05
        //   ).toString();
        // });
      });
      // apiOngs.getPlatformFeatures(this.ongId).then(({ data }) => {
      //   this.features = data;
      // });
      // apiOngs.getOrganizationPlan(this.ongId).then(({ data }) => {
      //   this.plan = data;

      //   if (
      //     data.PlatformSubscription?.id ==
      //     "c02645a9-108a-4541-a031-c1a67593960e"
      //   ) {
      //     this.free = true;
      //   }
      // });
    }
  }
</script>

<style lang="scss">
  .user-home {
    display: grid;
    grid-template-areas:
      "h h h h n n"
      "p p p p n n"
      "a a a a n n"
      "t t t t n n"
      "t t t t n n";
    grid-gap: 20px;

    &__header {
      grid-area: h;
      height: 100%;
      width: 100%;
      margin-bottom: 30px;
    }

    &__advice {
      grid-area: a;
      height: 100%;
      width: 100%;

      .user-home-advice {
        display: flex;

        &__icon {
          margin: 0 40px 0 30px;

          svg {
            stroke-width: 1px;
            stroke: $color-black-02;
          }
        }

        &__title {
          color: $color-black-02;
          font-weight: 900;
          font-size: 14px;
          margin-bottom: 10px;
        }

        &__description {
          font-weight: 500;
          color: $color-black-02;
          margin-bottom: 10px;
        }

        &__more {
          color: $color-black-03;
          text-decoration: underline;
          cursor: pointer;
        }
      }
    }

    &__wallet {
      grid-area: w;
      height: 100%;
      width: 100%;
      text-align: center;

      .user-home-wallet {
        &__icon svg {
          stroke: $color-black-02;
          stroke-width: 1px;
          margin-bottom: 5px;
        }

        &__money {
          color: $color-black-02;
          font-size: 20px;
          font-weight: 700;
        }

        &__available {
          color: $color-black-03;
          font-size: 16px;
        }

        &__extra {
          color: $color-black-03;
          font-size: 10px;
          margin-top: 15px;
        }
      }
    }

    &__tools {
      grid-area: t;
      height: 100%;
      width: 100%;

      .user-home-tools {
        &__list {
          display: flex;
          flex-wrap: wrap;
          margin-top: 20px;
        }

        &__item {
          align-items: center;
          display: flex;
          font-size: 16px;
          font-weight: 700;
          flex-basis: 33%;
          margin: 10px 0;

          p {
            color: $color-black-02;
            white-space: nowrap;
          }

          svg {
            stroke: $color-black-02;
            stroke-width: 1px;
            margin-right: 10px;
          }
        }
      }
    }

    &__notifications {
      grid-area: n;
      height: 100%;
      width: 100%;

      .user-home-notification {
        margin: 20px 0;
        position: relative;
        padding-left: 25px;

        &:before {
          content: "";
          height: 10px;
          width: 10px;
          background-color: $color-purple;
          border-radius: 100%;
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
        }

        &__title {
          font-family: Muli;
          font-size: 12px;
          font-weight: 500;
          color: $color-black-02;
        }

        &__time {
          font-family: Muli;
          font-size: 10px;
          color: $color-black-01;
          font-weight: 700;
          margin-top: 5px;
        }
      }

      .user-home-notifications__bottom {
        font-size: 10px;
        text-align: center;

        strong {
          font-weight: 700;
        }
      }
    }

    &__discount {
      grid-area: d;
      height: 100%;
      width: 100%;
    }
  }
</style>

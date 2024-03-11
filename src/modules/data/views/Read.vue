<template lang="pug">
.data-read
  header
    h1 {{ $t('data.read.title') }}
    p {{ $t('data.read.subtitle') }}
  .data-read__grid
    lz-box.incomes-bar(:tight="true")
      h3 {{ $t('data.read.incomeOverTime') }}
      canvas#incomesBar
    lz-box.data.incomes-donut(:tight="true")
      h3 {{ $t('data.read.totalIncome') }}
      canvas#incomesDonut
    lz-box.data.mid.projects(:tight="true")
      .number {{ data.portfolio }}
      .text {{ $t('data.read.createdProjects') }}
      .icon
        award-icon(size=35)
    lz-box.data.mid.events(:tight="true")
      .number {{ data.events }}
      .text {{ $t('data.read.newEvents') }}
      .icon
        calendar-icon(size=35)
    lz-box.data.mid.services(:tight="true")
      .number {{ data.services }}
      .text {{ $t('data.read.services') }}
      .icon
        file-like-icon(size=35)
    lz-box.data.mid.reviews(:tight="true")
      .number {{ data.reviews }}
      .text {{ $t('data.read.reviews') }}
      .icon
        user-plus-icon(size=35)
    lz-box.data.mid.bookings(:tight="true")
      .number {{ data.reservations }}
      .text {{ $t('data.read.bookings') }}
      .icon
        clipboard-check-icon(size=35)
    lz-box.data.mid.articles(:tight="true")
      .number {{ data.articles }}
      .text {{ $t('data.read.articles') }}
      .icon
        browser-icon(size=35)
    lz-box.data.google-analytics
      formulate-input(
            type="text"
            v-model="analyticsLink"
            :label="$t('data.read.analyticsLink')"
          )
    lz-box.data.earnings(:tight="true")
      h3 {{ $t('data.read.collected') }}
      .bottom-b
        .bottom-b__icon
          wallet-icon(size=100)
        .bottom-b__count
          .bottom-b__count-total {{ data.earnings.toFixed(2) }}€
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import LzBox from "@/components/Box.vue";
  import { namespace } from "vuex-class";
  import Chart, { ChartConfiguration } from "chart.js/auto";
  import apiData from "../api";
  import VueI18n from "vue-i18n";
  const auth = namespace("auth");

  Chart.register();

  @Component({ components: { LzBox } })
  export default class Read extends Vue {
    @auth.State("id")
    public ongId!: string;

    data: DashboardData = {
      articles: 0,
      earnings: 0,
      earningsByEntityType: {
        Event: 0,
        Product: 0,
        Project: 0,
        Service: 0
      },
      earningsByMonth: {},
      events: 0,
      portfolio: 0,
      reservations: 0,
      services: 0,
      reviews: 0
    };
    analyticsLink = "";

    currentMonth = 0;

    async mounted() {
      await apiData.getDashboard(this.ongId).then(data => {
        this.data = { ...this.data, ...data };
      });

      // incomes bar chart
      const barCtx = (document.getElementById(
        "incomesBar"
      ) as HTMLCanvasElement)?.getContext("2d");

      if (!barCtx) return;

      const incomeLabels = Object.keys(this.data.earningsByMonth);
      const incomeData = Object.values(this.data.earningsByMonth);

      new Chart(barCtx, {
        type: "bar",
        legend: {
          display: false
        },
        data: {
          labels: incomeLabels,
          title: null,
          datasets: [
            {
              data: incomeData,
              backgroundColor: ["#8D00D8"],
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true
            }
          },
          plugins: {
            legend: {
              display: false
            }
          }
        }
      } as ChartConfiguration);

      const ctxIncomesDonut = (document.getElementById(
        "incomesDonut"
      ) as HTMLCanvasElement)?.getContext("2d");

      if (!ctxIncomesDonut) return;

      const doughnutLabelsMap: Record<EntityType, VueI18n.TranslateResult> = {
        Event: this.$t("data.read.labels.events"),
        Product: this.$t("data.read.labels.shop"),
        Project: this.$t("data.read.labels.projects"),
        Service: this.$t("data.read.labels.services")
      };

      const [doughnutLabels, doughnutData] = Object.entries(
        this.data.earningsByEntityType
      ).reduce(
        ([labels, data], [key, value]) => {
          labels.push(doughnutLabelsMap[key as EntityType]);
          data.push(value);
          return [labels, data];
        },
        [[], []] as [VueI18n.TranslateResult[], number[]]
      );

      const colorsMap: Record<EntityType, string> = {
        Event: "#0093A7",
        Product: "#8D00D8",
        Project: "#0CF2B4",
        Service: "#EB2873"
      };
      const colors = Object.keys(this.data.earningsByEntityType).map(
        key => colorsMap[key as EntityType]
      );

      new Chart(ctxIncomesDonut, {
        type: "doughnut",
        data: {
          labels: doughnutLabels,
          datasets: [
            {
              data: doughnutData,
              backgroundColor: colors,
              borderColor: colors,
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "right",
              labels: {
                usePointStyle: true,
                padding: 20,
                font: {
                  size: 12
                }
              }
            },
            paddingBelowLegends: false
          }
        }
      } as ChartConfiguration);
    }
  }
</script>

<style lang="scss">
  .data-read {
    &__grid {
      display: grid;
      grid-template-areas:
        "a a a a a b b b b"
        "a a a a a b b b b"
        "a a a a a b b b b"
        "c c c d d d e e e"
        "f f f g g g h h h"
        "i i i i i j j j j"
        "i i i i i j j j j";
      grid-gap: 20px;
      margin-top: 30px;
      grid-auto-rows: 80px;

      & > * {
        width: 100%;
        height: 100%;
      }
    }

    .incomes-bar {
      grid-area: a;
      overflow: hidden;

      canvas {
        margin: 20px 0;
      }
    }

    .incomes-donut {
      grid-area: b;
      overflow: hidden;

      canvas {
        margin: 20px 0;
      }
    }

    .data.mid {
      align-items: center;
      display: flex;
      justify-content: space-between;
      gap: 5px;
      max-width: 100%;
      /* max-height: 70px; */

      .number,
      .text {
        color: $color-black-02;
        line-height: 20px;
      }

      .number {
        font-weight: 600;
        font-size: 32px;
      }

      .text {
        font-size: 18px;
        max-width: 100px;
      }

      .icon svg {
        stroke: $color-black-02;
        stroke-width: 1.5;
      }
    }

    .data.projects {
      grid-area: c;
    }

    .data.events {
      grid-area: d;
    }

    .data.services {
      grid-area: e;
    }

    .data.reviews {
      grid-area: f;
    }

    .data.bookings {
      grid-area: g;
    }

    .data.articles {
      grid-area: h;
    }

    .data.google-analytics {
      grid-area: i;
      height: fit-content;
      padding: 25px 30px;

      label {
        font-weight: 700;
      }
    }

    .data.earnings {
      grid-area: j;
      display: flex;
      flex-direction: column;

      .bottom-b {
        display: flex;
        align-items: center;
        justify-content: space-between;

        &__icon svg {
          stroke: $color-black-02;
          margin-right: 20px;
        }

        &__count {
          text-align: right;
        }

        &__count-total {
          color: $color-black-02;
          font-size: 40px;
          font-weight: 700;
        }

        &__count-detail {
          font-size: 10px;
          margin-top: 10px;
          margin-bottom: 20px;
        }

        &__link {
          font-size: 10px;
          text-decoration: underline;
          cursor: pointer;
        }
      }
    }

    &__bottom-c {
      grid-area: i;
      overflow: hidden;
      max-height: 200px;

      canvas {
        margin: 20px 0;
      }
    }
  }
</style>

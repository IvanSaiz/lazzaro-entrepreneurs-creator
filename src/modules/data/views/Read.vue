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
      .number {{ projects }}
      .text {{ $t('data.read.createdProjects') }}
      .icon
        award-icon(size=35)
    lz-box.data.mid.events(:tight="true")
      .number {{ events }}
      .text {{ $t('data.read.newEvents') }}
      .icon
        calendar-icon(size=35)
    lz-box.data.mid.services(:tight="true")
      .number {{ services }}
      .text {{ $t('data.read.services') }}
      .icon
        file-like-icon(size=35)
    lz-box.data.mid.reviews(:tight="true")
      .number {{ reviews }}
      .text {{ $t('data.read.reviews') }}
      .icon
        user-plus-icon(size=35)
    lz-box.data.mid.bookings(:tight="true")
      .number {{ bookings }}
      .text {{ $t('data.read.bookings') }}
      .icon
        clipboard-check-icon(size=35)
    lz-box.data.mid.articles
      .number {{ articles }}
      .text {{ $t('data.read.articles') }}
      .icon
        browser-icon(size=35)
    lz-box.data.google-analytics(:tight="true")
    lz-box.data.earnings(:tight="true")
      h3 {{ $t('data.read.collected') }}
      .bottom-b
        .bottom-b__icon
          wallet-icon(size=100)
        .bottom-b__count
          .bottom-b__count-total {{ (currentMonth * 0.95).toFixed(2) }}€
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import LzBox from "@/components/Box.vue";
  import { namespace } from "vuex-class";
  import Chart, { ChartConfiguration } from "chart.js/auto";
  import apiData from "../api";
  const auth = namespace("auth");

  Chart.register();

  @Component({ components: { LzBox } })
  export default class Read extends Vue {
    @auth.State("id")
    public ongId!: string;

    earningsByMonth: Record<string, number>;
    incomesDoughnoutData: any[] = [];
    donationsDoughnoutData: any[] = [];

    projects = 0;
    events = 0;
    services = 0;
    reviews = 0;
    bookings = 0;
    articles = 0;

    currentMonth = 0;

    async mounted() {
      await apiData.getDashboard(this.ongId).then(data => {
        this.projects = +data.portfolio;
        this.services = +data.services;
        this.reviews = 0; // TODO: define where these come from
        this.events = +data.events;
        this.bookings = +data.reservations;
        this.earningsByMonth = data.earningsByMonth;
      });

      // incomes bar chart
      const barCtx = (document.getElementById(
        "incomesBar"
      ) as HTMLCanvasElement)?.getContext("2d");

      if (!barCtx) return;

      const incomeLabels = Object.keys(this.earningsByMonth);
      const incomeData = Object.values(this.earningsByMonth);

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

      new Chart(ctxIncomesDonut, {
        type: "doughnut",
        data: {
          labels: [
            this.$t("data.read.labels.services"),
            this.$t("data.read.labels.events"),
            this.$t("data.read.labels.projects"),
            this.$t("data.read.labels.shop")
          ],
          datasets: [
            {
              data: this.incomesDoughnoutData,
              backgroundColor: [
                "#EB2873",
                "#FF4863",
                "#FF7456",
                "#0CF2B4",
                "#8D00D8"
              ],
              borderColor: [
                "#EB2873",
                "#FF4863",
                "#FF7456",
                "#0CF2B4",
                "#8D00D8"
              ],
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
        "c c c d d d e e e"
        "f f f g g g h h h"
        "i i i i j j j j j"
        "i i i i j j j j j";
      grid-gap: 20px;
      margin-top: 30px;

      & > * {
        width: 100%;
        height: 100%;
      }
    }

    .incomes-bar {
      grid-area: a;
      max-height: 300px;
      overflow: hidden;

      canvas {
        margin: 20px 0;
      }
    }

    .incomes-donut {
      grid-area: b;
      max-height: 300px;
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
    }

    .data.earnings {
      grid-area: j;

      .bottom-b {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 30px;

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

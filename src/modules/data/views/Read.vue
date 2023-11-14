<template lang="pug">
  .data-read
    header
      h1 {{ $t('data.read.title') }}
      p {{ $t('data.read.subtitle') }}

    .data-read__grid
      lz-box.data-read__incomes-bar(:tight="true")
        h3 {{ $t('data.read.incomeOverTime') }}
        canvas#incomesBar
      lz-box.data-read__incomes-donut(:tight="true")
        h3 {{ $t('data.read.totalIncome') }}
        canvas#incomesDonut
      lz-box.data-read__mid.data-read__mid-a(:tight="true")
        .data-read__mid-number {{ projectsCount }}
        .data-read__mid-text {{ $t('data.read.createdProjects') }}
        .data-read__mid-icon
          award-icon(size=35)

      lz-box.data-read__mid.data-read__mid-b(:tight="true")
        .data-read__mid-number {{ eventsCount }}
        .data-read__mid-text {{ $t('data.read.newEvents') }}
        .data-read__mid-icon
          calendar-icon(size=35)

      lz-box.data-read__mid.data-read__mid-c(:tight="true")
        .data-read__mid-number {{ coursesCount }}
        .data-read__mid-text {{ $t('data.read.newCourses') }}
        .data-read__mid-icon
          certificate-icon(size=35)

      lz-box.data-read__mid.data-read__mid-d(:tight="true")
        .data-read__mid-number {{ subscriptionsCount }}
        .data-read__mid-text {{ $t('data.read.totalPartners') }}
        .data-read__mid-icon
          user-plus-icon(size=35)

      lz-box.data-read__mid.data-read__mid-e(:tight="true")
        .data-read__mid-number {{ donationsCount }}
        .data-read__mid-text {{ $t('data.read.newDonations') }}
        .data-read__mid-icon
          currency-bitcoin-icon(size=35)
      //- lz-box.data-read__bottom-a(:tight="true")
      lz-box.data-read__bottom-b(:tight="true")
        h3 {{ $t('data.read.collected') }}
        .bottom-b
          .bottom-b__icon
            wallet-icon(size=100)
          .bottom-b__count
            .bottom-b__count-total {{ (currentMonth * 0.95).toFixed(2) }}€
            .bottom-b__count-detail {{ currentMonth.toFixed(2) }} {{ $t('data.read.currentCollected') }}
            .bottom-b__link(@click="$router.push({ name: 'accountsRead' })") {{ $t('data.read.withdraw') }}

      lz-box.data-read__bottom-c(:tight="true")
        h3 {{ $t('data.read.totalDonors') }}
        canvas#donationsDonut
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

    incomesBarData: any[] = [];
    incomesBarLabels: any[] = [];
    incomesDoughnoutData: any[] = [];
    donationsDoughnoutData: any[] = [];

    coursesCount = 0;
    donationsCount = 0;
    eventsCount = 0;
    projectsCount = 0;
    subscriptionsCount = 0;

    currentMonth = 0;

    async mounted() {
      await apiData.getDashboard(this.ongId).then(({ data }: any) => {
        this.coursesCount = +data.countOfCourses;
        this.donationsCount = +data.countOfDonations;
        this.eventsCount = +data.countOfEvents;
        this.projectsCount = +data.countOfProjects;
        this.subscriptionsCount = +data.countOfSubscriptions;
      });
      await apiData.getStatistics(this.ongId).then(({ data }: any) => {
        const fullYear = new Date().getFullYear();
        const month = new Date().getMonth();

        for (const year of [fullYear - 1, fullYear]) {
          for (const [monthName, monthValue] of Object.entries(data[year])) {
            this.incomesBarData.push((monthValue as any).totalAmount);
            this.incomesBarLabels.push(`${monthName.substring(0, 3)} ${year}`);
          }
        }

        this.incomesDoughnoutData.push(
          ...[
            data.incomes.incomesProjects,
            data.incomes.incomesEvents,
            data.incomes.incomesCourses,
            data.incomes.incomesSubscriptions,
            data.incomes.incomesDonations
          ]
        );

        this.currentMonth = (Object.entries(data[fullYear])[month][1] as any)
          .totalAmount as number;
        //labels: ["Proyectos", "Eventos", "Cursos", "Socios", "Donaciones"],

        this.donationsDoughnoutData.push(
          ...[
            data.donations.projects,
            data.donations.events,
            data.donations.courses,
            data.donations.subscriptions,
            data.donations.donations
          ]
        );
      });

      // incomes bar chart
      const ctx = (document.getElementById(
        "incomesBar"
      ) as HTMLCanvasElement)?.getContext("2d");

      if (!ctx) return;

      new Chart(ctx, {
        type: "bar",
        legend: {
          display: false
        },
        data: {
          labels: this.incomesBarLabels,
          title: null,
          datasets: [
            {
              data: this.incomesBarData,
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
            this.$t("data.read.labels.projects"),
            this.$t("data.read.labels.events"),
            this.$t("data.read.labels.courses"),
            this.$t("data.read.labels.partners"),
            this.$t("data.read.labels.donations")
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

      const ctxDonationsDonut = (document.getElementById(
        "donationsDonut"
      ) as HTMLCanvasElement)?.getContext("2d");

      if (!ctxDonationsDonut) return;

      new Chart(ctxDonationsDonut, {
        type: "doughnut",
        data: {
          labels: [
            this.$t("data.read.labels.projects"),
            this.$t("data.read.labels.events"),
            this.$t("data.read.labels.courses"),
            this.$t("data.read.labels.partners"),
            this.$t("data.read.labels.donations")
          ],
          datasets: [
            {
              data: this.donationsDoughnoutData,
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
                padding: 10,
                font: {
                  size: 10
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
        "a a a a a a b b b b"
        "c c d d e e f f z z"
        "g g g h h h h i i i"
        "g g g h h h h i i i";
      grid-gap: 20px;
      margin-top: 30px;

      & > * {
        width: 100%;
        height: 100%;
      }
    }

    &__incomes-bar {
      grid-area: a;
      max-height: 300px;
      overflow: hidden;

      canvas {
        margin: 20px 0;
      }
    }

    &__incomes-donut {
      grid-area: b;
      max-height: 300px;
      overflow: hidden;

      canvas {
        margin: 20px 0;
      }
    }

    &__mid {
      align-items: center;
      display: flex;
      justify-content: flex-start;
      gap: 5px;
      max-width: 100%;

      &-number,
      &-text {
        color: $color-black-02;
        line-height: 20px;
      }

      &-number {
        font-weight: 700;
        font-size: 25px;
      }

      &-text {
        font-size: 14px;
        flex: 1;
        padding: 0 10px;
        max-width: 100px;
      }

      &-icon svg {
        stroke: $color-black-02;
        stroke-width: 1.5;
      }
    }

    &__mid-a {
      grid-area: c;
    }

    &__mid-b {
      grid-area: d;
    }

    &__mid-c {
      grid-area: e;
    }

    &__mid-d {
      grid-area: f;
    }

    &__mid-e {
      grid-area: z;
    }

    &__bottom-a {
      grid-area: g;
    }

    &__bottom-b {
      grid-area: h;

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

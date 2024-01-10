<template lang="pug">
.calendar-read
  header
    h1 {{ $t('events.read.title') }}
    p {{ $t('events.read.subtitle') }}
  .content
    input.searchbar(
      type="text"
      :placeholder="$t('events.read.search.placeholder').toString()"
      @keyup.enter="search"
    )
    ul.search-results
  .create-btn
    lz-button(
      type="primary"
      @click="createEvent"
    )
      | {{ $t('events.read.createNewBtn') }}
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import LzButton from "@/components/Button.vue";
  import SearchEvent from "@/components/SearchEvent.vue";
  import { namespace } from "vuex-class";
  import { api as Events } from "../api";
  import { ROUTES } from "../router";
  const auth = namespace("auth");

  @Component({ components: { LzButton, SearchEvent } })
  export default class Read extends Vue {
    @auth.State("id")
    public memberId!: string;

    createEvent() {
      this.$router.push({
        name: ROUTES.CREATE
      });
    }

    events: CalendarEvent[] = [];

    search(e: KeyboardEvent) {
      const target = e.target as HTMLInputElement;
      const searchText = target.value;
      console.log(searchText);
    }

    mounted() {
      // apiEvents.getEvents(this.ongId).then(data => {
      //   console.log(data);
      // });
      Events.getAllByMemberId(this.memberId).then(data => {
        this.events = data;
      });
    }
  }
</script>

<style lang="scss">
  .calendar-read {
    .content {
      height: 100%;
      margin-top: 40px;
    }

    .event {
      font-size: 14px;
      cursor: pointer;
      margin: 6px 0;
      padding: 10px;
      border: 1px solid $color-pink;
      border-radius: $border-radius-default;
      text-overflow: ellipsis;
      overflow: hidden;

      &:hover {
        color: $color-pink;
      }
    }

    .search {
      border: 1px solid $color-pink;
    }

    .day {
      font-family: Muli;
      font-size: 12px;
      height: 80px;
      overflow: hidden;
      padding: 14px;
      pointer-events: none;

      &--attrs {
        pointer-events: initial;

        &:hover {
          cursor: pointer;
          border: 1px solid $color-pink;
          background-color: $color-black-06;
        }
      }
    }

    .number {
      color: $color-black-04;
      margin-bottom: 10px;
      position: relative;
      text-align: right;
    }

    .item {
      display: flex;
      align-items: center;
    }

    .title {
      overflow: hidden;
      padding: 2px 0;
      text-overflow: ellipsis;
      width: 100%;
      word-break: normal;
      white-space: nowrap;
    }

    .dot {
      margin-right: 5px;
    }

    .vc-day {
      max-width: 100%;
      overflow: hidden;
      border-top: 1px solid $color-black-05;
      border-left: 1px solid $color-black-05;

      &.on-left {
        border-left: 0px;
      }
    }

    .vc-container {
      width: 100%;
      border-radius: 0px;
    }

    .vc-weeks {
      padding: 0;
    }

    .vc-weekday {
      padding: 15px 0;
    }

    .vc-dots {
      display: none;
    }

    .in-next-month,
    .in-previous-month {
      .calendar-read {
        .day,
        .number {
          opacity: 1;
        }

        .day {
          background-color: $color-black-07;
        }

        .number {
          color: $color-black-05;
        }
      }
    }

    .create-btn {
      text-align: right;
    }

    .search-results {
      margin-bottom: 10px;
      width: 35rem;
      ul {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-template-rows: repeat(5, 1fr);
        grid-column-gap: 0px;
        grid-row-gap: 0px;
      }

      li {
        display: flex;

        align-items: center;
        padding: 5px;
        background-color: #ffffff;
        border: 1px solid $color-black-04;
        border-radius: 4px;
        margin-bottom: 5px;

        &:hover {
          cursor: pointer;
          border: 1px solid $color-pink;
          background-color: $color-black-06;
        }

        .dot {
          margin-right: 10px;
        }

        .title {
          grid-area: 1 / 1 / 2 / 4;
          flex-grow: 1;
          border-radius: 8px;
          padding: 8px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .details-button {
          padding: 5px 0px;
          width: 100px;
          grid-area: 1 / 5 / 2 / 6;

          border: 1px solid $color-pink;
          background-color: #fff;
          color: $color-pink;
          margin-left: 6rem;
          border-radius: $border-radius-default;
          cursor: pointer;

          &:hover {
            color: $color-pink;
            font-weight: bold;
          }
          &:focus {
            outline: none;
            box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.5);
          }
        }
      }
    }
  }
</style>

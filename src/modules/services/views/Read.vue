<template lang="pug">
  .calendar-read
    lz-modal(v-if="showDayModal" @close="closeModal(); resetCurrentDay()")
      h2 {{ this.currentDay.day.ariaLabel }}
      .calendar-read__event(
        v-for="itemAttr in this.currentDay.attributes"
        @click="showCalendarDetail(itemAttr.key)"
      ) {{ getAttributeDescription(itemAttr) }}

    header
      h1 {{ $t('services.read.title') }}
      p {{ $t('services.read.subtitle') }}
      SearchEvent(@search="handleSearchEvent")

    .calendar-read__content
      ul.calendar-read__search-results
        li.calendar-read__search-result(v-for="attribute in filteredAttributes" :key="attribute.key")
          span.calendar-read__dot
            component(:is="attribute.customData.icon" size=12 :stroke="getAttributeColor(attribute)")
            span.calendar-read__title
              | {{ getAttributeTitle(attribute) }} - {{ formatDate(attribute.dates) }}
              button.calendar-read__details-button(@click.stop="showCalendarDetail(attribute.key)") Show Details 

      v-calendar(
        is-expanded
        :first-day-of-week="2"
        locale="es"
        :attributes="attributes"
      )
        template(v-slot:day-content='{ day, attributes }')
          article.calendar-read__day(
            @click="() => { setCurrentDay(day, attributes); openModal(); }"
            :class="{ 'calendar-read__day--attrs': attributes && attributes.length > 0 }"
          )
            .calendar-read__number {{ day.label }}
            .calendar-read__item(v-for="itemAttr in attributes")
              .calendar-read__dot
                component(:is="itemAttr.customData.icon" size=12 :stroke="getAttributeColor(itemAttr)")
              .calendar-read__title {{ getAttributeDescription(itemAttr) }}

    .calendar-read__create-btn
      lz-button(
        type="primary"
        @click="() => { this.$router.push({ name: 'calendarCreate' }); }"
      )
        | {{ $t('services.read.createNewBtn') }}
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import LzButton from "@/components/Button.vue";
  import LzModal from "@/components/Modal.vue";
  import { namespace } from "vuex-class";
  import VCalendar from "v-calendar/lib/components/calendar.umd";
  import { apiServices } from "../api";
  import SearchEvent from "@/components/SearchEvent.vue";
  import _ from "lodash";
  import { CalendarEvents } from "@/events";
  const auth = namespace("auth");

  @Component({ components: { LzButton, VCalendar, LzModal, SearchEvent } })
  export default class Read extends Vue {
    @auth.State("id")
    public ongId!: string;

    getAttributeDescription(attribute: any) {
      return attribute?.customData?.title || "";
    }

    getAttributeColor(attribute: any) {
      return attribute?.customData?.dot;
    }

    getAttributeTitle(attribute: any) {
      return attribute?.customData?.title || "";
    }

    showCalendarDetail(eventId: string) {
      this.$router.push({
        name: "calendarCreate",
        params: { eventId }
      });
    }

    openModal() {
      this.showDayModal = true;
    }
    showSearchModal = false;

    formatDate(date: string) {
      const attributeDate = new Date(date);
      const formattedDate = attributeDate.toLocaleDateString("es-ES", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric"
      });

      return formattedDate;
    }

    closeModal() {
      this.showDayModal = false;
    }

    setCurrentDay(day: any, attributes: any) {
      this.currentDay.day = day;
      this.currentDay.attributes = attributes;
    }

    resetCurrentDay() {
      this.currentDay.day = null;
      this.currentDay.attributes = null;
    }

    events = [] as any;
    courses = [] as any;

    showDayModal = false;
    currentDay = {
      day: null,
      attributes: null
    };

    get attributes(): any[] {
      return [
        // EVENTS
        ...this.events.map((event: any) =>
          this.getCalendarItem(
            event.id,
            event.title,
            event.salesStartDate,
            "purple",
            event,
            "ArrowBarToRightIcon"
          )
        ),
        ...this.events.map((event: any) =>
          this.getCalendarItem(
            event.id,
            event.title,
            event.salesEndDate,
            "purple",
            event,
            "ArrowBarToLeftIcon"
          )
        ),
        ...this.events.map((event: any) =>
          this.getCalendarItem(
            event.id,
            event.title,
            event.start_time,
            "green",
            event,
            "ArrowBarRightIcon"
          )
        ),
        ...this.events.map((event: any) =>
          this.getCalendarItem(
            event.id,
            event.title,
            event.end_time,
            "green",
            event,
            "ArrowBarLeftIcon"
          )
        )

        // COURSES
        /*
        ...this.courses.map((event: any) =>
          this.getCalendarItem(
            event.id,
            event.title,
            event.salesStartDate,
            "green",
            event,
            "ArrowBarToLeftIcon"
          )
        ),
        ...this.courses.map((event: any) =>
          this.getCalendarItem(
            event.id,
            event.title,
            event.salesEndDate,
            "green",
            event,
            "ArrowBarToRightIcon"
          )
        ),
        ...this.courses.map((event: any) =>
          this.getCalendarItem(
            event.id,
            event.title,
            event.start_time,
            "green",
            event,
            "ArrowBarRightIcon"
          )
        ),
        ...this.courses.map((event: any) =>
          this.getCalendarItem(
            event.id,
            event.title,
            event.end_time,
            "green",
            event,
            "ArrowBarLeftIcon"
          )
        )
        */
      ];
    }

    getCalendarItem(
      key: string,
      title: string,
      date: string,
      color: string,
      item: any,
      icon: string
    ) {
      if (this.getValidDate(date)) {
        return {
          key,
          dates: new Date(this.getValidDate(date)),
          popover: {
            label: title
          },
          customData: {
            ...item,
            dot: color,
            icon
          }
        };
      }
    }

    sortedSearchedAttributes(attributes: CalendarEvents) {
      const uniqueFilteredAttrs = _.uniqBy(attributes, "dates");
      const sortedByDate = _.sortBy(
        uniqueFilteredAttrs,
        event => new Date(event.dates)
      );
      return sortedByDate;
    }

    searchText = "";
    filteredAttributes: any = [];
    handleSearchEvent(searchText: string) {
      this.searchText = searchText;

      if (this.searchText.trim() !== "") {
        const duplicatedFilteredAttrs = this.attributes.filter(
          (attribute: any) =>
            this.getAttributeDescription(attribute)
              .toLowerCase()
              .includes(this.searchText.toLowerCase())
        );

        this.filteredAttributes = this.sortedSearchedAttributes(
          duplicatedFilteredAttrs
        );
      } else {
        this.filteredAttributes = this.sortedSearchedAttributes(
          this.attributes
        );
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getValidDate(date: any): any {
      const d = date.split("-");
      if (d.length > 1) {
        return [d[0], d[1], d[2]].join("/");
      }
    }

    mounted() {
      const today = new Date();
      apiServices.getEvents(this.ongId).then(({ data }) => {
        this.events = data;
        apiServices.getCourses(this.ongId).then(({ data }) => {
          data.forEach((item: object) => {
            this.events.push(item);
          });
        });
      });
    }
  }
</script>

<style lang="scss">
  .calendar-read {
    &__content {
      height: 100%;
      margin-top: 40px;
    }

    &__event {
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

    &__search {
      border: 1px solid $color-pink;
    }

    &__day {
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

    &__number {
      color: $color-black-04;
      margin-bottom: 10px;
      position: relative;
      text-align: right;
    }

    &__item {
      display: flex;
      align-items: center;
    }

    &__title {
      overflow: hidden;
      padding: 2px 0;
      text-overflow: ellipsis;
      width: 100%;
      word-break: normal;
      white-space: nowrap;
    }

    &__dot {
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
        &__day,
        &__number {
          opacity: 1;
        }

        &__day {
          background-color: $color-black-07;
        }

        &__number {
          color: $color-black-05;
        }
      }
    }

    &__create-btn {
      text-align: right;
    }

    &__search-results {
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

        .calendar-read__dot {
          margin-right: 10px;
        }

        .calendar-read__title {
          grid-area: 1 / 1 / 2 / 4;
          flex-grow: 1;
          border-radius: 8px;
          padding: 8px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .calendar-read__details-button {
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

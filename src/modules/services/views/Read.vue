<template lang="pug">
.calendar-read
  header
    .title
      h1 {{ $t('services.read.title') }}
      formulate-input(type="toggle" name="active" v-on="handleToggle")
      .view-btn
        a(href="" target="_blank") {{ $t('services.read.see') }}
        arrow-up-right-icon
    p {{ $t('services.read.subtitle') }}
  .content
    iframe.calendar(:src="selectedService.calendly_url" )
    .search
      h2 {{ $t('services.read.search.title') }}
      SearchEvent(@search="handleSearch")
      ul.results
        li(v-for="service in services" :key="service.id" @click="selectService(service)")
          p.name {{ service.service_name }}
          button.edit-button(@click="edit(service.id)")
            edit-icon
  .create-btn
    lz-button(
      type="primary"
      @click="() => { this.$router.push({ name: 'serviceCreate' }); }"
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
  const auth = namespace("auth");

  @Component({ components: { LzButton, VCalendar, LzModal, SearchEvent } })
  export default class Read extends Vue {
    @auth.State("organizationId")
    private ongId!: string;

    public services = [] as Service[];

    async mounted() {
      await this.loadServices();
    }

    async loadServices() {
      if (!this.ongId) return;

      const services = await apiServices.getAllByOngId(this.ongId).catch(() => {
        this.$notify({
          type: "error",
          text: this.$tc("common.error.generic")
        });
      });

      if (services) {
        this.services = services;
      }
    }

    showDayModal = false;
    searchText = "";

    showSearchModal = false;
    openModal() {
      this.showDayModal = true;
    }
    closeModal() {
      this.showDayModal = false;
    }

    edit(serviceId: string) {
      this.$router.push({
        name: "serviceCreate",
        params: { serviceId }
      });
    }

    handleToggle() {
      // HANDLE TOGGLE
    }

    handleSearch(text: string) {
      // HANDLE SEARCH
    }

    selectedService = {} as Service;
    selectService(service: Service) {
      this.selectedService = service;
    }
  }
</script>

<style lang="scss">
  .calendar-read {
    header {
      .title {
        display: flex;
        gap: 18px;
        align-items: center;

        .view-btn {
          font-size: medium;
          align-self: flex-end;
          margin-left: auto;
          display: flex;
          align-items: center;
        }
      }
    }

    .search {
      background-color: white;
      padding: 34px;
      border-radius: 2rem;

      .results {
        margin-top: 20px;

        li {
          display: flex;
          padding: 20px 25px;
          border-radius: 10px;
          background-color: $color-black-06;
          align-items: center;
          cursor: pointer;

          .name {
            font-size: 14px;
            font-weight: bold;
            user-select: none;
          }

          .edit-button {
            margin-left: auto;
            display: flex;
            align-items: center;
            gap: 10px;
            border: none;
            background-color: transparent;
            cursor: pointer;
          }
        }
      }
    }

    .create-btn {
      text-align: right;
    }

    .content {
      margin-top: 40px;
      display: grid;
      grid-template-columns: 3fr 2fr;

      .calendar {
        min-width: 100%;
        min-height: 700px;
      }
    }
  }
</style>

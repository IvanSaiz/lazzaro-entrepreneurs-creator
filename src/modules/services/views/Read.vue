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
    design-modal(section="services")
  .content
    .search
      SearchEvent(:placeholder="$t('services.read.search')" @search="handleSearch")
      ul.results
        li(v-for="service in searchResults" :key="service.id")
          p.name {{ service.service_name }}
          .buttons
            button.delete-button(@click="deleteService(service.id)")
              trash-icon
            button.edit-button(@click="edit(service.id)")
              edit-icon
  .create-btn
    lz-button(
      type="primary"
      @click="create"
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
  import DesignModal from "../components/DesignModal.vue";
  const auth = namespace("auth");

  @Component({
    components: { LzButton, VCalendar, LzModal, SearchEvent, DesignModal }
  })
  export default class Read extends Vue {
    @auth.State("id")
    private memberId!: string;

    public services = [] as Service[];

    async mounted() {
      await this.loadServices();
    }

    async loadServices() {
      if (!this.memberId) return;

      const services = await apiServices
        .getAllByMemberId(this.memberId)
        .catch(() => {
          this.$notify({
            type: "error",
            text: this.$tc("common.error.generic")
          });
        });

      if (services) {
        this.services = services;
      }
    }

    create() {
      this.$router.push({ name: "servicesCreate" });
    }
    edit(serviceId: string) {
      this.$router.push({
        name: "servicesCreate",
        params: { serviceId }
      });
    }
    async deleteService(serviceId: string) {
      await apiServices
        .delete(serviceId)
        .then(() => {
          this.loadServices();
          this.$notify({
            type: "success",
            text: this.$tc("services.create.notifications.removed")
          });
        })
        .catch(() => {
          this.$notify({
            type: "error",
            text: this.$tc("common.error.generic")
          });
        });
    }

    handleToggle() {
      // HANDLE TOGGLE
    }

    query = "";
    get searchResults() {
      return this.services.filter(service =>
        service.service_name.toLowerCase().includes(this.query.toLowerCase())
      );
    }
    handleSearch(text: string) {
      this.query = text;
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
          margin-bottom: 15px;

          .name {
            font-size: 14px;
            font-weight: bold;
            user-select: none;
            cursor: pointer;
          }

          .buttons {
            margin-left: auto;
            display: flex;
            button {
              display: flex;
              align-items: center;
              border: none;
              background-color: transparent;
              cursor: pointer;
            }
          }
        }
      }
    }

    .create-btn {
      text-align: right;
    }

    .content {
      margin-top: 40px;
    }
  }
</style>

<template lang="pug">
.events-read
  header
    h1 {{ $t('events.read.title') }}
    p {{ $t('events.read.subtitle') }}
  LzModal(v-if="deleteModalOpen" @close="() => (this.deleteModalOpen = false)")
    h2 {{ $t('events.read.deleteModal.title') }}
    p {{ $t('events.read.deleteModal.subtitle') }}
    .actions
      LzButton(type="secondary" @click="$emit('cancel')")
        | {{ $t('common.actions.cancel') }}
      LzButton(type="primary" @click="$emit('confirm')")
        | {{ $t('common.actions.delete') }}
  DesignModal(section="events")
  .content 
    .search
      SearchEvent(:placeholder="$t('events.read.search.placeholder')" @search="handleSearch")
      ul.results
        li(v-for="event in searchResults" :key="event.id")
          p.name {{ event.name }}
          .buttons
            button.delete-button(@click="deleteEvent(event.id)")
              trash-icon
            button.edit-button(@click="edit(event.id)")
              edit-icon
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
  import DesignModal from "../components/DesignModal.vue";
  import LzModal from "@/components/Modal.vue";
  const auth = namespace("auth");

  @Component({ components: { LzButton, SearchEvent, DesignModal, LzModal } })
  export default class Read extends Vue {
    @auth.State("id")
    public memberId!: string;
    public events: CalendarEvent[] = [];
    deleteModalOpen = false;

    async mounted() {
      await this.loadEvents();
    }

    async loadEvents() {
      if (!this.memberId) return;
      const events = await Events.getAllByMemberId(this.memberId);
      if (events) {
        this.events = events;
      }
    }

    query = "";
    get searchResults() {
      return this.events.filter(event =>
        event.name.toLowerCase().includes(this.query.toLowerCase())
      );
    }
    handleSearch(text: string) {
      this.query = text;
    }

    createEvent() {
      this.$router.push({
        name: ROUTES.CREATE
      });
    }

    edit(eventId: string) {
      this.$router.push({
        name: ROUTES.CREATE,
        params: { eventId }
      });
    }

    async confirm(): Promise<boolean> {
      this.deleteModalOpen = true;

      return new Promise(res => {
        this.$on("confirm", () => {
          this.deleteModalOpen = false;
          res(true);
        });
        this.$on("cancel", () => {
          this.deleteModalOpen = false;
          res(false);
        });
      });
    }

    async deleteEvent(id: string) {
      // If the user cancels, we don't want to delete the event
      if (!(await this.confirm())) return;

      Events.delete(id)
        .then(() => {
          this.$notify({
            type: "success",
            text: this.$tc("events.read.notifications.removed")
          });
          this.loadEvents();
        })
        .catch(() => {
          this.$notify({
            type: "error",
            text: this.$tc("common.error.generic")
          });
        });
    }
  }
</script>

<style lang="scss">
  .events-read {
    .content {
      height: 100%;
      margin-top: 40px;

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
  }
</style>

<template lang="pug">
.calendar-create
  header
    h1 {{ $t('events.create.title') }}
    p {{ $t('events.create.subtitle') }}

    formulate-form(v-model="form" name="form" @submit="onSave" v-if="loaded")
      section.calendar-general
        .calendar-general__header
          h2.h2--dash {{ $t('events.create.generalForm.title') }}
        .calendar-general__section
          .calendar-general__section--left
            .form__row
              formulate-input(
                type="image"
                name="main_image"
                :v-model="form.main_image"
                :label="$t('events.create.generalForm.mainImg')"
                :label-class="['required']"
                validation="required|mime:image/jpeg,image/png"
                :validation-name="$t('events.create.generalForm.mainImg')"
                label-position="before"
                :uploader="uploadFile"
              )
            .form__row
              formulate-input(
                type="image"
                name="images"
                :v-model="form.images"
                :label="$t('events.create.generalForm.images.label')"
                :label-class="['required']"
                validation="mime:image/jpeg,image/png"
                :validation-name="$t('events.create.generalForm.images.label')"
                label-position="before"
                :uploader="uploadFile"
                multiple
              )
          .calendar-general__section--right
            .form__row
              formulate-input(
                type="text"
                name="name"
                v-model="form.name"
                :label="$t('events.create.generalForm.name')"
                :label-class="['required']"
                validation="required"
              )
            .form__row
              lz-editor-input(
                :label="$t('events.create.generalForm.description')"
                v-model="form.description"
              )
            .form__row
              formulate-input(
                type="select"
                name="location"
                :label="$t('events.create.generalForm.type')"
                :options="locationTypeOptions"
              )
              formulate-input(
                type="select"
                name="status"
                :label="$t('events.create.generalForm.status')"
                :options="statusOptions"
              )
      section.calendar-dates
        .calendar-dates__header
          h2.h2--dash {{ $t('events.create.dateForm.title') }}
        .calendar-dates__section
          formulate-input(
            type="group"
            name="dates"
            v-model="form.dates"
          )
            .form__row
              formulate-input(
                type="date"
                name="inscription_start"
                v-model="form.dates[0].inscription_start"
                :max = "form.dates[0].inscription_end"
                :label="$t('events.create.dateForm.startInscription')"
                :label-class="['required']"
                validation="required"
                :validation-name="$t('events.create.dateForm.startInscription')"
              )
              formulate-input(
                type="date"
                name="inscription_end"
                v-model="form.dates[0].inscription_end" 
                :min="form.dates[0].inscription_start"
                :label="$t('events.create.dateForm.endInscription')"
                :label-class="['required']"
                validation="required"
                :validation-name="$t('events.create.dateForm.endInscription')"
              )
              formulate-input(
                type="date"
                name="event_start"
                v-model="form.dates[0].event_start"
                :max="form.dates[0].event_end"
                :label="$t('events.create.dateForm.startEvent')"
                :label-class="['required']"
                validation="required"
                :validation-name="$t('events.create.dateForm.startEvent')"
              )
              formulate-input(
                type="date"
                name="event_end"
                v-model="form.dates[0].event_end"
                :min="form.dates[0].event_start"
                :label="$t('events.create.dateForm.endEvent')"
                :label-class="['required']"
                validation="required"
                :validation-name="$t('events.create.dateForm.endEvent')"
              )

      section.calendar-detail
        .calendar-detail__header
          h2.h2--dash {{ $t('events.create.locationForm.title') }}
        .calendar-detail__section
          .form__row
            formulate-input(
              v-if="form.location === 'online'"
              type="text"
              name="url"
              :label="$t('events.create.locationForm.link')"
              :label-class="['required']"
              validation="required"
              :validation-name="$t('events.create.locationForm.link')"
            )
          .form__row
            formulate-input(
              v-if="form.location === 'onsite'"
              type="text"
              name="url"
              :label="$t('events.create.locationForm.location')"
              :label-class="['required']"
              validation="required"
              :validation-name="$t('events.create.locationForm.location')"
            )

      section.calendar-tickets
        .calendar-tickets__header
          h2.h2--dash {{ $t('events.create.ratesForm.title') }}
        .calendar-tickets__section
          formulate-input.ticket-group(
            type="group"
            name="tickets"
            :repeatable="true"
            :add-label="$t('events.create.ratesForm.add')"
          )
            .ticket
              formulate-input(
                type="text"
                :label="$t('events.create.ratesForm.amount')"
                name="amount"
                validation="required|number"
              )
              formulate-input(
                type="text"
                :label="$t('events.create.ratesForm.cost')"
                name="price"
                validation="required|number"
              )
              formulate-input(
                type="text"
                :label="$t('events.create.ratesForm.name')"
                name="name"
              )
      .calendar-create__actions
        lz-button(type="secondary" @click.prevent="onCancel") {{ $t('common.actions.cancel') }}
        lz-button(type="primary") {{ $t('common.actions.save') }}
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import LzButton from "@/components/Button.vue";
  import LzTable from "@/components/Table.vue";
  import LzConfirm from "@/components/Confirm.vue";
  import { namespace } from "vuex-class";
  import { api } from "../api";
  import LzEditorInput from "@/components/EditorInput.vue";
  import { ROUTES } from "../router";
  import toBase64 from "@/utils/toBase64";

  const auth = namespace("auth");

  @Component({ components: { LzButton, LzTable, LzConfirm, LzEditorInput } })
  export default class EventsCreate extends Vue {
    loaded = false;
    eventId = "";

    @auth.State("id")
    memberId!: string;

    statusOptions = {
      enabled: this.$t("events.create.generalForm.statusOptions.enabled"),
      disabled: this.$t("events.create.generalForm.statusOptions.disabled")
    };

    locationTypeOptions = {
      onsite: this.$t("events.create.generalForm.typeOptions.onsite"),
      online: this.$t("events.create.generalForm.typeOptions.online")
    };

    form: CalendarEventForm = {
      name: "",
      description: "",
      dates: [
        {
          inscription_start: "",
          inscription_end: "",
          event_start: "",
          event_end: ""
        }
      ],
      main_image: "",
      images: [],
      location: "online",
      tickets: [],
      url: ""
    };

    locationOptions = {
      Presencial: this.$t("events.create.generalForm.modeOptions.onsite"),
      Online: this.$t("events.create.generalForm.modeOptions.online")
    };

    async getEvent(eventId: string) {
      const event = await api.get(eventId);
      const images = event.images.reduce(
        (acc, img) => {
          if (img.default) acc.main = img.url;
          else acc.other.push({ url: img.url });
          return acc;
        },
        { main: "", other: [] as { url: string }[] }
      );

      this.form = {
        name: event.name,
        description: event.description,
        dates: [
          {
            inscription_start: event.dates.inscription_start,
            inscription_end: event.dates.inscription_end,
            event_start: event.dates.event_start,
            event_end: event.dates.event_end
          }
        ],
        main_image: [{ url: images.main }],
        images: images.other,
        location: event.location,
        tickets: event.tickets,
        url: event.url
      };
    }

    async createEvent(body: CalendarEventPostBody) {
      try {
        await api.create(body);
        this.$notify({
          type: "success",
          text: this.$tc("events.create.notifications.createdEvent")
        });
        this.$router.push({ name: ROUTES.READ });
      } catch (error) {
        this.$notify({
          type: "error",
          text: this.$tc("common.error.generic")
        });
      }
    }

    async updateEvent(body: Partial<CalendarEvent>) {
      try {
        await api.update(this.eventId, body);
        this.$notify({
          type: "success",
          text: this.$tc("events.create.notifications.editedEvent")
        });
        this.$router.push({ name: ROUTES.READ });
      } catch (error) {
        this.$notify({
          type: "error",
          text: this.$tc("common.error.generic")
        });
      }
    }

    async mounted() {
      this.eventId = this.$route.params.eventId;

      try {
        if (!this.eventId) {
          this.loaded = true;
          return;
        }
        // get event data
        await this.getEvent(this.eventId);
        this.loaded = true;
      } catch (error) {
        this.$notify({
          type: "error",
          text: this.$tc("common.error.generic")
        });
      }
    }

    onCancel() {
      this.$router.push({ name: ROUTES.READ });
    }

    async onSave(event: CalendarEventForm) {
      const images: CalendarEventPostBody["images"] = [];

      if (Array.isArray(event.main_image)) {
        images.push({
          default: true,
          url: event.main_image[0].url
        });
      }
      if (Array.isArray(event.images)) {
        images.push(
          ...event.images.map(({ url }) => ({
            default: false,
            url
          }))
        );
      }

      const body: CalendarEventPostBody = {
        name: this.form.name,
        member_id: this.memberId,
        description: this.form.description,
        dates: this.form.dates[0],
        images,
        location: this.form.location,
        tickets: this.form.tickets,
        url: this.form.url
      };

      if (this.eventId) this.updateEvent(body);
      else this.createEvent(body);
    }

    async uploadFile(file: File, progress: (progress: number) => void) {
      const base64 = await toBase64(file);
      progress(100);
      return { url: base64 };
    }
  }
</script>

<style lang="scss">
  .calendar-create {
    font-size: 1rem;

    &__actions {
      text-align: right;
    }

    section {
      margin-top: 40px;
    }

    .calendar-general {
      &__section {
        display: flex;

        &--left {
          flex-basis: 20%;
        }

        &--right {
          flex: 1;
          padding-left: 40px;
        }
      }
    }

    .calendar-tickets {
      &__table {
        margin-top: 30px;
      }
      .ticket-group {
        padding: 0;
        border: none;
      }

      &__section {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: stretch;

        & > * ~ * {
          margin-left: 15px;
        }

        .ticket {
          width: 100%;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          padding-inline: 1rem;
          gap: 2rem;
        }

        button {
          margin-left: 15px;
        }
      }
    }
    &__form {
      display: flex;
      flex-wrap: wrap;
      margin-top: 40px;
    }

    &__left {
      flex-basis: 20%;
    }

    &__images {
      width: 100%;
    }

    &__right {
      flex: 1;
      padding-left: 40px;
    }

    &__actions {
      text-align: right;
      margin-top: 100px;
      width: 100%;
    }
  }
</style>

<template lang="pug">
.services-create
  lz-confirm(
    v-if="showDeleteModal"
    @close='showDeleteModal = false'
    @confirm='deleteEvent'
  )

  header
    h1 {{ $t('services.create.title') }}
    p {{ $t('services.create.subtitle') }}

    formulate-form(v-model="calendarForm" @submit="onSave" v-if="loaded")
      section.services-general
        .services-general__header
          h2.h2--dash {{ $t('services.create.form.title') }}
          p {{ $t('services.create.form.subtitle') }}
        .services-general__section
          .services-general__section--left
            .form__row
              formulate-input(
                type="image"
                name="imageUrlToConvert"
                :label="$t('services.create.form.image')"
                :label-class="['required']"
                validation="required|mime:image/jpeg,image/png"
                :validation-name="$t('services.create.form.image')"
                label-position="before"
                :value="calendarForm.image"
              )
          .services-general__section--right
            .form__row
              formulate-input(
                type="text"
                name="title"
                :label="$t('services.create.form.name')"
                :label-class="['required']"
                validation="required"
              )
            .form__row
              lz-editor-input(
                :label="$t('services.create.form.description.title')"
                :subtitle="$t('services.create.form.description.subtitle')"
                v-model="calendarForm.description"
              )
      section.price
        .price__header.dash
          formulate-input(
            type="toggle"
            name="paymentInAdvance"
          )
          h2 {{ $t('services.create.price.title') }}
        .price__section
          .form__row
            formulate-input(
              type="text"
              name="price"
              inputmode="numeric"
              pattern="[0-9]*"
              :label="$t('services.create.price.label')"
              :label-class="['required']"
              validation="required|number"
              :validation-name="$t('services.create.price.label')"
            )
      section.bookings
        .bookings__header
          h2.h2--dash {{ $t('services.create.bookings.title') }}
        .bookings__body
          .form__row
            formulate-input(
              type="text"
              name="calendarLink"
              :label="$t('services.create.bookings.label')"
              :label-class="['required']"
              validation="required|url"
              :validation-name="$t('services.create.bookings.label')"
            )
      .services-create__actions
        lz-button(type="primary") {{ $t('services.create.actions.add') }}

      .services-table
        lz-table(
          title="Tus servicios"
        )
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import LzButton from "@/components/Button.vue";
  import LzTable from "@/components/Table.vue";
  import LzConfirm from "@/components/Confirm.vue";
  import { namespace } from "vuex-class";
  import { apiServices } from "../api";
  import { parseFile } from "@/utils/parseFile";
  import LzEditorInput from "@/components/EditorInput.vue";

  const auth = namespace("auth");

  @Component({ components: { LzButton, LzTable, LzConfirm, LzEditorInput } })
  export default class ServiceCreate extends Vue {
    loaded = false;
    showDeleteModal = false;
    ticketsFields = [
      {
        id: "ticketName",
        label: this.$t("services.create.ratesForm.name")
      },
      {
        id: "ticketAmount",
        label: this.$t("services.create.ratesForm.amount")
      },
      {
        id: "ticketPrice",
        label: this.$t("services.create.ratesForm.cost")
      },
      { id: "delete", label: this.$t("services.create.ratesForm.delete") }
    ];
    eventId = "";
    calendarForm = {
      image: "",
      title: "",
      description: "",
      price: "",
      paymentInAdvance: false,
      calendarLink: ""
    };

    @auth.State("id")
    public ongId!: string;

    async getEvent(eventId: string) {
      const { data: event } = await apiServices.getEvent(eventId);

      this.calendarForm.title = event.title;
      this.calendarForm.description = event.description;
      this.calendarForm.calendarLink = event.location;
    }

    async createEvent(body: any) {
      try {
        await apiServices.postEvent(this.ongId, body);
        this.$notify({
          type: "success",
          text: this.$tc("services.create.notifications.createdEvent")
        });
        this.$router.push({ name: "calendar" });
      } catch (error) {
        this.$notify({
          type: "error",
          text: this.$tc("common.error.generic")
        });
      }
    }

    async updateEvent(body: any) {
      try {
        await apiServices.updateEvent(this.eventId, body);

        this.$notify({
          type: "success",
          text: this.$tc("calendar.create.notifications.editedEvent")
        });
        this.$router.push({ name: "calendar" });
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
      this.$router.push({ name: "calendarRead" });
    }

    async onSave() {
      const isNewEvent = !this.eventId;
      const { calendarLink: link } = this.calendarForm;

      // const imageUrlToBase64 = await parseFile();
      // this.calendarForm.imageUrlToConvert
      const body = {
        ...this.calendarForm,
        image: "", //imageUrlToBase64[0],
        ongId: this.ongId
      };

      if (isNewEvent) this.createEvent(body);
      else this.updateEvent(body);
    }

    confirmDeleteEvent() {
      this.showDeleteModal = true;
    }

    async deleteEvent(eventId: string) {
      try {
        await apiServices.deleteEvent(this.ongId, eventId);

        this.$notify({
          type: "success",
          text: this.$tc("services.create.notifications.removedEvent")
        });
      } catch (error) {
        this.$notify({
          type: "error",
          text: this.$tc("common.error.generic")
        });
      }
      this.showDeleteModal = false;
    }
  }
</script>

<style lang="scss">
  .services-create {
    font-size: 1rem;

    &__actions {
      text-align: right;
    }

    section {
      margin-top: 40px;
    }

    .price__header {
      display: flex;
      align-items: center;
      gap: 10px;

      h2 {
        margin: 0;
      }
    }

    .services-general {
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
      margin-top: 2rem;
      width: 100%;
    }
  }
</style>

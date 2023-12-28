<template lang="pug">
.calendar-create
  lz-confirm(
    v-if="showDeleteModal"
    @close='showDeleteModal = false'
    @confirm='deleteEvent'
  )

  header
    h1 {{ $t('services.create.title') }}
    p {{ $t('services.create.subtitle') }}

    formulate-form(v-model="calendarForm" @submit="onSave" v-if="loaded")
      section.calendar-general
        .calendar-general__header
          h2.h2--dash {{ $t('services.create.generalForm.title') }}
        .calendar-general__section
          .calendar-general__section--left
            .form__row
              formulate-input(
                type="toggle"
                name="isPremium"
                :disabled="!isPremiumSubscription"
                :value="calendarForm.isPremium"
                :label="$t('services.create.highlight.label')"
                label-position="before"
                :wrapper-class="['formulate-input-inline-toggle']"
                @click='popUpgradeToPremiumMessage'
              )
                template(#label="{ label }")
                  label
                    .formulate-input-label {{ label }}
                      span
                        crown-icon
            .form__row
              formulate-input(
                type="image"
                name="imageUrlToConvert"
                :label="$t('services.create.generalForm.mainImg')"
                :label-class="['required']"
                validation="required|mime:image/jpeg,image/png"
                :validation-name="$t('services.create.generalForm.mainImg')"
                label-position="before"
                :value="calendarForm.imageUrlToConvert"
              )
            .form__row
              formulate-input(
                type="image"
                name="imagesToConvert"
                :label="$t('services.create.generalForm.images.label')"
                :label-class="['required']"
                validation="required|mime:image/jpeg,image/png"
                :validation-name="$t('services.create.generalForm.images.label')"
                label-position="before"
                multiple
                :value="calendarForm.imagesToConvert"
              )
          .calendar-general__section--right
            .form__row
              formulate-input(
                type="text"
                name="title"
                :label="$t('services.create.generalForm.name')"
                :label-class="['required']"
                validation="required"
              )
            .form__row
              lz-editor-input(
                :label="$t('services.create.generalForm.description')"
                v-model="calendarForm.description"
              )
            .form__row
              formulate-input(
                type="select"
                name="type"
                :label="$t('services.create.generalForm.type')"
                :options="typeOptions"
              )
              formulate-input(
                type="select"
                name="mode"
                :label="$t('services.create.generalForm.mode')"
                :options="modeOptions"
              )
              formulate-input(
                type="select"
                name="status"
                :label="$t('services.create.generalForm.status')"
                :options="statusOptions"
              )
      section.calendar-dates
        .calendar-dates__header
          h2.h2--dash {{ $t('services.create.dateForm.title') }}
        .calendar-dates__section
          .form__row
            formulate-input(
              type="date"
              name="startInscriptionDate"
              :label="$t('services.create.dateForm.startInscription')"
              :label-class="['required']"
              validation="required"
              :validation-name="$t('services.create.dateForm.startInscription')"
            )
            formulate-input(
              type="date"
              name="endInscriptionDate"
              :label="$t('services.create.dateForm.endInscription')"
              :label-class="['required']"
              validation="required"
              :validation-name="$t('services.create.dateForm.endInscription')"
            )
            formulate-input(
              type="date"
              name="startEventDate"
              :label="$t('services.create.dateForm.startEvent')"
              :label-class="['required']"
              validation="required"
              :validation-name="$t('services.create.dateForm.startEvent')"
            )
            formulate-input(
              type="date"
              name="endEventDate"
              :label="$t('services.create.dateForm.endEvent')"
              :label-class="['required']"
              validation="required"
              :validation-name="$t('services.create.dateForm.endEvent')"
            )
          .form__row
            formulate-input(
              type="toggle"
              :label="$t('services.create.dateForm.recurrent.label')"
              :under-label="$t('services.create.dateForm.recurrent.under')"
              name="recurrent"
            )
            formulate-input(
              v-if="calendarForm.recurrent"
              type="select"
              name="frecuency"
              :label="$t('services.create.dateForm.frequency.label')"
              :options="frequencyOptions"
            )

      section.calendar-detail
        .calendar-detail__header
          h2.h2--dash {{ $t('services.create.locationForm.title') }}
        .calendar-detail__section
          .form__row
            formulate-input(
              v-if="calendarForm.mode === 'Online'"
              type="text"
              name="link"
              :label="$t('services.create.locationForm.link')"
              :label-class="['required']"
              validation="required"
              :validation-name="$t('services.create.locationForm.link')"
            )
          .form__row
            formulate-input(
              v-if="calendarForm.mode === 'Presencial'"
              type="text"
              name="location"
              :label="$t('services.create.locationForm.location')"
              :label-class="['required']"
              validation="required"
              :validation-name="$t('services.create.locationForm.location')"
            )

      section.calendar-tickets
        .calendar-tickets__header
          h2.h2--dash {{ $t('services.create.ratesForm.title') }}
        .calendar-tickets__section
          formulate-input(
            type="text"
            :label="$t('services.create.ratesForm.amount')"
            name="ticketAmount"
            validation="required|number"
          )
          formulate-input(
            type="text"
            :label="$t('services.create.ratesForm.cost')"
            name="ticketPrice"
            validation="required|number"
          )
          formulate-input(
            type="text"
            :label="$t('services.create.ratesForm.name')"
            name="ticketName"
          )

          lz-button.lz-button--form-inline(
            type="primary"
            @click.prevent="onCreateTicket"
          ) {{ $t('common.actions.create') }}

        .calendar-tickets__table
          transition(name="fade")
            lz-table(
              v-if="calendarForm.tickets.length > 0"
              :title="$t('services.create.ratesForm.rateTable')"
              :fields="ticketsFields"
              :items="calendarForm.tickets"
            )
              template(#ticketName="{ row: { ticketName } }") {{ ticketName }}
              template(#ticketAmount="{ row: { ticketAmount } }") {{ ticketAmount }}
              template(#ticketPrice="{ row: { ticketPrice } }") {{ ticketPrice }}
              template(#delete="{ row }")
                XIcon(@click.prevent="onRemoveTicket(row)")
      .calendar-create__actions
        lz-button(type="tertiary" @click.prevent="confirmDeleteEvent") {{$t('common.actions.delete')}}
        lz-button(type="secondary" @click.prevent="onCancel") {{ $t('common.actions.cancel') }}
        lz-button(type="primary") {{ $t('common.actions.save') }}
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
  import { checkSubscriptionPlan } from "@/utils";

  const auth = namespace("auth");

  @Component({ components: { LzButton, LzTable, LzConfirm, LzEditorInput } })
  export default class CalendarCreate extends Vue {
    loaded = false;
    showDeleteModal = false;
    isPremiumSubscription = false;
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
      imageUrlToConvert: [] as any,
      imageUrl: "",
      imagesToConvert: [] as any,
      images: [] as any,
      title: "",
      description: "",
      type: "Evento",
      mode: "Presencial",
      status: "Borrador",
      startInscriptionDate: "",
      endInscriptionDate: "",
      startEventDate: "",
      endEventDate: "",
      recurrent: false,
      frecuency: "weekly" as TEvent["data"]["frecuency"],
      link: "",
      location: "",
      ticketName: "",
      ticketAmount: 1,
      ticketPrice: 0,
      tickets: [] as {
        ticketName: string;
        ticketAmount: number;
        ticketPrice: number;
      }[],
      isPremium: false
    };

    typeOptions = {
      Evento: this.$t("services.create.generalForm.typeOptions.event"),
      Formación: this.$t("services.create.generalForm.typeOptions.training")
    };

    modeOptions = {
      Presencial: this.$t("services.create.generalForm.modeOptions.onsite"),
      Online: this.$t("services.create.generalForm.modeOptions.online")
    };

    statusOptions = {
      Borrador: this.$t("services.create.generalForm.statusOptions.draft"),
      Activo: this.$t("services.create.generalForm.statusOptions.active")
    };

    frequencyOptions = {
      Semanal: this.$t("services.create.dateForm.frequency.options.weekly"),
      Mensual: this.$t("services.create.dateForm.frequency.options.monthly"),
      Anual: this.$t("services.create.dateForm.frequency.options.annual")
    };

    @auth.State("id")
    public ongId!: string;

    async getEvent(eventId: string) {
      const { data: event } = await apiServices.getEvent(eventId);

      this.calendarForm.title = event.title;
      this.calendarForm.description = event.description;
      this.calendarForm.type = event.course ? "Formación" : "Evento";
      this.calendarForm.mode = event.type;
      this.calendarForm.status = event.status;
      this.calendarForm.startInscriptionDate = event.salesStartDate;
      this.calendarForm.endInscriptionDate = event.salesEndDate;
      this.calendarForm.startEventDate = event.start_time;
      this.calendarForm.endEventDate = event.end_time;
      this.calendarForm.recurrent = event.recurrent;
      this.calendarForm.frecuency = event.frecuency;
      this.calendarForm.imageUrlToConvert = [{ url: event.imageURL }];
      this.calendarForm.link = event.location;
      this.calendarForm.location = event.location || event.link;
      this.calendarForm.isPremium = event.isPremium ?? false;

      this.calendarForm.tickets = event.EventTickets.map(ticket => ({
        ticketName: ticket.type,
        ticketAmount: ticket.stock,
        ticketPrice: ticket.price
      }));
    }

    async getEventImages(eventId: string) {
      const { data: images } = await apiServices.getEventImages(eventId);
      this.calendarForm.imagesToConvert.length = 0;

      images.forEach(image => {
        const isMainImage = image.img_url.includes("default");
        if (isMainImage) return;
        this.calendarForm.imagesToConvert.push({ url: image.img_url });
      });
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
        this.isPremiumSubscription = (
          await checkSubscriptionPlan(this.ongId)
        ).isPremiumSubscription;

        if (!this.eventId) {
          this.loaded = true;
          return;
        }
        // get event data
        await Promise.all([
          this.getEvent(this.eventId),
          this.getEventImages(this.eventId)
        ]);

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
      const { location, link } = this.calendarForm;

      const imageUrlToBase64 = await parseFile(
        this.calendarForm.imageUrlToConvert
      );

      const images: any[] = await parseFile(this.calendarForm.imagesToConvert);
      this.calendarForm.location = location || link;

      const body = {
        ...this.calendarForm,
        stock: this.calendarForm.ticketAmount,
        amount: this.calendarForm.ticketPrice,
        imageUrl: imageUrlToBase64[0],
        images: Array.isArray(images) ? images : [images],
        imageUrlToConvert: undefined,
        imagesToConvert: undefined,
        ongId: this.ongId
      };

      if (isNewEvent) this.createEvent(body);
      else this.updateEvent(body);
    }

    onCreateTicket() {
      const { ticketAmount, ticketPrice, ticketName } = this.calendarForm;
      if (isNaN(+ticketAmount) || isNaN(+ticketPrice)) return;
      if (!ticketName.trim().length) return;

      const ticket = {
        ticketName: this.calendarForm.ticketName,
        ticketAmount: +this.calendarForm.ticketAmount ?? 0,
        ticketPrice: +this.calendarForm.ticketPrice ?? 0
      };
      this.calendarForm.tickets.push(ticket);

      this.calendarForm.ticketName = "";
      this.calendarForm.ticketAmount = 1;
      this.calendarForm.ticketPrice = 0;
    }

    onRemoveTicket(row: any): void {
      this.calendarForm.tickets = this.calendarForm.tickets.filter(
        ticket => ticket !== row
      );
    }

    confirmDeleteEvent() {
      this.showDeleteModal = true;
    }

    async deleteEvent() {
      if (!this.eventId) return;
      try {
        await apiServices.deleteEvent(this.ongId, this.eventId);

        this.$notify({
          type: "success",
          text: this.$tc("services.create.notifications.removedEvent")
        });
        this.$router.push({ name: "calendarRead" });
      } catch (error) {
        this.$notify({
          type: "error",
          text: this.$tc("common.error.generic")
        });
      }
      this.showDeleteModal = false;
    }

    popUpgradeToPremiumMessage(): void {
      if (this.isPremiumSubscription) return;

      this.$notify({
        type: "info",
        text: this.$tc("common.notifications.upgradeToPremium"),
        ignoreDuplicates: true
      } as NotificationOptions);
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

      &__section {
        display: flex;
        justify-content: flex-start;
        align-items: flex-end;

        & > * ~ * {
          margin-left: 15px;
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

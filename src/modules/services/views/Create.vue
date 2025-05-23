<template lang="pug">
.services-create
    lz-confirm(
      v-if="showDeleteModal"
      @close='showDeleteModal = false'
      @confirm='deleteService'
    )
  
    header
      h1 {{ $t('services.create.title') }}
      p {{ $t('services.create.subtitle') }}
  
      formulate-form(@submit="onSave" v-if="loaded" v-model="form")
        section.services-general
          .services-general__header
            h2.h2--dash {{ $t('services.create.form.title') }}
            p {{ $t('services.create.form.subtitle') }}
          .services-general__section
            .services-general__section--left
              .form__row
                formulate-input(
                  type="image"
                  name="image_url"
                  v-model="form.image_url"
                  :label="$t('services.create.form.image')"
                  :label-class="['required']"
                  validation="required|mime:image/jpeg,image/png,image/webp,image/svg+xml"
                  :validation-name="$t('services.create.form.image')"
                  label-position="before"
                )
            .services-general__section--right
              .form__row
                formulate-input(
                  type="text"
                  name="service_name"
                  v-model="form.service_name"
                  :label="$t('services.create.form.name')"
                  :label-class="['required']"
                  validation="required"
                )
              .form__row
                lz-editor-input(
                  :label="$t('services.create.form.description.title')"
                  :subtitle="$t('services.create.form.description.subtitle')"
                  name="description"
                  v-model="form.description"
                )
        section.price
          .price__header.dash
            formulate-input(
              type="toggle"
              name="payment_in_advance"
              v-model="form.payment_in_advance"
            )
            h2 {{ $t('services.create.price.title') }}
          .price__section
            .form__row
              formulate-input(
                type="text"
                name="price"
                v-model="form.price"
                inputmode="numeric"
                :label="$t('services.create.price.label')"
                :label-class="['required']"
                :validation="form.payment_in_advance ? 'required|number' : 'number'"
                :validation-name="$t('services.create.price.label')"
              )
        section.bookings
          .bookings__header
            h2.h2--dash {{ $t('services.create.bookings.title') }}
          .bookings__body
            .form__row
              formulate-input(
                type="text"
                name="calendly_url"
                v-model="form.calendly_url"
                :label="$t('services.create.bookings.label')"
              )
        .services-create__actions
          lz-button(v-if="!isNewService" type="tertiary" @click="confirmDeleteService") {{ $t('services.create.actions.delete') }}
          lz-button(type="secondary" @click="onCancel") {{ $t('services.create.actions.cancel') }}
          lz-button(type="primary") {{ isNewService ? $t('services.create.actions.add') : $t('services.create.actions.save') }}
      </template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import LzButton from "@/components/Button.vue";
  import LzTable from "@/components/Table.vue";
  import LzConfirm from "@/components/Confirm.vue";
  import { namespace } from "vuex-class";
  import { apiServices } from "../api";
  import LzEditorInput from "@/components/EditorInput.vue";

  const auth = namespace("auth");

  type Image = { url: string }[] | "" | ImageVModel;

  type Form = Omit<ServicePostDTO, "image_url"> & { image_url: Image };
  type FormSubmitData = ServicePostDTO;

  @Component({ components: { LzButton, LzTable, LzConfirm, LzEditorInput } })
  export default class ServiceCreate extends Vue {
    loaded = false;
    showDeleteModal = false;
    serviceId = "";
    isNewService = true;

    form: Form = {
      member_id: "",
      service_name: "",
      description: "",
      price: "",
      calendly_url: "",
      payment_in_advance: false,
      image_url: ""
    };

    @auth.State("id")
    public memberId!: string;

    async loadServiceData(serviceId: string) {
      const service = await apiServices.getById(serviceId);
      this.form = { ...service, image_url: [{ url: service.image_url }] };
    }

    async createService(body: ServicePostDTO) {
      try {
        await apiServices.create(body);
        this.$notify({
          type: "success",
          text: this.$tc("services.create.notifications.created")
        });
        this.$router.push({ name: "servicesRead" });
      } catch (error) {
        this.$notify({
          type: "error",
          text: this.$tc("common.error.generic")
        });
      }
    }

    async updateService(body: Partial<Service>) {
      try {
        await apiServices.patch(this.serviceId, body);

        this.$notify({
          type: "success",
          text: this.$tc("services.create.notifications.edited")
        });
        this.$router.push({ name: "services" });
      } catch (error) {
        this.$notify({
          type: "error",
          text: this.$tc("common.error.generic")
        });
      }
    }

    async mounted() {
      this.serviceId = this.$route.params.serviceId;

      try {
        if (!this.serviceId) {
          this.loaded = true;
          return;
        }
        await this.loadServiceData(this.serviceId);

        this.isNewService = false;
        this.loaded = true;
      } catch (error) {
        this.$notify({
          type: "error",
          text: this.$tc("common.error.generic")
        });
      }
    }

    onCancel() {
      this.$router.push({ name: "servicesRead" });
    }

    async onSave(data: FormSubmitData) {
      if (this.showDeleteModal) return;
      const body: ServicePostDTO = {
        ...data,
        image_url: await this.handleImage(this.form.image_url),
        member_id: this.memberId
      };
      if (this.isNewService) this.createService(body);
      else this.updateService(body);
    }

    confirmDeleteService() {
      this.showDeleteModal = true;
    }

    async deleteService() {
      try {
        await apiServices.delete(this.serviceId);
        this.$notify({
          type: "success",
          text: this.$tc("services.create.notifications.removed")
        });
        this.$router.push({ name: "servicesRead" });
      } catch (error) {
        this.$notify({
          type: "error",
          text: this.$tc("common.error.generic")
        });
      }
      this.showDeleteModal = false;
    }

    async handleImage(image: Image): Promise<string> {
      if (typeof image === "string") return image;
      if (Array.isArray(image)) return image[0].url;
      return await image.upload().then(([{ url }]) => url);
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

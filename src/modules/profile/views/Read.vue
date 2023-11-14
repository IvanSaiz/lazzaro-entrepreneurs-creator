<template lang="pug">
  .profile-read
    header
      h1 {{ $t('profile.read.title') }}
      p {{ $t('profile.read.subtitle') }}

    transition(name="fade" mode="out-in")
      section.profile-read__content(v-if="loaded")
        formulate-form(
          v-model="profileForm"
          @submit="onSubmit"
          :keep-model-data="true"
        )
          .form__row
            .profile-read__image
              formulate-input(
                type="image"
                name="image"
                :label="$t('profile.read.form.image.label')"
                :label-class="['required']"
                :help="$t('profile.read.form.image.help')"
                validation="required|mime:image/jpeg,image/png"
              )
          .form__row
            formulate-input(
              type="text"
              name="name"
              validation="required"
              :label="$t('profile.read.form.name')"
              :label-class="['required']"
            )
            formulate-input(
              type="text"
              name="surname"
              validation="required"
              :label="$t('profile.read.form.surname')"
              :label-class="['required']"
            )
          .form__row
            formulate-input(
              type="text"
              name="email"
              validation="required|email"
              :label="$t('profile.read.form.email')"
              :label-class="['required']"
            )
            formulate-input(
              type="text"
              name="phone"
              validation="required"
              :label="$t('profile.read.form.phone')"
              :label-class="['required']"
            )
          .form__row
            formulate-input(
              type="text"
              name="newPassword"
              :label="$t('profile.read.form.password.label')"
              :help="$t('profile.read.form.password.help')"
            )
            formulate-input(
              type="text"
              name="discountCode"
              :label="$t('profile.read.form.discountCode')"
              readonly
            )
          .profile-read__actions

        .profile-read__actions
          lz-button(type="tertiary") {{ $t('common.actions.deleteAccount') }}
          lz-button(
            type="secondary"
            @click.prevent="$router.push({ name: 'Home' })"
          ) {{ $t('common.actions.cancel') }}
          lz-button(type="primary" @click.prevent="onSubmit") {{ $t('common.actions.save') }}
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import LzButton from "@/components/Button.vue";
  import LzTable from "@/components/Table.vue";
  import LzStepper from "@/components/Stepper.vue";
  import { namespace } from "vuex-class";

  const auth = namespace("auth");

  @Component({ components: { LzButton, LzTable, LzStepper } })
  export default class Read extends Vue {
    @auth.State("id")
    public ongId!: string;

    loaded = true;

    profileForm = {
      img: null,
      name: "",
      surname: "",
      email: "",
      phone: "",
      newPassword: "",
      discountCode: ""
    };
  }
</script>

<style lang="scss">
  .profile-read {
    &__image {
      max-width: 180px;
    }

    &__content {
      margin-top: 40px;
    }

    &__actions {
      margin-top: 20px;
      text-align: right;
    }
  }
</style>

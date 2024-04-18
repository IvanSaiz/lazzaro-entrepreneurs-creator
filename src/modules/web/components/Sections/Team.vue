<template lang="pug">
section.public-team
  .public-team__header
    h2.h2--dash {{ $t('web.public.teamForm.title') }}
    .subtitle
      h3 {{ $t('web.public.teamForm.subtitle') }}
      design-modal(section="team")
        template(#header)
          h4 {{ $t('web.public.teamForm.title') }}
        template(#form)
          h2.h2--dash {{ $t('web.public.teamForm.design.color') }}
          FormulateInput#primary-color(
            type="textColor"
            name="teamDesignBackgroundColor"
            v-model="props.design.backgroundColor"
          )
    .public-team__title
      .team-section
        formulate-input(
          type="text"
          name="teamTitle"
          v-model="props.title"
          :label="$t('web.public.teamForm.header.title')"
          :help="$t('web.public.teamForm.header.titleHelperText')"
        )
        FormulateInput#primary-color(
          type="textColor"
          name="teamTitleColor"
          v-model="props.titleColor"
        )
      .team-section
        formulate-input(
          type="text"
          name="teamSubtitle"
          v-model="props.subTitle"
          :label="$t('web.public.teamForm.header.subtitle')"
          :help="$t('web.public.teamForm.header.subtitleHelperText')"
        )
        FormulateInput#primary-color(
          type="textColor"
          name="teamSubtitleColor"
          v-model="props.subtitleColor"
        )

  .public-team__header
    h3.h3--dash {{ $t('web.public.teamForm.teamMembers.title') }}
    h4 {{ $t('web.public.teamForm.teamMembers.subtitle') }}
  formulate-form.public-team__form(
    v-model="teamForm"
    @submit="onTeamSubmit"
    :keep-model-data="true"
  )
    .public-team__image
      formulate-input(
        type="image"
        name="picture"
        :label="$t('web.public.teamForm.photo.label')"
        :help="$t('web.public.teamForm.photo.help')"
      )
    .public-team__texts
      .form__row
        formulate-input(
          type="text"
          name="name"
          :label="$t('web.public.teamForm.name')"
        )
        formulate-input(
          type="text"
          name="position"
          :label="$t('web.public.teamForm.position')"
        )
      .form__row
        formulate-input(
          type="text"
          name="linkedin"
          :label="$t('web.public.teamForm.linkedin')"
        )
      .form__row  
        lz-button(type="secondary") {{ $t('web.public.teamForm.newMember') }}

  hr.hr--dash
  transition(name="fade")
    .title-table-container   
      lz-table(
        class="lz-table"
        v-if="props.members && props.members.length > 0"
        :fields="teamFields"
        :items="props.members"
        :title="$t('web.public.teamForm.table')"
      )
        template(#dot="{ row }")
          DotsIcon        
        template(#name="{ row: { name } }") {{ name }}
        template(#position="{ row: { position } }") {{ position }}
        template(#linkedin="{ row: { linkedin } }") {{ linkedin }}
        template(#delete="{ row }")
          XIcon(@click="removeTeamMember(row)")
</template>

<script lang="ts">
  import { Component, Vue, VModel } from "vue-property-decorator";
  import LzTable from "@/components/Table.vue";
  import LzButton from "@/components/Button.vue";
  import DesignModal from "@/components/DesignModal.vue";

  type TeamProps = WebProps["team"];

  @Component({ name: "Team", components: { LzTable, LzButton, DesignModal } })
  export default class Team extends Vue {
    @VModel() props!: TeamProps;

    teamForm = {
      id: "",
      picture: null,
      name: "",
      position: "",
      linkedin: ""
    };

    teamFields = [
      { id: "dot", label: this.$t("web.public.teamForm.delete") },
      { id: "name", label: this.$t("web.public.teamForm.name") },
      { id: "position", label: this.$t("web.public.teamForm.position") },
      { id: "linkedin", label: this.$t("web.public.teamForm.linkedin") },
      { id: "delete", label: this.$t("web.public.teamForm.delete") }
    ];

    onTeamSubmit() {
      this.props.members.push({
        id: this.props.members.length + 1,
        picture: this.teamForm.picture,
        name: this.teamForm.name,
        position: this.teamForm.position,
        linkedin: this.teamForm.linkedin
      });

      this.teamForm = {
        id: "",
        picture: null,
        name: "",
        position: "",
        linkedin: ""
      };
    }

    removeTeamMember(e: any) {
      const teamArr = this.props.members;
      const memberIdx = teamArr.findIndex(el => el === e);
      teamArr.splice(memberIdx, 1);
    }
  }
</script>

<style lang="scss">
  .public-team {
    &__header {
      margin-bottom: 20px;

      p {
        font-size: 16px;
        color: $color-black-04;
      }
    }

    &__title {
      display: flex;
      align-items: flex-start;
      gap: 30px;
      width: 100%;

      .team-section {
        display: flex;
        width: 563px;
        gap: 18px;
        align-items: center;

        .formulate-input-element--text {
          width: 382px;
        }

        .formulate-input[data-classification="text-color"] {
          width: 153px;
        }
      }
    }

    h3 {
      color: $color-black-03;
      font-size: 16px;
      font-weight: 400;
    }

    .title-table-container {
      display: flex;
      flex-direction: column;

      h3 {
        margin-bottom: 35px;
      }
    }

    &__form {
      display: flex;

      row {
        gap: 30px;
      }
    }

    &__image {
      width: 137px;
      margin-right: 34px;
    }

    &__texts {
      flex-grow: 1;

      &:last-child {
        button {
          margin-left: auto;
          margin-right: 15px;
        }
      }
    }

    .lz-table__tools {
      display: none;
    }

    .lz-table__th--delete {
      text-align: right;

      svg:hover {
        cursor: pointer;
        stroke: $color-black-01;
      }
    }
  }
</style>

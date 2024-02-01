<template>
  <section id="blog-create">
    <header>
      <h1>{{ $t("blog.create.title") }}</h1>
      <p>{{ $t("blog.create.subtitle") }}</p>
    </header>
    <div class="content">
      <h2 class="h2--dash">{{ $t("blog.create.form.article") }}</h2>
      <p>{{ $t("blog.create.form.subtitle") }}</p>
      <FormulateForm>
        <div class="left">
          <FormulateInput
            type="image"
            name="image"
            :label="$t('blog.create.form.mainImg')"
            :label-class="['required']"
            validation="required|mime:image/jpeg,image/png"
            :validation-name="$t('blog.create.form.mainImg')"
            label-position="before"
          />
        </div>
        <div class="right">
          <FormulateInput
            type="text"
            name="title"
            validation="required"
            :label="$t('blog.create.form.title')"
            :label-class="['required']"
          />
          <LzEditorInput
            :label="$t('blog.create.form.description')"
            v-model="description"
          />
        </div>
        <div class="actions">
          <LzButton type="secondary" @click.prevent="onCancel">{{
            $t("blog.create.form.cancel")
          }}</LzButton>
          <LzButton type="primary">{{
            $t("blog.create.form.submit")
          }}</LzButton>
        </div>
      </FormulateForm>
    </div>
  </section>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import LzEditorInput from "@/components/EditorInput.vue";
  import LzButton from "@/components/Button.vue";

  @Component({
    components: {
      LzEditorInput,
      LzButton
    }
  })
  export default class BlogCreate extends Vue {
    description = "";

    onCancel() {
      this.$router.push({ name: "blogRead" });
    }
  }
</script>

<style>
  #blog-create {
    .formulate-form {
      display: grid;
      grid-template-columns: 15% auto;
      gap: 2rem;
      margin-top: 2rem;

      .actions {
        display: flex;
        justify-content: end;
        grid-column-start: 2;
      }
    }

    .content {
      margin-top: 3rem;
    }

    .left {
      display: flex;
      flex-direction: column;
    }
    .right {
      display: flex;
      flex-direction: column;
    }
  }
</style>

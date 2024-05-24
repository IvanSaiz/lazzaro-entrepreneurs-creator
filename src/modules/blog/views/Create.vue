<template>
  <section id="blog-create" v-if="loaded">
    <LzConfirm
      v-if="deleteModal"
      @close="deleteModal = false"
      @confirm="deleteArticle"
      :descriptionLabel="$t('blog.create.modal.content', { title: form.title })"
      :cancelLabel="$t('common.actions.no')"
      :confirmLabel="$t('common.actions.yes')"
    />
    <header>
      <h1>{{ $t("blog.create.title") }}</h1>
      <p>{{ $t("blog.create.subtitle") }}</p>
    </header>
    <div class="content">
      <h2 class="h2--dash">{{ $t("blog.create.form.article") }}</h2>
      <p>{{ $t("blog.create.form.subtitle") }}</p>
      <FormulateForm @submit="onSave" v-model="form">
        <div class="left">
          <FormulateInput
            type="image"
            name="icon"
            :v-model="form.icon"
            :label="$t('blog.create.form.mainImg')"
            :label-class="['required']"
            validation="required|mime:image/jpeg,image/png,image/webp"
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
            name="description"
            v-model="form.description"
          />
          <FormulateInput
            type="select"
            name="status"
            :options="statusOptions"
            :label="$t('blog.create.form.status')"
          />
        </div>
        <div class="actions">
          <LzButton
            type="tertiary"
            @click.prevent="openDeleteModal"
            v-if="this.articleId"
          >
            {{ $t("blog.create.form.delete") }}
          </LzButton>
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
  import { namespace } from "vuex-class";
  import Article from "../api";
  import LzConfirm from "@/components/Confirm.vue";
  const auth = namespace("auth");

  @Component({
    components: {
      LzEditorInput,
      LzButton,
      LzConfirm
    }
  })
  export default class BlogCreate extends Vue {
    @auth.State("id")
    memberId!: string;

    articleId = "";
    loaded = false;
    deleteModal = false;

    form = {
      title: "",
      icon: "" as string | { url: string }[],
      description: "",
      status: "enabled" as "enabled" | "disabled"
    };

    statusOptions = {
      enabled: this.$t("blog.read.table.item.status.enabled"),
      disabled: this.$t("blog.read.table.item.status.disabled")
    };

    onCancel() {
      this.$router.push({ name: "blogRead" });
    }

    async onSave(formData: ArticleSubmit) {
      const {
        title,
        icon: [{ url }]
      } = formData;
      const body: ArticlePostDTO = {
        title,
        // TODO: add status to form
        status: this.form.status,
        member_id: this.memberId,
        icon: url,
        description: this.form.description
      };
      try {
        if (this.articleId) {
          await Article.update(this.articleId, body);
        } else {
          await Article.create(body);
        }
        this.$notify({
          type: "success",
          text: this.$tc("blog.create.notifications.created")
        });
        this.$router.push({ name: "blogRead" });
      } catch {
        this.$notify({
          type: "error",
          text: this.$tc("common.error.generic")
        });
      }
    }

    openDeleteModal() {
      this.deleteModal = true;
    }

    deleteArticle() {
      if (!this.articleId) return;

      Article.delete(this.articleId)
        .then(() => {
          this.$notify({
            type: "success",
            text: this.$tc("blog.create.notifications.deleted")
          });
          this.$router.push({ name: "blogRead" });
        })
        .catch(() => {
          this.$notify({
            type: "error",
            text: this.$tc("common.error.generic")
          });
        });
    }

    async mounted() {
      this.articleId = this.$route.params.articleId;
      if (this.articleId) {
        await Article.getById(this.articleId).then(article => {
          this.form = article;
          this.form.icon = [{ url: article.icon }];
        });
      }
      this.loaded = true;
    }
  }
</script>

<style lang="scss">
  #blog-create {
    .formulate-form {
      display: grid;
      grid-template-columns: 15% auto;
      gap: 2rem;
      margin-top: 2rem;

      .actions {
        display: flex;
        justify-content: flex-end;
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

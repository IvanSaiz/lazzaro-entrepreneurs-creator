<template>
  <section id="blog" v-if="loaded">
    <LzConfirm
      v-if="deleteModal"
      @close="deleteModal = false"
      @confirm="deleteArticle"
      :descriptionLabel="
        $t('blog.create.modal.content', { title: articleToDelete.title })
      "
      :cancelLabel="$t('common.actions.no')"
      :confirmLabel="$t('common.actions.yes')"
    />
    <header>
      <div class="title">
        <h1>{{ $t("blog.read.title") }}</h1>
        <SectionToggle section="blog" />
      </div>
      <p>{{ $t("blog.read.subtitle") }}</p>
    </header>
    <div class="content">
      <h2 class="h2--dash">{{ $t("blog.read.content.title") }}</h2>
      <h4>{{ $t("blog.read.content.subtitle") }}</h4>
      <LzTable :fields="articleFields" :items="articles">
        <template #title="{row: {title}}"> {{ title }}</template>
        <template #date="{row: {date}}"> {{ $d(new Date(date)) }}</template>
        <template #status="{row: {status}}">
          {{ $t(`blog.read.table.item.status.${status}`) }}
        </template>
        <template #actions="{row}">
          <XIcon @click="openDeleteModal(row)" />
          <EyeIcon
            @click="
              $router.push({
                name: 'blogCreate',
                params: { articleId: row.id }
              })
            "
          >
          </EyeIcon>
        </template>
      </LzTable>
      <LzButton type="primary" @click="$router.push({ name: 'blogCreate' })">{{
        $t("blog.read.newArticle")
      }}</LzButton>
    </div>
  </section>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import LzTable from "@/components/Table.vue";
  import LzButton from "@/components/Button.vue";
  import Articles from "../api";
  import { namespace } from "vuex-class";
  import LzConfirm from "@/components/Confirm.vue";
  import SectionToggle from "@/components/SectionToggle.vue";
  const auth = namespace("auth");

  type Article = {
    id: string;
    title: string;
    description: string;
    status: "enabled" | "disabled";
    date: string;
    icon: string;
  };

  @Component({ components: { LzTable, LzButton, LzConfirm, SectionToggle } })
  export default class Read extends Vue {
    @auth.State("id")
    memberId!: string;

    loaded = false;

    articleFields = [
      { id: "title", label: this.$t("blog.read.table.headers.title") },
      {
        id: "status",
        label: this.$t("blog.read.table.headers.status")
      },
      {
        id: "date",
        label: this.$t("blog.read.table.headers.date")
      },
      { id: "actions", label: this.$t("blog.read.table.headers.actions") }
    ];

    // TODO: Replace with real data when the API is ready
    articles: Article[] = [];

    mounted() {
      this.getArticles().finally(() => {
        this.loaded = true;
      });
    }

    async getArticles() {
      await Articles.getArticlesByMemberId(this.memberId).then(articles => {
        this.articles = articles;
      });
    }

    deleteModal = false;
    articleToDelete: Article;
    openDeleteModal(item: Article) {
      this.deleteModal = true;
      this.articleToDelete = item;
    }
    async deleteArticle() {
      if (!this.articleToDelete) return;

      await Articles.delete(this.articleToDelete.id)
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

      await this.getArticles().finally(() => {
        this.deleteModal = false;
      });
    }
  }
</script>

<style lang="scss">
  #blog {
    header {
      margin-bottom: 4rem;

      .title {
        display: flex;
        align-items: center;
        gap: 1rem;
      }
    }

    .content {
      .lz-table {
        &__td,
        &__th {
          text-align: left;

          &:last-child {
            display: flex;
            justify-content: flex-end;
            gap: 0.8rem;
          }
        }

        &__td--actions svg {
          cursor: pointer;
        }
      }
      .lz-button {
        margin-top: 4rem;
        float: right;
      }
    }
  }
</style>

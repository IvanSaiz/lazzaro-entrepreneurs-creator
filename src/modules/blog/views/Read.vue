<template>
  <section id="blog" v-if="loaded">
    <header>
      <h1>{{ $t("blog.read.title") }}</h1>
      <p>{{ $t("blog.read.subtitle") }}</p>
    </header>
    <div class="content">
      <h2 class="h2--dash">{{ $t("blog.read.content.title") }}</h2>
      <h4>{{ $t("blog.read.content.subtitle") }}</h4>
      <LzTable :fields="articleFields" :items="articles">
        <template #title="{row: {title}}"> {{ title }}</template>
        <template #date="{row: {date}}"> {{ $d(date) }}</template>
        <template #status="{row: {status}}">
          {{ $t(`blog.read.table.item.status.${status}`) }}
        </template>
        <template #actions="{row: {id}}">
          <EyeIcon
            @click="
              $router.push({
                name: 'blogCreate',
                params: { articleId: id }
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
  const auth = namespace("auth");

  type Article = {
    id: string;
    title: string;
    description: string;
    status: "enabled" | "disabled";
    date: string;
    icon: string;
  };

  @Component({ components: { LzTable, LzButton } })
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
      Articles.getArticlesByMemberId(this.memberId)
        .then(articles => {
          this.articles = articles;
        })
        .finally(() => {
          this.loaded = true;
        });
    }
  }
</script>

<style lang="scss">
  #blog {
    header {
      margin-bottom: 4rem;
    }

    .content {
      .lz-table {
        &__td,
        &__th {
          text-align: left;

          &:last-child {
            display: flex;
            justify-content: flex-end;
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

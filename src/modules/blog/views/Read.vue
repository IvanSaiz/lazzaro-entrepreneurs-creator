<template>
  <section id="blog">
    <header>
      <h1>{{ $t("blog.read.title") }}</h1>
      <p>{{ $t("blog.read.subtitle") }}</p>
    </header>
    <div class="content">
      <h2 class="h2--dash">{{ $t("blog.read.content.title") }}</h2>
      <h4>{{ $t("blog.read.content.subtitle") }}</h4>
      <LzTable :fields="articleFields" :items="articles">
        <template #title="{row: {title}}"> {{ title }}</template>
        <template #date="{row: {date}}"> {{ date }}</template>
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

  type Article = {
    id: string;
    title: string;
    description: string;
    status: "enabled" | "disabled";
    date: string;
    icon: string;
  };

  // TODO: Replace with real data when the API is ready
  const mockArtiles: Article[] = [
    {
      id: "1",
      title: "Article 1",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      status: "enabled",
      date: "2024-01-01",
      icon: "eye"
    },
    {
      id: "2",
      title: "Article 2",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      status: "disabled",
      date: "2024-01-02",
      icon: "eye"
    }
  ];

  @Component({ components: { LzTable, LzButton } })
  export default class Read extends Vue {
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
    articles: Article[] = mockArtiles;
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

<template>
  <div class="training-home">
    <header>
      <h1>{{ $t("training.home.title") }}</h1>
      <p>{{ $t("training.home.subtitle") }}</p>
    </header>
    <div class="cols">
      <div v-for="card in cards" :key="card.title.toString()" class="card">
        <h2>{{ card.title }}</h2>
        <p>{{ card.subtitle }}</p>
        <div class="buttons">
          <router-link :to="{ name: card.buttons.link }">
            <file-text-icon :size="20" />
          </router-link>
          <button>
            <player-play-icon :size="20" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";

  export const sections = [
    "Web",
    "Support",
    "Advisor",
    "SEO",
    "Content",
    "Events",
    "Blog",
    "Portfolio"
  ];

  @Component
  export default class Home extends Vue {
    // Add data, methods, etc. here

    cards = sections.map(section => ({
      title: this.$t(`training.home.cards.${section}.title`),
      subtitle: this.$t(`training.home.cards.${section}.subtitle`),
      buttons: {
        link: `Training${section}`,
        video: section // TODO: replace with actual video link when available
      }
    }));
  }
</script>

<style lang="scss">
  .training-home {
    header {
      margin-bottom: 3rem;
    }
    .cols {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
      counter-reset: section;

      .card {
        --padding-inline: 5rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 1rem;
        position: relative;
        padding: 3rem var(--padding-inline);
        border-radius: 20px;
        background-color: $color-white;
        box-shadow: 0px 0px 8px 0px rgba(206, 212, 218, 0.25);

        h2 {
          color: $color-black-02;
          font-size: 17px;
          font-weight: bold;
          letter-spacing: 0.45px;
          margin: 0;

          &::before {
            counter-increment: section;
            content: counter(section);
            position: absolute;
            left: calc(var(--padding-inline) / 2.5);
            font-size: 24px;
            font-weight: 700;
            letter-spacing: 0.6px;
            color: $color-black-02;
          }
        }

        p {
          color: $color-black-02;
          font-size: 12px;
          font-weight: 400;
        }

        .buttons {
          display: flex;
          gap: 1rem;
          margin-top: 1rem;

          > * {
            border: none;
            background-color: $color-black-07;
            border-radius: 100%;
            padding: 5px;
          }
        }
      }
    }
  }
</style>

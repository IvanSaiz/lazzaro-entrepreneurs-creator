<template>
  <div class="training-home">
    <header>
      <h1>{{ $t("training.home.title") }}</h1>
      <p>{{ $t("training.home.subtitle") }}</p>
    </header>
    <dialog class="video-modal" @mousedown="handleBackdropClick">
      <form method="dialog" class="container">
        <button @click="closeDialog"><x-icon :size="30" /></button>
        <video controls :src="selectedVideo" autoplay type="video/mp4" />
      </form>
    </dialog>
    <div class="cols">
      <div v-for="card in cards" :key="card.title.toString()" class="card">
        <h2>{{ card.title }}</h2>
        <p>{{ card.subtitle }}</p>
        <div class="buttons">
          <router-link :to="{ name: card.buttons.link }">
            <file-text-icon size="20" />
          </router-link>
          <button
            v-if="card.buttons.video"
            @click="selectVideo(card.buttons.video)"
          >
            <player-play-icon size="20" />
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
    videos = {
      Support: require("../assets/videos/support.mp4"),
      Advisor: require("../assets/videos/advisor.mp4"),
      Portfolio: require("../assets/videos/portfolio.mp4"),
      Events: require("../assets/videos/events.mp4"),
      Web: require("../assets/videos/web.mp4"),
      Blog: require("../assets/videos/shop.mp4")
    };

    cards = sections.map(section => ({
      title: this.$t(`training.home.cards.${section}.title`),
      subtitle: this.$t(`training.home.cards.${section}.subtitle`),
      buttons: {
        link: `Training${section}`,
        video: this.videos[section]
      }
    }));

    selectedVideo = "";
    selectVideo(src: string) {
      this.selectedVideo = src;
      const dialog = this.$el.querySelector(
        ".video-modal"
      ) as HTMLDialogElement;
      dialog.showModal();
    }
    handleBackdropClick(e: MouseEvent) {
      if (e.target === e.currentTarget) {
        this.selectedVideo = "";
        (e.currentTarget as HTMLDialogElement).close();
      }
    }
    closeDialog() {
      this.selectedVideo = "";
      const dialog = this.$el.querySelector(
        ".video-modal"
      ) as HTMLDialogElement;
      dialog.close();
    }
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
            cursor: pointer;
          }
        }
      }
    }
    dialog.video-modal {
      padding: 0;
      border: none;
      background-color: transparent;
      max-width: 80%;
      overflow: hidden;

      &::backdrop {
        background-color: rgba(0, 0, 0, 0.5);
      }

      .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: transparent;
        border: none;

        button {
          padding: 0;
          border: 0;
          background-color: transparent;
          cursor: pointer;
          align-self: flex-end;

          svg * {
            color: $color-white;
          }
        }
      }

      video {
        max-width: 100%;
        max-height: 100%;
      }
    }
  }

  section.training {
    section {
      margin-top: 2.2rem;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 30px;

      h2 {
        margin-bottom: 8px;
        font-size: 19px;
        font-weight: 400;
        text-transform: uppercase;
        line-height: normal;
        color: $color-black-02;
      }

      p {
        font-size: 16px;
        line-height: normal;
        color: $color-black-03;
      }

      img {
        max-width: 70%;
      }
    }
  }
</style>

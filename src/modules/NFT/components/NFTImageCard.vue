<template>
  <div>
    <h3 style="color: #2C3E50;font-size: 1.2rem;" v-if="imageHeader">
      Visualización en web
    </h3>
    <div class="outer-card">
      <div class="card">
        <div
          class="image-container"
          :style="{ backgroundImage: `url(${imageSrc})` }"
        ></div>
        <div class="text">
          <h3>{{ title }}</h3>
          <p>{{ subtitle }}</p>
        </div>

        <div class="action">
          <lz-button>Ir al Markertplace <span class="arrow">➜</span></lz-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from "vue-property-decorator";
  import LzButton from "@/components/Button.vue";

  @Component({
    components: {
      LzButton
    }
  })
  export default class NFTImageCard extends Vue {
    @Prop({ required: true })
    title!: string;

    @Prop({ required: false, default: true })
    imageHeader!: boolean;

    @Prop({ required: true })
    subtitle!: string;

    @Prop({ required: true })
    imageSrc!: string;
  }
</script>

<style lang="scss" scoped>
  .outer-card {
    box-shadow: 0 0 5px #e7ecf7;
    padding: 2rem;
    height: fit-content;
    border-radius: 20px;
  }
  .card {
    box-shadow: 0 0 5px #cfd2d8;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    gap: 2rem;
    height: 30rem;
    width: 23rem;
    text-align: center;
    .image-container {
      padding: 1rem;
      width: 100%;
      height: 100%;
      background-position: center top;
      background-repeat: no-repeat;
      background-clip: border-box;
      background-size: cover;
      border-top-left-radius: 20px;
      border-top-right-radius: 20px;
    }

    .text {
      p {
        line-height: 1.2;
        font-size: 10.5;
        color: #a0a7b9;
      }
    }

    .action {
      width: 100%;

      button {
        max-width: 100%;
        border-radius: 0;
        margin: 0;
        border-bottom-left-radius: 20px;
        border-bottom-right-radius: 20px;
        .arrow {
          color: white;
          font-size: 1.2rem;
        }
      }
    }
  }
</style>

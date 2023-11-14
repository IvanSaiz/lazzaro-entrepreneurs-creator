<template>
  <div>
    <span class="dots" @click="handleShowPopup">
      ...
      <div class="popup" v-if="show">
        <ul>
          <li @click="viewNFT">Ver</li>
          <li @click="putOnSale">Poner en venta</li>
          <li>Eliminar</li>
        </ul>
      </div>
    </span>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from "vue-property-decorator";

  @Component({})
  export default class InputLabel extends Vue {
    show = false;

    @Prop({ required: true })
    NFTId!: string;

    handleShowPopup() {
      this.show = !this.show;
    }

    viewNFT() {
      this.$router.push({ name: "viewNFT", params: { id: this.NFTId } });
    }

    putOnSale() {
      this.$router.push({ name: "sellNFT", params: { id: this.NFTId } });
    }
  }
</script>

<style lang="scss" scoped>
  .popup {
    position: absolute;
    right: -80px;
    z-index: 99;
    box-shadow: 0 0 5px #afa9a9;
    border-radius: 5px;
    padding: 0.6rem;
    bottom: -75px;
    background: white;

    ul {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      width: 100%;
      text-align: left;
      li {
        font-size: 0.9rem;
        font-weight: bold;
        padding-inline: 0.2rem;
        cursor: pointer;

        &:hover {
          scale: 1.05;
        }
      }
    }
  }

  .dots {
    font-weight: bolder;
    font-size: 1.4rem;
    color: black;
    cursor: pointer;
    padding: 0.5rem;
    user-select: none;
    position: relative;
  }
</style>

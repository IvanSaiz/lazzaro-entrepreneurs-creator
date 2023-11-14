<template lang="pug">
.pagination(@wheel.prevent="handleMouseWheel")
  button(@click.prevent='onPageChange("prev")' class="prev-btn btn") ❮   

  .pages(ref='pages')
    .pageNumber(v-for="({pageNumber,...style}) in pageNumbers"
    :key='pageNumber' 
    ref="pageNumber"
    @click.prevent='onPageChange(pageNumber)' 
    :style='style') {{ pageNumber }}
    
  button(@click.prevent='onPageChange("next")' class="next-btn btn") ❯ 


</template>

<script lang="ts">
  import { Component, Vue, Prop, Emit } from "vue-property-decorator";

  type TPageNumbers = {
    pageNumber: number;
    backgroundColor: string;
    color: string;
  }[];

  @Component({})
  export default class Pagination extends Vue {
    @Prop({ required: true })
    protected readonly items!: unknown[];
    @Prop({ required: true })
    protected readonly currentPageNumber = 1;

    @Emit("onPageChange")
    onPageChange(action: "next" | "prev" | number): void {
      const pages = this.$refs.pageNumber as HTMLDivElement[];

      const pageNumberToScrollTo =
        action === "next"
          ? this.currentPageNumber + 1
          : action === "prev"
          ? this.currentPageNumber - 1
          : action;

      const pageToScrollTo = pages.find(
        page => +page.innerText === pageNumberToScrollTo
      );

      pageToScrollTo?.scrollIntoView();
    }

    handleMouseWheel(e: WheelEvent) {
      const target = e.target as HTMLElement;
      target.scrollLeft += e.deltaY * 2;
    }

    get pageNumbers(): TPageNumbers {
      const itemsPerPage = 10;
      const length = Math.ceil(this.items.length / itemsPerPage);

      return Array.from({ length }, (_item, i) => {
        const pageNumber = i + 1;
        return {
          pageNumber,
          backgroundColor:
            pageNumber === this.currentPageNumber ? "#8D00D8" : "transparent",
          color: pageNumber === this.currentPageNumber ? "white" : "#A0A7B9"
        };
      });
    }
  }
</script>

<style lang="scss">
  .pagination {
    margin-top: 1rem;
    padding-block: 2rem;
    display: flex;
    justify-content: center;
    align-items: baseline;
    gap: 1rem;

    .pages {
      display: flex;
      overflow-x: hidden;
      max-width: 44rem;
      justify-content: flex-start;
      gap: 0.8rem;
      padding-bottom: 1rem;

      .pageNumber {
        border-radius: 100%;
        color: black;
        font-weight: bolder;
        font-size: medium;
        padding: 1rem 1.2rem;
        margin-inline: 1px;
        cursor: pointer;
        transition: all 0.15s ease-in-out;

        &:hover {
          background-color: #8d00d8 !important;
          color: white !important;
        }
      }
    }

    .btn {
      cursor: pointer;
      background-color: transparent;
      border: none;
      color: $color-black-02;
      font-size: 1.5rem;
      padding: 0.5rem 1rem;
    }
  }
</style>

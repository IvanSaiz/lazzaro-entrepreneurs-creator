<template lang="pug">
  .lz-table

    .lz-table__tools
      .lz-table__download.lz-table-download(v-if="downloable")
        download-excel(
          :data="items"
          name="lazzaro-download.xls"
          :fields="downloadFields"
        )
          download-icon.lz-table-download__icon
          span.lz-table-download__text {{ $t('common.actions.downloadData') }}

    h3(v-if="title") {{ title }}
    
    table.lz-table__table
      thead
        tr
          th.lz-table__th.lz-table__th--head(
            v-for="field in fields"
            :key="field.id"
          ) {{ field.label }}

      tbody
        tr.lz-table__tr.lz-table__tr--body(
          v-for="(row, rowIdx) in pageItems"
          :key="rowIdx"
        )
          th.lz-table__th(
            :class="'lz-table__th--' + field.id"
            v-for="(field, fieldIdx) in fields"
            :key="fieldIdx"
          )
            slot(:name="field.id", :item="row[fieldIdx]", :row="row") {{ row[fieldIdx] }}

    <Pagination v-if="items?.length > 10"  @onPageChange="handlePageChange" :items="items" :currentPageNumber='currentPageNumber'/>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Watch } from "vue-property-decorator";
  import downloadExcel from "vue-json-excel";
  import Pagination from "./Pagination.vue";

  interface KeyItem {
    id: string;
    label: string;
  }

  @Component({
    components: { downloadExcel, Pagination }
  })
  export default class Table extends Vue {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    pageItems: unknown[] = [];
    itemsPerPage = 10;
    currentPageNumber = 1;

    @Prop({ required: true })
    readonly title!: string;

    @Prop({ required: true })
    readonly fields!: KeyItem[];

    @Prop({ required: true })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    readonly items!: any[];

    @Prop({ required: false, default: true })
    readonly downloable: boolean = true;

    get downloadFields() {
      return this.fields.reduce((downloadFields: any, field) => {
        downloadFields[field.label] = field.id;
        return downloadFields;
      }, {});
    }

    handlePageChange(action: "next" | "prev" | number): void {
      const { currentPageNumber, itemsPerPage } = this;

      if (action === "next") {
        const isLastPage =
          currentPageNumber * itemsPerPage >= this.items.length - 1;

        !isLastPage && this.currentPageNumber++;
      }

      if (action === "prev") {
        const isFirstPage = currentPageNumber <= 1;

        !isFirstPage && this.currentPageNumber--;
      }

      if (typeof action === "number") this.currentPageNumber = action;

      const start = (this.currentPageNumber - 1) * this.itemsPerPage;
      const end = this.currentPageNumber * this.itemsPerPage;
      this.pageItems = this.items.slice(start, end);
    }

    @Watch("items", { immediate: true })
    onItemsChange(items: any[]) {
      this.pageItems = items?.slice(0, 10) || [];
    }
  }
</script>

<style lang="scss">
  .lz-table {
    &__table {
      width: 100%;
    }

    &__th {
      color: $color-black-01;
      font-size: 16px;
      line-height: 1.25;
      vertical-align: middle;
      padding: 12px 24px;

      &--head {
        color: $color-black-02;
        background-color: $color-black-06;
      }
    }

    &__tr {
      &--body {
        border-bottom: 1px solid $color-black-04;
      }
    }

    &__tools {
      display: flex;
      justify-content: flex-end;
      margin: 10px 0;
      padding: 10px 0;
      text-align: right;
      width: 100%;
    }

    &__download {
      align-items: center;
      display: flex;
      font-size: 14px;
    }

    .lz-table-download {
      > div {
        align-items: center;
        display: flex;

        &:hover {
          cursor: pointer;
        }
      }

      &__icon {
        stroke: $color-black-02;
      }

      &__text {
        color: $color-black-02;
        margin-left: 10px;
      }
    }
  }
</style>

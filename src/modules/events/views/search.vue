<template lang="pug">
		.layout
			h3 {{ "Formaciones" }}
			SearchEvent(@search="handleSearchEvent")

			.layout__results
				ul
					li(v-for="item in listItems" :key="item.id") {{ item.text }}
				
	</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import SearchEvent from "@/components/SearchEvent.vue";

  @Component({ components: { SearchEvent } })
  export default class Search extends Vue {
    listItems = [
      { id: 1, text: "Item 1" },
      { id: 2, text: "Item 2" },
      { id: 4, text: "Item 3" },
      { id: 5, text: "Item 3" },
      { id: 6, text: "Item 3" },
      { id: 7, text: "Item 3" },
      { id: 8, text: "Item 3" }
    ];
  }
</script>

<style lang="scss" scoped>
  .layout {
    width: 344px;
    height: 580px;
    flex-shrink: 0;
    background-color: antiquewhite;
    padding: 20px 0 0 10px;
    border-radius: 20px;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      width: 10px;
      border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #888;
      border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb:hover {
      background-color: #555;
    }

    &::-webkit-scrollbar-track {
      background-color: #f1f1f1;
      border-radius: 10px;
    }

    &::-webkit-scrollbar-track:hover {
      background-color: #ddd;
    }
    &::-webkit-scrollbar-corner {
      border-radius: 10px;
    }

    &__results {
      li {
        background-color: #e7ecf7;
        border-radius: 10px;
        height: 61px;
        width: 255px;
        margin: 10px 0;
        list-style-type: none;
        padding-left: 10px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
      }
    }
  }
</style>

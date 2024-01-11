<template lang="pug">
.search-bar
  input(
    type="text"
    :placeholder="placeholder"
    v-model="searchText"
    @keyup.enter="submitSearch"
    @input="$emit('search', searchText)"
  )
  search-icon
</template>

<script>
  export default {
    props: {
      placeholder: String
    },
    data() {
      return { searchText: "" };
    },
    methods: {
      submitSearch() {
        this.$emit("search", this.searchText);
        this.searchText = "";
      }
    }
  };
</script>

<style lang="scss" scoped>
  .search-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 15px;
    border-radius: 10px;
    border: 1px solid $color-black-05;

    .icon {
      width: 20px;
      height: 20px;
    }

    input {
      border: none;
      font-size: 12px;
    }
  }
</style>

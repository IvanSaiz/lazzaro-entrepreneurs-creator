<template lang="pug">
	.search-bar
		input(
			type="text"
			placeholder="Search for a specific event..."
			v-model="searchText"
			@keyup.enter="submitSearch")
		button(@click="submitSearch") Submit
</template>

<script>
  export default {
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
    margin: 10px 0;

    input {
      padding: 5px;
      margin-right: 10px;
      border-radius: 8px;
      border: 1px solid $color-green-01;
      width: 22rem;
      height: 40px;
    }
    button {
      border: 1px solid $color-green-01;
      background-color: #fff;
      color: white;
      border-radius: 8px;
      background-color: $color-green-01;
      cursor: pointer;
      width: 7rem;
      height: 40px;

      &:hover {
        color: #fff;
        font-weight: bold;
      }
      &:focus {
        outline: none;
        box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.5);
      }
    }
  }
</style>

<template functional lang="pug">
  .lz-box(:class="[ props.tight && 'lz-box--tight', data.staticClass ]")
    slot
</template>

<style lang="scss">
  .lz-box {
    background-color: $color-white;
    padding: 40px;
    border-radius: $border-radius-default;
    box-shadow: 0 0 10px 0 $color-shadow-01;
    position: relative;
    transition: height $transition-default, width $transition-default;

    &.lz-box--tight {
      border-radius: calc($border-radius-default / 2);
      padding: 15px 25px;
    }
  }
</style>

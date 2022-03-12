<template>
  <div class="screen-item">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "ScreenItem",
  }
</script>

<style scoped>
  .screen-item span {
    font-size: 15px;
    padding: 5px 15px 5px 0;
  }
  .screen-item span::after {
    content: '\f0d7';
    display: inline-block;
    padding-left: 10px;
    font-family: 'icomoon';
  }
</style>

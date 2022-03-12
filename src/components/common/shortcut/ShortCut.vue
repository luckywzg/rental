<template>
  <div class="shortcut">
    <div class="shortcut-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import ShortCutItem from "./ShortCutItem";
  export default {
    name: "ShortCut",
    components: {
      ShortCutItem
    }
  }
</script>

<style scoped>
  .shortcut {
    height: 30px;
    line-height: 30px;
    background-color: #f5f5f5;
  }
  .shortcut-content {
    width: 1200px;
    height: 30px;
    margin: 0 auto;
    display: flex;
    font-size: 12px;
    padding-left: 280px;
  }
</style>

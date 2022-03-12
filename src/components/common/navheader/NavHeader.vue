<template>
  <div class="header w">
    <slot name="left"></slot>
    <div class="header-select"><slot name="center"></slot></div>
    <div class="search"><slot name="right"></slot></div>
  </div>

</template>

<script>
export default {
  name: "NavHeader",
  props: {
    areaList: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
  .header {
    display: flex;
    margin-top: 20px;
    align-items: center;
  }
  .header img {
    width: 210px;
    height: 60px;
    margin-left: 50px;
  }
  .header-select {
    width: 100px;
    text-align: center;
    margin-left: 15px;
  }
  .search {
    height: 60px;
    line-height: 60px;
  }
  .search select {
    border: 0;
    margin: 0 10px;
    /*去除选中黑色边框*/
    outline: none;
    color: #666;
    background-color: transparent;
  }
  .search input {
    width: 600px;
    height: 40px;
    outline: none;
    margin-left: 50px;
    vertical-align: middle;
    background-color: transparent;
    border: 2px solid var(--color-high-text);
  }
  .search input::selection {
    background-color: #fff;
  }
  .search input[value] {
    font-size: 14px;
    color: #666;
    background-color: #fff;
  }
  .search button {
    width: 90px;
    height: 40px;
    vertical-align: middle;
    background-color: var(--color-high-text);
    font: initial;
    color: #fff;
    border: 0;
  }
</style>

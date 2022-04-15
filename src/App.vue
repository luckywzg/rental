<template>
  <div id="app">
    <router-link to="/home"></router-link>
    <router-view />
  </div>
</template>
<script>
export default {
  name: "app",
  components: {},
  metaInfo: {
    title: "network-rental",
  },
};
</script>
<style>
@import "assets/css/base.css";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #666;
}
</style>

<template>
  <div>
    <login-info>
      <store :user="user"></store>
    </login-info>
  </div>
</template>

<script>
import LoginInfo from "../../login/childComps/LoginInfo.vue";
import Store from "../Store.vue";
export default {
  name: "StoreLogin",
  components: { LoginInfo, Store },
  data() {
    return {
      user: {},
    };
  },
  mounted() {
    this.user = this.$route.query;
  },
};
</script>

<style></style>

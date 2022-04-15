<template>
  <div>
    <login-info>
      <admin></admin>
    </login-info>
  </div>
</template>

<script>
import LoginInfo from "../../login/childComps/LoginInfo.vue";
import Admin from "../Admin.vue";
export default {
  name: "AdminLogin",
  components: { LoginInfo, Admin },
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

<template>
  <div class="user-login">
    <login-info>
      <user :user="user"></user>
    </login-info>
  </div>
</template>

<script>
import User from "../User.vue";
import LoginInfo from "../../login/childComps/LoginInfo.vue";
export default {
  name: "UserLogin",
  components: { LoginInfo, User },
  data () {
    return {
      user: {}
    }
  },
  mounted () {
    this.user = this.$route.query
  }
};
</script>

<style></style>

<template>
  <div class="link-item" @click="itemClick">
    <div :style="isStyle"><slot></slot></div>
  </div>
</template>

<script>
export default {
  name: "LinkItem",
  props: {
    path: String,
    activeColor: {
      type: String,
      default: "#ff5777",
    },
    user: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {};
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.path) !== -1;
    },
    isStyle() {
      return this.isActive ? { color: this.activeColor } : {};
    },
  },
  methods: {
    itemClick() {
      if (!this.isActive) {
        this.$router.push(this.path);
      }
    },
  },
};
</script>
<style scoped>
.link-item {
  display: inline-block;
  padding: 0 10px;
}
.link-item:hover {
  cursor: pointer;
}
.nav-item:hover {
  cursor: pointer;
  color: var(--color-high-text);
}
</style>

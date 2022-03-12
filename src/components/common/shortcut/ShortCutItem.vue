<template>
  <div class="shortcut-item" @click="itemClick">
    <div :style="isStyle"><slot></slot></div>
  </div>
</template>

<script>
export default {
  name: "ShortCutItem",
  props: {
    path: String,
    activeColor: {
      type: String,
      default: '#ff5777'
    }
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.path)!== -1
    },
    isStyle() {
      return this.isActive ? {color: this.activeColor} : {}
    }
  },
  methods: {
    itemClick() {
      if(!this.isActive) {
        this.$router.replace(this.path)
      }
    }
  }
}
</script>

<style scoped>
  .shortcut-item {
    padding: 0 10px;
    cursor: default;
  }
  .shortcut-item:hover {
    color: var(--color-high-text);
  }
</style>

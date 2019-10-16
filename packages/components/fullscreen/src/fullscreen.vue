<template>
  <div class="full-screen">
    <Icon @click="handleFullscreen" :type="isFullscreen ? 'md-contract' : 'md-expand'" size="24" />
  </div>
</template>

<script>
export default {
  name: "fullscreen",
  data() {
    return {
      isFullscreen: false
    };
  },
  methods: {
    handleFullscreen() {
      this.onOffFullscreen(this.isFullscreen);
    }
  },
  mounted() {
    document.addEventListener("fullscreenchange", () => {
      this.isFullscreen = !this.isFullscreen;
    });
    document.addEventListener("mozfullscreenchange", () => {
      this.isFullscreen = !this.isFullscreen;
    });
    document.addEventListener("webkitfullscreenchange", () => {
      this.isFullscreen = !this.isFullscreen;
    });
    document.addEventListener("msfullscreenchange", () => {
      this.isFullscreen = !this.isFullscreen;
    });
  }
};
</script>

<style lang="stylus" scoped></style>
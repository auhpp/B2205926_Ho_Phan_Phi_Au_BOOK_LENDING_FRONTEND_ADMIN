<script>
export default {
  name: "LoadingOverlay",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<template>
  <div
    v-if="visible"
    class="loading-overlay d-flex justify-content-center align-items-center"
  >
    <div class="text-center">
      <div
        class="spinner-border text-light"
        style="width: 3rem; height: 3rem"
        role="status"
      >
        <span class="visually-hidden">Loading...</span>
      </div>
      <div class="mt-3 text-light fw-bold fs-5">
        Đang xử lý, vui lòng đợi...
      </div>
    </div>
  </div>
</template>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 9999;
  backdrop-filter: blur(2px);
}
</style>

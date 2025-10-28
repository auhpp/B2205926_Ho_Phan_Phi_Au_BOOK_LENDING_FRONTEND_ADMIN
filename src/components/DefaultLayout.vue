<script>
import AppHeader from "@/components/AppHeader.vue";
import AppSidebar from "@/components/AppSideBar.vue";

export default {
  components: {
    AppHeader,
    AppSidebar,
  },
};
</script>

<template>
  <div class="row default-layout g-0">
    <div class="sidebar col-md-3 col-lg-2 p-0">
      <AppSidebar />
    </div>
    <main class="container col-md-9 ms-sm-auto col-lg-10 main-content">
      <AppHeader />
      <div class="mt-3 content">
        <router-view />
      </div>
    </main>
  </div>
</template>

<style>
.default-layout .main-content {
  padding-inline: 0;
  padding-top: 60px;
  height: 100vh;
  overflow-y: auto;
}

.default-layout {
  height: 100vh;
  width: 100%;
}
</style>

<script>
import logo from "@/assets/images/logo.png";
import routes from "@/config/routes";

export default {
  data() {
    return {
      logo: logo,
      routes: routes,
    };
  },
};
</script>

<template>
  <div
    class="d-flex flex-column flex-shrink-0 p-2 bg-light fixed-sidebar"
    style="width: 250px"
  >
    <router-link
      :to="routes.books"
      class="d-flex align-items-center mb-2 mb-md-0 mx-auto link-dark text-decoration-none"
    >
      <img :src="logo" class="logo" alt="" />
    </router-link>
    <ul class="nav nav-pills flex-column mb-auto">
      <li class="nav-item">
        <router-link
          :to="routes.books"
          class="nav-link active"
          aria-current="page"
        >
          <i class="fa-solid fa-book"></i>
          Quản lý sách
        </router-link>
      </li>
      <li class="nav-item">
        <router-link
          :to="routes.categories"
          class="nav-link text-black"
          aria-current="page"
        >
          <i class="fa-solid fa-book"></i>
          Quản lý danh mục
        </router-link>
      </li>
      <li class="nav-item">
        <router-link
          :to="routes.publishers"
          class="nav-link text-black"
          aria-current="page"
        >
          <i class="fa-solid fa-book"></i>
          Quản lý tác giả
        </router-link>
      </li>
    </ul>
  </div>
</template>

<style>
.logo {
  width: 90px;
}

.fixed-sidebar {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  overflow-y: auto;
  z-index: 1030;
  border-right: 1px solid #dee2e6;
}
</style>

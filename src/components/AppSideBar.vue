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
    class="d-flex flex-column flex-shrink-0 p-2 pt-0 bg-white fixed-sidebar"
    style="width: 250px"
  >
    <router-link
      :to="routes.books"
      class="d-flex align-items-center mb-2 mb-md-0 mx-auto link-dark text-decoration-none"
    >
      <img :src="logo" class="logo" alt="" />
    </router-link>
    <ul class="nav nav-pills flex-column mb-auto">
      <li class="nav-item mb-1">
        <router-link :to="routes.books" v-slot="{ href, navigate }" custom>
          <a
            :href="href"
            @click="navigate"
            :class="[
              'nav-link',
              $route.path.startsWith(routes.books) ? 'active' : 'text-black',
            ]"
            :aria-current="$route.path.startsWith(routes.books) ? 'page' : null"
          >
            <i class="fa-solid fa-book"></i>
            Quản lý sách
          </a>
        </router-link>
      </li>

      <li class="nav-item mb-1">
        <router-link :to="routes.categories" v-slot="{ href, navigate }" custom>
          <a
            :href="href"
            @click="navigate"
            :class="[
              'nav-link',
              $route.path.startsWith(routes.categories)
                ? 'active'
                : 'text-black',
            ]"
            :aria-current="
              $route.path.startsWith(routes.categories) ? 'page' : null
            "
          >
            <i class="fa-solid fa-icons"></i> Quản lý danh mục
          </a>
        </router-link>
      </li>

      <li class="nav-item mb-1">
        <router-link :to="routes.authors" v-slot="{ href, navigate }" custom>
          <a
            :href="href"
            @click="navigate"
            :class="[
              'nav-link',
              $route.path.startsWith(routes.authors) ? 'active' : 'text-black',
            ]"
            :aria-current="
              $route.path.startsWith(routes.authors) ? 'page' : null
            "
          >
            <i class="fa-solid fa-person-walking-luggage"></i>
            Quản lý tác giả
          </a>
        </router-link>
      </li>

      <li class="nav-item mb-1">
        <router-link :to="routes.publishers" v-slot="{ href, navigate }" custom>
          <a
            :href="href"
            @click="navigate"
            :class="[
              'nav-link',
              $route.path.startsWith(routes.publishers)
                ? 'active'
                : 'text-black',
            ]"
            :aria-current="
              $route.path.startsWith(routes.publishers) ? 'page' : null
            "
          >
            <i class="fa-solid fa-user-secret"></i>
            Quản lý nhà xuất bản
          </a>
        </router-link>
      </li>
      <li class="nav-item mb-1">
        <router-link
          :to="routes.configurations"
          v-slot="{ href, navigate }"
          custom
        >
          <a
            :href="href"
            @click="navigate"
            :class="[
              'nav-link',
              $route.path.startsWith(routes.configurations)
                ? 'active'
                : 'text-black',
            ]"
            :aria-current="
              $route.path.startsWith(routes.configurations) ? 'page' : null
            "
          >
            <i class="fa-solid fa-calendar-check"></i>
            Quản lý cấu hình
          </a>
        </router-link>
      </li>
      <li class="nav-item mb-1">
        <router-link :to="routes.loanSlip" v-slot="{ href, navigate }" custom>
          <a
            :href="href"
            @click="navigate"
            :class="[
              'nav-link',
              $route.path.startsWith(routes.loanSlip) ? 'active' : 'text-black',
            ]"
            :aria-current="
              $route.path.startsWith(routes.loanSlip) ? 'page' : null
            "
          >
            <i class="fa-solid fa-clipboard-list"></i>
            Quản lý phiếu mượn
          </a>
        </router-link>
      </li>
      <li class="nav-item mb-1">
        <router-link
          :to="routes.penaltyTicket"
          v-slot="{ href, navigate }"
          custom
        >
          <a
            :href="href"
            @click="navigate"
            :class="[
              'nav-link',
              $route.path.startsWith(routes.penaltyTicket)
                ? 'active'
                : 'text-black',
            ]"
            :aria-current="
              $route.path.startsWith(routes.penaltyTicket) ? 'page' : null
            "
          >
            <i class="fa-solid fa-ticket"></i>
            Quản lý phiếu phạt
          </a>
        </router-link>
      </li>
      <li class="nav-item mb-1">
        <router-link :to="routes.staffs" v-slot="{ href, navigate }" custom>
          <a
            :href="href"
            @click="navigate"
            :class="[
              'nav-link',
              $route.path.startsWith(routes.staffs) ? 'active' : 'text-black',
            ]"
            :aria-current="
              $route.path.startsWith(routes.staffs) ? 'page' : null
            "
          >
            <i class="fa-solid fa-clipboard-user"></i>
            Quản lý nhân viên
          </a>
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

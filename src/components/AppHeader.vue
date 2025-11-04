<script>
import authService from "@/services/auth.service";
import defaultAvatar from "./../assets/images/default_avatar.png";
export default {
  data() {
    return {
      user: null,
      defaultAvatar,
    };
  },
  methods: {
    async getUser() {
      const data = await authService.getCurrentUser();
      this.user = data.result;
    },

    signout() {
      localStorage.removeItem("access_token");
      this.$router.replace({ name: "signin" });
    },
  },
  created() {
    this.getUser();
  },
};
</script>

<template>
  <header class="p-3 mb-3 border-bottom fixed-header">
    <div class="d-flex flex-wrap align-items-center justify-content-end">
      <div class="dropdown text-end" v-if="user">
        <div
          class="d-flex align-items-center link-dark text-decoration-none dropdown-toggle"
          id="dropdownUser1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          style="cursor: pointer"
        >
          <img
            :src="
              user.avatar != null && user.avatar != ''
                ? user.avatar
                : defaultAvatar
            "
            alt="mdo"
            width="32"
            height="32"
            class="rounded-circle me-2"
          />
          <strong>{{ user.userName }}</strong>
        </div>
        <ul class="dropdown-menu text-small" aria-labelledby="dropdownUser1">
          <li><a class="dropdown-item" href="#">Tài khoản của tôi</a></li>
          <li><hr class="dropdown-divider" /></li>
          <li>
            <div class="dropdown-item" style="cursor: pointer" @click="signout">
              Đăng xuất
            </div>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<style>
.fixed-header {
  position: fixed;
  top: 0;
  left: 254px;
  right: 0;
  z-index: 1020;
  background-color: #fff;
}
</style>

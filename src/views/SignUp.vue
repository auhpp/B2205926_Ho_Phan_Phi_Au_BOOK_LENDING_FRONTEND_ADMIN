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
  <div class="container d-flex align-items-center">
    <div class="row w-100">
      <main class="form-signin col-4 offset-4 text-center">
        <form>
          <img class="" :src="logo" alt="" width="120" height="120" />
          <h1 class="h3 mb-3 fw-normal">Đăng ký</h1>

          <div class="form-floating">
            <input
              type="email"
              class="form-control"
              id="floatingInput"
              placeholder="name@example.com"
            />
            <label for="floatingInput">Username</label>
          </div>
          <div class="form-floating mt-2">
            <input
              type="password"
              class="form-control"
              id="floatingPassword"
              placeholder="Password"
            />
            <label for="floatingPassword">Password</label>
          </div>

          <div class="login-text pt-2 pb-1">
            <span class="text-secondary">Đã có tài khoản? </span>
            <router-link :to="routes.signin" class="login-nav primary-text"
              >Đăng nhập</router-link
            >
          </div>
          <button class="w-100 btn btn-lg btn-primary mt-2" type="submit">
            Đăng ký
          </button>
        </form>
      </main>
    </div>
  </div>
</template>

<style>
.container {
  height: 100vh;
}
</style>

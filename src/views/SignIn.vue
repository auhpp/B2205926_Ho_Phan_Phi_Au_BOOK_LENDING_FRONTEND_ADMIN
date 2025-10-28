<script>
import logo from "@/assets/images/logo.png";
import routes from "@/config/routes";
import * as yup from "yup";
import { ErrorMessage, Field, Form } from "vee-validate";
import AuthService from "@/services/auth.service";

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },

  data() {
    const loginFormSchema = yup.object().shape({
      userName: yup.string().required("Nhập username"),
      password: yup.string().required("Nhập mật khẩu"),
    });
    return {
      logo: logo,
      routes: routes,
      userName: "",
      password: "",
      loginFormSchema,
      errorLogin: "",
    };
  },
  methods: {
    async signin() {
      try {
        console.log("login");
        const authRes = await AuthService.signin({
          userName: this.userName,
          password: this.password,
        });
        if (authRes.result.authenticated == true) {
          console.log("navigate");
          this.$router.push({ name: "book" });
          localStorage.setItem("access_token", authRes.result.token);
        } else {
          this.errorLogin = "Tên đăng nhập hoặc mật khẩu không đúng.";
        }
      } catch (error) {
        this.errorLogin = "Tên đăng nhập hoặc mật khẩu không đúng.";
        console.log(error);
      }
    },
  },
};
</script>

<template>
  <div class="container d-flex align-items-center">
    <div class="row w-100">
      <main class="form-signin col-4 offset-4 text-center">
        <Form @submit="signin" :validation-schema="loginFormSchema">
          <img class="" :src="logo" alt="" width="120" height="120" />
          <h1 class="h3 mb-3 fw-normal">Đăng nhập</h1>
          <div v-if="errorLogin" class="alert alert-danger" role="alert">
            <span> {{ errorLogin }}</span>
          </div>
          <div class="form-floating  text-start">
            <Field
              type="text"
              class="form-control"
              id="userName"
              name="userName"
              v-model="userName"
            />
            <label for="userName">Username</label>
            <ErrorMessage name="userName" class="text-danger" />
          </div>
          <div class="form-floating mt-2 text-start">
            <Field
              type="password"
              class="form-control"
              id="password"
              placeholder="Password"
              name="password"
              v-model="password"
            />
            <label for="password">Password</label>
            <ErrorMessage name="password" class="text-danger" />
          </div>
          <div class="row justify-content-between pt-2 pb-1">
            <!-- <div class="login-text col-5 text-start">
              <router-link to="/signin" class="login-nav primary-text"
                >Quên mật khẩu?</router-link
              >
            </div> -->
            <!-- <div class="login-text col-7">
              <span class="text-secondary">Chưa có tài khoản? </span>
              <router-link :to="routes.signup" class="login-nav primary-text"
                >Đăng ký</router-link
              >
            </div> -->
          </div>

          <button class="w-100 btn btn-lg btn-primary mt-2">Đăng nhập</button>
        </Form>
      </main>
    </div>
  </div>
</template>

<style>
.container {
  height: 100vh;
}
</style>

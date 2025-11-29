<script>
import logo from "@/assets/images/logo.png";
import routes from "@/config/routes";
import * as yup from "yup";
import { ErrorMessage, Field, Form } from "vee-validate";
import AuthService from "@/services/auth.service";
import authService from "@/services/auth.service";
import LoadingOverlay from "./loadingOverlay.vue";

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
    LoadingOverlay,
  },
  emits: ["submit:userName"],
  data() {
    const userNameFormSchema = yup.object().shape({
      userName: yup.string().required("Nhập username"),
    });
    return {
      logo: logo,
      routes: routes,
      userName: "",
      userNameFormSchema,
      errorLogin: "",
    };
  },
  methods: {
    sendOtp() {
      this.$emit("submit:userName", this.userName);
    },
  },
};
</script>
<template>
  <Form method="post" @submit="sendOtp" :validation-schema="userNameFormSchema">
    <div class="d-flex justify-content-center">
      <div class="logo w-100">
        <img class="" :src="logo" alt="" />
      </div>
    </div>
    <div class="row align-items-center mb-3">
      <i
        class="fa-solid fa-arrow-left col-2"
        style="cursor: pointer"
        @click="this.$router.back()"
      ></i>
      <h3 class="fw-normal col text-center">Đặt lại mật khẩu</h3>
    </div>

    <div class="form-floating text-start">
      <Field
        type="text"
        class="form-control"
        id="userName"
        name="userName"
        placeholder="userName"
        v-model="userName"
      />
      <label for="userName">Username</label>
      <ErrorMessage name="userName" class="text-danger" />
    </div>
    <button class="w-100 btn btn-lg btn-primary mt-2">Tiếp theo</button>
  </Form>
</template>

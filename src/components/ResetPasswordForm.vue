<script>
import logo from "@/assets/images/logo.png";
import routes from "@/config/routes";
import * as yup from "yup";
import { ErrorMessage, Field, Form } from "vee-validate";

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  emits: ["submit:new-password"],
  data() {
    const newPasswordFormSchema = yup.object().shape({
      password: yup
        .string()
        .required("Mật khẩu không được để trống")
        .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
      confirmPassword: yup
        .string()
        .required("Vui lòng nhập lại mật khẩu")
        .oneOf([yup.ref("password")], "Mật khẩu nhập lại không khớp"),
    });
    return {
      logo: logo,
      routes: routes,
      password: "",
      confirmPassword: "",
      newPasswordFormSchema,
      isShowPassword: false,
    };
  },
  methods: {
    resetPassword() {
      console.log("resetPassword", this.confirmPassword);
      this.$emit("submit:new-password", this.confirmPassword);
    },
  },
};
</script>
<template>
  <Form
    method="post"
    @submit="resetPassword"
    :validation-schema="newPasswordFormSchema"
  >
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
      <h3 class="fw-normal col text-center">Nhập mật khẩu mới</h3>
    </div>
    <div class="form-floating text-start">
      <Field
        :type="isShowPassword ? 'text' : 'password'"
        class="form-control"
        id="password"
        name="password"
        placeholder="password"
        v-model="password"
      />
      <label for="password">Password</label>
      <ErrorMessage name="password" class="text-danger" />
    </div>
    <div class="form-floating text-start mt-2">
      <Field
        :type="isShowPassword ? 'text' : 'password'"
        class="form-control"
        id="confirmPassword"
        name="confirmPassword"
        placeholder="confirmPassword"
        v-model="confirmPassword"
      />
      <label for="confirmPassword">Confirm password</label>
      <ErrorMessage name="confirmPassword" class="text-danger" />
    </div>
    <div class="form-check pt-2 pb-1">
      <input
        class="form-check-input"
        type="checkbox"
        v-model="isShowPassword"
        id="flexCheckDefault"
      />
      <label
        class="form-check-label d-flex justify-content-start"
        for="flexCheckDefault"
      >
        Hiển thị mật khẩu
      </label>
    </div>
    <button class="w-100 btn btn-lg btn-primary mt-2">Lưu</button>
  </Form>
</template>

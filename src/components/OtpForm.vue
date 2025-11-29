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
  emits: ["submit:otp", "resend:otp"],
  data() {
    const otpFormSchema = yup.object().shape({
      otp: yup.string().required("Nhập otp"),
    });
    return {
      logo: logo,
      routes: routes,
      otp: "",
      otpFormSchema,
      countdown: 60,
      canResend: false,
      timer: null,
    };
  },
  mounted() {
    this.startTimer();
  },
  beforeUnmount() {
    if (this.timer) clearInterval(this.timer);
  },
  methods: {
    startTimer() {
      this.canResend = false;
      this.countdown = 60;

      this.timer = setInterval(() => {
        if (this.countdown > 0) {
          this.countdown--;
        } else {
          this.canResend = true;
          clearInterval(this.timer);
        }
      }, 1000);
    },

    handleResend() {
      if (!this.canResend) return;

      this.$emit("resend:otp");

      this.startTimer();
    },
    
    verifyOtp() {
      this.$emit("submit:otp", this.otp);
    },
  },
};
</script>
<template>
  <Form method="post" @submit="verifyOtp" :validation-schema="otpFormSchema">
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
      <h3 class="fw-normal col text-center">Nhập mã OTP</h3>
    </div>
    <div class="form-floating text-start">
      <Field
        type="text"
        class="form-control"
        id="otp"
        name="otp"
        placeholder="otp"
        v-model="otp"
      />
      <label for="otp">OTP</label>
      <ErrorMessage name="otp" class="text-danger" />
    </div>
    <div class="text-center mt-2">
      <span v-if="!canResend" class="text-muted">
        Gửi lại mã sau: {{ countdown }}s
      </span>

      <button
        v-else
        @click="handleResend"
        class="btn btn-link text-decoration-none"
      >
        Gửi lại mã OTP
      </button>
    </div>
    <button class="w-100 btn btn-lg btn-primary mt-2">Tiếp theo</button>
  </Form>
</template>

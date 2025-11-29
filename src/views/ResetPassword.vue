<script>
import UserNameForm from "@/components/UserNameForm.vue";
import authService from "@/services/auth.service";
import LoadingOverlay from "@/components/loadingOverlay.vue";
import OtpForm from "@/components/OtpForm.vue";
import { Role } from "@/utils/constant";
import ResetPasswordForm from "@/components/ResetPasswordForm.vue";

export default {
  components: { UserNameForm, LoadingOverlay, OtpForm, ResetPasswordForm },

  data() {
    return {
      userName: "",
      currentStep: "userName",
      isLoading: false,
      otp: "",
    };
  },
  methods: {
    async sendOtp(userNameParam) {
      try {
        this.isLoading = true;
        const data = await authService.sendotp({
          userName: userNameParam,
          role: Role.ADMIN.name,
        });
        if (data.status == "success") {
          this.userName = userNameParam;
          this.currentStep = "otp";
        } else {
          alert(
            "Tên username không tồn tại hoặc tài khoản chưa liên kết email"
          );
        }
      } catch (error) {
        alert("Tên username không tồn tại hoặc tài khoản chưa liên kết email");
      } finally {
        this.isLoading = false;
      }
    },

    async verifyOtp(otp) {
      try {
        this.isLoading = true;
        const data = await authService.verifyOtp({
          userName: this.userName,
          otp: otp,
        });
        if (data.status == "success") {
          this.otp = otp;
          this.currentStep = "resetPassword";
        } else {
          alert("Mã OTP không đúng!");
        }
      } catch (error) {
        alert("Mã OTP không đúng!");
      } finally {
        this.isLoading = false;
      }
    },
    async handleResetPassword(newPassword) {
      try {
        this.isLoading = true;
        const data = await authService.resetPassword({
          userName: this.userName,
          otp: this.otp,
          newPassword: newPassword,
          role: Role.ADMIN.name,
        });
        if (data.status == "success") {
          this.$router.replace({ name: "signin" });
        } else {
          alert("Đổi mật khẩu thất bại");
        }
      } catch (error) {
        alert("Đổi mật khẩu thất bại", error);
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<template>
  <div class="container d-flex align-items-center">
    <LoadingOverlay :visible="isLoading" />

    <div class="row w-100">
      <main class="form-signin col-4 offset-4 text-center">
        <UserNameForm
          v-if="currentStep == 'userName'"
          @submit:user-name="sendOtp"
        />
        <OtpForm
          v-else-if="currentStep == 'otp'"
          @submit:otp="verifyOtp"
          @resend:otp="sendOtp(userName)"
        />
        <ResetPasswordForm v-else @submit:new-password="handleResetPassword" />
      </main>
    </div>
  </div>
</template>

<style>
.container {
  height: 100vh;
}

.logo {
  max-height: 120px;
  max-width: 120px;
  display: block;
}

.form-signin {
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  padding: 10px;
  border-radius: 6px;
}
</style>

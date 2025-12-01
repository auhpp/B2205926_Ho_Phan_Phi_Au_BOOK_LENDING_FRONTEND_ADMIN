<script>
import authService from "@/services/auth.service";
import { ErrorMessage, Field, Form } from "vee-validate";
import * as yup from "yup";
import LoadingOverlay from "@/components/loadingOverlay.vue";

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
    LoadingOverlay,
  },
  data() {
    const newPasswordFormSchema = yup.object().shape({
      oldPassword: yup.string().required("Mật khẩu không được để trống"),
      newPassword: yup
        .string()
        .required("Mật khẩu không được để trống")
        .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
        .matches(/[a-z]/, "Mật khẩu phải chứa ít nhất một chữ thường")
        .matches(/[A-Z]/, "Mật khẩu phải chứa ít nhất một chữ hoa")
        .matches(/[0-9]/, "Mật khẩu phải chứa ít nhất một số")
        .matches(
          /[!@#$%^&*(),.?":{}|<>]/,
          "Mật khẩu phải chứa ít nhất một ký tự đặc biệt"
        )
        .notOneOf(
          [yup.ref("oldPassword")],
          "Mật khẩu mới không được trùng với mật khẩu cũ"
        ),

      confirmPassword: yup
        .string()
        .required("Vui lòng nhập lại mật khẩu")
        .oneOf([yup.ref("newPassword")], "Mật khẩu nhập lại không khớp"),
    });
    return {
      newPasswordFormSchema,
      isShowPassword: false,
      isloading: false,
    };
  },
  methods: {
    async changePassword(values, { setErrors, resetField, resetForm }) {
      try {
        this.isloading = true;
        const data = await authService.changePassword({
          oldPassword: values.oldPassword,
          newPassword: values.confirmPassword,
        });
        if (data.status == "success") {
          alert("Đổi mật khẩu thành công");
          resetForm();
          this.$router.replace({ name: "profile" });
        } else {
          resetField("oldPassword");
          setErrors({
            oldPassword: "Mật khẩu cũ không chính xác",
          });
        }
      } catch (error) {
        console.log(error);
        if (error.response && error.response.status === 400) {
          resetField("oldPassword");
          setErrors({
            oldPassword: "Mật khẩu cũ không chính xác",
          });
        } else {
          alert("Đổi mật khẩu thất bại do lỗi hệ thống");
        }
      } finally {
        this.isloading = false;
      }
    },
  },
};
</script>

<template>
  <div class="container" style="height: auto">
    <LoadingOverlay :visible="isloading" />
    <div class="profile">
      <!-- {/* head */} -->
      <div class="head row">
        <div class="main-title col">
          <h4>Đổi mật khẩu</h4>
          <p class="des">
            Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác
          </p>
        </div>
      </div>
      <div class="main-content-profile">
        <Form
          method="post"
          @submit="changePassword"
          :validation-schema="newPasswordFormSchema"
          class="row justify-content-center"
        >
          <div class="content-password col-8">
            <!-- {/* user name */} -->
            <div class="mb-4 row">
              <label
                for="oldPassword"
                class="col-lg-3 col-form-label input-title"
              >
                Mật khẩu cũ
              </label>
              <div class="col-lg-9">
                <Field
                  :type="isShowPassword ? 'text' : 'password'"
                  id="oldPassword"
                  class="form-control input-item"
                  name="oldPassword"
                />
                <ErrorMessage name="oldPassword" class="text-danger" />
              </div>
            </div>
            <!-- {/* full name */} -->
            <div class="mb-4 row">
              <label
                for="newPassword"
                class="col-lg-3 col-form-label input-title"
              >
                Mật khẩu mới
              </label>
              <div class="col-lg-9">
                <Field
                  :type="isShowPassword ? 'text' : 'password'"
                  id="newPassword"
                  class="form-control input-item"
                  name="newPassword"
                />
                <ErrorMessage name="newPassword" class="text-danger" />
              </div>
            </div>
            <!-- {/* email */} -->
            <div class="mb-4 row">
              <label
                for="confirmPassword"
                class="col-lg-3 col-form-label input-title"
              >
                Xác nhận lại mật khẩu
              </label>
              <div class="col-lg-9">
                <Field
                  :type="isShowPassword ? 'text' : 'password'"
                  id="confirmPassword"
                  class="form-control input-item"
                  name="confirmPassword"
                />
                <ErrorMessage name="confirmPassword" class="text-danger" />
              </div>
            </div>
            <div class="mb-4 row">
              <div class="col-lg-3"></div>
              <div class="col-lg-8 ms-3 form-check pt-2 pb-1">
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
            </div>
            <!-- {/* button submit */} -->
            <div class="mb-4 row">
              <label class="col-lg-3 col-form-label input-title"></label>
              <div class="col-lg-9">
                <button class="btn btn-primary">Lưu</button>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<style>
.main-content-profile {
  padding-top: 20px;
}

.profile {
  padding: 10px 30px;
  background-color: white;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.13);
}

.profile .head {
  padding: 18px 0;
  border-bottom: 1px solid #efefef;
}

.profile .head .des {
  font-size: 14px;
  margin-top: 4px;
}

.content .input-item {
  padding: 6px 10px;
  font-size: 16px;
  width: 90%;
}

.gender-list {
  display: flex;
  align-items: center;
  gap: 16px;
}

/* avatar */
.avatar {
  display: flex;
  align-items: center;
  justify-content: start;
  flex-direction: column;
  gap: 10px;
}

.avatar img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
}

.avatar .choose-img-btn {
  background-color: white;
  border: 1px solid var(--grey-border);
  padding: 8px 10px;
  color: var(--grey-text);
  font-weight: normal;
}

.avatar .choose-img-btn:hover {
  border: 1px solid var(--grey-border);
  background-color: var(--white-bg);
}

.avatar .note {
  color: var(--grey-text);
}
</style>

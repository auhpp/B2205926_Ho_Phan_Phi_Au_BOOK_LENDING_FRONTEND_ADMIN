<script>
import authService from "@/services/auth.service";
import { ErrorMessage, Field, Form } from "vee-validate";
import * as yup from "yup";
import defaultAvatar from "./../assets/images/default_avatar.png";
import readerService from "@/services/reader.service";
import LoadingOverlay from "@/components/loadingOverlay.vue";
import staffService from "@/services/staff.service";

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
    LoadingOverlay,
  },
  data() {
    const userFormSchema = yup.object().shape({
      fullName: yup.string().required("Tên phải có giá trị"),
      email: yup.string().required("Email không được để trống"),
      phoneNumber: yup.string().required("Số điện thoại không được để trống"),
    });
    return {
      userFormSchema,
      user: null,
      avatarPreview: defaultAvatar,
      avatarFile: "",
      isloading: false,
    };
  },
  methods: {
    async submitUser(values) {
      try {
        this.isloading = true;
        const formData = new FormData();
        formData.append("_id", values._id);
        formData.append("fullName", values.fullName);
        formData.append("email", values.email);
        formData.append("phoneNumber", values.phoneNumber);
        formData.append("gender", values.gender);
        formData.append("dateOfBirth", values.dateOfBirth);
        formData.append("avatar", this.avatarFile);
        const data = await staffService.update(formData, values._id);
        this.user = data.result;
        alert("Cập nhật thông tin thành công");
      } catch (error) {
        alert("Lỗi cập nhật thông tin người dùng");
      } finally {
        this.isloading = false;
      }
    },
    async getUser() {
      const data = await authService.getCurrentUser();
      this.user = data.result;
      if (this.user.dateOfBirth) {
        this.user.dateOfBirth = this.user.dateOfBirth.split("T")[0];
      }
      this.user.gender = "MALE";
      if (this.user.avatar) {
        this.avatarPreview = this.user.avatar;
      }
    },
    handleFileChange(event) {
      const files = event.target.files;
      if (!files || files.length == 0) return;
      const file = files[0];
      const url = URL.createObjectURL(file);
      this.avatarPreview = url;
      this.avatarFile = files[0];
    },
  },
  created() {
    this.getUser();
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
          <h4>Hồ sơ của tôi</h4>
          <p class="des">Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
        </div>
        <div class="col"></div>
        <div class="col-2">
          <button class="btn btn-warning">
            <i class="fa-solid fa-user-lock me-2"></i>Đổi mật khẩu
          </button>
        </div>
      </div>
      <div class="main-content-profile" v-if="user">
        <Form
          @submit="submitUser"
          :validation-schema="userFormSchema"
          :initial-values="user"
          :enable-reinitialize="true"
          class="row"
        >
          <div class="content col-8">
            <!-- {/* user name */} -->
            <div class="mb-4 row">
              <label for="userName" class="col-lg-3 col-form-label input-title">
                Tên đăng nhập
              </label>
              <div class="col-lg-9">
                <Field
                  type="text"
                  id="userName"
                  class="form-control input-item"
                  name="userName"
                  disabled
                />
              </div>
            </div>
            <!-- {/* full name */} -->
            <div class="mb-4 row">
              <label for="fullName" class="col-lg-3 col-form-label input-title">
                Tên
              </label>
              <div class="col-lg-9">
                <Field
                  type="text"
                  id="fullName"
                  class="form-control input-item"
                  name="fullName"
                />
                <ErrorMessage name="fullName" class="text-danger" />
              </div>
            </div>
            <!-- {/* email */} -->
            <div class="mb-4 row">
              <label for="email" class="col-lg-3 col-form-label input-title">
                Email
              </label>
              <div class="col-lg-9">
                <Field
                  type="email"
                  id="email"
                  class="form-control input-item"
                  name="email"
                />
                <ErrorMessage name="email" class="text-danger" />
              </div>
            </div>
            <!-- {/* phone number */} -->
            <div class="mb-4 row">
              <label
                for="phoneNumber"
                class="col-lg-3 col-form-label input-title"
              >
                Số điện thoại
              </label>
              <div class="col-lg-9">
                <Field
                  type="tel"
                  id="phoneNumber"
                  class="form-control input-item"
                  name="phoneNumber"
                />
                <ErrorMessage name="phoneNumber" class="text-danger" />
              </div>
            </div>
            <!-- {/* gender */} -->
            <div class="mb-4 row">
              <label for="" class="col-lg-3 col-form-label input-title"
                >Giới tính</label
              >
              <div class="col-lg-9 gender-list">
                <div class="form-check">
                  <Field
                    class="form-check-input"
                    value="MALE"
                    type="radio"
                    name="gender"
                    id="male"
                  />
                  <label class="form-check-label" for="male"> Nam </label>
                </div>
                <div class="form-check">
                  <Field
                    value="FEMALE"
                    class="form-check-input"
                    type="radio"
                    name="gender"
                    id="female"
                  />
                  <label class="form-check-label" for="female"> Nữ </label>
                </div>
                <div class="form-check">
                  <Field
                    value="OTHER"
                    class="form-check-input"
                    type="radio"
                    name="gender"
                    id="other"
                  />
                  <label class="form-check-label" for="other"> Khác </label>
                </div>
              </div>
            </div>
            <!-- {/* Date of birth */} -->
            <div class="mb-4 row">
              <label
                for="dateOfBirth"
                class="col-lg-3 col-form-label input-title"
              >
                Ngày sinh</label
              >
              <div class="col-lg-9">
                <Field
                  type="date"
                  id="dateOfBirth"
                  class="form-control input-item"
                  name="dateOfBirth"
                />
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
          <!-- {/* Upload avatar */} -->
          <div class="avatar col-4">
            <img :src="avatarPreview" />
            <button type="button" class="choose-img-btn btn-3">
              <label htmlFor="upload-avatar-img-input"> Chọn ảnh </label>
            </button>
            <Field
              hidden
              type="file"
              name="avatar"
              id="upload-avatar-img-input"
              @change="handleFileChange"
            />
            <div class="note">
              <p>Dụng lượng file tối đa 1 MB</p>
              <p>Định dạng:.JPEG, .PNG</p>
            </div>
            <ErrorMessage name="avatar" class="text-danger" />
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

.content {
  border-right: 1px solid var(--white-bg);
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

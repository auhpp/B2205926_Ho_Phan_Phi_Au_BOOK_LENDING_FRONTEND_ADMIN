<script>
import * as yup from "yup";
import { ErrorMessage, Field, Form } from "vee-validate";
export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  emits: ["submit:staff"],
  props: {
    staff: { type: Object, required: true },
  },
  data() {
    const staffFormSchema = yup.object().shape({
      userName: yup.string().required("Phải nhập tên người dùng"),
      password: yup.string().required("Phải nhập mật khẩu"),
    });
    return {
      staffFormSchema,
      isShowPassword: false,
    };
  },
  methods: {
    submitStaff(values) {
      this.$emit("submit:staff", { ...values });
    },
  },
};
</script>
<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="createStaffModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">
              Thêm nhân viên
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <Form
              @submit="submitStaff"
              :validation-schema="staffFormSchema"
              :enable-reinitialize="true"
              :initial-values="staff"
              :key="staff._id || 'new'"
            >
              <div class="form-group col-12">
                <label for="userName" class="d-flex justify-content-start"
                  >Tên đăng nhập</label
                >
                <Field name="userName" type="text" class="form-control mb-2" />
                <ErrorMessage name="userName" class="text-danger" />
              </div>
              <div class="form-group col-12">
                <label for="password" class="d-flex justify-content-start"
                  >Mật khẩu</label
                >
                <Field
                  name="password"
                  :type="isShowPassword ? 'text' : 'password'"
                  class="form-control mb-2"
                />
                <ErrorMessage name="password" class="text-danger" />
              </div>
              <div class="form-check pb-1">
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
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  data-bs-dismiss="modal"
                  class="btn btn-primary"
                >
                  Lưu
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

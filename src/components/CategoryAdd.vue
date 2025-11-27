<script>
import * as yup from "yup";
import { ErrorMessage, Field, Form } from "vee-validate";
export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  emits: ["submit:category"],
  props: {
    category: { type: Object, required: true },
  },
  data() {
    const categoryFormSchema = yup.object().shape({
      name: yup.string().required("Phải nhập tên danh mục"),
    });
    return {
      categoryFormSchema,
    };
  },
  methods: {
    submitCategory(values) {
      if (this.isEditMode) {
        this.$emit("submit:category", { ...values, id: this.category._id });
        console.log(this.category);
      } else this.$emit("submit:category", values);
    },
  },
  computed: {
    isEditMode() {
      return (
        this.category &&
        this.category._id != null &&
        this.category._id != undefined &&
        this.category._id != ""
      );
    },
  },
};
</script>
<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="createCategoryModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">
              {{ category._id ? "Cập nhật danh mục" : "Thêm danh mục" }}
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
              @submit="submitCategory"
              :validation-schema="categoryFormSchema"
              :initial-values="category"
              :enable-reinitialize="true"
              :key="category._id || 'new'"
            >
              <div class="form-group ">
                <label for="name">Tên danh mục</label>
                <Field name="name" type="text" class="form-control mb-4" />
                <ErrorMessage name="name" class="text-danger" />
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

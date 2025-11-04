<script>
import * as yup from "yup";
import { ErrorMessage, Field, Form } from "vee-validate";
export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  emits: ["submit:author"],
  props: {
    author: { type: Object, required: true },
  },
  data() {
    const authorFormSchema = yup.object().shape({
      name: yup.string().required("Phải nhập tên tác giả"),
    });
    return {
      authorFormSchema,
    };
  },
  methods: {
    submitAuthor(values) {
      if (this.isEditMode) {
        this.$emit("submit:author", { ...values, id: this.author._id });
      } else this.$emit("submit:author", values);
    },
  },
  computed: {
    isEditMode() {
      return (
        this.author &&
        this.author._id != null &&
        this.author._id != undefined &&
        this.author._id != ""
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
      id="createAuthorModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">
              {{ author._id ? "Cập nhật tác giả" : "Thêm tác giả" }}
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
              @submit="submitAuthor"
              :validation-schema="authorFormSchema"
              :initial-values="author"
              :enable-reinitialize="true"
              :key="author._id || 'new'"
            >
              <div class="form-group col-8">
                <label for="name">Tên tác giả</label>
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

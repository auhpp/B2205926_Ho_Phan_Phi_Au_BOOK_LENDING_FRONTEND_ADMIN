<script>
import * as yup from "yup";
import { ErrorMessage, Field, Form } from "vee-validate";
export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  emits: ["submit:publisher"],
  props: {
    publisher: { type: Object, required: true, default: {} },
  },
  data() {
    const publisherFormSchema = yup.object().shape({
      name: yup.string().required("Phải nhập tên nhà xuất bản"),
    });
    return {
      publisherFormSchema,
    };
  },
  methods: {
    submitPublisher(values) {
      if (this.isEditMode) {
        this.$emit("submit:publisher", { ...values, id: this.publisher._id });
      } else this.$emit("submit:publisher", values);
    },
  },
  computed: {
    isEditMode() {
      return (
        this.publisher &&
        this.publisher._id != null &&
        this.publisher._id != undefined &&
        this.publisher._id != ""
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
      id="createPublisherModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">
              {{
                publisher._id ? "Cập nhật nhà xuất bản" : "Thêm nhà xuất bản"
              }}
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
              @submit="submitPublisher"
              :validation-schema="publisherFormSchema"
              :initial-values="publisher"
              :enable-reinitialize="true"
              :key="publisher._id || 'new'"
            >
              <div class="form-group">
                <label for="name">Tên nhà xuất bản</label>
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

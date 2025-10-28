<script>
import * as yup from "yup";
import { ErrorMessage, Field, Form } from "vee-validate";
export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  emits: ["submit:bookCopy"],
  data() {
    const bookCopyFormSchema = yup.object().shape({
      quantity: yup.string().required("Phải nhập số lượng sách"),
    });
    return {
      bookCopyFormSchema,
      quantity: 1,
    };
  },
  methods: {
    submitBookCopy() {
      this.$emit("submit:bookCopy", this.quantity);
    },
  },
};
</script>
<template>
  <div>
    <button
      data-bs-toggle="modal"
      data-bs-target="#exampleModal"
      type="button"
      class="btn btn-outline-primary"
    >
      <i class="fa-solid fa-plus"></i>
      Thêm bản sao sách
    </button>
    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">
              Thêm bản sao
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <Form @submit="submitBookCopy">
              <div class="form-group col-8">
                <label for="quantity">Số lượng bản sao</label>
                <Field
                  name="quantity"
                  v-model="quantity"
                  type="number"
                  class="form-control"
                />
                <ErrorMessage name="quantity" class="text-danger" />
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

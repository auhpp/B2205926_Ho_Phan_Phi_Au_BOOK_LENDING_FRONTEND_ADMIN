<script>
import * as yup from "yup";
import { ErrorMessage, Field, Form } from "vee-validate";
export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  emits: ["submit:configuration"],
  props: {
    configuration: { type: Object, required: true },
  },
  data() {
    const configurationFormSchema = yup.object().shape({
      description: yup.string().required("Phải nhập tên cấu hình"),
      value: yup.string().required("Phải nhập giá trị của cấu hình"),
    });
    return {
      configurationFormSchema,
    };
  },
  methods: {
    submitConfiguration(values) {
      this.$emit("submit:configuration", {
        ...values,
        id: this.configuration._id,
      });
    },
    allowOnlyNumbers(event) {
      if (
        ["Backspace", "Delete", "Tab", "Escape", "Enter"].includes(event.key) ||
        event.ctrlKey === true ||
        event.metaKey === true ||
        ["Home", "End", "ArrowLeft", "ArrowRight"].includes(event.key)
      ) {
        return;
      }
      if (!/^[0-9]$/.test(event.key)) {
        event.preventDefault();
      }
    },
  },
};
</script>
<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="createConfigurationModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">
              Cập nhật cấu hình
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
              @submit="submitConfiguration"
              :validation-schema="configurationFormSchema"
              :initial-values="configuration"
              :enable-reinitialize="true"
              :key="configuration._id || 'new'"
            >
              <div class="form-group col-12">
                <label for="description">Tên cấu hình</label>
                <Field
                  name="description"
                  type="text"
                  class="form-control mb-4"
                />
                <ErrorMessage name="description" class="text-danger" />
              </div>
              <div class="form-group col-12">
                <label for="value">Giá trị</label>

                <div class="input-group mb-3">
                  <Field
                    name="value"
                    type="number"
                    class="form-control mb-4"
                    @keydown="allowOnlyNumbers"
                  />
                  <div class="input-group-append">
                    <span
                      class="input-group-text"
                      style="border-radius: 0 4px 4px 0"
                      id="basic-addon2"
                      >{{ configuration.unit }}</span
                    >
                  </div>
                </div>
                <ErrorMessage name="value" class="text-danger" />
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

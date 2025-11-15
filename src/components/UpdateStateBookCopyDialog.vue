<script>
import * as yup from "yup";
import { ErrorMessage, Field, Form } from "vee-validate";
import { LoanDetailStatus } from "@/utils/constant";
export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  emits: ["submit:loanDetail"],
  props: {
    loanDetail: { type: Object, required: true },
  },
  methods: {
    updateLoanDetail(values) {
      console.log(values.status);
      this.loanDetail.status = values.status;
      this.$emit("submit:loanDetail", this.loanDetail);
    },
  },
  data() {
    return {
      LoanDetailStatus: LoanDetailStatus,
    };
  },
};
</script>
<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="updateStateBookCopyModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">
              Cập nhật trạng thái sách
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body" v-if="loanDetail">
            <Form
              @submit="updateLoanDetail"
              :initial-values="loanDetail"
              :enable-reinitialize="true"
              :key="loanDetail._id || 'new'"
            >
              <div class="form-check mb-2">
                <Field
                  name="status"
                  type="radio"
                  :value="LoanDetailStatus.returned.name"
                  class="form-check-input"
                  :id="LoanDetailStatus.returned.name"
                />
                <label
                  class="form-check-label"
                  :for="LoanDetailStatus.returned.name"
                >
                  {{ LoanDetailStatus.returned.desc }}
                </label>
              </div>
              <div class="form-check mb-2">
                <Field
                  name="status"
                  type="radio"
                  :value="LoanDetailStatus.lost.name"
                  class="form-check-input"
                  :id="LoanDetailStatus.lost.name"
                />
                <label
                  class="form-check-label"
                  :for="LoanDetailStatus.lost.name"
                >
                  {{ LoanDetailStatus.lost.desc }}
                </label>
              </div>
              <div class="form-check mb-2">
                <Field
                  name="status"
                  type="radio"
                  :value="LoanDetailStatus.damaged.name"
                  class="form-check-input"
                  :id="LoanDetailStatus.damaged.name"
                />
                <label
                  class="form-check-label"
                  :for="LoanDetailStatus.damaged.name"
                >
                  {{ LoanDetailStatus.damaged.desc }}
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

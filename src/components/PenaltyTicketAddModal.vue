<script>
import * as yup from "yup";
import { ErrorMessage, Field, Form } from "vee-validate";
import {
  ConfigurationConstant,
  LoanDetailStatus,
  LoanSlipStatus,
  PenaltyTicketType,
} from "@/utils/constant";
import configurationService from "@/services/configuration.service";
import { differenceInDays } from "date-fns";
import { VND } from "@/utils/formatNumber";
import VueMultiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.css";
export default {
  components: {
    Form,
    Field,
    ErrorMessage,
    VueMultiselect,
  },
  emits: ["submit:penaltyTicket"],
  props: {
    bookCopy: { type: Object, required: true },
    reader: { type: Object, required: true },
    loanSlip: { type: Object, required: true },
    staffs: { type: Array },
  },
  data() {
    return {
      LoanDetailStatus: LoanDetailStatus,
      LoanSlipStatus: LoanSlipStatus,
      ConfigurationConstant: ConfigurationConstant,
      amount: 0,
      VND: VND,
      typePenalty: "",
    };
  },
  watch: {
    bookCopy: {
      handler(newValue) {
        if (newValue) {
          this.getConfiguration();
        } else {
          this.amount = 0;
        }
      },
      immediate: true,
    },
  },
  methods: {
    submitPenaltyTicket(values) {
      if (!values.staff) {
        alert("Chọn nhân viên tạo phiếu phạt!");
      }
      if (!values.paymentStatus) {
        alert("Chọn trạng thái thanh toán!");
      }

      const penaltyTicket = {
        paymentStatus: values.paymentStatus,
        typePenalty: this.typePenalty,
        amount: this.amount,
        loanDetailId: this.bookCopy.loanDetailId,
        staffId: values.staff._id,
        createdAt: new Date(),
      };
      this.$emit("submit:penaltyTicket", penaltyTicket);
    },

    async getConfiguration() {
      var configName = "";
      console.log(this.bookCopy);
      if (this.bookCopy.loanDetailStatus == LoanDetailStatus.lost.name) {
        configName = ConfigurationConstant.LOST_BOOK_PENALTY_RATE;
        this.typePenalty = PenaltyTicketType.lost.name;
      } else if (
        this.bookCopy.loanDetailStatus == LoanDetailStatus.damaged.name
      ) {
        configName = ConfigurationConstant.DAMAGED_BOOK_PENALTY_RATE;
        this.typePenalty = PenaltyTicketType.damaged.name;
      } else {
        configName = ConfigurationConstant.DAILY_LATE_FEE;
        this.typePenalty = PenaltyTicketType.late.name;
      }
      const data = await configurationService.findByName(configName);
      const config = data.result;
      if (
        configName == ConfigurationConstant.DAMAGED_BOOK_PENALTY_RATE ||
        configName == ConfigurationConstant.LOST_BOOK_PENALTY_RATE
      ) {
        if (config.unit == "%") {
          this.amount = this.bookCopy.bookData.price * (config.value / 100);
        } else if (config.unit == "VND") {
          this.amount = config.value;
        }
      } else {
        const date1 = new Date(this.loanSlip.borrowedDate);
        const date2 = new Date(this.loanSlip.returnedDate);
        const cntDate = differenceInDays(date2, date1);
        if (config.unit == "%") {
          this.amount =
            this.bookCopy.bookData.price * (config.value / 100) * cntDate;
        } else if (config.unit == "VND") {
          this.amount = config.value * cntDate;
        }
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
      id="penaltyTicketAddModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div
        class="modal-dialog modal-dialog-scrollable modal-lg modal-dialog-centered"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">
              Tạo phiếu phạt
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body" v-if="bookCopy">
            <Form @submit="submitPenaltyTicket">
              <div class="info-user mb-1">
                <h5>Thông tin nhân viên tạo phiếu</h5>
                <hr />
                <div class="form-group col-12">
                  <Field
                    name="staff"
                    v-slot="{ value, handleChange, handleBlur, errors }"
                  >
                    <vue-multiselect
                      id="staffs"
                      :modelValue="value"
                      @update:modelValue="handleChange"
                      @blur="handleBlur"
                      :options="staffs"
                      :multiple="false"
                      label="fullName"
                      track-by="_id"
                      placeholder="Chọn nhân viên"
                      :class="{ 'is-invalid': errors.length > 0 }"
                    >
                    </vue-multiselect>
                  </Field>
                </div>
              </div>
              <div class="info-user">
                <h5>Thông tin người mượn</h5>
                <hr />
                <div class="row">
                  <div class="col-1 text-center">
                    <img
                      :src="
                        reader.avatar != null && reader.avatar != ''
                          ? reader.avatar
                          : defaultAvatar
                      "
                      alt="mdo"
                      width="32"
                      height="32"
                      class="rounded-circle me-2"
                    />
                  </div>
                  <div class="col">
                    <div class="fw-bold">{{ reader.fullName }}</div>
                    <div>{{ reader.email }}</div>
                    <div>{{ reader.phoneNumber }}</div>
                  </div>
                </div>
              </div>
              <div class="info-user mt-2">
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">Tên sách</th>
                      <th scope="col">Barcode</th>
                      <th scope="col">Ảnh</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="book-item" v-if="bookCopy.bookData">
                      <td>
                        {{ bookCopy.bookData.name }}
                      </td>
                      <td>
                        {{ bookCopy.barCode }}
                      </td>
                      <td>
                        <img
                          :src="bookCopy.bookData.images[0]"
                          width="40"
                          height="40"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="info-user mt-2">
                <span class="fw-bold me-1">Lý do phạt: </span>
                <span>
                  {{ LoanDetailStatus[bookCopy.loanDetailStatus]?.desc }}</span
                >
              </div>
              <div class="info-user mt-2">
                <span class="fw-bold me-1">Tổng tiền phạt: </span>
                <span> {{ VND.format(amount) }}đ</span>
              </div>
              <div class="info-user mt-2">
                <div class="row">
                  <label for="" class="col-lg-3 col-form-label fw-bold"
                    >Thanh toán:</label
                  >
                  <div class="col-lg-9 row gender-list">
                    <div class="form-check col mt-2">
                      <Field
                        class="form-check-input"
                        value="PAID"
                        type="radio"
                        name="paymentStatus"
                        id="PAID"
                      />
                      <label class="form-check-label" for="PAID">
                        Đã thanh toán
                      </label>
                    </div>
                    <div class="form-check col mt-2">
                      <Field
                        value="NOT_PAID"
                        class="form-check-input"
                        type="radio"
                        name="paymentStatus"
                        id="NOT_PAID"
                      />
                      <label class="form-check-label" for="NOT_PAID">
                        Chưa thanh toán
                      </label>
                    </div>
                  </div>
                </div>
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

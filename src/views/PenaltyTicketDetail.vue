<script>
import loanDetailService from "@/services/loanDetail.service";
import loanSlipService from "@/services/loanSlip.service";
import staffService from "@/services/staff.service";
import {
  LoanSlipStatus,
  PaymentStatus,
  PenaltyTicketType,
} from "@/utils/constant";
import { formatDate, formatDateTime } from "@/utils/formatDate";
import defaultAvatar from "@/assets/images/default_avatar.png";
import penaltyTicketService from "@/services/penaltyTicket.service";
import { VND } from "@/utils/formatNumber";

export default {
  components: {},
  data() {
    return {
      penaltyTicketDetail: {},
      defaultAvatar: defaultAvatar,
      PaymentStatus: PaymentStatus,
      PenaltyTicketType: PenaltyTicketType,
      VND: VND,
    };
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  methods: {
    formatDateTime,
    formatDate,
    async findPenaltyTicketById() {
      try {
        const data = await penaltyTicketService.findById(this.id);
        this.penaltyTicketDetail = data.result;
      } catch (error) {
        alert("Lỗi lấy thông tin phiếu phạt" + error);
      }
    },

    async payPenaltyTicket() {
      if (
        confirm(
          `Bạn có chắc chắn muốn cập nhật phiếu phạt này thành đã thanh toán?`
        )
      ) {
        try {
          const res = await penaltyTicketService.create({
            paymentStatus: PaymentStatus.PAID.name,
            _id: this.penaltyTicketDetail._id,
          });
          alert("Cập nhật thành công");
          this.findPenaltyTicketById();
        } catch (error) {
          console.log(error);
        }
      }
    },

    async deletePenaltyTicket() {
      if (confirm(`Bạn có chắc chắn muốn xóa phiếu phạt này?`)) {
        try {
          const res = await penaltyTicketService.delete(
            this.penaltyTicketDetail._id
          );
          this.$router.replace({ name: "penaltyTicket" });
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
  created() {
    this.findPenaltyTicketById();
  },
};
</script>

<template>
  <div class="container" style="height: auto" v-if="penaltyTicketDetail">
    <div class="d-flex justify-content-between mb-2">
      <i
        class="fa-solid fa-arrow-left icon-back"
        @click="this.$router.back()"
      ></i>
      <div
        class="col-3 row pe-2"
        v-if="penaltyTicketDetail.paymentStatus == PaymentStatus.NOT_PAID.name"
      >
        <button
          type="submit"
          class="col me-1 btn btn-sm btn-danger"
          @click="payPenaltyTicket"
        >
          Thanh toán
        </button>
        <button
          type="submit"
          class="col me-1 btn btn-outline-secondary btn-sm"
          @click="deletePenaltyTicket"
        >
          Xóa
        </button>
      </div>
    </div>
    <div class="info-user" v-if="penaltyTicketDetail.reader">
      <h5>Thông tin người mượn</h5>
      <hr />
      <div class="row">
        <div class="col-1 text-center">
          <img
            :src="
              penaltyTicketDetail.reader.avatar != null &&
              penaltyTicketDetail.reader.avatar != ''
                ? penaltyTicketDetail.reader.avatar
                : defaultAvatar
            "
            alt="mdo"
            width="32"
            height="32"
            class="rounded-circle me-2"
          />
        </div>
        <div class="col">
          <div class="fw-bold">{{ penaltyTicketDetail.reader.fullName }}</div>
          <div>{{ penaltyTicketDetail.reader.email }}</div>
          <div>{{ penaltyTicketDetail.reader.phoneNumber }}</div>
        </div>
      </div>
    </div>
    <div class="info-date mt-2">
      <h5>Thông tin phiếu phạt</h5>
      <hr />
      <div class="row g-3 align-items-center">
        <div class="col-2">
          <label for="inputNote" class="col-form-label fw-bold"
            >Mã phiếu mượn:</label
          >
        </div>
        <div class="col-sm-8 col-lg-10">
          <div
            class="text-primary"
            style="text-decoration: underline; cursor: pointer"
            @click="
              this.$router.push({
                name: 'loanSlip.detail',
                params: { id: penaltyTicketDetail.loanSlipId },
              })
            "
          >
            {{ penaltyTicketDetail.loanSlipId }}
          </div>
        </div>
      </div>
      <div class="row g-3 align-items-center">
        <div class="col-2">
          <label for="inputNote" class="col-form-label fw-bold"
            >Thanh toán:</label
          >
        </div>
        <div class="col-sm-8 col-lg-10">
          <span
            :class="
              'fw-bold text-' +
              PaymentStatus[penaltyTicketDetail.paymentStatus]?.color
            "
          >
            {{ PaymentStatus[penaltyTicketDetail.paymentStatus]?.desc }}
          </span>
        </div>
      </div>
      <div class="row g-3 align-items-center">
        <div class="col-2">
          <label for="inputNote" class="col-form-label fw-bold"
            >Ngày tạo:</label
          >
        </div>
        <div class="col-sm-8 col-lg-10">
          {{
            penaltyTicketDetail.createdAt &&
            formatDateTime(penaltyTicketDetail.createdAt)
          }}
        </div>
      </div>
      <div class="row g-3 align-items-center">
        <div class="col-2">
          <label for="inputNote" class="col-form-label fw-bold"
            >Ngày cập nhật
          </label>
        </div>
        <div class="col-sm-8 col-lg-10">
          {{
            penaltyTicketDetail.updatedDate &&
            formatDateTime(penaltyTicketDetail.updatedDate)
          }}
        </div>
      </div>
    </div>
    <div class="info-user mt-2" v-if="penaltyTicketDetail.staff">
      <h5>Thông tin nhân viên</h5>
      <hr />
      <div class="row">
        <div class="col-1 text-center">
          <img
            :src="
              penaltyTicketDetail.staff.avatar != null &&
              penaltyTicketDetail.staff.avatar != ''
                ? penaltyTicketDetail.staff.avatar
                : defaultAvatar
            "
            alt="mdo"
            width="32"
            height="32"
            class="rounded-circle me-2"
          />
        </div>
        <div class="col">
          <div class="fw-bold">{{ penaltyTicketDetail.staff.fullName }}</div>
          <div>{{ penaltyTicketDetail.staff.email }}</div>
          <div>{{ penaltyTicketDetail.staff.phoneNumber }}</div>
        </div>
      </div>
    </div>
    <div class="book-borrow-list mt-2">
      <h5>Thông tin sách mượn</h5>
      <hr />
      <table class="table table-hover table-display-data">
        <thead class="table-head">
          <tr>
            <th scope="col">Tên sách</th>
            <th scope="col">Barcode</th>
            <th scope="col">Ảnh</th>
            <th scope="col">Giá</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="book-item"
            v-if="penaltyTicketDetail.bookCopy && penaltyTicketDetail.book"
          >
            <td>
              {{ penaltyTicketDetail.book.name }}
            </td>
            <td>
              {{ penaltyTicketDetail.bookCopy.barCode }}
            </td>
            <td>
              <img
                :src="penaltyTicketDetail.book.images[0]"
                width="40"
                height="40"
              />
            </td>
            <td>
              {{ VND.format(penaltyTicketDetail.book.price) }} đ
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="info-user mt-2">
      <span class="fw-bold me-1">Lý do phạt: </span>
      <span>
        {{ PenaltyTicketType[penaltyTicketDetail.typePenalty]?.desc }}</span
      >
    </div>
    <div class="info-user mt-2 mb-4">
      <span class="fw-bold me-1">Tổng tiền phạt: </span>
      <span> {{ VND.format(penaltyTicketDetail.amount) }}đ</span>
    </div>
  </div>
</template>

<style></style>

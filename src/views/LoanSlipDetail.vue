<script>
import BorrowBookList from "@/components/BorrowBookList.vue";
import UpdateStateBookCopyDialog from "@/components/UpdateStateBookCopyDialog.vue";
import loanDetailService from "@/services/loanDetail.service";
import loanSlipService from "@/services/loanSlip.service";
import staffService from "@/services/staff.service";
import { LoanSlipStatus } from "@/utils/constant";
import { formatDate, formatDateTime } from "@/utils/formatDate";
import VueMultiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.css";
import defaultAvatar from "@/assets/images/default_avatar.png";
import PenaltyTicketAddModal from "@/components/PenaltyTicketAddModal.vue";
import penaltyTicketService from "@/services/penaltyTicket.service";

export default {
  components: {
    BorrowBookList,
    UpdateStateBookCopyDialog,
    VueMultiselect,
    PenaltyTicketAddModal,
  },
  data() {
    return {
      loanSlip: null,
      loanSlipDetail: {},
      LoanSlipStatus: LoanSlipStatus,
      staffs: [],
      selectedStaff: null,
      defaultAvatar: defaultAvatar,
      bookCopyPenTicket: null,
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
    async findLoanSlipById() {
      try {
        const data = await loanSlipService.findById(this.id);
        this.loanSlip = data.result;

        if (data.result && this.staffs.length > 0) {
          if (data.result.staffId) {
            this.selectedStaff = this.staffs.find(
              (s) => s._id === data.result.staffId
            );
          }
        }
      } catch (error) {
        alert("Lỗi lấy thông tin phiếu mượn" + error);
      }
    },

    openEditModal(loanSlipDetail) {
      this.loanSlipDetail = loanSlipDetail;
    },

    async updateLoanSlip() {
      if (
        this.loanSlip.status !== LoanSlipStatus.pending.name &&
        this.loanSlip.status !== LoanSlipStatus.approved.name
      ) {
        return;
      }
      if (!this.selectedStaff) {
        alert("Lỗi! phải chọn nhân viên");
        return;
      }
      var status = "";
      if (this.loanSlip.status == LoanSlipStatus.pending.name) {
        status = LoanSlipStatus.approved;
      } else if (this.loanSlip.status == LoanSlipStatus.approved.name) {
        status = LoanSlipStatus.borrowed;
      } else {
        return;
      }
      if (
        confirm(
          `Bạn có chắc chắn muốn cập nhật yêu cầu mượn sách này thành: ${status.desc}?`
        )
      ) {
        try {
          const res = await loanSlipService.create({
            status: status.name,
            _id: this.loanSlip._id,
            staffId: this.selectedStaff ? this.selectedStaff._id : null,
          });
          alert("Cập nhật thành công");
          this.findLoanSlipById();
        } catch (error) {
          console.log(error);
        }
      }
    },
    async rejectLoanSlip() {
      if (!this.selectedStaff) {
        alert("Lỗi! phải chọn nhân viên");
        return;
      }
      if (confirm(`Bạn có chắc chắn muốn từ chối yêu cầu mượn sách này?`)) {
        try {
          const res = await loanSlipService.create({
            status: LoanSlipStatus.rejected.name,
            _id: this.loanSlip._id,
            staffId: this.selectedStaff ? this.selectedStaff._id : null,
          });
          alert("Cập nhật thành công");
          this.findLoanSlipById();
        } catch (error) {
          console.log(error);
        }
      }
    },

    async updateLoanDetail(bookCopy) {
      try {
        const res = await loanDetailService.create({
          _id: bookCopy.loanDetailId,
          bookCopyId: bookCopy._id,
          loanSlipId: this.id,
          status: bookCopy.status,
        });
        if (res) {
          alert("Cập nhật thành công");
        }
        this.findLoanSlipById();
      } catch (error) {
        console.log(error);
      }
    },
    async getAllStaff() {
      this.staffs = (await staffService.findAll({})).result;
    },

    openCreatePenTicketModal(bookCopy) {
      this.bookCopyPenTicket = bookCopy;
    },

    async createPenaltyTicket(penaltyTicket) {
      try {
        const data = await penaltyTicketService.create(penaltyTicket);
        const res = data.result;
        if (res) {
          alert("Tạo phiếu phạt thành công");
          this.findLoanSlipById();
        }
      } catch (error) {
        alert("Lỗi lấy thông tin phiếu mượn" + error);
      }
    },
  },
  created() {
    this.getAllStaff();
    this.findLoanSlipById();
  },
};
</script>

<template>
  <div class="container" style="height: auto" v-if="loanSlip">
    <div class="d-flex justify-content-between mb-2">
      <i
        class="fa-solid fa-arrow-left icon-back"
        @click="this.$router.back()"
      ></i>
      <div class="col-6 row pe-2">
        <div class="col-7">
          <vue-multiselect
            v-model="selectedStaff"
            :options="staffs"
            :multiple="false"
            label="fullName"
            track-by="_id"
            placeholder="Chọn nhân viên"
            :disabled="
              loanSlip.staffId != null ||
              (loanSlip.status != LoanSlipStatus.pending.name &&
                loanSlip.status != LoanSlipStatus.approved.name)
            "
          >
          </vue-multiselect>
        </div>
        <button
          @click="updateLoanSlip"
          type="submit"
          :class="
            'col me-1 btn btn-sm btn-' + LoanSlipStatus[loanSlip.status].color
          "
        >
          {{ LoanSlipStatus[loanSlip.status].desc }}
        </button>
        <button
          v-if="loanSlip.status == LoanSlipStatus.pending.name"
          type="submit"
          class="col me-1 btn btn-outline-secondary btn-sm"
          @click="rejectLoanSlip"
        >
          Từ chối
        </button>
      </div>
    </div>
    <div class="info-user">
      <h5>Thông tin người mượn</h5>
      <hr />
      <div class="row">
        <div class="col-1 text-center">
          <img
            :src="
              loanSlip.reader.avatar != null && loanSlip.reader.avatar != ''
                ? loanSlip.reader.avatar
                : defaultAvatar
            "
            alt="mdo"
            width="32"
            height="32"
            class="rounded-circle me-2"
          />
        </div>
        <div class="col">
          <div class="fw-bold">{{ loanSlip.reader.fullName }}</div>
          <div>{{ loanSlip.reader.email }}</div>
          <div>{{ loanSlip.reader.phoneNumber }}</div>
        </div>
      </div>
    </div>
    <div class="info-date mt-2">
      <h5>Thông tin thời gian mượn trả</h5>
      <hr />
      <div class="row g-3 align-items-center">
        <div class="col-2">
          <label for="inputNote" class="col-form-label fw-bold"
            >Ngày mượn:</label
          >
        </div>
        <div class="col-sm-8 col-lg-10">
          {{ formatDateTime(loanSlip.borrowedDate) }}
        </div>
      </div>
      <div class="row g-3 align-items-center">
        <div class="col-2">
          <label for="inputNote" class="col-form-label fw-bold">Hạn trả:</label>
        </div>
        <div class="col-sm-8 col-lg-10">
          {{ formatDate(loanSlip.returnDate) }}
        </div>
      </div>
      <div class="row g-3 align-items-center" v-if="loanSlip.returnedDate">
        <div class="col-2">
          <label for="inputNote" class="col-form-label fw-bold">Ngày trả</label>
        </div>
        <div class="col-sm-8 col-lg-10">
          {{ formatDateTime(loanSlip.returnedDate) }}
        </div>
      </div>
      <div class="row g-3 align-items-center" v-if="loanSlip.updatedDate">
        <div class="col-2">
          <label for="inputNote" class="col-form-label fw-bold"
            >Ngày cập nhật
          </label>
        </div>
        <div class="col-sm-8 col-lg-10">
          {{ formatDateTime(loanSlip.updatedDate) }}
        </div>
      </div>
    </div>
    <div class="info-user mt-2" v-if="selectedStaff">
      <h5>Thông tin nhân viên</h5>
      <hr />
      <div class="row">
        <div class="col-1 text-center">
          <img
            :src="
              selectedStaff.avatar != null && selectedStaff.avatar != ''
                ? selectedStaff.avatar
                : defaultAvatar
            "
            alt="mdo"
            width="32"
            height="32"
            class="rounded-circle me-2"
          />
        </div>
        <div class="col">
          <div class="fw-bold">{{ selectedStaff.fullName }}</div>
          <div>{{ selectedStaff.email }}</div>
          <div>{{ selectedStaff.phoneNumber }}</div>
        </div>
      </div>
    </div>
    <div class="book-borrow-list mt-2">
      <h5>Thông tin sách mượn</h5>
      <hr />
      <BorrowBookList
        :books="loanSlip.bookCopies"
        @submit:loan-slip-detail="openEditModal"
        :status="loanSlip.status"
        :loan-slip="loanSlip"
        @submit:penalty-ticket="openCreatePenTicketModal"
      />
      <UpdateStateBookCopyDialog
        :loan-detail="loanSlipDetail"
        @submit:loan-detail="updateLoanDetail"
      />

      <PenaltyTicketAddModal
        :book-copy="bookCopyPenTicket"
        :reader="loanSlip.reader"
        :loan-slip="loanSlip"
        :staffs="staffs"
        @submit:penalty-ticket="createPenaltyTicket"
      />
    </div>
  </div>
</template>

<style></style>

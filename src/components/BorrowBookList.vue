<script>
import { LoanDetailStatus, LoanSlipStatus } from "@/utils/constant";

export default {
  props: {
    books: { type: Array, default: [] },
    status: { type: String },
    loanSlip: { type: Object },
  },
  emits: ["submit:loanSlipDetail", "submit:penaltyTicket"],
  data() {
    return {
      LoanDetailStatus: LoanDetailStatus,
      LoanSlipStatus: LoanSlipStatus,
    };
  },
  methods: {
    editLoanSlipDetail(loanSlipDetail) {
      this.$emit("submit:loanSlipDetail", loanSlipDetail);
    },
    createPenaltyTicket(bookCopy) {
      this.$emit("submit:penaltyTicket", bookCopy);
    },
  },
};
</script>
<template>
   <table class="table table-hover table-display-data">
    <thead class="table-head">
      <tr>
        <th class="col-3" scope="col">ID</th>
        <th scope="col">Tên sách</th>
        <th scope="col">Barcode</th>
        <th scope="col">Ảnh</th>
        <th scope="col" class="text-center">Trạng thái</th>
        <th scope="col" class="text-center">Phiếu phạt</th>
      </tr>
    </thead>
    <tbody v-if="books">
      <tr v-for="book in books" :key="book._id" class="book-item">
        <td>
          {{ book._id }}
        </td>
        <td>
          {{ book.bookData.name }}
        </td>
        <td>
          {{ book.barCode }}
        </td>
        <td>
          <img :src="book.bookData.images[0]" width="40" height="40" />
        </td>
        <td class="text-center">
          <button
            type="button"
            :class="
              'btn btn-sm btn-' + LoanDetailStatus[book.loanDetailStatus].color
            "
            data-bs-toggle="modal"
            :data-bs-target="
              status != LoanSlipStatus.pending.name &&
              status != LoanSlipStatus.approved.name
                ? '#updateStateBookCopyModal'
                : ''
            "
            @click="editLoanSlipDetail(book)"
          >
            {{ LoanDetailStatus[book.loanDetailStatus].desc }}
          </button>
        </td>
        <td
          class="text-center text-"
          v-if="
            book.loanDetailStatus == LoanDetailStatus.lost.name ||
            book.loanDetailStatus == LoanDetailStatus.damaged.name ||
            new Date(loanSlip.returnedDate) > new Date(loanSlip.returnDate)
          "
        >
          <button
            type="button"
            class="btn btn-light"
            data-bs-toggle="modal"
            data-bs-target="#penaltyTicketAddModal"
            @click="createPenaltyTicket(book)"
            v-if="!book.penaltyTicket"
          >
            Tạo phiếu phạt
          </button>
          <div
            v-else
            class="text-primary"
            style="text-decoration: underline; cursor: pointer"
            @click="
              this.$router.push({
                name: 'penaltyTicket.detail',
                params: { id: book.penaltyTicket._id },
              })
            "
          >
            Mở phiếu phạt
          </div>
        </td>
        <td class="text-center" v-else>
          <span class="text-success fw-bold">Không có</span>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<style>
.book-item {
  cursor: pointer;
}
</style>

<script>
import { LoanDetailStatus, LoanSlipStatus } from "@/utils/constant";

export default {
  props: {
    books: { type: Array, default: [] },
    status: { type: String },
  },
  emits: ["submit:loanSlipDetail"],
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
  },
};
</script>
<template>
  <table class="table table-hover">
    <thead>
      <tr>
        <th class="col-3" scope="col">ID</th>
        <th scope="col">Tên sách</th>
        <th scope="col">Barcode</th>
        <th scope="col">Ảnh</th>
        <th scope="col" class="text-center">Trạng thái</th>
        <!-- <th scope="col" class="text-center">Thao tác</th> -->
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
            :class="'btn btn-sm btn-' + LoanDetailStatus[book.loanDetailStatus].color"
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
        <!-- <td class="text-center">
          <button type="button" class="col-2 me-1 btn btn-secondary btn-sm">
            <i class="fa-solid fa-bars"></i>
          </button>
          <button type="button" class="col-2 me-1 btn btn-success btn-sm">
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
          <button type="button" class="col-2 me-1 btn btn-danger btn-sm">
            <i class="fa-solid fa-trash"></i>
          </button>
        </td> -->
      </tr>
    </tbody>
  </table>
</template>
<style>
.book-item {
  cursor: pointer;
}
</style>

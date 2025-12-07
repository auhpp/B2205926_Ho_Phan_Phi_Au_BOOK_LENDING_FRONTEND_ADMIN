<script>
import { BookCopyStatus, LoanSlipStatus } from "@/utils/constant";
import { formatDate, formatDateTime } from "@/utils/formatDate";

export default {
  data() {
    return {
      BookCopyStatus: BookCopyStatus,
      LoanSlipStatus: LoanSlipStatus,
    };
  },
  props: {
    loanSlips: { type: Array, default: [] },
  },
  methods: {
    formatDate,
    formatDateTime,
    checkOverdue(loanSlip) {
      if (!loanSlip || loanSlip.returnedDate) return false;
      if (
        loanSlip.status === LoanSlipStatus.rejected.name ||
        loanSlip.status === LoanSlipStatus.returned.name ||
        loanSlip.status === LoanSlipStatus.pending.name
      ) {
        return false;
      }
      const returnDate = new Date(loanSlip.returnDate);
      const today = new Date();
      return today > returnDate;
    },
    getOverdueDays(loanSlip) {
      const returnDate = new Date(loanSlip.returnDate);
      const today = new Date();
      const diffTime = Math.abs(today - returnDate);
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    },
  },
};
</script>
<template>
  <table
    v-if="loanSlips"
    class="table table-hover table-display-data align-middle"
  >
    <thead class="table-head">
      <tr>
        <th class="col-2" scope="col">Mã PM</th>
        <th scope="col">Tên đọc giả</th>
        <th scope="col">SĐT đọc giả</th>
        <th scope="col">Ngày tạo</th>
        <th scope="col">Ngày mượn</th>
        <th scope="col">Hạn trả</th>
        <th scope="col" class="text-center">Trạng thái</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="loanSlip in loanSlips"
        :key="loanSlip._id"
        class="book-item"
        :class="{ 'table-danger': checkOverdue(loanSlip) }"
        @click="
          this.$router.push({
            name: 'loanSlip.detail',
            params: { id: loanSlip._id },
          })
        "
      >
        <td class="">
          {{ loanSlip.loanCode }}
          <i
            v-if="checkOverdue(loanSlip)"
            class="fa-solid fa-circle-exclamation text-danger ms-1"
            title="Đang trễ hạn"
          ></i>
        </td>
        <td scope="col">{{ loanSlip.reader.fullName }}</td>

        <td scope="col">{{ loanSlip.reader.phoneNumber }}</td>
        <td>
          {{ formatDateTime(loanSlip.createdAt) }}
        </td>
        <td>
          {{
            loanSlip.borrowedDate ? formatDateTime(loanSlip.borrowedDate) : ""
          }}
        </td>

        <td>
          <div
            v-if="loanSlip.returnDate"
            :class="{ 'text-danger fw-bold': checkOverdue(loanSlip) }"
          >
            {{ formatDate(loanSlip.returnDate) }}
            <div v-if="checkOverdue(loanSlip)" style="font-size: 0.75rem">
              (Trễ {{ getOverdueDays(loanSlip) }} ngày)
            </div>
          </div>
        </td>

        <td class="text-center">
          <span
            :class="'badge text-bg-' + LoanSlipStatus[loanSlip.status].color"
          >
            {{ LoanSlipStatus[loanSlip.status].desc }}
          </span>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<style>
.book-item {
  cursor: pointer;
  transition: background-color 0.2s;
}
.table-hover .table-danger:hover > td {
  background-color: #f5c2c7;
}
</style>

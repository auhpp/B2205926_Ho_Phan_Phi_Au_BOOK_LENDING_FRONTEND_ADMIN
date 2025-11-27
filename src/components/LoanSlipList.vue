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
  },
};
</script>
<template>
  <table v-if="loanSlips" class="table table-hover table-display-data">
    <thead class="table-head">
      <tr>
        <th class="col-3" scope="col">ID</th>
        <th scope="col">Ngày mượn</th>
        <th scope="col">Ngày trả</th>
        <th scope="col" class="text-center">Trạng thái</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="loanSlip in loanSlips"
        :key="loanSlip._id"
        class="book-item"
        @click="
          this.$router.push({
            name: 'loanSlip.detail',
            params: { id: loanSlip._id },
          })
        "
      >
        <td>
          {{ loanSlip._id }}
        </td>
        <td>
          {{ formatDateTime(loanSlip.borrowedDate) }}
        </td>
        <td>
          {{ formatDate(loanSlip.returnDate) }}
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
}
</style>

<script>
import {
  PenaltyTicketType,
  LoanDetailStatus,
  PaymentStatus,
} from "@/utils/constant";
import { formatDate, formatDateTime } from "@/utils/formatDate";
import { VND } from "@/utils/formatNumber";

export default {
  data() {
    return {
      PenaltyTicketType: PenaltyTicketType,
      LoanDetailStatus: LoanDetailStatus,
      PaymentStatus: PaymentStatus,
      VND: VND,
    };
  },
  props: {
    penaltyTickets: { type: Array, default: [] },
  },
  methods: {
    formatDate,
    formatDateTime,
  },
};
</script>
<template>
  <table v-if="penaltyTickets" class="table table-hover table-display-data">
    <thead class="table-head">
      <tr>
        <th class="col-3" scope="col">ID</th>
        <th scope="col">Tên đọc giả</th>
        <th scope="col">SĐT đọc giả</th>
        <th scope="col">Ngày tạo</th>
        <th scope="col">Lý do</th>
        <th scope="col">Tổng tiền</th>
        <th scope="col" class="text-center">Trạng thái thánh toán</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="penaltyTicket in penaltyTickets"
        :key="penaltyTicket._id"
        class="book-item"
        @click="
          this.$router.push({
            name: 'penaltyTicket.detail',
            params: { id: penaltyTicket._id },
          })
        "
      >
        <td>
          {{ penaltyTicket._id }}
        </td>
        <td>
          {{ penaltyTicket.reader.fullName }}
        </td>
        <td>
          {{ penaltyTicket.reader.phoneNumber }}
        </td>
        <td>
          {{ formatDateTime(penaltyTicket.createdAt) }}
        </td>

        <td>
          {{ LoanDetailStatus[penaltyTicket.typePenalty].desc }}
        </td>
        <td>{{ VND.format(penaltyTicket.amount) }}đ</td>
        <td class="text-center">
          <span
            :class="
              'badge text-bg-' +
              PaymentStatus[penaltyTicket.paymentStatus].color
            "
          >
            {{ PaymentStatus[penaltyTicket.paymentStatus].desc }}
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

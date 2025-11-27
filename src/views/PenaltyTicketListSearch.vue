<script>
import Pagination from "@/components/Pagination.vue";
import PenaltyTicketList from "@/components/PenaltyTicketList.vue";
import SearchInput from "@/components/SearchInput.vue";
import penaltyTicketService from "@/services/penaltyTicket.service";
import { PaymentStatus } from "@/utils/constant";

export default {
  components: {
    SearchInput,
    Pagination,
    PenaltyTicketList,
  },
  data() {
    return {
      penaltyTickets: [],
      totalPages: 1,
      limit: 10,
      PaymentStatus: PaymentStatus,
    };
  },
  computed: {
    currentPage() {
      return parseInt(this.$route.query.page) || 1;
    },
    currentIdQuery() {
      return this.$route.query.id || "";
    },
    currentStatusQuery() {
      return this.$route.query.paymentStatus || PaymentStatus.ALL.name;
    },
  },
  watch: {
    "$route.query": {
      handler: "retrievePenaltyTickets",
      immediate: true,
    },
  },
  methods: {
    async retrievePenaltyTickets() {
      try {
        const result = await penaltyTicketService.findAll({
          page: this.currentPage,
          limit: this.limit,
          id: this.currentIdQuery,
          paymentStatus:
            this.currentStatusQuery == PaymentStatus.ALL.name
              ? ""
              : this.currentStatusQuery,
        });
        this.penaltyTickets = result.result.data;
        this.totalPages = result.result.totalPages;
      } catch (error) {
        console.log(error);
      }
    },

    handleSearch(queryText, status) {
      this.$router.push({
        query: {
          id: queryText || undefined,
          paymentStatus: status || PaymentStatus.ALL.name,
          page: 1,
        },
      });
    },

    handleChangePage(pageNum) {
      this.$router.push({
        query: {
          ...this.$route.query,
          page: pageNum,
        },
      });
    },
  },
};
</script>
<template>
  <div class="ps-4 pe-4">
    <div class="row">
      <div class="col-6">
        <SearchInput
          :initial-value="currentIdQuery"
          :placeholder="'Mã phiếu phạt ...'"
          @submit:query="handleSearch"
        />
      </div>
      <div class="col-2 pt-1">
        <div class="dropdown">
          <button
            class="btn btn-secondary btn-sm dropdown-toggle"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {{ PaymentStatus[currentStatusQuery].desc }}
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li>
              <div
                class="dropdown-item"
                v-for="(item, key) in PaymentStatus"
                :key="key"
                @click="handleSearch(null, item.name)"
              >
                {{ item.desc }}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="mt-2">
      <PenaltyTicketList :penalty-tickets="penaltyTickets" />
    </div>
    <div class="d-flex justify-content-end mt-3">
      <Pagination
        :model-value="currentPage"
        :total-pages="totalPages"
        @update:model-value="handleChangePage"
      />
    </div>
  </div>
</template>

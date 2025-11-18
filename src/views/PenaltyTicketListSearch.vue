<script>
import Pagination from "@/components/Pagination.vue";
import PenaltyTicketList from "@/components/PenaltyTicketList.vue";
import SearchInput from "@/components/SearchInput.vue";
import penaltyTicketService from "@/services/penaltyTicket.service";

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
    };
  },
  computed: {
    currentPage() {
      return parseInt(this.$route.query.page) || 1;
    },
    currentIdQuery() {
      return this.$route.query.id || "";
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
        });
        this.penaltyTickets = result.result.data;
        this.totalPages = result.result.totalPages;
      } catch (error) {
        console.log(error);
      }
    },

    handleSearch(queryText) {
      this.$router.push({
        query: {
          id: queryText || undefined,
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
  <div class="ps-2 pe-2">
    <div class="col-5">
      <SearchInput
        :initial-value="currentIdQuery"
        :placeholder="'Mã phiếu phạt ...'"
        @submit:query="handleSearch"
      />
    </div>
    <div class="info-user mt-2">
      <PenaltyTicketList :penalty-tickets="penaltyTickets" />
    </div>
    <div class="d-flex justify-content-center mt-3">
      <Pagination
        :model-value="currentPage"
        :total-pages="totalPages"
        @update:model-value="handleChangePage"
      />
    </div>
  </div>
</template>

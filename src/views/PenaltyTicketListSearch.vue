<script>
import Pagination from "@/components/Pagination.vue";
import PenaltyTicketList from "@/components/PenaltyTicketList.vue";
import SearchInput from "@/components/SearchInput.vue";
import loanSlipService from "@/services/loanSlip.service";
import penaltyTicketService from "@/services/penaltyTicket.service";

export default {
  components: {
    SearchInput,
    Pagination,
    PenaltyTicketList,
  },
  data() {
    return {
      searchText: "",
      penaltyTickets: [],
      currentPage: 1,
      totalPages: 1,
      limit: 10,
    };
  },
  computed: {
    filteredpenaltyTickets() {
      if (!this.searchText) return this.penaltyTickets;
    },
  },
  watch: {
    currentPage(newPage) {
      if (newPage) {
        this.$router.push({ query: { page: newPage } });
        this.retrievePenaltyTickets();
      }
    },
  },
  methods: {
    async retrievePenaltyTickets() {
      try {
        const result = await penaltyTicketService.findAll({
          page: this.currentPage,
          limit: this.limit,
        });
        this.penaltyTickets = result.result.data;
        this.totalPages = result.result.totalPages;
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    const pageFromUrl = parseInt(this.$route.query.page);
    if (!isNaN(pageFromUrl) && pageFromUrl > 0) {
      this.currentPage = pageFromUrl;
    } else {
      this.currentPage = 1;
    }
    this.retrievePenaltyTickets();
  },
};
</script>
<template>
  <div class="ps-2 pe-2">
    <div class="col-5">
      <SearchInput />
    </div>
    <div class="info-user mt-2">
      <PenaltyTicketList :penalty-tickets="penaltyTickets" />
    </div>
    <div class="d-flex justify-content-center mt-3">
      <Pagination v-model="currentPage" :total-pages="totalPages" />
    </div>
  </div>
</template>

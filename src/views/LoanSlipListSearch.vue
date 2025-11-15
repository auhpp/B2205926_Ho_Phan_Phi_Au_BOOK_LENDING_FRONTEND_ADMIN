<script>
import Pagination from "@/components/Pagination.vue";
import SearchInput from "@/components/SearchInput.vue";
import loanSlipService from "@/services/loanSlip.service";
import LoanSlipList from "@/components/LoanSlipList.vue";

export default {
  components: {
    SearchInput,
    Pagination,
    LoanSlipList,
  },
  data() {
    return {
      searchText: "",
      loanSlips: [],
      currentPage: 1,
      totalPages: 1,
      limit: 10,
    };
  },
  computed: {
    filteredLoanSlips() {
      if (!this.searchText) return this.loanSlips;
    },
  },
  watch: {
    currentPage(newPage) {
      if (newPage) {
        this.$router.push({ query: { page: newPage } });
        this.retrieveLoanSlipList();
      }
    },
  },
  methods: {
    async retrieveLoanSlipList() {
      try {
        const result = await loanSlipService.findAll({
          page: this.currentPage,
          limit: this.limit,
        });
        this.loanSlips = result.result.data;
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
    this.retrieveLoanSlipList();
  },
};
</script>
<template>
  <div class="ps-2 pe-2">
    <div class="col-5">
      <SearchInput />
    </div>
    <LoanSlipList :loan-slips="loanSlips" />
    <div class="d-flex justify-content-center mt-3">
      <Pagination v-model="currentPage" :total-pages="totalPages" />
    </div>
  </div>
</template>

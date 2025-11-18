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
      loanSlips: [],
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
      handler: "retrieveLoanSlipList",
      immediate: true,
    },
  },
  methods: {
    async retrieveLoanSlipList() {
      try {
        const result = await loanSlipService.findAll({
          page: this.currentPage,
          limit: this.limit,
          id: this.currentIdQuery,
        });
        this.loanSlips = result.result.data;
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
        :placeholder="'Mã phiếu mượn ...'"
        @submit:query="handleSearch"
      />
    </div>
    <div class="info-user mt-2">
      <LoanSlipList :loan-slips="loanSlips" />
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

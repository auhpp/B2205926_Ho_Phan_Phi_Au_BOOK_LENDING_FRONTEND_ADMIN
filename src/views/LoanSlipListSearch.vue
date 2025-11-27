<script>
import Pagination from "@/components/Pagination.vue";
import SearchInput from "@/components/SearchInput.vue";
import loanSlipService from "@/services/loanSlip.service";
import LoanSlipList from "@/components/LoanSlipList.vue";
import { LoanSlipStatus } from "@/utils/constant";

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
      LoanSlipStatus: LoanSlipStatus,
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
      return this.$route.query.status || LoanSlipStatus.all.name;
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
          status:
            this.currentStatusQuery == LoanSlipStatus.all.name
              ? ""
              : this.currentStatusQuery,
        });
        this.loanSlips = result.result.data;
        this.totalPages = result.result.totalPages;
      } catch (error) {
        console.log(error);
      }
    },
    handleSearch(queryText, status) {
      this.$router.push({
        query: {
          id: queryText || undefined,
          status: status || LoanSlipStatus.all.name,
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
          :placeholder="'Mã phiếu mượn ...'"
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
            {{ LoanSlipStatus[currentStatusQuery].desc }}
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li>
              <div
                class="dropdown-item"
                v-for="(item, key) in LoanSlipStatus"
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
      <LoanSlipList :loan-slips="loanSlips" />
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

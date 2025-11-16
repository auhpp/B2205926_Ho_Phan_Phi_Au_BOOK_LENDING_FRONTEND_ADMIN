<script>
import ConfigurationAdd from "@/components/ConfigurationAdd.vue";
import ConfigurationList from "@/components/ConfigurationList.vue";
import Pagination from "@/components/Pagination.vue";
import SearchInput from "@/components/SearchInput.vue";
import configurationService from "@/services/configuration.service";

export default {
  components: {
    SearchInput,
    ConfigurationList,
    ConfigurationAdd,
    Pagination,
  },
  data() {
    return {
      searchText: "",
      configurations: [],
      configuration: {},
      currentPage: 1,
      totalPages: 1,
      limit: 10,
    };
  },
  computed: {
    filteredConfigurations() {
      if (!this.searchText) return this.configurations;
    },
  },
  watch: {
    currentPage(newPage) {
      if (newPage) {
        this.$router.push({ query: { page: newPage } });
        this.retrieveConfigurations();
      }
    },
  },
  methods: {
    async retrieveConfigurations() {
      try {
        const result = await configurationService.findAll({
          page: this.currentPage,
          limit: this.limit,
        });
        this.configurations = result.result.data;
        this.totalPages = result.result.totalPages;
      } catch (error) {
        console.log(error);
      }
    },
    async createConfiguration(configuration) {
      try {
        await configurationService.create(configuration);
        await this.retrieveConfigurations();
        alert("Cấu hình được cập nhật thành công.");
      } catch (error) {
        alert("Lỗi update giá trị cấu hình");
        console.log(error);
      }
    },
    openEditModal(configuration) {
      console.log("ca ", configuration);
      this.configuration = configuration;
    },
  },
  mounted() {
    const pageFromUrl = parseInt(this.$route.query.page);
    if (!isNaN(pageFromUrl) && pageFromUrl > 0) {
      this.currentPage = pageFromUrl;
    } else {
      this.currentPage = 1;
    }
    this.category = {};
    this.retrieveConfigurations();
  },
};
</script>
<template>
  <div class="ps-2 pe-2">
    <div class="col-5">
      <SearchInput />
    </div>
    <div class="col-5">
      <ConfigurationAdd
        :configuration="this.configuration"
        @submit:configuration="createConfiguration"
      />
    </div>
    <div class="info-user mt-2">
      <ConfigurationList
        :configurations="configurations"
        @submit:configuration="openEditModal"
      />
    </div>
    <div class="d-flex justify-content-center mt-3">
      <Pagination v-model="currentPage" :total-pages="totalPages" />
    </div>
  </div>
</template>

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
      configurations: [],
      configuration: {},
      totalPages: 1,
      limit: 10,
    };
  },
  computed: {
    currentPage() {
      return parseInt(this.$route.query.page) || 1;
    },
    currentName() {
      return this.$route.query.name || "";
    },
  },
  watch: {
    "$route.query": {
      handler: "retrieveConfigurations",
      immediate: true,
    },
  },
  methods: {
    async retrieveConfigurations() {
      try {
        const result = await configurationService.findAll({
          page: this.currentPage,
          limit: this.limit,
          name: this.currentName,
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

    handleSearch(queryText) {
      this.$router.push({
        query: {
          name: queryText || undefined,
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
    <div class="col-6">
      <SearchInput
        :initial-value="currentName"
        :placeholder="'Tên cấu hình ...'"
        @submit:query="handleSearch"
      />
    </div>
    <div class="col-5">
      <ConfigurationAdd
        :configuration="this.configuration"
        @submit:configuration="createConfiguration"
      />
    </div>
    <div class="mt-2">
      <ConfigurationList
        :configurations="configurations"
        @submit:configuration="openEditModal"
      />
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

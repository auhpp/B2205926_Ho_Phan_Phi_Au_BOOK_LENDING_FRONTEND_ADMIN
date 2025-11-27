<script>
import Pagination from "@/components/Pagination.vue";
import PublisherAdd from "@/components/PublisherAdd.vue";
import PublisherList from "@/components/PublisherList.vue";
import SearchInput from "@/components/SearchInput.vue";
import publisherService from "@/services/publisher.service";
export default {
  components: {
    SearchInput,
    PublisherAdd,
    PublisherList,
    Pagination,
  },
  data() {
    return {
      publisers: [],
      publisherToEdit: {},
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
      handler: "retrievePublisher",
      immediate: true,
    },
  },
  methods: {
    async retrievePublisher() {
      try {
        const result = await publisherService.findPagination({
          page: this.currentPage,
          limit: this.limit,
          name: this.currentName,
        });
        this.publisers = result.result.data;
        this.totalPages = result.result.totalPages;
      } catch (error) {
        console.log(error);
      }
    },
    async createPublisher(publisher) {
      try {
        await publisherService.create(publisher);
        await this.retrievePublisher();
        alert("Nhà xuất bản được tạo thành công.");
      } catch (error) {
        alert("Tên nhà xuất bản đã tồn tại!");
        console.log(error);
      }
    },
    openEditModal(publisher) {
      this.publisherToEdit = { ...publisher };
    },
    openAddModal() {
      this.publisherToEdit = {};
    },

    async deletePublisher(id) {
      if (confirm("Bạn muốn xóa nhà xuất bản này?")) {
        try {
          await publisherService.delete(id);
          this.retrievePublisher();
          alert("Nhà xuất bản được xóa thành công.");
        } catch (error) {
          alert("Xóa thất bại! Nhà xuất bản đã được sử dụng!");
          console.log(error);
        }
      }
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
    <div class="row">
      <div class="col-6">
        <SearchInput
          :initial-value="currentName"
          :placeholder="'Tên nhà xuất bản ...'"
          @submit:query="handleSearch"
        />
      </div>
      <div class="col-6 text-end">
        <button
          data-bs-toggle="modal"
          data-bs-target="#createPublisherModal"
          type="button"
          class="btn btn-primary"
          @click="openAddModal"
        >
          <i class="fa-solid fa-plus"></i>
          Thêm nhà xuất bản
        </button>
      </div>
    </div>
    <PublisherAdd
      :publisher="publisherToEdit"
      @submit:publisher="createPublisher"
    />
    <div class="mt-2">
      <PublisherList
        :publishers="publisers"
        @submit:publisher="openEditModal"
        @delete:publisher="deletePublisher"
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

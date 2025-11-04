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
      searchText: "",
      publisers: [],
      publisherToEdit: {},
      currentPage: 1,
      totalPages: 1,
      limit: 1,
    };
  },
  watch: {
    currentPage(newPage) {
      if (newPage) {
        this.$router.push({ query: { page: newPage } });
        this.retrievePublisher();
      }
    },
  },
  computed: {
    filteredPublishers() {
      if (!this.searchText) return this.publisers;
    },
  },
  methods: {
    async retrievePublisher() {
      try {
        const result = await publisherService.findAll({
          page: this.currentPage,
          limit: this.limit,
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
          console.log(error);
        }
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
    this.retrievePublisher();
  },
};
</script>
<template>
  <div class="ps-2 pe-2">
    <div class="col-5">
      <SearchInput />
    </div>
    <div class="col-5">
      <button
        data-bs-toggle="modal"
        data-bs-target="#createPublisherModal"
        type="button"
        class="btn btn-outline-primary"
        @click="openAddModal"
      >
        <i class="fa-solid fa-plus"></i>
        Thêm nhà xuất bản
      </button>
      <PublisherAdd
        :publisher="publisherToEdit"
        @submit:publisher="createPublisher"
      />
    </div>
    <PublisherList
      :publishers="publisers"
      @submit:publisher="openEditModal"
      @delete:publisher="deletePublisher"
    />
    <div class="d-flex justify-content-center mt-3">
      <Pagination v-model="currentPage" :total-pages="totalPages" />
    </div>
  </div>
</template>

<script>
import PublisherAdd from "@/components/PublisherAdd.vue";
import PublisherList from "@/components/PublisherList.vue";
import SearchInput from "@/components/SearchInput.vue";
import publisherService from "@/services/publisher.service";
export default {
  components: {
    SearchInput,
    PublisherAdd,
    PublisherList,
  },
  data() {
    return {
      searchText: "",
      publisers: [],
      publisherToEdit: {},
    };
  },
  computed: {
    filteredPublishers() {
      if (!this.searchText) return this.publisers;
    },
  },
  methods: {
    async retrievePublisher() {
      try {
        this.publisers = (await publisherService.findAll()).result;
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
      this.publisherToEdit = publisher;
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
  </div>
</template>

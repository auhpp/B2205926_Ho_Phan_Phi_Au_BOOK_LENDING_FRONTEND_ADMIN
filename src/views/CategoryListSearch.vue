<script>
import CategoryAdd from "@/components/CategoryAdd.vue";
import CategoryList from "@/components/CategoryList.vue";
import Pagination from "@/components/Pagination.vue";
import SearchInput from "@/components/SearchInput.vue";
import categoryService from "@/services/category.service";
export default {
  components: {
    SearchInput,
    CategoryList,
    CategoryAdd,
    Pagination,
  },
  data() {
    return {
      searchText: "",
      categories: [],
      category: {},
      currentPage: 1,
      totalPages: 1,
      limit: 10,
    };
  },
  computed: {
    filteredBooks() {
      if (!this.searchText) return this.categories;
    },
  },
  watch: {
    currentPage(newPage) {
      if (newPage) {
        this.$router.push({ query: { page: newPage } });
        this.retrieveCategories();
      }
    },
  },
  methods: {
    async retrieveCategories() {
      try {
        const result = await categoryService.findAll({
          page: this.currentPage,
          limit: this.limit,
        });
        this.categories = result.result.data;
        this.totalPages = result.result.totalPages;
      } catch (error) {
        console.log(error);
      }
    },
    async createCategory(category) {
      try {
        await categoryService.create(category);
        await this.retrieveCategories();
        alert("Danh mục sách được tạo thành công.");
      } catch (error) {
        alert("Tên danh mục đã tồn tại!");
        console.log(error);
      }
    },
    openEditModal(category) {
      console.log("ca ", category);
      this.category = category;
    },
    openAddModal() {
      this.category = {};
    },

    async deleteCategory(id) {
      if (confirm("Bạn muốn xóa danh mục này?")) {
        try {
          await categoryService.delete(id);
          this.retrieveCategories();
          alert("Danh mục được xóa thành công.");
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
    this.category = {};
    this.retrieveCategories();
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
        data-bs-target="#createCategoryModal"
        type="button"
        class="btn btn-outline-primary"
        @click="openAddModal"
      >
        <i class="fa-solid fa-plus"></i>
        Thêm danh mục
      </button>
      <CategoryAdd
        :category="this.category"
        @submit:category="createCategory"
      />
    </div>
    <div class="info-user mt-2">
      <CategoryList
        :categories="categories"
        @submit:category="openEditModal"
        @delete:category="deleteCategory"
      />
    </div>
    <div class="d-flex justify-content-center mt-3">
      <Pagination v-model="currentPage" :total-pages="totalPages" />
    </div>
  </div>
</template>

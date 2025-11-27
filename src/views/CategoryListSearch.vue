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
      categories: [],
      category: {},
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
      handler: "retrieveCategories",
      immediate: true,
    },
  },
  methods: {
    async retrieveCategories() {
      try {
        const result = await categoryService.findPagination({
          page: this.currentPage,
          limit: this.limit,
          name: this.currentName,
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
          alert("Xóa thất bại! Danh mục đã được sử dụng!");
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
          :placeholder="'Tên danh mục ...'"
          @submit:query="handleSearch"
        />
      </div>
      <div class="col-6 text-end">
        <button
          data-bs-toggle="modal"
          data-bs-target="#createCategoryModal"
          type="button"
          class="btn btn-primary"
          @click="openAddModal"
        >
          <i class="fa-solid fa-plus"></i>
          Thêm danh mục
        </button>
      </div>
    </div>

    <CategoryAdd :category="this.category" @submit:category="createCategory" />
    <div class="mt-2">
      <CategoryList
        :categories="categories"
        @submit:category="openEditModal"
        @delete:category="deleteCategory"
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

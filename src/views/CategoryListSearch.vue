<script>
import CategoryAdd from "@/components/CategoryAdd.vue";
import CategoryList from "@/components/CategoryList.vue";
import SearchInput from "@/components/SearchInput.vue";
import categoryService from "@/services/category.service";
export default {
  components: {
    SearchInput,
    CategoryList,
    CategoryAdd,
  },
  data() {
    return {
      searchText: "",
      categories: [],
      category: {},
    };
  },
  computed: {
    filteredBooks() {
      if (!this.searchText) return this.categories;
    },
  },
  methods: {
    async retrieveCategories() {
      try {
        this.categories = (await categoryService.findAll()).result;
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
    <CategoryList
      :categories="categories"
      @submit:category="openEditModal"
      @delete:category="deleteCategory"
    />
  </div>
</template>

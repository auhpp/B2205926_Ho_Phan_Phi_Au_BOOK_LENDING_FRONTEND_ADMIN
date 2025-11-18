<script>
import AuthorAdd from "@/components/AuthorAdd.vue";
import AuthorList from "@/components/AuthorList.vue";
import Pagination from "@/components/Pagination.vue";
import SearchInput from "@/components/SearchInput.vue";
import authorService from "@/services/author.service";
export default {
  components: {
    SearchInput,
    AuthorList,
    AuthorAdd,
    Pagination,
  },
  data() {
    return {
      authors: [],
      authorToEdit: {},
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
      handler: "retrieveAuthors",
      immediate: true,
    },
  },
  methods: {
    async retrieveAuthors() {
      try {
        const result = await authorService.findPagination({
          page: this.currentPage,
          limit: this.limit,
          name: this.currentName,
        });
        this.authors = result.result.data;
        this.totalPages = result.result.totalPages;
      } catch (error) {
        console.log(error);
      }
    },
    async createAuthor(author) {
      try {
        await authorService.create(author);
        await this.retrieveAuthors();
        alert("Tác giả được tạo thành công.");
      } catch (error) {
        alert("Tên tác giả đã tồn tại!");
        console.log(error);
      }
    },
    openEditModal(author) {
      this.authorToEdit = author;
    },
    openAddModal() {
      this.authorToEdit = {};
    },

    async deleteAuthor(id) {
      if (confirm("Bạn muốn xóa tác giả này?")) {
        try {
          await authorService.delete(id);
          this.retrieveAuthors();
          alert("Tác giả được xóa thành công.");
        } catch (error) {
          alert("Xóa thất bại! Tác giả đã được sử dụng!");
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
  <div class="ps-2 pe-2">
    <div class="col-5">
      <SearchInput
        :initial-value="currentName"
        :placeholder="'Tên tác giả ...'"
        @submit:query="handleSearch"
      />
    </div>
    <div class="col-5">
      <button
        data-bs-toggle="modal"
        data-bs-target="#createAuthorModal"
        type="button"
        class="btn btn-outline-primary"
        @click="openAddModal"
      >
        <i class="fa-solid fa-plus"></i>
        Thêm tác giả
      </button>
      <AuthorAdd :author="authorToEdit" @submit:author="createAuthor" />
    </div>
    <div class="info-user mt-2">
      <AuthorList
        :authors="authors"
        @submit:author="openEditModal"
        @delete:author="deleteAuthor"
      />
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

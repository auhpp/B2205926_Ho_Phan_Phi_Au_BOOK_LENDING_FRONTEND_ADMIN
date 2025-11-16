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
      searchText: "",
      authors: [],
      authorToEdit: {},
      currentPage: 1,
      totalPages: 1,
      limit: 10,
    };
  },
  computed: {
    filteredBooks() {
      if (!this.searchText) return this.authors;
    },
  },
  watch: {
    currentPage(newPage) {
      if (newPage) {
        this.$router.push({ query: { page: newPage } });
        this.retrieveAuthors();
      }
    },
  },
  methods: {
    async retrieveAuthors() {
      try {
        const result = await authorService.findAll({
          page: this.currentPage,
          limit: this.limit,
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
    this.retrieveAuthors();
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
      <Pagination v-model="currentPage" :total-pages="totalPages" />
    </div>
  </div>
</template>

<script>
import AuthorAdd from "@/components/AuthorAdd.vue";
import AuthorList from "@/components/AuthorList.vue";
import SearchInput from "@/components/SearchInput.vue";
import authorService from "@/services/author.service";
export default {
  components: {
    SearchInput,
    AuthorList,
    AuthorAdd,
  },
  data() {
    return {
      searchText: "",
      authors: [],
      authorToEdit: {},
    };
  },
  computed: {
    filteredBooks() {
      if (!this.searchText) return this.authors;
    },
  },
  methods: {
    async retrieveAuthors() {
      try {
        this.authors = (await authorService.findAll()).result;
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
    <AuthorList
      :authors="authors"
      @submit:author="openEditModal"
      @delete:author="deleteAuthor"
    />
  </div>
</template>

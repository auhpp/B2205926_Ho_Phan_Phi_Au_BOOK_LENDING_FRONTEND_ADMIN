<script>
import SearchInput from "@/components/SearchInput.vue";
import BookList from "@/components/BookList.vue";
import bookService from "@/services/book.service";
import Pagination from "@/components/Pagination.vue";
export default {
  components: {
    SearchInput,
    BookList,
    Pagination,
  },
  data() {
    return {
      searchText: "",
      books: [],
      currentPage: 1,
      totalPages: 1,
      limit: 10,
    };
  },
  computed: {
    filteredBooks() {
      if (!this.searchText) return this.books;
    },
  },
  watch: {
    currentPage(newPage) {
      if (newPage) {
        this.$router.push({ query: { page: newPage } });
        this.retrieveBooks();
      }
    },
  },
  methods: {
    async retrieveBooks() {
      try {
        const result = await bookService.findAll({
          page: this.currentPage,
          limit: this.limit,
        });
        this.books = result.result.data;
        this.totalPages = result.result.totalPages;
      } catch (error) {
        console.log(error);
      }
    },

    navigateToCreateBook() {
      this.$router.push({ name: "book-add" });
    },

    handleChangePage(pageNum) {
      this.currentPage = pageNum;
    },
  },
  mounted() {
    const pageFromUrl = parseInt(this.$route.query.page);
    if (!isNaN(pageFromUrl) && pageFromUrl > 0) {
      this.currentPage = pageFromUrl;
    } else {
      this.currentPage = 1;
    }
    this.retrieveBooks();
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
        type="button"
        @click="navigateToCreateBook"
        class="btn btn-outline-primary"
      >
        <i class="fa-solid fa-plus"></i>
        Thêm sách
      </button>
    </div>
    <BookList :books="filteredBooks" />
    <div class="d-flex justify-content-center mt-3">
      <Pagination v-model="currentPage" :total-pages="totalPages" />
    </div>
  </div>
</template>

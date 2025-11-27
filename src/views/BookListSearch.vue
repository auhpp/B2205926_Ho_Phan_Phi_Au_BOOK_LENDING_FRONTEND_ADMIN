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
      books: [],
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
      handler: "retrieveBooks",
      immediate: true,
    },
  },
  methods: {
    async retrieveBooks() {
      try {
        const result = await bookService.findAll({
          page: this.currentPage,
          limit: this.limit,
          name: this.currentName,
        });
        this.books = result.result.data;
        this.totalPages = result.result.totalPages;
      } catch (error) {
        console.log(error);
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
    navigateToCreateBook() {
      this.$router.push({ name: "book-add" });
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
          :placeholder="'Tên sách ...'"
          @submit:query="handleSearch"
        />
      </div>
      <div class="col-6 text-end">
        <button
          type="button"
          @click="navigateToCreateBook"
          class="btn btn-primary"
        >
          <i class="fa-solid fa-plus"></i>
          Thêm sách
        </button>
      </div>
    </div>
    <div class="mt-2">
      <BookList :books="books" />
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

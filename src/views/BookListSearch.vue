<script>
import SearchInput from "@/components/SearchInput.vue";
import BookList from "@/components/BookList.vue";
import bookService from "@/services/book.service";
export default {
  components: {
    SearchInput,
    BookList,
  },
  data() {
    return {
      searchText: "",
      books: [],
    };
  },
  computed: {
    filteredBooks() {
      if (!this.searchText) return this.books;
    },
  },
  methods: {
    async retrieveBooks() {
      try {
        this.books = (await bookService.findAll()).result.data;
        console.log(this.books);
      } catch (error) {
        console.log(error);
      }
    },

    navigateToCreateBook() {
      this.$router.push({ name: "book-add" });
    },
  },
  mounted() {
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
  </div>
</template>

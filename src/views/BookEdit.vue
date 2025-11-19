<script>
import BookCopyAdd from "@/components/BookCopyAdd.vue";
import BookCopyList from "@/components/BookCopyList.vue";
import BookForm from "@/components/BookForm.vue";
import LoadingOverlay from "@/components/loadingOverlay.vue";
import Pagination from "@/components/Pagination.vue";
import bookService from "@/services/book.service";
import bookCopyService from "@/services/bookCopy.service";
import { BookCopyStatus } from "@/utils/constant";

export default {
  components: {
    BookForm,
    BookCopyList,
    BookCopyAdd,
    Pagination,
    LoadingOverlay,
  },
  props: {
    id: { type: String, default: null },
  },
  data() {
    return {
      book: null,
      bookCopies: [],
      currentPage: 1,
      totalPages: 1,
      limit: 4,
      isLoading: false,
    };
  },
  watch: {
    currentPage(newPage) {
      if (newPage) {
        this.$router.push({ query: { page: newPage } });
        this.getBookCopies(this.book._id);
      }
    },
  },
  methods: {
    async getBook(id) {
      try {
        this.book = (await bookService.findById(id)).result;
        console.log(id + ", " + this.book);
      } catch (error) {
        console.log(error);
      }
    },

    async getBookCopies(id) {
      try {
        const result = (
          await bookCopyService.findAll({
            bookId: id,
            page: this.currentPage,
            limit: this.limit,
          })
        ).result;
        this.bookCopies = result.data;
        this.totalPages = result.totalPages;
      } catch (error) {
        console.log(error);
      }
    },

    async createBook(data) {
      try {
        this.isLoading = true;
        await bookService.create(data);
        alert("Sách được tạo thành công.");
        this.$router.push({ name: "books" });
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },

    async createBookCopy(quantity) {
      try {
        await bookCopyService.create({
          quantity: quantity,
          status: BookCopyStatus.available.name,
          bookId: this.book._id,
        });
        await this.getBookCopies(this.id);
        alert("Bản sao sách được tạo thành công.");
      } catch (error) {
        console.log(error);
      }
    },
    async deleteBook() {
      if (confirm("Bạn muốn xóa sách này?")) {
        try {
          await bookService.delete(this.book._id);
          alert("Sách được xóa thành công.");
          this.$router.push({ name: "books" });
        } catch (error) {
          alert("Sách đã được đưa vào sử dụng không thể xóa");
        }
      }
    },
    async deleteBookCopy(id) {
      if (confirm("Bạn muốn xóa bản sao sách này?")) {
        try {
          await bookCopyService.delete(id);
          await this.getBookCopies(this.id);
          alert("Bản sao sách được xóa thành công.");
        } catch (error) {
          alert(
            "Một sách phải có ít nhất 1 bản sao hoặc sách đã được đưa vào sử dụng không xóa được"
          );
          console.log(error);
        }
      }
    },
  },
  created() {
    if (this.id) {
      const pageFromUrl = parseInt(this.$route.query.page);
      if (!isNaN(pageFromUrl) && pageFromUrl > 0) {
        this.currentPage = pageFromUrl;
      } else {
        this.currentPage = 1;
      }
      this.getBook(this.id);
      this.getBookCopies(this.id);
    } else {
      this.book = {
        name: "",
        price: "",
        bookCopyQuantity: 1,
        categories: [],
        authors: [],
        publisher: null,
        images: [],
      };
    }
  },
};
</script>

<template>
  <div>
    <LoadingOverlay :visible="isLoading" />
    <BookForm
      v-if="book"
      :book="book"
      @submit:book="createBook"
      @delete:book="deleteBook"
    />
    <div v-else class="p-4">Đang tải dữ liệu sách...</div>
    <div v-if="book && book._id" class="book-copy ps-4 pe-4">
      <h4>Các bản sao của sách này</h4>
      <BookCopyAdd @submit:book-copy="createBookCopy" />
      <BookCopyList
        v-if="bookCopies"
        :book-copies="bookCopies"
        @delete:book-copy="deleteBookCopy"
      />
      <div v-else class="p-4">Đang tải dữ liệu bản sao sách...</div>
      <div class="d-flex justify-content-center mt-3">
        <Pagination v-model="currentPage" :total-pages="totalPages" />
      </div>
    </div>
  </div>
</template>

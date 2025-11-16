<script>
import { BookCopyStatus } from "@/utils/constant";

export default {
  props: {
    bookCopies: { type: Array, default: [] },
  },
  emits: ["delete:bookCopy"],
  data() {
    return {
      BookCopyStatus: BookCopyStatus,
    };
  },
  methods: {
    deleteBookCopy(id) {
      this.$emit("delete:bookCopy", id);
    },
  },
};
</script>
<template>
  <table class="table table-hover">
    <thead>
      <tr>
        <th class="col-3" scope="col">ID</th>
        <th scope="col">Mã vạch</th>
        <th scope="col">Trạng thái</th>
        <th scope="col" class="text-center">Thao tác</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="bookCopy in bookCopies"
        :key="bookCopy._id"
        @click="navigateToBookEdit(bookCopy._id)"
        class="book-item"
      >
        <td>
          {{ bookCopy._id }}
        </td>
        <td>
          {{ bookCopy.barCode }}
        </td>
        <td>
          <span :class="'badge text-bg-' + BookCopyStatus[bookCopy.status].color">
            {{ BookCopyStatus[bookCopy.status].desc }}
          </span>
        </td>
        <td class="text-center">
          <button
            type="button"
            @click="deleteBookCopy(bookCopy._id)"
            class="me-1 btn btn-danger btn-sm"
          >
            <i class="fa-solid fa-trash"></i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<style>
.book-item {
  cursor: pointer;
}
</style>

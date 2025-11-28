<script>
import { BookCopyStatus } from "@/utils/constant";

export default {
  props: {
    bookCopies: { type: Array, default: [] },
  },
  emits: ["delete:bookCopy", "update:bookCopy"],
  data() {
    return {
      BookCopyStatus: BookCopyStatus,
    };
  },
  methods: {
    deleteBookCopy(id) {
      this.$emit("delete:bookCopy", id);
    },
    updateBookCopy(status, id) {
      this.$emit("update:bookCopy", status, id);
    },
  },
  computed: {
    filteredStatus() {
      const hiddenStatuses = ["approved", "borrowed", "pending"];

      return Object.fromEntries(
        Object.entries(this.BookCopyStatus).filter(
          ([key, value]) => !hiddenStatuses.includes(key)
        )
      );
    },
  },
};
</script>
<template>
  <table class="table table-hover table-display-data">
    <thead class="table-head">
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
          <div class="dropdown">
            <button
              :class="
                'btn btn-sm btn-' +
                BookCopyStatus[bookCopy.status].color +
                (bookCopy.status != BookCopyStatus.approved.name &&
                bookCopy.status != BookCopyStatus.borrowed.name &&
                bookCopy.status != BookCopyStatus.pending.name
                  ? ' dropdown-toggle'
                  : '')
              "
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {{ BookCopyStatus[bookCopy.status].desc }}
            </button>
            <ul
              class="dropdown-menu"
              aria-labelledby="dropdownMenuButton1"
              v-if="
                bookCopy.status != BookCopyStatus.approved.name &&
                bookCopy.status != BookCopyStatus.borrowed.name &&
                bookCopy.status != BookCopyStatus.pending.name
              "
            >
              <li
                class="dropdown-item"
                v-for="(item, key) in filteredStatus"
                :key="key"
                @click="updateBookCopy(item.name, bookCopy._id)"
              >
                {{ item.desc }}
              </li>
            </ul>
          </div>
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

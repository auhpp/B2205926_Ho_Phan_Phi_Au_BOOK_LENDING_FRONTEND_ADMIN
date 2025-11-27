<script>
export default {
  props: {
    authors: { type: Array, default: [] },
  },
  emits: ["submit:author", "delete:author"],
  data() {
    return {};
  },
  methods: {
    editAuthor(author) {
      this.$emit("submit:author", author);
    },
    deleteAuthor(id) {
      this.$emit("delete:author", id);
    },
  },
};
</script>
<template>
  <table class="table table-hover table-display-data">
    <thead class="table-head">
      <tr>
        <th class="col-3" scope="col">ID</th>
        <th scope="col">Tên danh mục</th>
        <th scope="col" class="text-center">Thao tác</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="author in authors" :key="author._id" class="book-item">
        <td>
          {{ author._id }}
        </td>
        <td>
          {{ author.name }}
        </td>
        <td class="text-center">
          <button
            type="button"
            class="col-2 me-1 btn btn-success btn-sm"
            data-bs-toggle="modal"
            data-bs-target="#createAuthorModal"
            @click="editAuthor(author)"
          >
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
          <button
            type="button"
            @click="deleteAuthor(author._id)"
            class="col-2 me-1 btn btn-danger btn-sm"
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

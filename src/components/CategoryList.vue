<script>
export default {
  props: {
    categories: { type: Array, default: [] },
  },
  emits: ["submit:category", "delete:category"],
  data() {
    return {};
  },
  methods: {
    editCategory(category) {
      this.$emit("submit:category", category);
    },
    deleteCategory(id) {
      this.$emit("delete:category", id);
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
      <tr v-for="category in categories" :key="category._id" class="book-item">
        <td>
          {{ category._id }}
        </td>
        <td>
          {{ category.name }}
        </td>
        <td class="text-center">
          <button
            type="button"
            class="col-2 me-1 btn btn-success btn-sm"
            data-bs-toggle="modal"
            data-bs-target="#createCategoryModal"
            @click="editCategory(category)"
          >
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
          <button
            type="button"
            @click="deleteCategory(category._id)"
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

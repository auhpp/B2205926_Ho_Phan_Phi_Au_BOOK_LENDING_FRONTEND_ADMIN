<script>
export default {
  props: {
    publishers: { type: Array, default: [] },
  },
  emits: ["submit:publisher", "delete:publisher"],
  data() {
    return {};
  },
  methods: {
    editPublisher(publisher) {
      this.$emit("submit:publisher", publisher);
    },
    deletePublisher(id) {
      this.$emit("delete:publisher", id);
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
      <tr
        v-for="publisher in publishers"
        :key="publisher._id"
        class="book-item"
      >
        <td>
          {{ publisher._id }}
        </td>
        <td>
          {{ publisher.name }}
        </td>
        <td class="text-center">
          <button
            type="button"
            class="col-2 me-1 btn btn-success btn-sm"
            data-bs-toggle="modal"
            data-bs-target="#createPublisherModal"
            @click="editPublisher(publisher)"
          >
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
          <button
            type="button"
            @click="deletePublisher(publisher._id)"
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

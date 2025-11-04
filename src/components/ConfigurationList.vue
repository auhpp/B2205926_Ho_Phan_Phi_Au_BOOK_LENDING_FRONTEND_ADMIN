<script>
export default {
  props: {
    configurations: { type: Array, default: [] },
  },
  emits: ["submit:configuration"],
  methods: {
    editCategory(configuration) {
      this.$emit("submit:configuration", configuration);
    },
  },
};
</script>
<template>
  <table class="table table-hover">
    <thead>
      <tr>
        <th class="col-3" scope="col">ID</th>
        <th scope="col">Tên cấu hình</th>
        <th scope="col">Giá trị</th>
        <th scope="col" class="text-center">Thao tác</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="configuration in configurations"
        :key="configuration._id"
        class="book-item"
      >
        <td>
          {{ configuration._id }}
        </td>
        <td>
          {{ configuration.description }}
        </td>
        <td>
          {{ configuration.value + " " + configuration.unit }}
        </td>
        <td class="text-center">
          <button
            type="button"
            class="col-3 me-1 btn btn-success btn-sm"
            data-bs-toggle="modal"
            data-bs-target="#createConfigurationModal"
            @click="editCategory(configuration)"
          >
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<style>

</style>

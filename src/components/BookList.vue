<script>
import { VND } from "@/utils/formatNumber";

export default {
  props: {
    books: { type: Array, default: [] },
  },
  data() {
    return {
      VND: VND,
    };
  },
  methods: {
    navigateToBookEdit(id) {
      this.$router.push({ name: "book-edit", params: { id: id } });
    },
  },
};
</script>
<template>
  <table class="table table-hover">
    <thead>
      <tr>
        <th class="col-3" scope="col">ID</th>
        <th scope="col">Tên sách</th>
        <th scope="col">Ảnh</th>
        <th scope="col">Giá</th>
        <!-- <th scope="col" class="text-center">Thao tác</th> -->
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="book in books"
        :key="book._id"
        @click="navigateToBookEdit(book._id)"
        class="book-item"
      >
        <td>
          {{ book._id }}
        </td>
        <td>
          {{ book.name }}
        </td>
        <td>
          <img :src="book.images[0]" width="40" height="40" />
        </td>
        <td>
          {{ VND.format(book.price) }}
          <sup>đ</sup>
        </td>
        <!-- <td class="text-center">
          <button type="button" class="col-2 me-1 btn btn-secondary btn-sm">
            <i class="fa-solid fa-bars"></i>
          </button>
          <button type="button" class="col-2 me-1 btn btn-success btn-sm">
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
          <button type="button" class="col-2 me-1 btn btn-danger btn-sm">
            <i class="fa-solid fa-trash"></i>
          </button>
        </td> -->
      </tr>
    </tbody>
  </table>
</template>
<style>
.book-item {
  cursor: pointer;
}
</style>

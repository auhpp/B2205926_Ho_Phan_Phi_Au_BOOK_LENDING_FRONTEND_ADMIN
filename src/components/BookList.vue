<script>
import { Status } from "@/utils/constant";
import { VND } from "@/utils/formatNumber";

export default {
  props: {
    books: { type: Array, default: [] },
  },
  data() {
    return {
      VND: VND,
      Status: Status,
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
  <table class="table table-hover table-display-data">
    <thead class="table-head">
      <tr>
        <th class="col-2" scope="col">Mã sách</th>
        <th scope="col">Tên sách</th>
        <th scope="col" class="text-center">Số lượng bản sao</th>
        <th scope="col" class="text-center">Số lượng sẵn dùng</th>
        <th scope="col">Ảnh</th>
        <th scope="col">Giá</th>
        <th scope="col" class="text-center">Trạng thái</th>
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
          {{ book.code }}
        </td>
        <td class="col-4">
          {{ book.name }}
        </td>
        <td class="text-center">
          {{ book.bookCopyCount }}
        </td>
        <td class="text-center">
          {{ book.availableCopyCount }}
        </td>
        <td>
          <img
            :src="book.images[0]"
            width="40"
            height="60"
            class="book-cover"
          />
        </td>
        <td>
          {{ VND.format(book.price) }}
          <sup>đ</sup>
        </td>
        <td class="text-center">
          <span
            :class="
              'badge text-bg-' +
              (book.active ? Status.ACTIVE.color : Status.IN_ACTIVE.color)
            "
          >
            {{ book.active ? Status.ACTIVE.desc : Status.IN_ACTIVE.desc }}
          </span>
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

<script>
import { Status } from "@/utils/constant";
import defaultAvatar from "./../assets/images/default_avatar.png";

export default {
  props: {
    readers: { type: Array, default: [] },
  },

  emits: ["update:reader"],
  data() {
    return {
      defaultAvatar,
      Status: Status,
    };
  },
  methods: {
    updateReader(active, reader) {
      reader.active = active;
      this.$emit("update:reader", reader);
    },
  },
};
</script>
<template>
  <table class="table table-hover table-display-data">
    <thead class="table-head">
      <tr>
        <th class="col-3" scope="col">ID</th>
        <th scope="col" class="col-1">Avatar</th>
        <th scope="col" class="col-6">Username</th>
        <th scope="col">Email</th>
        <th scope="col">SĐT</th>
        <th scope="col">Trạng thái</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="reader in readers" :key="reader._id" class="book-item">
        <td>
          {{ reader._id }}
        </td>
        <td>
          <img
            :src="
              reader.avatar != null && reader.avatar != ''
                ? reader.avatar
                : defaultAvatar
            "
            alt="mdo"
            width="32"
            height="32"
            class="rounded-circle me-2"
          />
        </td>
        <td>
          {{ reader.userName }}
        </td>
        <td>
          {{ reader.email }}
        </td>
        <td>
          {{ reader.phoneNumber }}
        </td>
        <td>
          <div class="dropdown">
            <button
              :class="
                'btn btn-sm dropdown-toggle btn-' +
                (reader.active ? Status.ACTIVE.color : Status.IN_ACTIVE.color)
              "
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {{ reader.active ? Status.ACTIVE.desc : Status.IN_ACTIVE.desc }}
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li>
                <div class="dropdown-item" @click="updateReader(true, reader)">
                  Hoạt động
                </div>
              </li>
              <li>
                <div class="dropdown-item" @click="updateReader(false, reader)">
                  Ngừng hoạt động
                </div>
              </li>
            </ul>
          </div>
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

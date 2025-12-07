<script>
import { Status } from "@/utils/constant";
import defaultAvatar from "./../assets/images/default_avatar.png";

export default {
  props: {
    staffs: { type: Array, default: [] },
  },
  emits: ["update:staff"],
  data() {
    return {
      Status: Status,
      defaultAvatar,
    };
  },
  methods: {
    updateStaff(active, staff) {
      staff.active = active;
      this.$emit("update:staff", staff);
    },
  },
};
</script>
<template>
  <table class="table table-hover table-display-data">
    <thead class="table-head">
      <tr>
        <th class="col-3" scope="col">MÃ NV</th>
        <th scope="col" class="col-6">Username</th>
        <th scope="col" class="col-1">Avatar</th>
        <th scope="col" class="col-6">SĐT</th>
        <th scope="col">Email</th>
        <th scope="col">Trạng thái</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="staff in staffs" :key="staff._id" class="book-item">
        <td>
          {{ staff.code }}
        </td>
        <td>
          {{ staff.userName }}
        </td>
        <td>
          <img
            :src="
              staff.avatar != null && staff.avatar != ''
                ? staff.avatar
                : defaultAvatar
            "
            alt="mdo"
            class="rounded-circle-avatar rounded-circle me-1"
          />
        </td>

        <td>
          {{ staff.phoneNumber }}
        </td>
        <td>
          {{ staff.email }}
        </td>
        <td>
          <div class="dropdown">
            <button
              :class="
                'btn btn-sm dropdown-toggle btn-' +
                (staff.active ? Status.ACTIVE.color : Status.IN_ACTIVE.color)
              "
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {{ staff.active ? Status.ACTIVE.desc : Status.IN_ACTIVE.desc }}
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li>
                <div class="dropdown-item" @click="updateStaff(true, staff)">
                  Hoạt động
                </div>
              </li>
              <li>
                <div class="dropdown-item" @click="updateStaff(false, staff)">
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

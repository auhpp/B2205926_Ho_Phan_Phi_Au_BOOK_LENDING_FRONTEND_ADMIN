<script>
import Pagination from "@/components/Pagination.vue";
import SearchInput from "@/components/SearchInput.vue";
import StaffAdd from "@/components/StaffAdd.vue";
import StaffList from "@/components/StaffList.vue";
import publisherService from "@/services/publisher.service";
import staffService from "@/services/staff.service";

export default {
  components: {
    SearchInput,
    StaffList,
    Pagination,
    StaffAdd,
  },

  data() {
    return {
      staffs: [],
      totalPages: 1,
      limit: 10,
      staffEdit: {},
    };
  },
  computed: {
    currentPage() {
      return parseInt(this.$route.query.page) || 1;
    },
    currentName() {
      return this.$route.query.userName || "";
    },
  },
  watch: {
    "$route.query": {
      handler: "retrieveStaff",
      immediate: true,
    },
  },
  methods: {
    async retrieveStaff() {
      try {
        const result = await staffService.findPagination({
          page: this.currentPage,
          limit: this.limit,
          userName: this.currentName.trim(),
        });
        this.staffs = result.result.data;
        this.totalPages = result.result.totalPages;
      } catch (error) {
        console.log(error);
      }
    },
    async createStaff(staff) {
      try {
        await staffService.create(staff);
        await this.retrieveStaff();
        if (staff._id) {
          alert("Nhân viên được cập nhật thành công.");
        } else {
          alert("Nhân viên được tạo thành công.");
        }
      } catch (error) {
        alert("Tên đăng nhập đã tồn tại!");
        console.log(error);
      }
    },
    handleSearch(queryText) {
      this.$router.push({
        query: {
          userName: queryText || undefined,
          page: 1,
        },
      });
    },
    openAddModal() {
      this.staffEdit = {};
    },
    handleChangePage(pageNum) {
      this.$router.push({
        query: {
          ...this.$route.query,
          page: pageNum,
        },
      });
    },
  },
};
</script>
<template>
  <div class="ps-4 pe-4">
    <div class="row">
      <div class="col-6">
        <SearchInput
          :initial-value="currentName"
          :placeholder="'UserName nhân viên ...'"
          @submit:query="handleSearch"
        />
      </div>
      <div class="col-6 text-end">
        <button
          data-bs-toggle="modal"
          data-bs-target="#createStaffModal"
          type="button"
          class="btn btn-primary"
          @click="openAddModal"
        >
          <i class="fa-solid fa-plus"></i>
          Thêm nhân viên
        </button>
        <StaffAdd @submit:staff="createStaff" :staff="staffEdit" />
      </div>
    </div>

    <div class="mt-2">
      <StaffList :staffs="staffs" @update:staff="createStaff" />
      <div class="d-flex justify-content-end mt-3">
        <Pagination
          :model-value="currentPage"
          :total-pages="totalPages"
          @update:model-value="handleChangePage"
        />
      </div>
    </div>
  </div>
</template>

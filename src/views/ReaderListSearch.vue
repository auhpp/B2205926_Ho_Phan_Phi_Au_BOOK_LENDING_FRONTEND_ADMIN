<script>
import Pagination from "@/components/Pagination.vue";
import ReaderList from "@/components/ReaderList.vue";
import SearchInput from "@/components/SearchInput.vue";
import StaffList from "@/components/StaffList.vue";
import readerService from "@/services/reader.service";
import { Status } from "@/utils/constant";

export default {
  components: {
    SearchInput,
    ReaderList,
    Pagination,
  },

  data() {
    return {
      readers: [],
      totalPages: 1,
      limit: 10,
      Status: Status,
    };
  },
  computed: {
    currentPage() {
      return parseInt(this.$route.query.page) || 1;
    },
    currentName() {
      return this.$route.query.userName || "";
    },
    currentStatusQuery() {
      return this.$route.query.status || Status.ALL.name;
    },
  },
  watch: {
    "$route.query": {
      handler: "retrieveReader",
      immediate: true,
    },
  },
  methods: {
    async retrieveReader() {
      try {
        const result = await readerService.findPagination({
          page: this.currentPage,
          limit: this.limit,
          userName: this.currentName.trim(),
          active:
            this.currentStatusQuery == Status.ALL.name
              ? null
              : Status[this.currentStatusQuery].value,
        });
        this.readers = result.result.data;
        this.totalPages = result.result.totalPages;
      } catch (error) {
        console.log(error);
      }
    },
    async updateStatus(reader) {
      try {
        await readerService.updateStatus(reader);
        await this.retrieveReader();
        if (staff._id) {
          alert("Đọc giả được cập nhật thành công.");
        }
      } catch (error) {
        console.log(error);
      }
    },
    handleSearch(queryText, status) {
      this.$router.push({
        query: {
          userName: queryText || this.currentName,
          status: status || this.currentStatusQuery,
          page: 1,
        },
      });
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
      <div class="col-4">
        <SearchInput
          :initial-value="currentName"
          :placeholder="'UserName nhân viên ...'"
          @submit:query="handleSearch"
        />
      </div>
      <div class="col-2 pt-1">
        <div class="dropdown">
          <button
            class="btn btn-secondary btn-sm dropdown-toggle"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {{ Status[currentStatusQuery].desc }}
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li>
              <div
                class="dropdown-item"
                v-for="(item, key) in Status"
                :key="key"
                @click="handleSearch(null, key)"
              >
                {{ item.desc }}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="mt-2">
      <ReaderList :readers="readers" @update:reader="updateStatus" />
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

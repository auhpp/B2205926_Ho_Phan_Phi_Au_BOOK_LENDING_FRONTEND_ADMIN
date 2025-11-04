<script setup>
import { computed } from "vue";

const props = defineProps({
  modelValue: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
  prevIcon: {
    type: String,
    default: "&laquo;",
  },
  nextIcon: {
    type: String,
    default: "&raquo;",
  },
});

const emit = defineEmits(["update:modelValue"]);

const isFirstPage = computed(() => props.modelValue === 1);
const isLastPage = computed(() => props.modelValue === props.totalPages);

const computedPages = computed(() => {
  const currentPage = props.modelValue;
  const totalPages = props.totalPages;
  const maxVisibleButtons = 7;

  if (totalPages <= maxVisibleButtons) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  let pages = [];

  if (currentPage <= 4) {
    pages = [1, 2, 3, 4, 5, "...", totalPages];
  } else if (currentPage >= totalPages - 3) {
    pages = [
      1,
      "...",
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  } else {
    pages = [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  }

  return pages;
});

function changePage(page) {
  if (typeof page === "string") {
    return;
  }

  if (page < 1 || page > props.totalPages) {
    return;
  }

  if (page !== props.modelValue) {
    emit("update:modelValue", page);
  }
}
</script>

<template>
  <nav v-if="totalPages >= 1" aria-label="Page navigation">
    <ul class="pagination">
      <li class="page-item" :class="{ disabled: isFirstPage }">
        <a
          class="page-link"
          href="#"
          aria-label="Previous"
          @click.prevent="changePage(modelValue - 1)"
        >
          <span aria-hidden="true" v-html="prevIcon"></span>
        </a>
      </li>

      <li
        v-for="(page, index) in computedPages"
        :key="index"
        class="page-item"
        :class="{
          active: page === modelValue,
          disabled: typeof page === 'string',
        }"
      >
        <span v-if="typeof page === 'string'" class="page-link">{{
          page
        }}</span>
        <a v-else class="page-link" href="#" @click.prevent="changePage(page)">
          {{ page }}
        </a>
      </li>

      <li class="page-item" :class="{ disabled: isLastPage }">
        <a
          class="page-link"
          href="#"
          aria-label="Next"
          @click.prevent="changePage(modelValue + 1)"
        >
          <span aria-hidden="true" v-html="nextIcon"></span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.page-link {
  cursor: pointer;
}
.page-item.disabled .page-link {
  cursor: not-allowed;
}
</style>

<script>
export default {
  emits: ["submit:query"],
  props: {
    initialValue: { type: String, default: "" },
    placeholder: { type: String, default: "" },
  },
  data() {
    return {
      query: this.initialValue,
    };
  },
  watch: {
    initialValue(newVal) {
      this.query = newVal;
    },
  },
  methods: {
    search() {
      this.$emit("submit:query", this.query);
    },
  },
};
</script>

<template>
  <div class="input-group mb-3">
    <input
      type="text"
      class="form-control border-input"
      :placeholder="placeholder"
      aria-label="Recipient’s username"
      aria-describedby="button-addon2"
      name="query"
      v-model="query"
    />
    <button
      @click="search"
      class="btn btn-outline-secondary search-btn"
      type="button"
      id="button-addon2"
    >
      <i class="fa-solid fa-magnifying-glass"></i>
    </button>
  </div>
</template>

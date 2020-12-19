<template>
  <div class="sort-menu">
    <button
      v-for="sortOption in availableSorts"
      :key="sortOption.value"
      :class="[
        'sort-option',
        sortOption.value === activeSort ? '-selected' : '-unselected'
      ]"
      @click="stagedSort = sortOption.value"
      @keydown.enter="stagedSort = sortOption.value"
      tabindex="0"
      type="button"
      :aria-label="`Apply sort, ${sortOption.label}`"
    >
      {{ sortOption.label }}
    </button>

    <div>
      <button
        type="button"
        aria-label=""
        tabindex=""
        @click="applySort('')"
        @keydown.enter="applySort('')"
      >Reset</button>
      <button
        type="button"
        aria-label=""
        tabindex=""
        @click="applySort(activeSort)"
        @keydown.enter="applySort(activeSort)"
      >Apply</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    availableSorts: {
      type: Array,
      required: true
    },
    currentSort: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      stagedSort: ''
    }
  },

  computed: {
    activeSort() {
      return this.stagedSort ? this.stagedSort : this.currentSort
    }
  },

  methods: {
    applySort(newSort) {
      this.stagedSort = ''
      this.$emit('updateSort', newSort)
    }
  }
}
</script>

<style scoped>
.sort-menu {
  display: flex;
  flex-direction: column;
}

button {
  text-align: left;
}

.sort-option:before {
  content: '';
  position: absolute;
  width: 6px;
  height: 6px;
  transform: translate(-10px, 5px);
  border-radius: 50%;
}

.-unselected:before {
  background-color: white;
}

.-selected:before {
  background-color: black;
}
</style>

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
    >
      {{ sortOption.label }}
    </button>

    <div>
      <button @click="applySort('')">Reset</button>
      <button @click="applySort(activeSort)">Apply</button>
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

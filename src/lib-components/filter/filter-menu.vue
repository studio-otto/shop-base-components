<template>
  <div>
    <div class="filter-menu flex">
      <div v-for="filterType in availableFilters" :key="filterType">
        <h4>{{ filterType }}</h4>
        <div>
          <div
            v-for="filter in filterOptions(filterType)"
            :key="filter"
            :class="[
              'filter-option',
              stagedFilters[filterType].includes(filter)
                ? '-selected'
                : '-unselected'
            ]"
            @click="$emit('selectStagedNewFilter', filterType, filter)"
          >
            {{ filter }}
          </div>
        </div>
      </div>
    </div>
    <div>
      <button @click="$emit('updateCurrentFilters', 'reset')">Clear</button>
      <button @click="$emit('updateCurrentFilters')">Apply</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    products: {
      type: Array,
      default: () => {
        return []
      }
    },

    availableFilters: {
      type: Array,
      default: () => {
        return ['type', 'size', 'price']
      }
    },

    stagedFilters: {
      type: Object,
      required: true
    },

    currentFilters: {
      type: Object,
      required: true
    }
  },

  computed: {
    colorOptions() {
      if (!this.availableFilters.includes('color')) return

      return this.uniqNonNullAndFlat(
        // Maping the colors selected for each product, which will be an array of arrays (e.g. [['green', 'blue'], ['red'] ])
        this.products.map((product) => {
          return product.metafields.pdp_swatch_match_colors
            ? product.metafields.pdp_swatch_match_colors.split(',')
            : 'null'
        })
      )
    },

    priceOptions() {
      return ['$0 - $100', '$100 - $200', '$200 - $300', '$300+']
    },

    typeOptions() {
      if (!this.availableFilters.includes('type')) return

      return this.uniqNonNullAndFlat(
        this.products.map((product) => {
          return product.productType
        })
      )
    },

    sizeOptions() {
      if (!this.availableFilters.includes('size')) return
      return this.uniqNonNullAndFlat(
        this.products.map((product) => {
          return [].concat(
            product.variants.map((variant) => variant.selectedOptions[1].value)
          )
        })
      )
    },

    allActiveFilters() {
      return this.availableFilters.reduce((activeFilters, filterType) => {
        activeFilters[filterType] = [
          ...this.currentFilters[filterType],
          ...this.stagedFilters[filterType]
        ]
        return activeFilters
      }, {})
    }
  },

  methods: {
    uniqNonNullAndFlat(arr) {
      return [].concat(...arr).filter((value, index, ar) => {
        return value !== 'null' && ar.indexOf(value) === index
      })
    },

    filterOptions(type) {
      return this[`${type}Options`]
    }
  }
}
</script>

<style scoped>
.mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.2);
}

.-hidden {
  visibility: hidden;
  pointer-events: none;
}

.-showing {
  visibility: visible;
  pointer-events: all;
}

.-selected {
  font-weight: bold;
}
</style>

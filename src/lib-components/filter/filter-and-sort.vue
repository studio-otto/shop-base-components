<template>
  <div class="filter-and-sort">
    <div>
      <div
        :class="[
          'filter',
          selectedMenu === 'filter' ? '-selected' : '-not-selected'
        ]"
      >
        <button @click="selectedMenu = 'filter'">
          Filter
        </button>
        <div
          :class="['menu', selectedMenu === 'filter' ? '-showing' : '-hidden']"
        >
          <FilterMenu
            :available-filters="availableFilters"
            :current-filters="currentFilters"
            :staged-filters="stagedFilters"
            :products="products"
            @selectStagedNewFilter="selectStagedNewFilter"
            @updateCurrentFilters="updateCurrentFilters"
          />
        </div>
      </div>
      <div class="selected-filters-and-sorts">
        <div v-for="filterType in availableFilters" :key="filterType">
          <div
            v-for="filter in currentFilters[filterType]"
            :key="filter"
            @click="removeFilter(filterType, filter)"
          >
            <span>{{ filter }}</span> X
          </div>
        </div>

        <div v-if="currentSort" @click="currentSort = ''">
          <span>{{ currentSort }}</span> x
        </div>
      </div>
      <div
        :class="[
          'sort',
          showingSort ? '-showing' : '-hidden',
          selectedMenu === 'sort' ? '-selected' : '-not-selected'
        ]"
      >
        <button @click="selectedMenu = 'sort'">
          Sort
        </button>
        <div
          :class="['menu', selectedMenu === 'sort' ? '-showing' : '-hidden']"
        >
          <SortMenu
            :available-sorts="availableSorts"
            :current-sort="currentSort"
            @updateSort="updateSort"
          />
        </div>
      </div>

      <div
        :class="['mask', selectedMenu ? '-showing' : '-hidden']"
        @click="selectedMenu = ''"
      ></div>
    </div>

    <div>
      <slot :filteredProducts="filteredAndSortedProducts"></slot>
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

    availableSorts: {
      type: Array,
      default: () => {
        return [
          { label: 'Popular', value: 'manual' },
          { label: 'Price High to Low', value: 'price-high-to-low' },
          { label: 'Price Low to High', value: 'price-low-to-high' }
        ]
      }
    },

    availableFilters: {
      type: Array,
      default: () => {
        return ['type', 'size', 'price']
      }
    },

    defaultSort: {
      type: String,
      default: ''
    },

    showingSort: {
      type: Boolean,
      default: true
    },

    showingFilter: {
      type: Boolean,
      default: false
    }
  },

  data() {
    const filters = this.clearedFilterObj()
    return {
      currentFilters: { ...filters },
      stagedFilters: { ...filters },
      currentSort: this.defaultSort,
      selectedMenu: ''
    }
  },

  computed: {
    filteredAndSortedProducts() {
      return this.filteredProducts
        ? this.filteredProducts.slice().sort(this.sortDefinition)
        : []
    },

    hasFilters() {
      return (
        this.currentFilters && [].concat(...Object.values(this.currentFilters))
      )
    },

    filteredProducts() {
      const filtered = this.hasFilters
        ? this.products.filter(this.filterDefinition)
        : this.products
      return filtered.sort(this.sortDefinition)
    },

    sortDefinition() {
      switch (this.currentSort) {
        case 'price-high-to-low':
          return this.sortPriceHighToLow
        case 'price-low-to-high':
          return this.sortPriceLowToHigh
        default:
          return this.sortByManual
      }
    }
  },

  methods: {
    // Filtering definition Logic
    filterDefinition(product) {
      return this.availableFilters.every((filterType) => {
        switch (filterType) {
          case 'color':
            return (
              !this.currentFilters.color.length ||
              this.colorFilterDefinition(product)
            )
          case 'type':
            return (
              !this.currentFilters.type.length ||
              this.currentFilters.type.includes(product.productType)
            )
          case 'size':
            return (
              !this.currentFilters.size.length ||
              this.sizeFilterDefinition(product)
            )
          case 'price':
            return (
              !this.currentFilters.price.length ||
              this.priceFilterDefinition(product)
            )
        }
      })
    },

    colorFilterDefinition(product) {
      return (
        product.metafields.pdp_swatch_match_colors &&
        product.metafields.pdp_swatch_match_colors
          .split(',')
          .some((color) => this.currentFilters.color.includes(color))
      )
    },

    sizeFilterDefinition(product) {
      return product.variants.some((variant) => {
        return (
          variant.available &&
          this.currentFilters.size.includes(variant.selectedOptions[1].value)
        )
      })
    },

    priceFilterDefinition(product) {
      const price = parseFloat(product.variants[0].price)
      return this.currentFilters.price.some((priceRange) => {
        switch (priceRange) {
          case '$0 - $100':
            return price > 0 && price <= 100
          case '$100 - $200':
            return price >= 100 && price <= 200
          case '$200 - $300':
            return price >= 200 && price <= 300
          case '$300+':
            return price >= 300
        }
      })
    },

    // Sorting definition Logic
    sortPriceHighToLow(p1, p2) {
      return parseFloat(p2.variants[0].price) - parseFloat(p1.variants[0].price)
    },

    sortPriceLowToHigh(p1, p2) {
      return parseFloat(p1.variants[0].price) - parseFloat(p2.variants[0].price)
    },

    sortByManual(p1, p2) {
      return p1.manualSortWeight - p2.manualSortWeight
    },

    // State update methods
    updateSort(newSort) {
      this.currentSort = newSort
      this.selectedMenu = ''
    },

    selectStagedNewFilter(type, value) {
      const isRemove = this.stagedFilters[type].includes(value)
      this.stagedFilters[type] = isRemove
        ? this.stagedFilters[type].filter((filter) => filter !== value)
        : [...this.stagedFilters[type], value]
    },

    removeFilter(type, value) {
      this.selectStagedNewFilter(type, value)
      this.updateCurrentFilters()
    },

    updateCurrentFilters(isReset) {
      this.selectedMenu = ''

      if (isReset) {
        this.stagedFilters = this.clearedFilterObj()
      }

      this.currentFilters = { ...this.stagedFilters }
    },

    clearedFilterObj() {
      return this.availableFilters.reduce((filters, category) => {
        filters[category] = []
        return filters
      }, {})
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

.menu {
  position: absolute;
  z-index: 15;
  background-color: white;
  padding: 15px;
}

.-hidden {
  visibility: hidden;
  pointer-events: none;
}

.-showing {
  visibility: visible;
  pointer-events: all;
}
</style>

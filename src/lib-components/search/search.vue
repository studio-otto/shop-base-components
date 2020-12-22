<template>
  <div class="search mt-10">
    <div class="search__input-wrap relative">
      <label for="search-input" class="sr-only">Search</label>
      <input
        ref="search-input"
        id="search-input"
        v-model="search"
        :placeholder="placeholderText"
        type="text"
        :aria-label="placeholderText"
        tabindex="0"
        class="search-input wide bg-transparent border-b-2 border-solid border-white w-full outline-none"
        @input="onChange"
      />

      <div
        @click="search = ''"
        @keydown.enter="search = ''"
        aria-label="Reset search"
        tabindex="0"
      >
        Reset
      </div>
    </div>

    <div v-if="showingProducts && !isSearching" class="search-results mt-10 pb-8">
      <transition-group
        name="list"
        mode="out-in"
        tag="div"
        class="flex flex-wrap"
      >
        <slot :products="products">
          <div
            v-for="(product, index) in products"
            :key="'search-product-' + index"
            :class="[
              !product.image ? 'hidden' : '',
              'search-result w-1/2 lg:w-1/3'
            ]"
          >
            <SearchProductCard
              v-if="product.available || product.tags.includes('restocking')"
              :product="product"
              :index="index"
            />
          </div>
        </slot>
      </transition-group>
    </div>
    <div v-if="showingProducts && products.length === 0 && !isSearchinig">
      0 results
    </div>
    <div v-if="showingProducts && isSearching" class="search__searching"></div>
  </div>
</template>

<script>
import axios from 'axios'
import { throttle } from 'lodash'
import SearchProductCard from './search-product-card.vue'

export default {
  name: 'Search',
  components: {
    SearchProductCard
  },
  props: {
    domain: {
      type: String,
      required: false,
      default: ''
    },
    placeholderText: {
      type: String,
      required: false,
      default: ""
    },
    resetSearch: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      search: '',
      isSearching: false,
      results: [],
      products: []
    }
  },
  watch: {
    resetSearch: function(newVal) {
      if (newVal) {
        this.search = ''
      }
    }
  },
  computed: {
    showingProducts() {
      return !!this.search
    }
  },
  mounted() {
    this.$refs['search-input'].focus()
  },
  methods: {
    onChange() {
      this.sendQuery()
    },

    checkLocalhostAndWarn() {
      if (
        window.location.host.includes('localhost') &&
        !this.domain.includes('cors-anywhere')
      ) {
        
      }
    },

    sendQuery: throttle(function () {
      this.checkLocalhostAndWarn()
      this.isSearching = true
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Access-Control-Allow-Origin': '*'
        },
        url: `${this.domain}/search/suggest.json?q=${this.search}&resources[type]=product&options[fields]=title,product_type,variants.title`
      }

      axios(options)
        .then((response) => {
          this.products = response.data.resources.results.products
          this.isSearching = false
        })
        .catch((e) => {
          console.log(e)
        })
    }, 200)
  }
}
</script>

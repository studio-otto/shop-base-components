<template>
  <div class="search mt-10">
    <input
      ref="search-input"
      v-model="search"
      type="text"
      class="search-input wide bg-transparent border-b-2 border-solid border-white w-full outline-none"
      @input="onChange"
    />

    <div v-if="showingProducts" class="search-results mt-10 pb-8">
      <transition-group
        name="list"
        mode="out-in"
        tag="div"
        class="flex flex-wrap"
      >
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
      </transition-group>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { throttle } from 'lodash'
// import SearchProductCard from './SearchProductCard'

export default {
  name: 'Search',
  props: {
    domain: {
      type: String,
      required: false,
      default: ''
    }
  },
  data() {
    return {
      search: '',
      results: [],
      products: []
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
        console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
        console.log(
          "Looks like you're on localhost! Search requires a proxy to not get rejected."
        )
        console.log(
          'Try something like :domain=https://cors-anywhere.herokuapp.com/https://miaouxx.myshopify.com'
        )
        console.log('but dont forget to remove for production.')
        console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
      }
    },

    sendQuery: throttle(function () {
      this.checkLocalhostAndWarn()
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Access-Control-Allow-Origin': '*'
        },
        url: `${this.domain}/search/suggest.json?q=${this.search}&resources[type]=product&options[unavailable_products]=last`
      }

      axios(options)
        .then((response) => {
          this.products = response.data.resources.results.products
        })
        .catch((e) => {
          console.log(e)
        })
    }, 200)
  }
}
</script>
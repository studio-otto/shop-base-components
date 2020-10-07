<template>
  <div class="search-product p-3 lg:p-8">
    <router-link :to="product.url" tabindex="0" :aria-label="product.title">
      <div class="search-product__image relative">
        <img
          :key="product.id + '--' + index"
          :data-src="product.image + '&width=300'"
          class="lazy w-full h-full absolute top-0 object-cover"
        />
      </div>
      <div
        :key="product.id + '--info-' + index"
        class="mt-1 text-sm md:text-base"
      >
        <div class="uppercase">{{ product.title }}</div>
        <div v-if="product.available" class="flex">
          <span
            v-if="product.compare_at_price_min !== '0.00'"
            class="sale-price opacity-50 mr-1"
          >
            <span class="money">
              {{ stripPriceZeros(product.compare_at_price_min) }}
            </span>
          </span>
          <span class="money">{{ stripPriceZeros(product.price) }}</span>
        </div>
        <div v-else class="uppercase opacity-25">Sold Out</div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'SearchProductCard',
  props: {
    product: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      requred: true,
      default: 0
    }
  },
  methods: {
    stripPriceZeros(price) {
      return `$${price.replace('.00', '')}`
    }
  }
}
</script>

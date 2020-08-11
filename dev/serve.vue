<script>
import Vue from 'vue'
import 'lazysizes'
import { AnnouncementBar, CartTray, CollectionProductCard } from '@/entry'

export default Vue.extend({
  name: 'ServeDev',
  components: {
    AnnouncementBar,
    CartTray,
    CollectionProductCard
  },
  data() {
    return {
      cartOpen: false
    }
  },
  methods: {
    toggleCart() {
      this.cartOpen = !this.cartOpen
    }
  }
})
</script>

<template>
  <div id="app">
    <button @click="toggleCart">Toggle cart tray</button>
    <cart-tray :open="cartOpen" side="left" @onClose="toggleCart" />
    <announcement-bar
      backgroundColor="#220e89"
      :slides="[
        { url: `https://google.com`, text: 'Hello world' },
        { url: `https://apple.com`, text: 'Lorem ipsum dolor sit amet' }
      ]"
      textColor="#FFF"
    />
    <collection-product-card
      :price="79.99"
      :title="'Test Product'"
      :compareAtPrice="49.99"
      :images="[
        {
          id: 12313,
          product_id: 21313,
          position: 1,
          src:
            'https://cdn.shopify.com/s/files/1/1231/1148/products/HM.jpg?v=1575652110',
          width: 1535,
          height: 2291
        },
        {
          id: 12313,
          product_id: 21313,
          position: 1,
          src:
            'https://cdn.shopify.com/s/files/1/1231/1148/products/Miaou-Brown-Leopard-Lex-Jacket-Junior-Jeans-BFCM-1_fa7d4f2d-3823-4d4a-bf2a-a23f2e3bad60.jpg?v=1582062817',
          width: 1535,
          height: 2291
        }
      ]"
    />
  </div>
</template>

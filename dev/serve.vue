<script>
import Vue from 'vue'
import 'lazysizes'
import {
  AnnouncementBar,
  CartTray,
  CollectionProductCard,
  Modal,
  CookieConsent
} from '@/entry'

export default Vue.extend({
  name: 'ServeDev',
  components: {
    AnnouncementBar,
    CartTray,
    CollectionProductCard,
    Modal,
    CookieConsent
  },
  data() {
    return {
      cartOpen: false,
      modalOpen: false
    }
  },
  methods: {
    toggleCart() {
      this.cartOpen = !this.cartOpen
    },
    toggleModal() {
      this.modalOpen = !this.modalOpen
    }
  }
})
</script>

<template>
  <div id="app">
    <button @click="toggleCart">Toggle cart tray</button>
    <button @click="toggleModal">Toggle modal</button>
    <cart-tray :open="cartOpen" side="left" @onClose="toggleCart" />
    <modal :open="modalOpen" @close="modalOpen = false" title="Lorem Ipsum">
      <p>
        Sed in leo finibus, ultrices risus sed, auctor ante. Fusce diam ex,
        eleifend nec orci in, convallis lobortis ligula. Suspendisse eget
        euismod turpis
      </p>
    </modal>
    <cookie-consent />
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

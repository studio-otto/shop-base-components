<script>
import Vue from 'vue'
import { AnnouncementBar, CartTray } from '@/entry'

export default Vue.extend({
  name: 'ServeDev',
  components: {
    AnnouncementBar,
    CartTray
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
  </div>
</template>

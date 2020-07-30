<script>
import Vue from 'vue'
import { AnnouncementBar, CartTray } from '@/entry'

export default Vue.extend({
  name: 'ServeDev',
  components: {
    AnnouncementBar,
    CartTray
  }
})
</script>

<template>
  <div id="app">
    <cart-tray :trayOpen="true" />
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

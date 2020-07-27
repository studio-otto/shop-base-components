<script>
import Vue from 'vue'
import { ShopBaseComponentsSample } from '@/entry'
import { AnnouncementBar } from '@/entry'

export default Vue.extend({
  name: 'ServeDev',
  components: {
    ShopBaseComponentsSample,
    AnnouncementBar
  }
})
</script>

<template>
  <div id="app">
    <shop-base-components-sample />
    <announcement-bar
      :enabled="true"
      backgroundColor="#220e89"
      :slides="[{ url: `https://google.com`, text: 'Hello world' }]"
      textColor="#FFF"
    />
  </div>
</template>

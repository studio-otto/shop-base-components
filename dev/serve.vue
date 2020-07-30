<script>
import Vue from 'vue'
import { AnnouncementBar } from '@/entry'

export default Vue.extend({
  name: 'ServeDev',
  components: {
    AnnouncementBar
  }
})
</script>

<template>
  <div id="app">
    <announcement-bar
      :enabled="true"
      backgroundColor="#220e89"
      :slides="[
        { url: `https://google.com`, text: 'Hello world' },
        { text: 'Lorem ipsum dolor sit amet' }
      ]"
      textColor="#FFF"
    />
  </div>
</template>

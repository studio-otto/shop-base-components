<script>
import Vue from 'vue';
import { ShopBaseComponentsSample } from '@/entry';

export default Vue.extend({
  name: 'ServeDev',
  components: {
    ShopBaseComponentsSample,
  }
});
</script>

<template>
  <div id="app">
    <shop-base-components-sample />
  </div>
</template>

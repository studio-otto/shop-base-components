<template>
  <div class="loading-product-card"></div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'LoadingProductCard',
  props: {
    handle: {
      type: String,
      required: true
    }
  },
  mounted() {
    this.computeIsInView()
    const watched = () => this.$store.state.scrollY + this.$store.state.winWidth
    this.stopWatching = this.$watch(watched, this.computeIsInView)
  },
  data() {
    return {
      stopWatching: null,
      finishedWatching: false,
      isIn: false,
      margin: 100 // pixel value for how far off screen we consider to be "in view" aka start loading
    }
  },
  computed: {
    inPort() {
      return this.$store.state.scrollY && this.$store.state.winWidth
    }
  },
  methods: {
    ...mapActions('products', ['getProduct']),
    computeIsInView() {
      if (this.finishedWatching) return this.removeWatchers()

      if (this.inView()) {
        this.getProduct(this.handle)
        this.removeWatchers()
      }
    },

    removeWatchers() {
      if (this.stopWatching) {
        this.stopWatching()
      }
      this.finishedWatching = true
    },

    inView() {
      const element = this.$el
      const rect = element.getBoundingClientRect()
      const elementHeight = rect.height
      const elementTop = rect.top
      const elementBottom = elementTop + elementHeight

      return (
        elementTop <= window.innerHeight + this.margin &&
        elementBottom >= -this.margin
      )
    }
  }
}
</script>

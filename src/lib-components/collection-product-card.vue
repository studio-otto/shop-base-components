<template lang="">
  <div class="cpc" data-testid="cpc">
    <div
      class="cpc__image"
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
    >
      <transition name="fade">
        <LazyImage
          v-if="!isHovered"
          :alt-text="`${product.title} image`"
          :lazy-src-set="displayImage"
        />
        <vue-glide v-else :perView="1" :startAt="1">
          <vue-glide-slide
            v-for="(image, index) in product.images"
            :key="index"
          >
            <LazyImage
              v-if="!isHovered"
              :alt-text="`${product.title} image`"
              :lazy-src-set="displayImage"
            />
          </vue-glide-slide>
        </vue-glide>
      </transition>
    </div>
    <div class="cpc__details">
      <div class="cpc__details-title">
        {{ product.title }}
      </div>
      <div class="cpc__details-price">
        <span v-if="isSaleItem" class="cpc__details-sale-price">
          ${{ noZeros(product.compareAtPrice) }}
        </span>
        <span class="cpc__details-price">
          ${{ noZeros(product.price ? product.price : product.variants[0].price)
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="">
import LazyImage from './lazy-image.vue'
import { Glide, GlideSlide } from 'vue-glide-js'
// May need to remove this to make fade transition?
import 'vue-glide-js/dist/vue-glide.css'

export default {
  name: `CollectionProductCard`,
  components: {
    LazyImage,
    [Glide.name]: Glide,
    [GlideSlide.name]: GlideSlide
  },
  data() {
    return {
      isHovered: false
    }
  },
  props: {
    product: {
      type: Object,
      default: () => {
        return {}
      }
    },
    isUsingFeatured: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    featuredImage: {
      type: Object,
      default: () => {
        return null
      }
    }
  },
  computed: {
    isSaleItem() {
      return this.product.compareAtPrice
        ? this.product.compareAtPrice < this.product.price
        : this.product.variants[0].compareAtPrice &&
            this.product.variants[0].compareAtPrice <
              this.product.variants[0].price
    },
    displayImage() {
      if (this.featuredImage && this.isUsingFeatured) {
        return this.featuredImage
      } else {
        return this.isUsingStorefront
          ? this.product.images
            ? this.product.images[0]
            : ''
          : this.product.images && this.product.images[0]
          ? this.product.images[0].src
          : ''
      }
    }    
  },
  methods: {
    toggleHover() {
      this.isHovered = !this.isHovered
    },

    noZeros(number) {
      return Number(number.toFixed(0))
    }
  }
}
</script>

<style lang="scss">
.cpc {
  ul {
    margin: 0;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
  position: absolute;
}
</style>

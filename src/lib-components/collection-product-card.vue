<template lang="">
  <div class="cpc" data-testid="cpc">
    <div
      class="cpc__image"
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
    >
      <transition name="fade">
        <responsive-image
          v-if="!isHovered"
          :lazySrcSet="displayImage"
          :altText="`${title} image`"
          :isFeatured="!!isUsingFeatured"
        />
        <vue-glide v-else :perView="1" :startAt="1">
          <vue-glide-slide
            v-for="(image, index) in product.images"
            :key="index"
          >
            <responsive-image
              :lazySrcSet="image.src"
              :altText="`${title} image`"
              :isFeatured="!!isUsingFeatured"
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
          ${{ product.compareAtPrice }}
        </span>
        <span class="cpc__details-price">
          ${{ product.price ? product.price : product.variants[0].price }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="">
import ResponsiveImage from './responsive-image.vue'
import { Glide, GlideSlide } from 'vue-glide-js'
// May need to remove this to make fade transition?
import 'vue-glide-js/dist/vue-glide.css'

export default {
  name: `CollectionProductCard`,
  components: {
    ResponsiveImage,
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
          : this.product.images
          ? this.product.images[0].src
          : ''
      }
    }
  },
  methods: {
    toggleHover() {
      this.isHovered = !this.isHovered
    }
  }
  // data () { return {} },
  // props: [],
  // propsData: {},
  // computed: {},
  // methods: {},
  // watch: {},
  // Options / DOM
  // el () {},
  // template: '',
  // render () {},
  // Options / Lifecycle Hooks
  // beforeCreate () {},
  // created () {},
  // beforeMount () {},
  // mounted () {},
  // beforeUpdate () {},
  // updated () {},
  // activated () {},
  // deactivated () {},
  // beforeDestroy () {},
  // destroyed () {},
  // Options / Assets
  // directives: {},
  // filters: {},
  // components: {},
  // Options / Misc
  // parent: null,
  // mixins: [],
  // name: '',
  // extends: {},
  // delimiters: [ '{{', '}}' ],
  // functional: false
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

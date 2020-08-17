<template lang="">
  <div class="cpc" data-testid="cpc">
    <div class="cpc__image">
      <responsive-image
        v-if="images.length > 0"
        :lazySrcSet="displayImage"
        :altText="title + 'image'"
        :isFeatured="!!isUsingFeatured"
      />
    </div>
    <div class="cpc__details">
      <div class="cpc__details-title">
        {{ title }}
      </div>
      <div class="cpc__details-price">
        <span v-if="isSaleItem" class="cpc__details-sale-price">
          ${{ compareAtPrice }}
        </span>
        <span class="cpc__details-sale-price"> ${{ price }} </span>
      </div>
    </div>
  </div>
</template>

<script lang="">
import ResponsiveImage from './responsive-image.vue'

export default {
  name: `CollectionProductCard`,
  components: {
    ResponsiveImage
  },
  data() {
    return {
      isHovered: false
    }
  },
  props: {
    title: {
      type: String,
      default: () => {
        return ``
      }
    },
    price: {
      type: Number,
      default: () => {
        return 0
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
    },
    compareAtPrice: {
      type: Number,
      default: () => {
        return null
      }
    },
    images: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  computed: {
    isSaleItem() {
      return this.compareAtPrice && this.compareAtPrice < this.price
    },
    displayImage() {
      if (this.featuredImage && this.isUsingFeatured) {
        return this.featuredImage
      } else {
        return this.isUsingStorefront
          ? this.images
            ? this.images[0]
            : ''
          : this.images
          ? this.images[0].src
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

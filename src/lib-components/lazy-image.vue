<template>
  <img
    :key="Math.random()"
    v-lazy
    class="image lazy"
    data-sizes="auto"
    :src="lowRes"
    :data-srcset="urlString"
    :alt="altText"
    width="600"
    height="300"
    :style="{ backgroundColor: backgroundColor }"
  />
</template>

<script>
export default {
  props: {
    backgroundColor: {
      type: String,
      default: '#efefef'
    },
    isFeatured: {
      type: Boolean,
      default: false
    },
    lazySrcSet: {
      type: String,
      default: null
    },
    altText: {
      type: String,
      default: 'Image'
    },
    widthSizes: {
      type: Array,
      default: () => {
        return [180, 360, 540, 720, 900, 1080, 1200, 1800]
      }
    }
  },
  data() {
    return {
      alt: '',
      aspectRatio: '',
      dimensions: {},
      size: {}
    }
  },

  computed: {
    lowRes() {
      return this.lazySrcSet.includes('cdn.shopify')
        ? this.lazySrcSet.replace(/.png|.jpeg|.jpg/, '_20x.jpg')
        : `${this.lazySrcSet}&width=30`
    },

    urlString() {
      return this.lazySrcSet.includes('cdn.shopify')
        ? this.widthSizes
            // SHOPIFY IMAGES
            .map((size) => {
              if (this.isFeatured) {
                return `${
                  this.lazySrcSet
                    ? this.lazySrcSet.replace('original', 'lrg')
                    : ''
                }?quality=80&progressive=true&width=${size} ${size}w`
              } else {
                return `${
                  this.lazySrcSet
                    ? this.lazySrcSet.replace(
                        /.png|.jpeg|.jpg/,
                        `_${size}x.jpg`
                      )
                    : ''
                } ${size}w`
              }
            })
            .join(',')
        : this.widthSizes
            // PRISMIC IMAGES
            .map((size) => {
              return `${
                this.lazySrcSet ? `${this.lazySrcSet}&width=${size}` : ''
              } ${size}w`
            })
            .join(',')
    }
  }
}
</script>

<style lang="scss">
.image {
  display: block;
  width: 100%;
}
</style>

<template>
  <img
    data-testid="laze-image"
    data-src="image3.jpg"
    v-lazy-src="lazySrc"
    data-sizes="auto"
    :alt="altText"
    class="lazy"
    :class="classNames"
    :key="Math.random()"
  />
  <!-- </div> -->
</template>

<script>
export default {
  name: 'LazyImage',
  props: {
    classNames: {
      type: String,
      default: ''
    },
    backgroundColor: {
      type: String,
      default: '#efefef'
    },
    height: {
      type: Number,
      default: null
    },
    lazySrcSet: {
      type: String,
      default: null
    },
    width: {
      type: Number,
      default: null
    },
    isFeatured: {
      type: Boolean,
      default: false
    },
    altText: {
      type: String,
      default: 'Image'
    }
  },

  data() {
    return {
      widthSizes: [180, 360, 540, 720, 900, 1080, 1200, 1800]
    }
  },

  computed: {
    lazySrc() {
      return this.lazySrcSet.includes('cdn.shopify')
        ? this.widthSizes
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
        : // TODO: handle non-shopify images srcset
          this.lazySrcSet
    },

    aspectRatio() {
      // Calculate the aspect ratio of the image
      // if the width and the height are given.
      if (!this.width || !this.height) return null
      return (this.height / this.width) * 100
    },

    style() {
      // The background color is used as a
      // placeholder while loading the image.
      // You can use the dominant color of the
      // image to improve perceived performance.
      // See: https://manu.ninja/dominant-colors-for-lazy-loading-images/
      const style = { backgroundColor: this.backgroundColor }

      if (this.width) style.width = `${this.width}px`

      // If the image is still loading and an
      // aspect ratio could be calculated, we
      // apply the calculated aspect ratio by
      // using padding top.
      const applyAspectRatio = this.loading && this.aspectRatio
      if (applyAspectRatio) {
        // Prevent flash of unstyled image
        // after the image is loaded.
        style.height = 0
        // Scale the image container according
        // to the aspect ratio.
        style.paddingTop = `${this.aspectRatio}%`
      }

      return style
    }
  }
}
</script>

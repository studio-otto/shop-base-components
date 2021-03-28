<template>
  <img
    :key="Math.random()"
    v-lazy
    class="image lazy"
    data-sizes="auto"
    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII="
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
    maxWidth: {
      type: String,
      default: '1805'
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
    fileExt() {
      const ext = this.getExtension(this.lazySrcSet)
      return ext
    },

    maxWidthArray() {
      return this.widthSizes.filter((s) => {
        return s < maxWidth
      })
    },

    urlString() {
      return this.lazySrcSet.includes('cdn.shopify')
        ? this.maxWidthArray
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
                        `_${size}x.${this.fileExt}`
                      )
                    : ''
                } ${size}w`
              }
            })
            .join(',')
        : this.maxWidthArray
            // PRISMIC IMAGES
            .map((size) => {
              return `${
                this.lazySrcSet ? `${this.lazySrcSet}&width=${size}` : ''
              } ${size}w`
            })
            .join(',')
    }
  },
  methods: {
    getExtension(filename) {
      const parts = filename.split('.')
      return parts[parts.length - 1].split('?')[0]
    }
  }
}
</script>

<style>
.image {
  display: block;
  width: 100%;
}
</style>

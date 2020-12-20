<template>
  <div class="cpc" data-testid="cpc">
    <div v-if="product && product.isLoaded">
      <div
        :class="[
          'cpc__image',
          isHovered ? 'hovering' : '',
          usesHover ? 'uses-hover' : ''
        ]"
        @mouseover="isHovered = true"
        @mouseleave="isHovered = false"
      >
        <!-- NOTE: maybe switch to dynamic component? https://vuejs.org/v2/guide/components.html#Dynamic-Components  -->
        <router-link :to="url">
          <video
            v-if="video && usesVideos"
            :src="video.url"
            class="cpc__video"
            autoplay
            crossorigin
            loop
            muted
            playsinline
          >
            <source v-lazy :data-src="video.url" type="video/mp4" />
          </video>
          <LazyImage
            v-else
            :lazy-src-set="displayImage"
            :alt-text="`${product.title} image`"
          />
          <LazyImage
            v-if="usesHover"
            :lazy-src-set="hoverImage"
            :alt-text="`${product.title} second image`"
            class="cpc__hover-img"
          />
          <Slider v-else-if="usesSliderHover && isHovered" :images="sliderImages" />
        </router-link>
      </div>
      <div class="cpc__details">
        <div class="cpc__details-title">
          {{ product.title }}
        </div>
        <div class="cpc__details-price">
          <span v-if="product.availableForSale">
            <span v-if="isSaleItem" class="cpc__details-sale-price">
              ${{
                noZeros(product.compareAtPrice
                  ? product.compareAtPrice
                  : product.variants[0].compareAtPrice)
              }}
            </span>
            <span class="cpc__details-price">
              ${{ noZeros(product.price ? product.price : product.variants[0].price) }}
            </span>
          </span>
          <span v-else>
            Sold Out
          </span>
        </div>
        <slot name="footer"></slot>
      </div>
    </div>
    <LoadingCard v-else :handle="product.handle" />
  </div>
</template>

<script>
import LazyImage from "../lazy-image.vue";
import LoadingCard from './loading-card.vue';

export default {
  name: `CollectionProductCard`,
  components: {
    LazyImage,
    LoadingCard,
    Slider: () => import("./slider.vue")
  },
  data() {
    return {
      isHovered: false
    };
  },
  props: {
    product: {
      type: Object,
      default: () => {
        return {};
      }
    },
    url: {
      type: String,
      default: () => {
        return "";
      }
    },
    isUsingFeatured: {
      type: Boolean,
      default: () => {
        return false;
      }
    },
    usesHover: {
      type: Boolean,
      default: () => {
        return false;
      }
    },
    usesSliderHover: {
      type: Boolean,
      default: () => {
        return false;
      }
    },
    usesVideo: {
      type: Boolean,
      default: true
    },
    featuredImage: {
      type: Object,
      default: () => {
        return null;
      }
    }
  },
  computed: {
    isSaleItem() {
      return this.product.compareAtPrice
        ? this.product.compareAtPrice > this.product.price
        : this.product.variants[0].compareAtPrice &&
            this.product.variants[0].compareAtPrice >
              this.product.variants[0].price;
    },

    sliderImages() {
      return this.product.images.slice(1);
    },

    displayImage() {
      if (this.featuredImage && this.isUsingFeatured) {
        return this.featuredImage;
      } else {
        return this.isUsingStorefront
          ? this.product.images
            ? this.product.images[0]
            : ""
          : this.product.images && this.product.images[0]
          ? this.product.images[0].src
          : "";
      }
    },

    hoverImage() {
      return this.product.images && this.product.images[1]
          ? this.product.images[1].src
          : ""
    },

    video() {
      const videoObj = this.product.media && this.product.media.content
        ? this.product.media.content.find((d) => d.mediaContentType === "VIDEO")
        : null

      return videoObj ? videoObj.sources.find((vid) => vid.format === 'mp4') : null
    }
  },
  methods: {
    toggleHover() {
      this.isHovered = !this.isHovered;
    },
    noZeros(price) {
      return price.replace('.00', '')
    }
  }
};
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

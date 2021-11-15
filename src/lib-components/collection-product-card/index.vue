<template>
  <div class="cpc" data-testid="cpc">
    <div v-if="product && product.isLoaded">
      <slot name="header"></slot>
      <div
        :class="[
          'cpc__image',
          isHovered ? 'hovering' : '',
          usesHover ? 'uses-hover' : ''
        ]"
        @mouseover="isHovered = true"
        @mouseleave="isHovered = false"
      >
        <VariantColorSelect
          v-if="isUsingVariantSelect"
          :product="product"
          :selectedColor="selectedColor"
          :autoSelectFirstIfEmpty="true"
          @updateSelectedColor="(color) => this.selectedColor = color"
        />
        <!-- NOTE: maybe switch to dynamic component? https://vuejs.org/v2/guide/components.html#Dynamic-Components  -->
        <router-link :to="variantParamUrl">
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
      <div
        v-if="isUsingVariantSelect && colorCount >= 2"
        class="cpc__available-colors-count"
      >
        Available in {{colorCount}} colors
      </div>
    </div>
    <LoadingCard v-else :handle="product.handle" />
  </div>
</template>

<script>
import LazyImage from "../lazy-image.vue";
import LoadingCard from './loading-card.vue';
import VariantColorSelect from './variant-color-select.vue';

export default {
  name: `CollectionProductCard`,
  components: {
    LazyImage,
    LoadingCard,
    VariantColorSelect,
    Slider: () => import("./slider.vue")
  },
  data() {
    return {
      isHovered: false,
      selectedColor: null
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
    isUsingVariantSelect: {
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
      } else if(this.hasColors) {
        return this.selectedColor && this.selectedVariant ? this.selectedVariant.image.src || this.product.images[0] : "";
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
    },

    colorCount() {
      if(!this.isUsingVariantSelect) return 0;
      return Object.values(this.product.variants.reduce((colors, variant) => {
        if(variant.swatch_color && variant.selectedOptions && variant.selectedOptions.length > 1) {
          const name = variant.selectedOptions[1].value
          colors[name] = name;
        }
        return colors;
      }, {})).length
    },

    hasColors() {
      return this.colorCount >= 2;
    },

    selectedVariant() {
      if (!this.hasColors || !this.selectedColor) return
      return this.product.variants.find((variant) => variant.selectedOptions[1].value === this.selectedColor)
    },

    variantParamUrl() {
      if(this.isUsingVariantSelect && this.hasColors && this.selectedVariant) {
        return `${this.url}?color=${this.selectedVariant.selectedOptions[1].value}`;
      } else {
        return this.url;
      }
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

<style>
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

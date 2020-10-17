<template>
  <div class="cpc" data-testid="cpc">
    <div v-if="product && product.isLoaded">
      <div
        class="cpc__image"
        @mouseover="isHovered = true"
        @mouseleave="isHovered = false"
      >
        <!-- NOTE: maybe switch to dynamic component? https://vuejs.org/v2/guide/components.html#Dynamic-Components  -->
        <router-link :to="url">
          <LazyImage
            v-if="(usesHover && !isHovered) || !usesHover"
            :lazy-src-set="displayImage"
            :alt-text="`${product.title} image`"
          />
        </router-link>
        <Slider v-if="usesHover && isHovered" :images="sliderImages" />
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
      </div>
    </div>
    <LoadingCard v-else :handle="product.handle" />
  </div>
</template>

<script lang="">
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

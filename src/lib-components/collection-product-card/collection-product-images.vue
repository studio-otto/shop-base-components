<template>
  <div
    :class="[
      'cpc-images bg-gray-100 relative h-full',
      product.available === 'false' || product.available === false
        ? 'sold-out'
        : 'available',
      'product--' + product.handle
    ]"
    :key="Math.floor(Math.random() * 100000)"
  >
    <div
      :class="[
        'cpc-images__wrap relative h-full',
        this.product.images.length > 1 ? 'has-hover' : 'no-hover'
      ]"
    >
      <router-link
        :to="`/products/${product.handle}`"
        :aria-label="product.title + '' + formatPrice(product.price)"
        tabindex="0"
        class="cpc-images__link block h-full"
      >
        <div
          v-for="(image, index) in product.images"
          :key="`cpc-image-${index}`"
          class="cpc-images__image absolute top-0 h-full w-full"
        >
          <LazyImage
            :alt-text="product.title + '' + image.alt"
            :lazy-src-set="displayImage"
            :class="[
              displayImage === selectedVariantImage ? 'visible' : 'invisible',
              'h-full w-full object-cover lazypreload transition-none'
            ]"
          />
        </div>

        <div class="cpc-images__image-hover absolute top-0 h-full w-full">
          <LazyImage
            :alt-text="`${product.title} hover image`"
            :lazy-src-set="selectedVariantHover"
            class="h-full w-full object-cover lazypreload transition-none"
          />
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import LazyImage from "./../global/LazyImage";
import moneyMethods from "./../../mixins/money-methods";

export default {
  name: "CollectionProductImages",
  components: { LazyImage },
  mixins: [moneyMethods],
  props: {
    product: {
      type: Object,
      default: () => {
        return {};
      }
    },
    lazyLoadClass: {
      type: String,
      default: "-contain -fade-in lazy"
    },
    featuredImage: {
      type: String,
      defaultValue: ""
    },
    selectedVariantImage: {
      type: String,
      defaultValue: ""
    },
    selectedVariantHover: {
      type: String,
      defaultValue: ""
    },
    isUsingFeatured: {
      type: Boolean,
      default: false
    },
    isUsingStorefront: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      isActive: false,
      slider: null
    };
  },

  computed: {
    displayImage() {
      if (this.featuredImage && this.isUsingFeatured) {
        return this.featuredImage;
      } else {
        return this.isUsingStorefront
          ? this.product.images
            ? this.product.images[0]
            : ""
          : this.product.images
          ? this.product.images[0].src
          : "";
      }
    },

    productImages() {
      return this.featuredImage && this.isUsingFeatured
        ? this.product.images
        : this.isUsingStorefront
        ? this.product.images.slice(1).map(img => img)
        : this.product.images.slice(1).map(img => img.src);
    },

    isMobile() {
      if (
        navigator.userAgent.match(/Android/i) ||
        navigator.userAgent.match(/webOS/i) ||
        navigator.userAgent.match(/iPhone/i) ||
        navigator.userAgent.match(/iPad/i) ||
        navigator.userAgent.match(/iPod/i) ||
        navigator.userAgent.match(/BlackBerry/i) ||
        navigator.userAgent.match(/Windows Phone/i)
      ) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>

<template>
  <div class="cpc__slider-wrapper">
    <span
      aria-label="Previous slide"
      tabindex="0"
      @click="prevSlide"
      @keydown.enter="prevSlide"
    >Prev</span>
    <span
      aria-label="Next slide"
      tabindex="0"
      @click="nextSlide"
      @keydown.enter="nextSlide"
    >Next</span>
    <div class="cpc__slider-track">
      <div
        class="cpc__slider-slide"
        v-for="(image, index) in images"
        :key="`slider-image-${index}`"
      >
        <LazyImage :lazy-src-set="image.src" :alt-text="image.alt" />
      </div>
    </div>
  </div>
</template>

<script>
import LazyImage from "../lazy-image.vue";
import smoothscroll from "smoothscroll-polyfill";

export default {
  name: "Slider",
  components: {
    LazyImage
  },
  props: {
    images: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  mounted() {
    smoothscroll.polyfill();
  },
  methods: {
    nextSlide() {
      console.log("clicked");
      const scrollContainer = document.querySelector(".cpc__slider-track");
      scrollContainer?.scrollBy({
        left: scrollContainer.offsetWidth,
        behavior: "smooth"
      });
    },

    prevSlide() {
      const scrollContainer = document.querySelector(".cpc__slider-track");
      scrollContainer.scrollBy({
        left: -scrollContainer.offsetWidth,
        behavior: "smooth"
      });
    }
  }
};
</script>

<style scoped>
.cpc__slider-track {
  display: flex;
  scroll-snap-type: x mandatory;
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
  scroll-width: none;
  -ms-overflow-style: none;
  white-space: nowrap;
  overflow: auto;
  clip-path: inset(0 0 30px 0);
  margin-bottom: -30px;

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }

  &::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: transparent;
  }

  .cpc__slider-slide {
    width: 100%;
    scroll-snap-align: center;
    flex-shrink: 0;
  }
}
</style>

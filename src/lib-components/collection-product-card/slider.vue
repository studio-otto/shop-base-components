<template>
  <div class="cpc__slider-wrapper">
    <span @click="prevSlide">Prev</span>
    <span @click="nextSlide">Next</span>
    <div class="cpc__slider-track">
      <div class="cpc__slider-slide" v-for="(image, index) in images">
        <ResponsiveImage :lazySrcSet="image.src" :altText="image.alt" />
      </div>
    </div>
  </div>
</template>

<script>
import ResponsiveImage from "../responsive-image.vue";
import smoothscroll from "smoothscroll-polyfill";

export default {
  name: "Slider",
  components: {
    ResponsiveImage
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

<style lang="scss" scoped>
.cpc__slider-track {
  display: flex;
  scroll-snap-type: x mandatory;
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
  scroll-width: none;
  -ms-overflow-style: none;

  // hide scrollbar
  // padding-bottom: 30px;
  white-space: nowrap;
  overflow: auto;
  clip-path: inset(0 0 30px 0);
  margin-bottom: -30px;

  &::-webkit-scrollbar-track {
    // -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.1);
    background-color: transparent;
  }

  &::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    // -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    background-color: transparent;
  }

  .cpc__slider-slide {
    width: 100%;
    scroll-snap-align: center;
    flex-shrink: 0;
  }
}
</style>

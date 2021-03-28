<template>
  <div
    role="banner"
    data-testid="announcement-bar"
    :style="cssProps"
    class="announcement-bar"
  >
    <a
      :aria-label="slides[this.currentSlide].text"
      :href="slides[this.currentSlide].url"
      v-if="slides[this.currentSlide].url"
    >
      {{ slides[this.currentSlide].text }}
    </a>
    <span v-else>
      {{ slides[this.currentSlide].text }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'AnnouncementBar',
  data() {
    return {
      currentSlide: 0
    }
  },
  props: {
    textColor: {
      type: String,
      // TODO validate hex color
      default: () => {
        return ''
      }
    },
    backgroundColor: {
      // TODO validate hex color
      type: String,
      default: () => {
        return ''
      }
    },
    slides: {
      // TODO validate array of objects
      type: Array,
      default: () => {
        return []
      }
    },
    speed: {
      type: Number,
      default: () => {
        return 1000
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      setInterval(() => {
        this.currentSlide === this.slides.length - 1
          ? (this.currentSlide = 0)
          : (this.currentSlide = this.currentSlide + 1)
      }, this.speed)
    }
  },
  computed: {
    cssProps() {
      return {
        '--text-color': this.textColor,
        '--background-color': this.backgroundColor
      }
    }
  }
}
</script>

<style scoped>
.announcement-bar {
  display: flex;
  justify-content: center;
  background: var(--background-color);
  color: var(--text-color);

  a {
    color: var(--text-color);
    text-decoration: none;
  }
}
</style>

<template>
  <div v-if="!accepted && open" class="cookie-consent">
    <div class="cookie-consent__title">
      {{ title }}
    </div>
    <div class="cookie-consent__description">
      {{ description }}
    </div>
    <div v-if="ctaUrl" class="cookie-consent__cta">
      <a :href="ctaUrl" target="_blank" rel="noopener noreferrer">
        {{ cta }}
      </a>
    </div>
    <div class="cookie-consent__description">
      <button
        type="button"
        @click="setCookie"
        @keydown.enter="setCookie"
        aria-label="Accept cookies"
        tabindex="0"
      >{{ acceptText }}</button>
    </div>
  </div>
</template>

<script lang="">
import VueCookies from 'vue-cookies'

export default {
  name: 'CookieConsent',
  components: {
    VueCookies
  },
  props: {
    open: {
      type: Boolean,
      default: () => {
        return true
      }
    },
    title: {
      type: String,
      default: () => {
        return `Cookies Policy`
      }
    },
    description: {
      type: String,
      default: () => {
        return `We use cookies, which are small information files about your browsing activity on this Web Site and their main purpose is to aid your browsing activity. Please read our Cookies Policy carefully.`
      }
    },
    cta: {
      type: String,
      default: () => {
        return `Read more`
      }
    },
    ctaUrl: {
      type: String,
      default: () => {
        return null
      }
    },
    acceptText: {
      type: String,
      default: () => {
        return `Accept`
      }
    }
  },
  methods: {
    setCookie() {
      VueCookies.set('cookie_consent', 1, '1m')
      this.open = false
    }
  },
  computed: {
    accepted() {
      const accepted = VueCookies.get('cookie_consent')
      if (accepted) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>

<template>
  <transition
    :css="false"
    @before-enter="beforeEnter"
    @enter="enter"
    @leave="leave"
  >
    <span :key="value" class="block">{{ value }}</span>
  </transition>
</template>

<script>
import { TweenLite, Power2 } from 'gsap'

export default {
  name: 'AnimatedValue',
  props: {
    value: {
      required: true
    }
  },

  methods: {
    beforeEnter(el) {
      TweenLite.set(el, {
        opacity: 0,
        y: 10
      })
    },

    enter(el, done) {
      TweenLite.to(el, 0.6, {
        ease: Power2.easeOut,
        delay: 0.3,
        opacity: 1,
        y: 0,
        onComplete: done
      })
    },

    leave(el, done) {
      TweenLite.to(el, 0.3, {
        ease: Power2.easeOut,
        opacity: 0,
        y: -10,
        onComplete: done
      })
    }
  }
}
</script>

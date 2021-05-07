<template>
  <div
    :class="['modal', open ? 'pointer-events-all' : 'pointer-events-none']"
    role="dialog"
    :aria-modal="open"
    data-testid="modal"
  >
    <div
      ref="mask"
      class="modal__mask"
      aria-label="Close modal"
      tabindex="0"
      data-testid="modal-mask"
      @click="closeModal"
      @keydown.enter="closeModal"
    ></div>

    <div ref="content" class="modal__inner">
      <div
        class="modal__close"
        aria-label="Close modal"
        tabindex="0"
        @click="closeModal"
        @keydown.enter="closeModal"
      >
        <svg
          width="11px"
          height="11px"
          viewBox="0 0 11 11"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g fill-rule="nonzero" fill="#000000">
              <path
                d="M5.5,4.79289322 L1.64517136,0.938064583 L0.938064583,1.64517136 L4.79289322,5.5 L0.938064583,9.35482864 L1.64517136,10.0619354 L5.5,6.20710678 L9.39328103,10.1003878 L10.1003878,9.39328103 L6.20710678,5.5 L10.1003878,1.60671897 L9.39328103,0.899612188 L5.5,4.79289322 Z"
              ></path>
            </g>
          </g>
        </svg>
      </div>
      <div class="modal__inner-title">{{ title }}</div>
      <div class="modal__inner-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import gsap from 'gsap'

export default {
  name: 'Modal',
  props: {
    open: {
      type: Boolean,
      default: false
    },

    useFade: {
      type: Boolean,
      default: true
    },

    title: {
      type: String,
      default: ''
    }
  },

  watch: {
    open(newVal, oldVal) {
      if (newVal) {
        this.openModal()
      } else {
        this.closeModal()
      }
    }
  },

  methods: {
    openModal() {
      gsap.to(this.$refs.mask, {
        opacity: 1,
        duration: 0.4,
        ease: 'power4.out'
      })

      gsap.to(this.$refs.content, {
        opacity: 1,
        y: 0,
        delay: 0.4,
        duration: 0.4,
        ease: 'power4.out'
      })
    },

    closeModal() {
      gsap.to(this.$refs.content, {
        opacity: 0,
        duration: 0.4,
        y: 10,
        ease: 'power4.out'
      })

      gsap.to(this.$refs.mask, {
        opacity: 0,
        duration: 0.4,
        delay: 0.2,
        ease: 'power4.out',
        onComplete: () => {
          this.$emit('close')
        }
      })
    }
  }
}
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  .modal__mask {
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.9);
    cursor: pointer;
    z-index: 0;
    opacity: 0;
  }

  .modal__inner {
    cursor: auto;
    position: relative;
    z-index: 2;
    background: white;
    padding: 1rem;
    opacity: 0;
    transform: translateY(10px);
    box-shadow: 0 30px 130px rgba(0, 0, 0, 0.26);
  }

  .modal__close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    cursor: pointer;
  }
}
</style>

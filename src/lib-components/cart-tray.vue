<template>
  <div
    data-testid="cart-tray"
    :class="[`cart-tray`, open ? `active` : `inactive`, `side-${side}`]"
    :style="cssProps"
  >
    <div class="cart-tray__top-banner">
      <div class="cart-tray__counter">
        {{ cartItems.length }}
      </div>
      <div
        data-testid="close-button"
        @click="close"
        aria-label="Close cart"
        tabindex="0"
        class="close-button"
      >
        <i class="icon icon--med"
          ><svg
            width="21"
            height="21"
            viewBox="0 0 21 21"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.5,10.5 L1.5,1.5 L10.5,10.5 L1.5,19.5 L10.5,10.5 Z M10.5,10.5 L19.2675974,19.2675974 L10.5,10.5 L19.2675974,1.73240256 L10.5,10.5 Z"
              stroke="#333"
              fill="none"
              fill-rule="evenodd"
              stroke-linecap="square"
            ></path></svg
        ></i>
      </div>
    </div>
    <div v-if="banner" class="cart-tray__banner">
      {{ banner }}
    </div>
    <div v-if="cartItems.length === 0" class="cart-tray__empty-message">
      {{ emptyMessage }}
    </div>
    <div class="cart-tray__bottom">
      <button>Checkout</button>
    </div>
  </div>
</template>

<script lang="">
export default {
  name: `CartTray`,
  props: {
    open: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    maxWidth: {
      type: Number,
      default: () => {
        return 600
      }
    },
    textColor: {
      type: String,
      // TODO validate hex color
      default: () => {
        return '#000000'
      }
    },
    backgroundColor: {
      // TODO validate hex color
      type: String,
      default: () => {
        return '#FFFFFF'
      }
    },
    side: {
      type: String,
      validator: function(value) {
        return [`left`, `right`].indexOf(value) !== -1
      },
      default: () => {
        return `right`
      }
    },
    cartItems: {
      type: Array,
      default: () => {
        return []
      }
    },
    emptyMessage: {
      type: String,
      default: () => {
        return `Your cart is empty.`
      }
    },
    banner: {
      type: String,
      default: () => {
        return `Hello Otto`
      }
    }
  },
  computed: {
    cssProps() {
      return {
        '--cart-text-color': this.textColor,
        '--cart-background-color': this.backgroundColor,
        '--cart-max-width': `${this.maxWidth}px`
      }
    }
  },
  methods: {
    close() {
      this.$emit('onClose')
    }
  }
}
</script>

<style lang="scss" scoped>
.cart-tray {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  max-width: var(--cart-max-width);
  background: var(--cart-background-color);
  color: var(--cart-text-color);
  box-sizing: border-box;
  transition: 0.2s all ease-in-out;
  transform: translateX(100%);

  &.side-left {
    right: auto;
    left: 0;
    transform: translateX(-100%);
  }

  &.active {
    transform: translateX(0);
  }

  .close-button {
    cursor: pointer;
  }

  .cart-tray__top-banner {
    display: flex;
    align-items: center;
  }
}
</style>

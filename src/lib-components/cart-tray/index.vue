<template>
  <div
    data-testid="cart-tray"
    :class="[
      'cart-tray',
      `side-${side}`,
      open ? 'active' : 'inactive',
      isBusy ? 'busy' : ''
    ]"
    :style="cssProps"
  >
    <div class="cart-tray__inner">
      <div class="cart-tray__content">
        <div class="cart-tray__top-banner">
          <div class="cart-tray__counter">
            {{ checkout && checkout.lineItems ? checkout.lineItems.length : 0 }}
          </div>
          <div
            data-testid="close-button"
            @click="close"
            @keyup.enter="close"
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
      </div>

      <div v-if="banner" class="cart-tray__banner">
        {{ banner }}
      </div>

      <div
        v-if="checkout && checkout.lineItems && checkout.lineItems.length === 0"
        class="cart-tray__empty-message"
      >
        {{ emptyMessage }}
      </div>
      <div v-else-if="checkout" class="cart-tray__products-wrap">
        <div
          v-for="(lineItem, index) in checkout.lineItems"
          :key="`lineItem.id + ${index}`"
        >
          <LineItem
            :lineItem="lineItem"
            :includeLineItemVariantSize="includeLineItemVariantSize"
            :includeLineItemVariantColor="includeLineItemVariantColor"
            :keepCents="keepCents"
            :currency-symbol="currencySymbol"
            @removeLineItem="removeLineItem"
            @updateLineItem="updateLineItem"
          />
        </div>
      </div>

      <div class="cart-tray__spacer"></div>

      <div class="cart-tray__pre-checkout">
        <slot name="preCheckout"></slot>
      </div>

      <div class="cart-tray__bottom">
        <div class="cart-tray__bottom-subtotal">
          <span class="cart-tray__bottom-subtotal-label">{{
            subtotalText
          }}</span>
          <span class="cart-tray__bottom-subtotal-amount">
            {{currencySymbol}}{{ subtotal }}</span>
        </div>

        <div class="cart-tray__after-checkout">
          <slot name="afterCheckout"></slot>
        </div>

        <div
          class="cart-tray__bottom-subtotal-bottom"
          v-if="subtotalBottomText"
        >
          {{ subtotalBottomText }}
        </div>
        <button
          class="cart-tray__bottom-checkout"
          type="button"
          @click="goToCheckout"
          @keydown.enter="goToCheckout"
          :aria-label="checkoutText"
          tabindex="0"
        >
          {{ checkoutText }}
        </button>
        <div class="cart-tray__bottom-text">{{ bottomText }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import LineItem from './line-item.vue'

export default {
  name: `CartTray`,
  components: {
    LineItem
  },
  props: {
    open: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    isBusy: {
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
        return ['left', 'right'].indexOf(value) !== -1
      },
      default: () => {
        return 'right'
      }
    },
    checkout: {
      type: Object,
      default: () => {
        return {}
      }
    },
    emptyMessage: {
      type: String,
      default: () => {
        return 'Your cart is empty.'
      }
    },
    banner: {
      type: String,
      default: () => {
        return ''
      }
    },
    bottomText: {
      type: String,
      default: () => {
        return 'Shipping calculated at checkout'
      }
    },
    subtotalText: {
      type: String,
      default: () => {
        return 'Subtotal'
      }
    },
    currencySymbol: {
      type: String,
      default: '$'
    },
    checkoutText: {
      type: String,
      default: () => {
        return 'Checkout'
      }
    },
    subtotalBottomText: {
      type: String,
      default: () => {
        return ''
      }
    },
    includeLineItemVariantSize: {
      type: Boolean,
      default: false
    },
    includeLineItemVariantColor: {
      type: Boolean,
      default: false
    },
    keepCents: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    cssProps() {
      return {
        '--cart-text-color': this.textColor,
        '--cart-background-color': this.backgroundColor,
        '--cart-max-width': `${this.maxWidth}px`
      }
    },

    subtotal() {
      return this.checkout && this.checkout.subtotalPriceV2
        ? this.formatPrice(this.checkout.subtotalPriceV2.amount)
        : ''
    }
  },
  methods: {
    close() {
      this.$emit('onClose')
    },
    removeLineItem(id) {
      this.$emit('removeLineItem', id)
    },
    updateLineItem({ id, quantity }) {
      this.$emit('updateLineItem', { id: id, quantity: quantity })
    },
    goToCheckout() {
      this.$emit('goToCheckout')
    },
    formatPrice(amount) {
      return this.keepCents
        ? amount
        : typeof amount === 'number'
        ? amount
        : amount.replace('.00', '').replace('.0', '')
    }
  }
}
</script>

<style scoped>
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

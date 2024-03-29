<template>
  <div class="cart-tray__line-item">
    <div class="cart-tray__line-item-img">
      <router-link
        :to="`/products/${lineItem.variant.product.handle}`"
        :aria-label="`View ${lineItem.title}`"
      >
        <LazyImage
          :alt-text="lineItem.title"
          :lazy-src-set="lineItemImage"
          :widthSizes="[200]"
        />
      </router-link>
    </div>
    <div class="cart-tray__line-item-info">
      <router-link
        :to="`/products/${lineItem.variant.product.handle}`"
        :aria-label="`View ${lineItem.title}`"
      >
        <div class="cart-tray__line-item-title">{{ lineItem.title }}</div>
      </router-link>
      <div v-if="!includeLineItemVariantSize && !includeLineItemVariantSize" class="cart-tray__line-item-info-sub">
        <div class="cart-tray__line-item-counter">
          <span
            class="cart-tray__line-item-subtract"
            @click="updateLineItem(lineItem.id, lineItem.quantity - 1)"
            @keydown.enter="updateLineItem(lineItem.id, lineItem.quantity - 1)"
            tabindex="0"
            aria-label="Decrease quantity"
            >-</span
          >
          <span class="cart-tray__line-item-quantity">{{
            lineItem.quantity
          }}</span>
          <span
            class="cart-tray__line-item-add"
            @click="updateLineItem(lineItem.id, lineItem.quantity + 1)"
            @keydown.enter="updateLineItem(lineItem.id, lineItem.quantity + 1)"
            tabindex="0"
            aria-label="Increase quantity"
            >+</span
          >
        </div>
        <span
          class="cart-tray__line-item-remove"
          @click="removeLineItem(lineItem.id)"
          @keydown.enter="removeLineItem(lineItem.id)"
          tabindex="0"
          aria-label="Remove"
          >Remove</span
        >
      </div>
      <div v-else class="cart-tray__line-item-info-sub">
        <div class='cart-tray__line-item-info-listings'>
          <div v-if="includeLineItemVariantColor && color" class="cart-tray__line-item-info-color">{{color}}</div>
          <div class="cart-tray__line-item-info-size-and-quantity">
            <div v-if="includeLineItemVariantSize && size" class="cart-tray__line-item-size">{{size}}</div>
            <div class="cart-tray__line-item-counter">
              <span
                class="cart-tray__line-item-subtract"
                @click="updateLineItem(lineItem.id, lineItem.quantity - 1)"
                @keydown.enter="updateLineItem(lineItem.id, lineItem.quantity - 1)"
                aria-label="Decrease quantity"
                tabindex="0"
              >-</span>
              <span class="cart-tray__line-item-quantity">{{ lineItem.quantity }}</span>
              <span
                class="cart-tray__line-item-add"
                tabindex="0"
                aria-label="Increase quantity"
                @click="updateLineItem(lineItem.id, lineItem.quantity + 1)"
                @keydown.enter="updateLineItem(lineItem.id, lineItem.quantity + 1)"
              >+</span>
            </div>
          </div>
        </div>
    
        <span
          class="cart-tray__line-item-remove"
          tabindex="0"
          aria-label="Remove"
          @click="removeLineItem(lineItem.id)"
          @keydown.enter="removeLineItem(lineItem.id)"
        >Remove</span>
      </div>

      <div
        v-if="lineItem.customAttributes[0].value"
        class="cart-tray__line-item-note"
      >
        {{ lineItem.customAttributes[0].value }}
      </div>
    </div>
    <div class="cart-tray__line-item-subtotal">
      <div
        v-if="hasDiscounts"
        class="cart-tray__line-item-price-discount-original line-through"
      >
        {{ currencySymbol }}{{originalSubtotal}}
      </div>
      <div :class="['cart-tray__line-item-price', hasDiscounts ? '-discounts' : '-no-discounts']">
        {{ currencySymbol }}{{ lineItemSubtotal }}
      </div>
    </div>
  </div>
</template>

<script>
import LazyImage from '../lazy-image.vue'
export default {
  name: 'LineItem',
  components: {
    LazyImage
  },
  props: {
    lineItem: {
      type: Object,
      default: () => {
        return {}
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
    },
    currencySymbol: {
      type: String
    },
  },
  computed: {
    lineItemImage() {
      return this.lineItem.variant ? this.lineItem.variant.image.src : "";
    },
    color() {
      return this.includeLineItemVariantColor
          && this.hasOptions(1)
          && this.lineItem.variant.selectedOptions[1].value !== 'Default Title'
        ? this.lineItem.variant.selectedOptions[1].value
        : ""
    },

    size() {
      return this.includeLineItemVariantSize
              && this.hasOptions(0)
              && this.lineItem.variant.selectedOptions[0].value !== 'Default Title'
            ? this.lineItem.variant.selectedOptions[0].value
            : ""
    },
    hasDiscounts() {
      return this.lineItem && this.lineItem.discountAllocations && this.lineItem.discountAllocations.length > 0
    },
    originalSubtotal() {
      return this.formatPrice(Number(this.lineItem.variant.price.amount) * this.lineItem.quantity)
    },
    lineItemSubtotal() {
      const discountAmount = this.hasDiscounts ? this.lineItem.discountAllocations[0].allocatedAmount.amount : "0"
      return this.hasDiscounts
        ? this.formatPrice((Number(this.lineItem.variant.price.amount) * this.lineItem.quantity) - discountAmount)
        : this.originalSubtotal      
    }
  },
  methods: {
    hasOptions(index) {
      return this.lineItem.variant
          && this.lineItem.variant.selectedOptions
          && this.lineItem.variant.selectedOptions[index]
    },
    removeLineItem(id) {
      this.$emit('removeLineItem', id)
    },
    updateLineItem(id, quantity) {
      this.$emit("updateLineItem", { id, quantity } );
    },
    formatPrice(amount) {
      return this.keepCents
        ? amount
        : typeof(amount) === 'number'
          ? amount
          : amount.replace(".00", '')
    }
  }
}
</script>

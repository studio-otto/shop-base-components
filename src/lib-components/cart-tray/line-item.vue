<template>
  <div class="cart-tray__line-item">
    <LazyImage :alt-text="lineItem.title" :lazy-src-set="lineItemImage" />
    <div class="cart-tray__line-item-info">
      <div class="cart-tray__line-item-title">{{ lineItem.title }}</div>
      <div class="cart-tray__line-item-counter">
        <span class="cart-tray__line-item-subtract" @click="updateLineItem(lineItem.id, lineItem.quantity - 1)">-</span>
        <span class="cart-tray__line-item-quantity">{{ lineItem.quantity }}</span>
        <span class="cart-tray__line-item-add" @click="updateLineItem(lineItem.id, lineItem.quantity + 1)">+</span>
      </div>
      <span class="cart-tray__line-item-remove" @click="removeLineItem(lineItem.id)">Remove</span>
    </div>
    <div class="cart-tray__line-item-price">${{lineItem.variant.price}}</div>
  </div>
</template>

<script>
import LazyImage from "../lazy-image.vue";
export default {
  name: "LineItem",
  components: {
    LazyImage
  },
  props: {
    lineItem: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  computed: {
    lineItemImage() {
      return this.lineItem.variant.image.src;
    }
  },
  methods: {
    removeLineItem(id) {
      this.$emit("removeLineItem", id);
    },
    updateLineItem(id, quantity) {
      this.$emit("updateLineItem", { id: id, quantity: quantity });
    }
  }
};
</script>

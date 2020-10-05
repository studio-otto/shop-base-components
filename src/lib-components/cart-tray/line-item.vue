<template>
  <div class="cart-tray__line-item">
    <LazyImage :alt-text="lineItem.title" :img-url="lineItemImage" />
    <div class="cart-tray__line-item-counter">
      <span @click="updateLineItem(lineItem.id, lineItem.quantity - 1)">-</span>
      <span>{{ lineItem.quantity }}</span>
      <span @click="updateLineItem(lineItem.id, lineItem.quantity + 1)">+</span>
    </div>
    <span @click="removeLineItem(lineItem.id)">Remove</span>
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

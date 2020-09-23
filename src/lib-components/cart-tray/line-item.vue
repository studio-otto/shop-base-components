<template>
  <div class="cart-tray__line-item">
    <ResponsiveImage :lazySrcSet="lineItemImage" :altText="lineItem.title" />
    <div class="cart-tray__line-item-counter">
      <span @click="updateLineItem">-</span>
      <span>{{ lineItem.quantity }}</span>
      <span @click="updateLineItem">+</span>
    </div>
    <span @click="removeLineItem">Remove</span>
  </div>
</template>

<script>
import ResponsiveImage from "../responsive-image.vue";
export default {
  name: "LineItem",
  components: {
    ResponsiveImage
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
    removeLineItem() {
      this.$emit("onRemove");
    },
    updateAttributes() {
      this.$emit("onUpdateAttributes");
    },
    updateLineItem() {
      this.$emit("onUpdate");
    }
  }
};
</script>

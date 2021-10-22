<template>
  <div v-if="hasColors" class="variant-color__select">
    <button
      v-for="color in colors"
      :key="color.name"
      :style="{ backgroundColor: color.hex}"
      :ariaLabel="`Color Option ${color.name}`"
      :class="['variant-color__circle', color.isSelected ? '-selected' : '-not-selected']"
      @click="updateSelectedColor(color.name)"
      type="button"
    >
    </button>
  </div>
</template>

<script>

export default {
  name: `VariantColorSelect`,
  components: {},
  data() {
    return {};
  },
  props: {
    product: {
      type: Object,
      default: () => {
        return {};
      }
    },
    selectedColor: {
      type: String,
      default: () => {
        return "";
      }
    },
    autoSelectFirstIfEmpty: {
      type: Boolean,
      default: () => {
        return false;
      }
    }
  },
  mounted() {
    if(!this.selectedColor && this.autoSelectFirstIfEmpty) this.selectFirstColor()
  },
  computed: {
    colors() {
      return Object.values(
        this.product.variants.reduce((colors, variant) => {
          if(variant.swatch_color) {
            const name = variant.selectedOptions[1].value
            const isSelected = this.selectedColor && this.selectedColor === name
            colors[name] = { hex: variant.swatch_color.value, name, variant, isSelected };
          }
          return colors;
        }, {})
      )
    },

    hasColors() {
      return this.colors.length >= 2;
    }
  },
  methods: {
    updateSelectedColor(color) {
      this.$emit("updateSelectedColor", color);
    },

    selectFirstColor() {
      const firstColor = this.product.variants.find((variant) => {
        return !!variant.swatch_color;
      })
      this.updateSelectedColor(firstColor ? firstColor.selectedOptions[1].value  : "")
    }
  }
};
</script>

<style>
  .variant-color__select {
    position: absolute;
    right: 0;
    top: 0;
    display: flex;
    z-index: 10;
    margin: 15px 15px 0 0;
  }

  .variant-color__circle {
    border-radius: 50%;
    width: 15px;
    height: 15px;
    margin-right: 10px;
  }

  .variant-color__circle.-selected {
    border: 1px solid black;
  }
</style>

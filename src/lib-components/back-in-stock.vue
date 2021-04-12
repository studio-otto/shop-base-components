<template>
  <div>
    <div
      v-if="hasSoldOutVariant && product.available && !preselectedVariant"
      class="-pointer"
      @click="toggleModal()"
    ></div>
    <Modal
      :is-open="showingReminderModal"
      :can-add="false"
      class="bis-modal"
      @close="$emit('close')"
    >
      <div class="-max-width p-4">
        <form
          v-if="!submitted"
          class="box box--mobile box-column -align-center m-4"
          @submit.prevent="saveReminder"
        >
          <h3 class="uppercase">Join the Waitlist</h3>
          <p>Receive an email when your {{ variantType }} is back in stock.</p>

          <div
            v-if="preselectedVariant"
            class="quickshop__variant_selected box -box--mobile -text--capitalize mb-6"
          >
            <span class="uppercase">{{ variantType }}</span>
            <span class="wishlist-size">{{ preselectedVariant.title }}</span>
          </div>

          <!-- <VariantSelect
            v-else
            :product="product"
            :out-of-stock-only="true"
            :selected-variant="selectedVariant"
            option="option1"
            class="quickshop__variant box -box--mobile -m-t-1"
            @setNewSelectedVariant="(variant) => (selectedVariant = variant)"
          /> -->

          <input
            v-model="userEmail"
            :class="{ input: true, 'is-danger': validEmail }"
            class="-box--2of4 uppercase block w-full border-b mb-4 border-black"
            name="email"
            aria-label="Email address for newsletter"
            type="text"
            placeholder="Email"
          />

          <button
            type="submit"
            class="px-20 py-5 bg-black outline-none text-white w-full block mx-auto mt-8 uppercase"
            :class="{ '-btn--disabled': !validEmail || !hasSelectedVariant }"
            :disabled="!validEmail || !hasSelectedVariant"
          >
            Submit
          </button>
        </form>

        <div v-else class="-padding--medium -text--center">
          <h3 class="uppercase">Thank you!</h3>
          <p>You will be notified when this item is back in stock.</p>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import { Modal } from '@studio-otto/shop-base-components'
// import VariantSelect from './VariantSelect'

export default {
  name: 'BackInStock',
  components: { Modal },
  props: {
    product: {
      type: Object,
      default() {}
    },
    preselectedVariant: {
      type: Object,
      default() {}
    },
    apiKey: {
      type: String,
      default: () => ''
    },
    variantType: {
      type: String,
      default: () => 'size'
    }
  },

  data() {
    return {
      showingReminderModal: !!this.preselectedVariant,
      userEmail: '',
      selectedVariant: this.preselectedVariant
        ? this.preselectedVariant
        : this.product.variants.find((variant) => !variant.available),
      submitted: false
    }
  },

  computed: {
    hasSoldOutVariant() {
      const soldOutVariants = this.product.variants.find(
        (variantOption) => !variantOption.available
      )
      const hasOneSoldOut =
        soldOutVariants && Object.keys(soldOutVariants).length > 0
      return hasOneSoldOut
    },

    hasSelectedVariant() {
      return this.selectedVariant
        ? this.selectedVariant.label
          ? this.selectedVariant.label
          : !this.selectedVariant.variant
        : ''
    },

    outOfStockOptions() {
      return this.dropDownOptions.filter((option) => !option.available)
    },

    validEmail() {
      // eslint-disable-next-line
      const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
      return this.userEmail === '' ? '' : emailRegExp.test(this.userEmail)
    }
  },

  methods: {
    saveReminder() {
      const email = this.userEmail
      const id = this.selectedVariant.id
      const productId =
        typeof this.product.id === 'number'
          ? this.product.id
          : this.product.id.split('/').pop()
      debugger
      if (email && id) {
        const myHeaders = new Headers()
        myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')

        const urlencoded = new URLSearchParams()
        urlencoded.append('a', this.apiKey)
        urlencoded.append('email', email)
        urlencoded.append('variant', id)
        urlencoded.append('product', productId)
        urlencoded.append('subscribe_for_newsletter', false)
        urlencoded.append('platform', 'shopify')

        const requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: urlencoded,
          redirect: 'follow'
        }

        // fetch('https://a.klaviyo.com/api/v1/catalog/subscribe', requestOptions)
        fetch(
          'https://a.klaviyo.com/onsite/components/back-in-stock/subscribe',
          requestOptions
        )
        this.submitted = true
        setTimeout(() => {
          this.$emit('close')
        }, 2000)
      }
    },

    toggleModal() {
      if (this.preselectedVariant) {
        this.selectedVariant = null
        this.$emit('closeModal')
      }
      this.showingReminderModal = !this.showingReminderModal
      this.clipPage(this.showingReminderModal)
      this.submitted = false
    },

    clipPage(value) {
      const html = document.getElementsByTagName('html')[0]

      if (value) {
        html.classList.add('-is-clipped')
      } else {
        html.classList.remove('-is-clipped')
      }
    }
  }
}
</script>

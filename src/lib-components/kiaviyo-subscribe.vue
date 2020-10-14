<template>
  <div class="klaviyo-form">
   <form @keydown.enter.prevent='' aria-label="Newsletter Signup" class="relative">
      <div class="klaviyo__input-wrap">
        <label aria-label="Newsletter Signup"></label>
        <input
          :class="{
            'input': true,
            'is-danger': isEmailValid(),
          }"
          v-model="userEmail"
          name="email"
          @focus="inputFocused()"
          type="text"
          placeholder="Email"
          @keyup.enter="sendForm()"
          tabindex="0"
          aria-label="Email Address"
        />
			</div>

			<button
        type="button"
        class="klaviyo-form__submit"
        @click="sendForm()"
        @keyup.enter="sendForm()"
        :aria-label="submitText"
        tabindex="0"
        :disabled="!isValid"
      >
          <span v-if="isSending" class="klaviyo-form__submitting"></span>
          <span v-if="isSending">&nbsp;</span>
          <span v-else>{{ submitText }}</span>
			</button>
	  </form>
  </div>
</template>

<script>
export default {
  name: 'KlaviyoSubscribe',
  props: {
    klaviyoId: {
      type: String,
      default: () => {
        return ''
      }
    },    
    submitText: {
      type: String,
      default: () => {
        return `Sign Up`
      }
    }
  },

  data() {
    return {
      userEmail: '',
      isValid: false,
      isSending: false,
      reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
    }
  },

  methods: {
    sendForm () {
      this.isSending = true

      const config = Object.assign({}, {
        g: this.klaviyoId,
        email: this.userEmail
      })

      const body = Object.keys(config).reduce((str, key) => {
        str.append(key, config[key])
        return str
      }, new URLSearchParams())

      return fetch('https://manage.kmail-lists.com/ajax/subscriptions/subscribe', {
        method: 'POST',
        headers: {
          "Access-Control-Allow-Headers": "*",
          "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
        },
        body
      }).then((res) => {
        this.isSending = false
        this.$emit('handleSuccess')
      })
    },

    signupError (e) {
      const errorMessage = e.response && e.response.statusText === 'BAD REQUEST' || 'Form is invalid.' 
        ? "You're already on the list"
        : 'Sorry, something went wrong'
      this.$emit('showMessage', errorMessage, 'error')
    },

    inputFocused() {
      this.$emit('focused')
    },

    isEmailValid: function() {
      return (this.userEmail == "") ? "" : (this.reg.test(this.userEmail)) ? this.isValid = true : this.isValid = false;
    }
  }
}
</script>

<style lang="scss" scoped></style>

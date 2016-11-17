/**
 * A Vue.js mixin to add validate functionality
 */
import Validator from './validator.js';

export default {

  data: () => ({
    // store validation result
    validity: {
      valid: true,
      msg: ''
    }
  }),

  created: function() {
    if (!this.$options.props.value || !this.$options.props.rules) {
      const msg = `Prop 'value' and 'rules' are required to use 'Validatable'.`;
      throw new Error(msg);
    }
  },

  watch: {
    value: function() {
      this.validity = this.validate();
    }
  },

  methods: {
    validate: function() {
      return this.validity = Validator.validate(this.value, this.rules);
    }
  }

};


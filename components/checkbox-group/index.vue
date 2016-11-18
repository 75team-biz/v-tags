<template>
  <div class="checkbox-group" @change="onChange">
    <label v-for="option in options">
      <input
        type="checkbox"
        :value="option.value"
        :disabled="option.disabled"
        :checked="isChecked(option.value)"
      ><i></i>{{option.title}}
    </label>
    <em class="error" v-if="!validity.valid">{{validity.msg}}</em>
  </div>
</template>

<script>
  import validatable from '../validatable/';

  export default {
    name: 'v-checkbox-group',
    props: {
      value: Array,
      rules: {
        type: Object,
        default: function() {
          return {}
        }
      },
      required: Boolean,
      options: Array
    },
    mounted: function() {
      if (this.required) {
        this.rules.required = true;
        this.rules.msg = '请选择此项';
      }
    },
    mixins: [validatable],
    methods: {
      onChange(e) {
        const result = Array.from(this.$el.querySelectorAll('input'))
          .filter(input => input.checked)
          .map(input => input.value);
        this.$emit('input', result);
      },
      isChecked(value) {
        return this.value.some(val => val == value)
      }
    }
  }
</script>


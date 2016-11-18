<template>
  <div class="radio-group" @change="onChange">
    <label v-for="option in options">
      <input
        type="radio"
        :name="name"
        :value="option.value"
        :disabled="option.disabled"
        :checked="value==option.value"
      ><i></i>{{option.title}}
    </label>
    <em class="error" v-if="!validity.valid">{{validity.msg}}</em>
  </div>
</template>

<script>
  import validatable from '../validatable/';

  export default {
    name: 'v-radio-group',
    props: {
      value: [String, Number],
      rules: {
        type: Object,
        default: function(){
          return {}
        }
      },
      required: Boolean,
      name: String,
      options: Array
    },
    created: function() {
      if (this.required) {
        this.rules.required = true;
        this.rules.msg = '请选择此项';
      }
    },
    mixins: [validatable],
    methods: {
      onChange(e) {
        this.$emit('input', e.target.value);
      }
    }
  }
</script>


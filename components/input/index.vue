<template>
  <div class="input-wrap">
    <input
      v-if="type!='textarea'"
      :class="'size-'+size"
      :type="type"
      :value="value"
      :placeholder="placeholder"
      :readonly="readonly"
      :disabled="disabled"
      :maxlength="maxlength"
      @input="onInput"
    >
    <textarea
      v-else
      :value="value"
      :placeholder="placeholder"
      :readonly="readonly"
      :disabled="disabled"
      :maxlength="maxlength"
      :rows="rows"
      @input="onInput">
    </textarea>
    <em class="error" v-if="!validity.valid">{{validity.msg}}</em>
  </div>
</template>

<script>
  import validatable from '../validatable/';

  export default {
    name: 'v-input',
    props: {
      value: [String, Number],
      rules: Object,
      placeholder: String,
      size: String,
      readonly: Boolean,
      disabled: Boolean,
      type: {
        type: String,
        default: 'text'
      },
      name: String,
      rows: {
        type: Number,
        default: 3
      },
      maxlength: Number
    },
    mixins: [validatable],
    methods: {
      onInput(e) {
        this.$emit('input', e.target.value);
      }
    }
  }
</script>


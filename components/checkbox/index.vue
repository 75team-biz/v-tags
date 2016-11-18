<template>
  <span class="checkbox" @change="onChange">
    <label>
      <input
        type="checkbox"
        :name="name"
        :disabled="disabled"
        :checked="value"
      ><i></i>{{title}}
    </label>
  </div>
</template>

<script>
  export default {
    name: 'v-checkbox',
    props: {
      value: Boolean,
      name: String,
      title: String,
      disabled: Boolean
    },
    methods: {
      onChange(e) {
        this.$emit('input', e.target.checked);
      }
    }
  }
</script>


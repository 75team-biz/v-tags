<template>
  <ul class="v-select-group__wrap">
    <li class="v-select-group__title">{{ label }}</li>
    <li>
      <ul class="v-select-group">
        <slot></slot>
      </ul>
    </li>
  </ul>
</template>
<script>
  export default {
    name: 'v-option-group',
    props: {
      label: String
    },
    methods: {
    } 
  }
</script>


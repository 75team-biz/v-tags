<template>
  <span
    :class="['v-tag', type?'v-tag--'+type:'']"
  >
    <span class="v-tag-label">
      <slot>
        {{value}}
      </slot>
    </span>
    <i v-if="closable" @click="close($event)" class="fa fa-times v-tag-close"></i>
  </span>
</template>

<script>
  export default {
    name: 'v-tag',
    props: {
      closable: {
        type: Boolean,
        default: false
      },
      value: String,
      type: String
    },
    methods: {
      close(e) {
        this.$emit('close', e);
      }
    }
  }
</script>


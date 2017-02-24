<template>
  <li>
    <p  @click="() => {this.isOpened = !this.isOpened;}">
      <slot>
      </slot>
    </p>
    <transition>
    <div v-show="isOpened">
      <slot name="tree-menu">
      </slot>
    </div>
    </transition>
  </li>
</template>

<script>
  export default {
    name: 'v-tree-group',
    props: {
      opened: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        isOpened: false
      }
    },
    created() {
      this.isOpened = this.opened;
    }
  }
</script>

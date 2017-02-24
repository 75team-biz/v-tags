<template>
  <li @click="handleClick">
    <slot>
    </slot>
  </li>
</template>
<script>
  export default {
    name: 'v-tree-item',
    props: {
      value: ''
    },
    computed: {
      tree() {
        let result = this.$parent;
        while (!result.isTree) {
          result = result.$parent;
        }
        return result;
      },
      selected() {
        return this.tree.value == this.value;
      }
    },
    methods: {
      handleClick() {
        !this.selected && this.tree.selectItem(this);
      }
    }
  }
</script>

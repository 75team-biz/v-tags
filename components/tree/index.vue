<template>
  <ul class="vue-tree">
    <tree-item v-for="d in data" :data="d" :folder-fold-icon="folderFoldIcon" :folder-unfold-icon="folderUnfoldIcon" :nofolder-icon="nofolderIcon" ></tree-item>
  </ul>
</template>

<script>
import TreeItem from "./tree-item.vue"

export default {
  name: 'v-tree',
  props: {
    data: {
      default: {}
    },
    unfold: {
      default: true
    },
    folderFoldIcon: {
      default: 'plus-square-o'
    },
    folderUnfoldIcon: {
      default: 'minus-square-o'
    },
    nofolderIcon: {
      default: 'circle-thin'
    }
  },
  components: {
    TreeItem
  },
  created () {
  }
}
</script>


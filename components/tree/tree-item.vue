<template>
<li>
  <div @click="toggle">
    <i :class="'fa fa-'+folderFoldIcon" v-if="(data.children && data.children.length) && !unfold"></i>
    <i :class="'fa fa-'+folderUnfoldIcon" v-if="(data.children && data.children.length) && unfold"></i>
    <i :class="'fa fa-'+nofolderIcon" v-if="!data.children || (data.children && !data.children.length)"></i>
    {{data.name}}
  </div>
  <ul v-if="data.children" v-show="unfold">
    <tree-item v-for="d in data.children" :data="d" :folder-fold-icon="folderFoldIcon" :folder-unfold-icon="folderUnfoldIcon" :nofolder-icon="nofolderIcon" ></tree-item>
  </ul>
</li>
</template>

<script>
export default {
  name: 'tree-item',
  props: {
    data: {
      default: {}
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
  data () {
    return {
      unfold: true
    }
  },
  methods: {
    toggle () {
      this.unfold = !this.unfold;
    }
  }
}
</script>

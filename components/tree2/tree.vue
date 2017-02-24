<template>
<div class="v-tree">
  <ul>
    <slot>
      <v-tree-group v-for="(group, index) in trees" :key="index" :opened="index == 0">
        {{group.name}}
        <v-tree-menu v-if="group.items && group.items.length" slot="tree-menu">
          <v-tree-item v-for="(item, index2) in group.items" :key="index2" :value="item.value">
            {{item.name}}
          </v-tree-item>
        </v-tree-menu>
      </v-tree-group>
    </slot>
  </ul>
</div>
</template>

<script>
  import VTreeGroup from './tree-group.vue'
  import VTreeMenu from './tree-menu.vue'
  import VTreeItem from './tree-item.vue'
  export default {
    name: 'v-tree',
    components: {
      'v-tree-group': VTreeGroup,
      'v-tree-menu': VTreeMenu,
      'v-tree-item': VTreeItem
    },
    props: {
      trees: {
        type: Array,
        default() {
          return [];
        }
      },
      value: ''
    },
    data() {
      return {
        isTree: true
      }
    },
    methods: {
      selectItem(item) {
        this.$emit('input', item.value);
      }
    }
  }
</script>

import VTree from './tree.vue'
import VTreeGroup from './tree-group.vue'
import VTreeMenu from './tree-menu.vue'
import VTreeItem from './tree-item.vue'

VTree.install = Vue => Vue.component(VTree.name, VTree);
VTreeGroup.install = Vue => Vue.component(VTreeGroup.name, VTreeGroup);
VTreeMenu.install = Vue => Vue.component(VTreeMenu.name, VTreeMenu);
VTreeItem.install = Vue => Vue.component(VTreeItem.name, VTreeItem);
export {VTree, VTreeGroup, VTreeMenu, VTreeItem};

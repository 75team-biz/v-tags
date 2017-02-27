# 树形列表 - Tree

树形列表组件（Tree）支持无限层级。

```vue
<v-tree :data="treeData"></v-tree>

<script>
  export default {
    data() {
      return {
        "treeData": [{
          "name": "一级菜单aaa",
          "children": [
            {
              "name": "aaa111",
              "children": [{
                "name": "aaa111aaa"
              },{
                "name": "aaa111bbb",
                "children": [{
                  "name": "aaa111bbb111"
                }]
              }]
            },{
              "name": "aaa222"
            },{
              "name": "aaa333",
              "children": [{
                "name": "aaa333aaa"
              }]
            }
          ]
        },{
          "name": "一级菜单bbb",
          "children": [{
            "name": "bbb111"
          }]
        },{
          "name": "一级菜单ccc"
        }]
      }
    }
  }
</script>
```


可定制显示图标：

* **folder-fold-icon**：可展开节点，收起时候的图标
* **folder-unfold-icon**：可展开节点，展开时候的图标
* **nofolder-icon**：不可展开节点的图标

```vue
<v-tree :data="treeData" folder-fold-icon="plus-circle" folder-unfold-icon="minus-circle" nofolder-icon="circle"></v-tree>

<script>
  export default {
    data() {
      return {
        "treeData": [{
          "name": "一级菜单aaa",
          "children": [
            {
              "name": "aaa111",
              "children": [{
                "name": "aaa111aaa"
              },{
                "name": "aaa111bbb",
                "children": [{
                  "name": "aaa111bbb111"
                }]
              }]
            },{
              "name": "aaa222"
            },{
              "name": "aaa333",
              "children": [{
                "name": "aaa333aaa"
              }]
            }
          ]
        },{
          "name": "一级菜单bbb",
          "children": [{
            "name": "bbb111"
          }]
        },{
          "name": "一级菜单ccc"
        }]
      }
    },
    methods: {
    }
  }
</script>
```


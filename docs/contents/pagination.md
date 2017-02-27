# 分页 - Pagination

`v-pagination`为您的网站或应用提供带有展示页码的分页组件，默认从第一页开始，有以下可设置属性：

* **total**：记录的总条数，必填项。
* **pn**：当前页码。选填，默认为`1`。
* **ps**：每页显示条数。选填，默认为`20`。

```vue
<v-pagination :total="116"></v-pagination>
```
### 高级用法

* **span**：当页码太多时，我们希望省略显示一部分页码，只显示当前页码前后的几个页码及起始和结束页码即可。`span`提供此功能，默认为`3`，即除了起始页码和结束页码，当前页码前后最多显示3个页码。

下面这个例子，是设置`total=200`、`pn=13`、`ps=10`、`span=2`时的显示
```vue
<v-pagination :total="200" :pn="13" :ps="10" :span="2"></v-pagination>
```

### 事件

* **updatepage**：切换页面时，触发该事件。一般用来异步获取当前页数据。

```vue
<v-pagination :total="200" :pn="pn" :ps="10" @updatepage="getPageData"></v-pagination>

<script>
  export default {
    data() {
      return {
        pn: 1
      }
    },
    methods: {
      getPageData(pn) {
        this.pn = pn || 1;  //此处需要手动更新pn
        // Ajax 获取 pn 页的数据
        alert(`获取第${this.pn}页数据。`);
      }
    }
  }
</script>
```

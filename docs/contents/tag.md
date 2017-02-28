# Tag 标签


### 简单用法

可用于博客标签

```vue
<v-tag>标签一</v-tag>
<v-tag type="gray">标签二</v-tag>
<v-tag type="primary">标签三</v-tag>
<v-tag type="success">标签四</v-tag>
<v-tag type="warning">标签五</v-tag>
<v-tag type="danger">标签六</v-tag>
```

### 可关闭

通过 `closable` 属性，可以设置是否能关闭。

```vue
<v-tag v-for="(tag, index) in tags" :closable="tag.closable || false" :type="tag.type || 'normal'" :key="index" @close="close(index)">{{tag.label}}</v-input>
<script>
  export default {
    data() {
      return {
        tags: [{
          label: '标签一',
          closable: true
        }, {
          label: '标签二',
          type: 'gray',
          closable: false
        }, {
          label: '标签三',
          type: 'primary',
          closable: true
        }, {
          label: '标签四',
          type: 'success',
          closable: true
        }, {
          label: '标签五',
          type: 'warning',
          closable: true
        }, {
          label: '标签六',
          type: 'danger',
          closable: false
        }]
      }
    },
    methods: {
      close(index) {
        this.tags.splice(index, 1);
      }
    }
  }
</script>
```

### 不同状态的输入框

默认的输入框是可以输入的正常状态，它也可以被设置成只读或禁用状态。

```vue
<v-input placeholder="正常"></v-input>
<v-input readonly placeholder="只读"></v-input>
<v-input disabled placeholder="禁用"></v-input>
```



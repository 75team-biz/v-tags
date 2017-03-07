# suggest 可搜索选择器

可搜索选择器.

### 简单应用

最简单的使用场景下，只需通过 `v-model` 属性给 `v-suggest` 绑定一个模型即可。

```vue
<v-form>
  <v-form-item label="选择您喜欢的运动" :required="true">
    <v-suggest v-model="favouriteSport" :suggestions="options" :rules="rules"></v-suggest>
  </v-form-item>
</v-form>
<span>您的选择是：{{favouriteSport}}</span>
<script>
  export default {
    data() {
      return {
        options: [{
          label: '篮球',
          value: '篮球'
        }, {
          label: '排球',
          value: '排球'
        }, {
          label: '跑步',
          value: '跑步'
        }],
        favouriteSport: '篮球',
        rules: {
          required: true
        }
      }
    }
  }
</script>
```

### 其它属性

HTML 中 `suggest` 元素的某些属性，可以在本组件中使用，他们是：
* **placeholder**: 占位文字
* **filter**: 过滤函数

```vue
<v-form>
  <v-form-item label="选择您喜欢的运动" :required="true">
    <v-suggest placeholder="请选择" v-model="favouriteSport" :suggestions="options" :filter="filter"></v-suggest>
  </v-form-item>
</v-form>
<span>您的选择是：{{favouriteSport}}</span>
<script>
  export default {
    data() {
      return {
        options: [{
            label: '篮球',
            value: '篮球'
          }, {
            label: '排球',
            value: '排球'
        }, {
            label: '慢跑',
            value: '慢跑'
          }, {
            label: '瑜伽',
            value: '瑜伽',
            disabled: true
          }, {
            label: '游泳',
            value: '游泳'
        }],
        filter(suggestItem, text) {
          return suggestItem.currentLabel.indexOf(text) > -1;
        },
        favouriteSport: ''
      }
    }
  }
```


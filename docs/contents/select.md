# Select 选择器

选择框，内置了验证功能。

### 最简单的输入器

最简单的使用场景下，只需通过 `v-model` 属性给 `v-select` 绑定一个模型即可。

```vue
<v-form>
  <v-form-item label="选择您喜欢的运动" :required="true">
    <v-select v-model="favouriteSport" :options="options" :rules="rules"></v-select>
  </v-form-item>
</v-form>
<span>您的选择是：{{favouriteSport}}</span>
<script>
  export default {
    data() {
      return {
        options: [{
          label: '请选择',
          value: ''
        }, {
          label: '篮球',
          value: '篮球'
        }, {
          label: '排球',
          value: '排球'
        }, {
          label: '跑步',
          value: '跑步'
        }],
        favouriteSport: '',
        rules: {
          required: true
        }
      }
    }
  }
</script>
```

### 带有禁用项和有分组的选择器

通过设置options来添加分组或禁用项

```vue
<v-form>
  <v-form-item label="选择您喜欢的运动" :required="true">
    <v-select v-model="favouriteSport" :options="options" :rules="rules"></v-select>
  </v-form-item>
</v-form>
<span>您的选择是：{{favouriteSport}}</span>
<script>
  export default {
    data() {
      return {
        options: [{
          label: '请选择',
          value: ''
        }, {
          label: '球类',
          options: [{
            label: '篮球',
            value: '篮球'
          }, {
            label: '排球',
            value: '排球'
          }]
        }, {
          label: '有氧',
          options: [{
            label: '慢跑',
            value: '慢跑'
          }, {
            label: '瑜伽',
            value: '瑜伽',
            disabled: true
          }, {
            label: '游泳',
            value: '游泳'
          }]
        }],
        favouriteSport: '',
        rules: {
          required: true
        }
      }
    }
  }
</script>

```

### 自定义内容

自定义内容时用到v-option-group和v-option组件，如果不是全量引入的v-tags，请额外引入

```vue
<v-form>
  <v-form-item label="选择您喜欢的运动" :required="true">
    <v-select v-model="favouriteSport" :options="options" :rules="rules">
    <template v-for="(option, key) in options">
      <v-option v-if="!option.options" :key="key" :disabled="option.disabled" :label="option.label" :value="option.value">
        <span style="float: left;">{{option.label}}</span><span style="float: right;">{{option.en}}</span>
      </v-option>
      <v-option-group v-else :key="key" :label="option.label">
        <v-option v-for="(item, index) in option.options" :key="index" :disabled="item.disabled" :label="item.label" :value="item.value">
          <span style="float: left;">{{item.label}}</span><span style="float: right;">{{item.en}}</span>
        </v-option>
      </v-option-group>
    </template>
    </v-select>
  </v-form-item>
</v-form>
<span>您的选择是：{{favouriteSport}}</span>
<script>
  export default {
    data() {
      return {
        options: [{
          label: '请选择',
          value: ''
        }, {
          label: '球类',
          options: [{
            label: '篮球',
            value: '篮球',
            en: 'basketball'
          }, {
            label: '排球',
            value: '排球',
            en: 'volleyball'
          }]
        }, {
          label: '有氧',
          options: [{
            label: '慢跑',
            value: '慢跑',
            en: 'run'
          }, {
            label: '瑜伽',
            value: '瑜伽',
            en: 'yoga',
            disabled: true
          }, {
            label: '游泳',
            value: '游泳',
            en: 'swimming'
          }]
        }],
        favouriteSport: '',
        rules: {
          required: true
        }
      }
    }
  }
```

### 多选
加multiple设置，可以改为多选的选择器

```vue
<v-form>
  <v-form-item label="选择您喜欢的运动" :required="true">
    <v-select multiple v-model="favouriteSport" :options="options" :rules="rules"></v-select>
  </v-form-item>
</v-form>
<span>您的选择是：{{favouriteSport}}</span>
<script>
  export default {
    data() {
      return {
        options: [{
          label: '球类',
          options: [{
            label: '篮球',
            value: '篮球'
          }, {
            label: '排球',
            value: '排球'
          }]
        }, {
          label: '有氧',
          options: [{
            label: '慢跑',
            value: '慢跑'
          }, {
            label: '瑜伽',
            value: '瑜伽',
            disabled: true
          }, {
            label: '游泳',
            value: '游泳'
          }]
        }],
        favouriteSport: '',
        rules: {
          required: true
        }
      }
    }
  }
```

### 其它属性

HTML 中 `select` 元素的某些属性，可以在本组件中使用，他们是：
* **disabled**: 是否禁用选择器
* **placeholder**: 占位文字

```vue
<v-form>
  <v-form-item label="选择您喜欢的运动" :required="true">
    <v-select placeholder="请选择" disabled multiple v-model="favouriteSport" :options="options"></v-select>
  </v-form-item>
</v-form>
<span>您的选择是：{{favouriteSport}}</span>
<script>
  export default {
    data() {
      return {
        options: [{
          label: '球类',
          options: [{
            label: '篮球',
            value: '篮球'
          }, {
            label: '排球',
            value: '排球'
          }]
        }, {
          label: '有氧',
          options: [{
            label: '慢跑',
            value: '慢跑'
          }, {
            label: '瑜伽',
            value: '瑜伽',
            disabled: true
          }, {
            label: '游泳',
            value: '游泳'
          }]
        }],
        favouriteSport: ''
      }
    }
  }
```


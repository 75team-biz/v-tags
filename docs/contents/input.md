# Input 文本输入框

文本输入框，内置了输入验证功能。

## 文字输入

### 最简单的输入框

最简单的使用场景下，只需通过 `v-model` 属性给 `v-input` 绑定一个模型即可。

```vue
<v-input v-model="userName" placeholder="请输入用户名"></v-input>
<span v-if="userName">Hello {{userName}}!</span>

<script>
  export default {
    data() {
      return {
        userName: ''
      }
    }
  }
</script>
```

### 不同尺寸的输入框

通过 `size` 属性，可以指定输入框的尺寸。

```vue
<v-input size="small"></v-input>
<v-input size="normal"></v-input>
<v-input size="big"></v-input>
```

### 不同状态的输入框

默认的输入框是可以输入的正常状态，它也可以被设置成只读或禁用状态。

```vue
<v-input placeholder="正常"></v-input>
<v-input readonly placeholder="只读"></v-input>
<v-input disabled placeholder="禁用"></v-input>
```

### 多行文本输入框

类似于 `textarea`，可以通过 `rows` 属性指定显示的高度。

```vue
<v-input type="textarea" :rows="3"></v-input>
```

### 其它属性

HTML 中 `input` 元素的某些属性，可以在本组件中使用，他们是：

* **type**：输入框类型，可以是 `text`、`number`、`url` 等 HTML5 中的 `input` 类型。
* **placeholder**：占位文字，和 `input` 中的此属性含义相同。
* **maxlength**：最大输入长度。

## 表单验证

`v-input` 内置了输入验证的功能，可以对用户的输入实时进行检查，并给出错误提示。验证规则通过 `rules` 属性指定，它的值是一个对象。

### required 必填

在下面的例子中，通过设置 `required: true` 来进行必填检查。

```vue
<v-input v-model="userName" :rules="rules"></v-input>

<script>
  export default {
    data() {
      return {
        userName: '删了我试试~',
        rules: {
          required: true
        }
      }
    }
  }
</script>
```

### 使用 minlength 和 maxlength 验证输入长度

```vue
<v-input v-model="userName" :rules="rules" placeholder="输入2到8位字符"></v-input>

<script>
  export default {
    data() {
      return {
        userName: '',
        rules: {
          required: true,
          minlength: 2,
          maxlength: 8
        }
      }
    }
  }
</script>
```

### 常用格式验证

一些常用的数据格式，比如邮箱、URL、手机号码等，可以通过指定 `type` 来验证。

```vue
<v-input v-model="mail" :rules="{ type: 'email' }" placeholder="邮箱"></v-input>
<v-input v-model="mobNum" :rules="{ type: 'mobile' }" placeholder="手机号"></v-input>

<script>
  export default {
    data() {
      return {
        mail: '',
        mobNum: ''
      }
    }
  }
</script>
```

目前支持的 `type` 值为：

* **email**：邮箱
* **mobile**：手机号码
* **tel**：固定电话号码
* **number**：数字
* **integer**：整数

### 正则表达式验证

用来验证用户输入是否符合通过 `pattern` 属性指定的正则表达式。例如：

```vue
<v-input v-model="id" :rules="rules" placeholder="请输入六位数字"></v-input>

<script>
  export default {
    data() {
      return {
        id: '',
        rules: {
          pattern: /^\d{6}$/
        }
      }
    }
  }
</script>
```

### 自定义错误提示

在指定规则时，可以通过给规则对象添加 `msg` 属性来实现自定义消息。

```vue
<v-input v-model="id" :rules="rules" placeholder="2-6个字"></v-input>

<script>
  export default {
    data() {
      return {
        id: '',
        rules: {
          required: true,
          minlength: 2,
          maxlength: 6,
          msg: '请输入2-6个字符哦～'
        }
      }
    }
  }
</script>
```

在上面的例子中，不管发生了哪种类型的格式错误，都会显示固定的错误消息。你也可以针对不同类型的错误，显示不同的消息：

```vue
<v-input v-model="id" :rules="rules" placeholder="2-6个字"></v-input>

<script>
  export default {
    data() {
      return {
        id: '',
        rules: {
          required: true,
          minlength: 2,
          maxlength: 6,
          msg: {
            required: '不填可不行哦～',
            minlength: '一个字太少了吧～',
            maxlength: '不能超过6个字～'
          }
        }
      }
    }
  }
</script>
```

### JavaScript 接口

如果你想通过 JavaScript 获取到某个输入框的输入有效性，可以获取到 `v-input` 组件的引用，然后调用该组件上的 `validate` 方法。

该方法返回结果是一个对象，包括 `valid` 和 `msg` 两个字段，分别表示是否合法以及错误提示。

```vue
<v-input v-model="id" :rules="rules" placeholder="请输入六位数字" ref="input"></v-input>
<button @click="onClick" class="btn btn-primary">检查输入有效性</button>

<script>
  export default {
    data() {
      return {
        id: '',
        rules: {
          required: true,
          pattern: /^\d{6}$/
        }
      }
    },
    methods: {
      onClick: function(e) {
        var validity = this.$refs.input.validate();
        if (validity.valid) {
          alert('输入正确');
        } else {
          alert('输入错误：' + validity.msg)
        }
      }
    }
  }
</script>
```





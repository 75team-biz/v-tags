# Form 表单

## 表单验证

通过调用 `v-form` 的 `isValid()` 方法可以触发一次对表单内所有字段的验证，并返回验证结果（`true` 或 `false`）。

如果想清除验证的错误消息，可以调用 `resetValidity()` 方法。

```vue
<v-form v-model="item" ref="form">
  <v-form-item label="名称" required="true">
    <v-input v-model="item.title" placeholder="请输入2-10个字" :rules="rules.title"></v-input>
  </v-form-item>
  <v-form-item label="价格">
    <v-input v-model="item.price" placeholder="0.01-99999的数字" :rules="rules.price"></v-input>
  </v-form-item>
  <v-form-item>
      <button type="button" class="btn btn-primary" @click="validate">验证表单</button>
      <button type="button" class="btn btn-primary" @click="reset">清除错误</button>
  </v-form-item>
</v-form>

<script>
  export default {
    data: {
      item: {
        title: '',
        price: ''
      },
      rules: {
        title: {
          required: true,
          minlength: 2,
          maxlength: 10
        },
        price: {
          required: true,
          type: 'number',
          min: 0.01,
          max: 999999
        }
      }
    },
    methods: {
      validate() {
        this.$refs.form.isValid();
      },
      reset() {
        this.$refs.form.resetValidity();
      },
    }
  }
</script>
```

### 自定义表单验证

```vue
<v-form>
  <v-form-item label="最好的编程语言" required="true">
    <v-input v-model="lang" :rules="rules.lang"></v-input>
  </v-form-item>
  <v-form-item>
      <button class="btn btn-primary">验证表单</button>
  </v-form-item>
</v-form>

<script>
  export default {
    data: {
      lang: '',
      rules: {
        lang: {
          required: true,
          minlength: 2,
          maxlength: 10,
          answer: function(val) {
            const valid = val.toLowerCase() == 'php'
            return {
              valid,
              msg: valid ? '' : '填写错了'
            }
          }
        },
      }
    }
  }
</script>
```


## Ajax 表单提交

表单不仅将 `FormItem` 封装到一个容器里面，它还实现了一些常用的表单逻辑，比如对于 `type` 为 `ajax` 类型的表单：

1. `@submit` 时进行输入校验
2. 校验通过后，将 `v-model` 传入的数据发送到由 `action` 指定的接口
3. 阻止用户重复提交
4. 判断返回结果的 `errno`，如果不为空则显示错误消息；否则向上发出 `success` 事件供使用者处理后续逻辑
5. `beforeSubmit` 提交表单之前，可以使用该函数处理数据，例如验证数据是否合法，或将数据进行重组。该函数返回 `false` 则终止表单提交；返回 `true` 则提交 `v-model` 传入的数据；也可以返回一个数据重组之后的 JSON 对象用于表单提交

下面是一个简单的例子，可以输入不同的值试试：

```vue
<v-form action="http://www.mocky.io/v2/582ea4f12600003e0465effa" v-model="item" @success="success">
  <v-form-item label="名称" required="true">
    <v-input v-model="item.title" placeholder="请输入2-10个字" :rules="rules.title"></v-input>
  </v-form-item>
  <v-form-item label="价格">
    <v-input v-model="item.price" placeholder="0.01-99999的数字" :rules="rules.price"></v-input>
  </v-form-item>
  <v-form-item>
      <button type="submit" class="btn btn-primary">提交</button>
  </v-form-item>
</v-form>

<script>
  export default {
    data: {
      item: {
        title: '',
        price: ''
      },
      rules: {
        title: {
          required: true,
          minlength: 2,
          maxlength: 10
        },
        price: {
          required: true,
          type: 'number',
          min: 0.01,
          max: 999999
        }
      }
    },
    methods: {
      success: function() {
        alert('提交成功啦')
      }
    }
  }
</script>
```

> 注意：Form 组件依赖 `Vue-Resouce` 发送 Ajax 请求。

## beforeSubmit 函数

```vue
<v-form action="http://www.mocky.io/v2/582ea4f12600003e0465effa" v-model="item" @success="success" :before-submit="beforeSubmit">
  <v-form-item label="名称" required="true">
    <v-input v-model="item.title" placeholder="请输入2-10个字" :rules="rules.title"></v-input>
  </v-form-item>
  <v-form-item label="价格">
    <v-input v-model="item.price" placeholder="0.01-99999的数字" :rules="rules.price"></v-input>
  </v-form-item>
  <v-form-item>
      <button type="submit" class="btn btn-primary">提交</button>
  </v-form-item>
</v-form>

<script>
  export default {
    data: {
      item: {
        title: '',
        price: ''
      },
      rules: {
        title: {
          required: true,
          minlength: 2,
          maxlength: 10
        },
        price: {
          required: true,
          type: 'number',
          min: 0.01,
          max: 999999
        }
      }
    },
    methods: {
      beforeSubmit : function() {
        let data = {
          title: this.item.title + 'v-tags',
          price: this.item.price + '元'
        };
        alert('beforeSubmit 中处理之后的数据：'+JSON.stringify(data));
        return data;
      },
      success: function() {
        alert('提交成功啦')
      }
    }
  }
</script>
```

## 普通表单

如果不想让组件进行 Ajax 提交，可以将表单的 `type` 设置为 `form`。比如下面例子中的表单采用的就是 HTML 默认的表单提交行为：

```vue
<v-form action="http://www.mocky.io/v2/582ea4f12600003e0465effa" type="form">
  <v-form-item label="名称" required="true">
    <v-input v-model="item.title" name="title" placeholder="请输入2-10个字" :rules="rules.title"></v-input>
  </v-form-item>
  <v-form-item label="价格">
    <v-input v-model="item.price" name="price" placeholder="0.01-99999的数字" :rules="rules.price"></v-input>
  </v-form-item>
  <v-form-item>
      <button type="submit" class="btn btn-primary">提交</button>
  </v-form-item>
</v-form>

<script>
  export default {
    data: {
      item: {
        title: '',
        price: ''
      },
      rules: {
        title: {
          required: true,
          minlength: 2,
          maxlength: 10
        },
        price: {
          required: true,
          type: 'number',
          min: 0.01,
          max: 999999
        }
      }
    }
  }
</script>
```

## 其它设置

### label 设置

`label-suffix` 是 `label` 后面添加的字符，默认为 `：`。如果你想去掉，可以将其设置为空。

```vue
<v-form label-suffix="">
  <v-form-item label="名称">
    <v-input v-model="item.title"></v-input>
  </v-form-item>
  <v-form-item label="价格">
    <v-input v-model="item.price"></v-input>
  </v-form-item>
</v-form>

<script>
  export default {
    data: {
      item: {
        title: '',
        price: ''
      }
    }
  }
</script>
```



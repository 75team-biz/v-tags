# Form Item 表单项

## 基本用法

使用 `v-form-item` 元素表示一个表单项，它里面可以放输入框等元素。它可以配置如下属性：

* **label**：表单项的说明
* **required**：是否必填项，如果是必填项，则在 label 前显示 _*_


```vue
<form class="form "@submit="submit">
  <v-form-item label="邮箱地址" required="true">
    <v-input v-model="userName" placeholder="请输入邮箱地址"></v-input>
  </v-form-item>
  <v-form-item label="密码">
    <v-input v-model="userName" placeholder="请输入密码"></v-input>
  </v-form-item>
  <v-form-item>
      <button type="submit" class="btn btn-primary">提交</button>
  </v-form-item>
</form>

<script>
  export default {
    data: {
      userName: '',
      password: ''
    },
    methods: {
      submit: function(e) {
        e.preventDefault();
      }
    }
  }
</script>
```

## 自定义设置

表单（Form）组件中的 `labelSuffix` 可以控制 label 后面是否自动加冒号 `：`，具体使用方法请参考 [Form](#/form)。



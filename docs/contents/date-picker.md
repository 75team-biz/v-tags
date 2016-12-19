# 日期选择器 - DatePicker

`DatePicker`是日期组件，默认日期为今天，默认最小日期为`1970-01-01`，默认最大日期为`2099-12-31`，默认日期格式为`2016-12-12`。

```vue
<v-date-picker v-model="date"></v-date-picker>

<script>
  export default {
    data() {
      return {
        date: ''
      }
    }
  }
</script>
```

可以直接通过 `v-model` 设置日期组件的初始值。

```vue
<v-date-picker v-model="date"></v-date-picker>

<script>
  export default {
    data() {
      return {
        date: '2016-12-09'
      }
    }
  }
</script>
```

可以设置日期组件的最小日期和最大日期：

* **min-date**: 最小日期，默认为 `1970-01-01`
* **max-date**: 最大日期，默认为 `2099-12-31`

```vue
<v-date-picker v-model="date" :min-date="minDate" :max-date="maxDate"></v-date-picker>

<script>
  export default {
    data() {
      return {
        date: '2016-12-09',
        minDate: '2010-04-10',
        maxDate: '2020-11-01'
      }
    }
  }
</script>
```

可以设置日期组件的日期格式：

* **pattern**: 日期格式，例如 `yyyy-MM-dd`，`yyyy/MM/dd` 等常见的日期格式

```vue
<v-date-picker v-model="date" :min-date="minDate" :max-date="maxDate" :pattern="pattern"></v-date-picker>

<script>
  export default {
    data() {
      return {
        date: '2016-12-09',
        minDate: '2010-03-10',
        maxDate: '2020-11-01',
        pattern: 'yyyy/MM/dd'
      }
    }
  }
</script>
```

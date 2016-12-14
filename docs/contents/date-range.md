# 日期范围选择器 - DateRange

`DateRange`是选择日期范围组件。可以通过

* **start-date**：开始日期
* **end-date**：结束日期

* **update**：更新日期函数，其中参数 date 会返回一个对象，对象中有 `startDate` 和 `endDate` 的值。

```vue
<v-date-range :start-date="startDate" :end-date="endDate" @update="update"></v-date-range>

<script>
  export default {
    data() {
      return {
        startDate: '2016-07-03',
        endDate: '2017-12-10'
      }
    },
    methods: {
      update(date) {
        this.startDate = date.startDate;
        this.endDate = date.endDate;
      }
    }
  }
</script>
```

* **shortcut**：是否显示选择日期范围的快捷操作，默认值为 `false`

```vue
<v-date-range :start-date="startDate" :end-date="endDate" @update="update" :shortcut="shortcut"></v-date-range>

<script>
  export default {
    data() {
      return {
        startDate: '2016-07-03',
        endDate: '2017-12-10',
        shortcut: true
      }
    },
    methods: {
      update(date) {
        this.startDate = date.startDate;
        this.endDate = date.endDate;
      }
    }
  }
</script>
```

# Radio Group

```vue
<v-form>
  <v-radio-group
    name="size"
    v-model="size"
    :options="[
      { value: 1, title: '小号' },
      { value: 2, title: '中号' },
      { value: 3, title: '大号' },
      { value: 4, title: '超大号', disabled: true }
    ]"
    :required="true"
  ></v-radio-group>
</v-form>

<script>
  export default {
    data: {
      size: ''
    }
  }
</script>
```

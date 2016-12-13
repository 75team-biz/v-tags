# Checkbox Group

```vue
<v-form>
  <v-checkbox-group
    v-model="selected"
    :options="[
      { value: 1, title: '小号' },
      { value: 2, title: '中号' },
      { value: 3, title: '大号' },
      { value: 4, title: '超大号', disabled: true }
    ]"
    :required="true"
  ></v-checkbox-group>
  <p>Selected: {{selected}}</p>
</v-form>

<script>
  export default {
    data: {
      selected: [1, 3]
    }
  }
</script>
```

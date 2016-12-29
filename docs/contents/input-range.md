# 范围选择器 - InputRange

给定一个范围，选择其中某个数值。

* **scale** 数组类型，设置范围选择器的范围，默认值为 `[0,100]`，还可设置 `[0,5,10,15,20]`，其中数组第一值为最小值，最后一个值为最大值，数组中每个值都是范围选择器的刻度。
* **step** Float 类型，设置每次滑块的最小移动值，默认值为 `1`，支持输入小数。
* **slot** 在 `v-input-range` 标签中间，可以输入文字，在选择器提示的气泡上显示。
* **disabled** `true`: 组件可用状态 `false`：组件禁用状态


## 最简单范围选择器

最简单的使用场景下，只需通过 `v-model` 属性给 `v-input-range` 绑定一个模型即可。默认范围为 `0-100`，默认值为 `50`。

```vue
<v-input-range v-model="value"></v-input-range>

您选择的值为：{{value}}

<script>
  export default {
    data() {
      return {
        value: ''
      }
    }
  }
</script>
```

## 设置初始值

通过 `v-model` 属性给 `v-input-range` 绑定，例如，设置初始选择值为 `80`。

```vue
<v-input-range v-model="value"></v-input-range>

您选择的值为：{{value}}

<script>
  export default {
    data() {
      return {
        value: '80'
      }
    }
  }
</script>
```

## 设置范围

通过 `scale` 属性，可以设置选择器的范围，例如 `[0,200]`。

* **scale** 数组类型，必填项，设置范围选择器的范围，数组第一值为最小值，最后一个值为最大值，数组中每个值都是范围选择器的刻度。

```vue
<v-input-range v-model="value" :scale="scale"></v-input-range>

您选择的值为：{{value}}

<script>
  export default {
    data() {
      return {
        value: '',
        scale: [0,200]
      }
    }
  }
</script>
```

## 设置刻度

通过 `scale` 属性，可以设置选择器的刻度，例如 `[0,50,100,150,200]`。


```vue
<v-input-range v-model="value" :scale="scale"></v-input-range>

您选择的值为：{{value}}

<script>
  export default {
    data() {
      return {
        value: '',
        scale: [50,100,150,200]
      }
    }
  }
</script>
```

## 设置Step

通过 `step` 属性，可以设置选择器每次移动的最小值。

```vue
<v-input-range v-model="value" :scale="scale" :step="step"></v-input-range>

您选择的值为：{{value}}

<script>
  export default {
    data() {
      return {
        value: 120,
        scale: [0,50,100,150,200],
        step: 10
      }
    }
  }
</script>
```

 `step` 属性支持小数，比如 `0.1`。

```vue
<v-input-range v-model="value" :scale="scale" :step="step"></v-input-range>

您选择的值为：{{value}}

<script>
  export default {
    data() {
      return {
        value: 0.3,
        scale: [0,0.5,1,1.5,2],
        step: 0.1
      }
    }
  }
</script>
```

 `step` 属性支持小数，比如 `0.02`。

```vue
<v-input-range v-model="value" :scale="scale" :step="step"></v-input-range>

您选择的值为：{{value}}

<script>
  export default {
    data() {
      return {
        value: 0.48,
        scale: [0,0.1,0.2,0.5,0.8,1],
        step: 0.02
      }
    }
  }
</script>
```

## 设置气泡提示

在 `v-input-range` 标签之间添加文字，显示在提示气泡的数值之后。

```vue
<v-input-range v-model="value" :scale="scale">倍</v-input-range>

您选择的值为：{{value}}

<script>
  export default {
    data() {
      return {
        value: 15,
        scale: [1,3,6,9,12,15,18]
      }
    }
  }
</script>
```

```vue
<v-input-range v-model="value" :scale="scale">%</v-input-range>

您选择的值为：{{value}}

<script>
  export default {
    data() {
      return {
        value: 66,
        scale: [0,20,40,60,80,100]
      }
    }
  }
</script>
```

## 禁用选择

```vue
<v-input-range v-model="value" :scale="scale" :disabled="disabled">%</v-input-range>

您选择的值为：{{value}}

<script>
  export default {
    data() {
      return {
        value: 66,
        scale: [0,20,40,60,80,100],
        disabled: true
      }
    }
  }
</script>
```

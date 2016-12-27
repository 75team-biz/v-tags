# Tooltip 提示组件

Tooltip 是简单的文本提示组件，当鼠标移入时显示。

### 最简单场景
最简单的使用场景下，只需给 `tip` 传入文本即可。
```vue
鼠标放在问号上试试~
<v-tooltip tip="V-tags: UI components based on Vue.js 2.0">
  <i class="fa fa-question-circle-o"></i>
</v-tooltip>

```

### 不同提示位置
通过 `pos` 属性，可以指定提示文本的位置。
* **pos**：可选值为`top`，`bottom`，`left`，`right`，默认值为 `top`

```vue
<v-tooltip tip="提示默认出现在元素的上方，不用设置 pos 也是这个效果。">
  <button class="btn">Top</button>
</v-tooltip>


<v-tooltip tip="Bottom" pos="bottom">
  <button class="btn">Bottom</button>
</v-tooltip>


<v-tooltip tip="左边" pos="left">
  <button class="btn">Left</button>
</v-tooltip>


<v-tooltip tip="右边" pos="right">
  <button class="btn">Right</button>
</v-tooltip>

```

### 不同尺寸的提示
通过 `max-width` 属性，可以指定提示文本的宽度。
* **max-width**：默认值为 `200px`，设置时注意需要带上单位，例如 `px`。

```vue
<v-tooltip tip="当宽度设置为 150px 时，如果文字超出则会折行。" max-width="150px">
  <span>提示内容宽度设置为 150px</span>
</v-tooltip>

```

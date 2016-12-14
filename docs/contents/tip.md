# Tip 提示组件

最简单的使用场景下，只需要给 `tip` 传入文本即可。
```vue
<span>鼠标放在问号上试试~</span>
<v-tip tip="V-tags: UI components based on Vue.js 2.0"></v-tip>

```

### 不同提示位置
通过 `pos` 属性，可以指定提示文本的位置。
* **pos**：可选值为`top`，`bottom`，`left`，`right`，默认值为 `right`

```vue
<div>上部<v-tip tip="提示出现在问号上面。" pos="top"></v-tip></div>

<div>底部<v-tip tip="Bottom" pos="bottom" width="50px"></v-tip></div>

<div>左边<v-tip tip="左边" pos="left" width="50px"></v-tip></div>

<div>右边<v-tip tip="右边是默认值，不用设置也是这个效果。" pos="right"></v-tip></div>

```

### 不同尺寸的提示
通过 `width` 属性，可以指定提示文本的宽度。
* **width**：默认值为 `250px`，设置时注意需要带上 `px`。

```vue
<span>提示内容宽度设置为 200px</span>
<v-tip tip="当宽度设置为 200px 时，如果文字超出则会折行。" width="150px"></v-tip>

```

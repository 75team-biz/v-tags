# 在项目中使用 V-tags

## 使用 ES6 方式

```javascript
// 使用部分组件
import { Input, Form, FormItem } from 'v-tags'
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)

// 也可以一次性引入全部组件
import VTags from 'v-tags'
Vue.use(VTags)
```

## 在浏览器中直接使用

```javascript
Vue.use(VTags.Input)
Vue.use(VTags.Form)

// 或者一次性使用全部组件
Vue.use(VTags);
```

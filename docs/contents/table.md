# Table 组件

`v-table` 组件配置好 url 即可动态获取表格中的数据，组件默认自带分页功能。

### 简单用法

- **url**: 获取数据的 API
- **list**：用于在模板中遍历和展示数据
- **needpagination**: 布尔值，表示 table 是否分页，默认为 `true`
- **updatedata**：获取数据之后更新方法（因为 vue 2.0 取消 sync）

```vue
<v-table :url="api" :list="list" @updatedata="updateData" :needpagination="false">
  <table class="data-table">
      <thead>
          <tr>
              <th>ID</th>
              <th>名字</th>
              <th>邮箱</th>
              <th>操作</th>
          </tr>
      </thead>
      <tbody v-if="list &&  list.length > 0" >
      <tr v-for="item in list">
          <td>{{item.id}}</td>
          <td>{{item.name}}</td>
          <td>{{item.email}}</td>
          <td>删除</td>
      </tr>
      </tbody>
      <tbody v-else>
      <tr>
          <td colspan="4">无数据</td>
      </tr>
      </tbody>
  </table>
</v-table>

<script>
  export default {
    data() {
      return {
        api: "https://jsonplaceholder.typicode.com/users",
        list: []
      }
    },
    methods: {
      updateData(data) {
        this.list = data;
      }
    }
  }
</script>
```


### 分页用法

**需要服务端接口支持分页查询，目前还不支持前端分页。**

- **needpagination**: 布尔值，表示 table 是否分页，默认为 `true`
- **pn**：对应分页组件的参数 `pn`，表示每页数据的条数，默认是 `20`
- **datafilter**： 数据处理函数，如果不符合组件默认的返回格式，可使用此方法做格式转换

```vue
<v-table :url="api" :list="list" @updatedata="updateData" :datafilter="dealData">
  <table class="data-table">
      <thead>
          <tr>
              <th>用户ID</th>
              <th>ID</th>
              <th>标题</th>
              <th>操作</th>
          </tr>
      </thead>
      <tbody v-if="list &&  list.length > 0" >
      <tr v-for="item in list">
          <td>{{item.userId}}</td>
          <td>{{item.id}}</td>
          <td>{{item.title}}</td>
          <td>删除</td>
      </tr>
      </tbody>
      <tbody v-else>
      <tr>
          <td colspan="4">无数据</td>
      </tr>
      </tbody>
  </table>
</v-table>

<script>
  export default {
    data() {
      return {
        api: "https://jsonplaceholder.typicode.com/albums",
        list: [],
        total: 0
      }
    },
    methods: {
      dealData(data) {
        return {
          list: data.slice(0,20),
          total: data.length
        }
      },
      updateData(data) {
        this.list = data.list;
        this.total = data.total;
      }
    }
  }
</script>
```

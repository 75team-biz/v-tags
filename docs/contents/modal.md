# 模态框 - Modal

模态框（Modal）是覆盖在父窗体上的子窗体。通常，目的是显示来自一个单独的源的内容，可以在不离开父窗体的情况下有一些互动。子窗体可提供信息、交互等。

## Modal

我们需要在父组件里面定义一个Boolean值`modalVisible`，传给`v-modal`组件来控制弹出框的显示和隐藏。

点击模态框右上角的关闭按钮时，组件内部将执行`$emit("closemodal")`自定义事件，所以我们可以在父组件里通过触发`@closemodal`来执行回调函数。

自定义内容可以直接写在`v-modal`标签中，需要的传值有两个：

* **title**：模态框的标题。
* **subTitle**：模态框的副标题。
* **visible**：控制模态框的显隐，`true`或者`false`。

```vue
<input class="btn btn-primary" type="button" value="show Modal" @click="modalVisible = true">
<v-modal :visible="modalVisible" title="Modal Title" sub-title="(Sub Title)" @closemodal="shutModal">
    <div class="modal-content">You can do something here ...</div>
    <div class="btn-wrap">
        <input class="btn btn-primary btn-medium" type="button" value="保存" @click="modalVisible = true">
        <input class="btn btn-default btn-medium" type="button" value="取消" @click="modalVisible = false">
    </div>
</v-modal>

<script>
  export default {
    data() {
      return {
        modalVisible: false
      }
    },
    methods: {
      shutModal () {
        this.modalVisible = false;
      }
    }
  }
</script>
```

## Alert、Warn 和 Confirm

借助`v-modal`组件，我们重写了原生的`alert`和`confirm`方法，并添加了`warn`方法，可以用在一些敏感操作的时候提醒用户。

分别通过`VTags.Modal.alert`、`VTags.Modal.warn`和`VTags.Modal.confirm`来调用。它们都有两个参数`msg`和`callback`，顾名思义，分别代表展示的信息和执行完的回调。

```vue
<input class="btn btn-primary" type="button" value="Alert" @click="testAlert">
<input class="btn btn-primary" type="button" value="Warn" @click="testWarn">
<input class="btn btn-primary" type="button" value="Confirm Delete" @click="testConfirm">

<script>
  export default {
    methods: {
      testAlert () {
        VTags.Modal.alert('Alert !!!');
      },
      testWarn () {
        VTags.Modal.warn('请注意 !!!');
      },
      testConfirm () {
        VTags.Modal.confirm('确认要删除这条记录吗？', result => {
            if (result) {
                VTags.Modal.alert('是的，确认删除。');
            } else {
                VTags.Modal.alert('不是的，我是误操作。');
            }
        });
      }
    }
  }
</script>
```

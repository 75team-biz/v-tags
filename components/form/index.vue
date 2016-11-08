<template>
  <form
    class="form"
    :class="{loading: loading}"
    @submit="onSubmit"
  >
    <slot></slot>
  </form>
</template>

<script>
import { getValidatables } from './util';
export default {
  name: 'v-form',
  data() {
    return {
      loading: false
    }
  },
  props: {
    type: {
      type: String,
      default: 'ajax'
    },
    method: {
      type: String,
      default: 'post'
    },
    action: String,
    scope: Object,
    getPayload: Function
  },
  methods: {
    isValid() {
      const inputs = getValidatables(this);
      return inputs.map(i => i.validate()).every(v => v.valid);
    },
    onSubmit: function(e) {
      // ajax 提交时阻止默认提交
      if (this.type == 'ajax') {
        e.preventDefault();
      }
      // 阻止重复提交
      if (this.loading) {
        return;
      }
      // 表单验证
      if (!this.isValid()) {
        return;
      }
      // 获取要提交的数据
      const context = this.$vnode.context;
      let payload = context.$data;
      if (this.getPayload) {
        payload = this.getPayload.call(context);
      }
      // 使用者可以返回false阻止提交
      if (payload === false) {
        return;
      }
      // 发送请求
      this.loading = true;
      this.$http[this.method](this.action, payload).then((response) => {
        const result = response.body;
        if (result.errno) {
          alert(result.errmsg);
        }
        this.loading = false;
        this.$emit('success', response);
      }).catch((response) => {
        alert('服务端错误');
        this.loading = false;
        this.$emit('fail', response);
      });
    }
  }
}
</script>

<template>
  <form
    class="form"
    :class="{loading: loading}"
    :method="method"
    :action="action"
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
    value: [Object, String],
    type: {
      type: String,
      default: 'ajax'
    },
    method: {
      type: String,
      default: 'post'
    },
    action: String,
    labelSuffix: {
      type: String,
      default: '：'
    },
    beforeSubmit: Function
  },
  methods: {
    isValid() {
      const inputs = getValidatables(this);
      return inputs.map(i => i.validate()).every(v => v.valid);
    },
    onSubmit: function(e) {
      // 表单验证
      if (!this.isValid()) {
        e.preventDefault();
        return;
      }
      // ajax 提交时阻止默认提交
      if (this.type == 'ajax') {
        e.preventDefault();
      } else {
        return true;
      }
      // 阻止重复提交
      if (this.loading) {
        return;
      }

      // 执行提交前用户自定义函数
      let customData = this.beforeSubmit && this.beforeSubmit();
      if (this.beforeSubmit && !customData) {
        return false;
      }
      let payload = customData === true ? this.value : customData;

      // 发送请求
      this.loading = true;
      this.$http[this.method](this.action, payload).then((response) => {
        const result = response.body;
        this.loading = false;
        if (result.errno) {
          alert(result.errmsg);
          return false;
        }
        this.$emit('success', response);
      }).catch((response) => {
        this.loading = false;
        this.$emit('fail', response);
      });
    }
  }
}
</script>

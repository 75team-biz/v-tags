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
    }
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
      // 发送请求
      this.loading = true;
      this.$http[this.method](this.action, this.value).then((response) => {
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

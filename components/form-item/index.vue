<template>
  <div class="item" :class="{required: required}">
    <div class="label" :style="{width: usedLabelWidth}">
      {{usedLabel}}
    </div>
    <div class="control">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'v-form-item',
    props: ['label', 'required'],
    computed: {
      form() {
        let parent = this.$parent;
        while (parent && parent.$options.name != 'v-form') {
          parent = parent.$parent;
        }
        return parent;
      },
      usedLabelWidth() {
        const labelWidth = this.form && this.form.labelWidth;
        return  labelWidth ? `${labelWidth}em` : 'default';
      },
      usedLabel() {
        const labelSuffix = this.form && this.form.labelSuffix || '';
        return this.label ? this.label + labelSuffix : '';
      }
    }
  };
</script>

<template>
  <li
    @click="selectItem"
    @mouseenter="hoverItem"
    class="v-select-option-li"
    :class="{'selected': selected,'is-disabled': disabled,'hover': select.hoverIndex === index}">
    <span class="v-select-option-wrap">
      <slot>
        {{ currentLabel }}
      </slot>
    </span>
  </li>
</template>
<script>
  export default {
    name: 'v-option',
    props: {
      label: String,
      value: String,
      disabled: Boolean
    },
    computed: {
      currentLabel() { return  this.label || this.value},
      select() {
        let result = this.$parent;
        while (!result.isSelect) {
          result = result.$parent;
        }
        return result;
      },
      index() {
        return this.select.option.indexOf(this);
      },
      selected() {
        if (this.select.multiple) {
          return this.select.selectedOption.indexOf(this) > -1;
        } else {
          return this.select.selectedOption === this;
        }
      }
    },
    watch: {
      disabled() {
        if (this.disabled) {
          this.destroyOrDisabled();
        }
      }
    },
    methods: {
      hoverItem() {
        if (!this.disabled) {
          this.select.hoverIndex = this.index;
        } else {
          this.select.hoverIndex = -1;
        }
      },
      selectItem() {
        this.select.selectItem();
      },
      destroyOrDisabled() {
        if (this.selected) {
          if (this.select.multiple) {
            this.select.removeItem(this);
          } else {
            this.select.selectedOption = undefined;
            this.select.tempValue = '';
            this.select.$emit('input', '');
          }
        }
        if (this.select.hoverIndex == this.index) {
          this.select.hoverIndex = -1;
        }
      }
    },
    created() {
      this.select.option.push(this);
    },
    beforeDestroy() {
      this.select.option.splice(this.index, 1);
      this.destroyOrDisabled();
    }
  }
</script>

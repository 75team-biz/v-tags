<template>
  <li
    @click="selectItem"
    @mouseenter="hoverItem"
    @mouseleave="removeHoverItem"
    class="dropdown-item dropdown-select-item"
    :class="{'selected': selected,'is-disabled': disabled,'hover': select.hoverIndex === index}">
    <span class="v-select-option-wrap" ref="option">
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
      value: '',
      disabled: Boolean
    },
    computed: {
      currentLabel() { return this.label || this.innerHTML;},
      currentValue() { return this.value || this.label || this.innerHTML;},
      innerHTML() {
        let html = '';
        if (this.$refs.option) {
          html = this.$refs.option.innerHTML;
        }
        return html;
      },
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
      removeHoverItem() {
        this.select.hoverIndex = -1;
      },
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
            this.select.onChange();
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

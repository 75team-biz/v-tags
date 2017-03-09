<template>
<div class="v-suggest">
  <div class="v-suggest-wrap dropdown" v-clickoutside="close">
    <div class="dropdown-wrap">
      <input
        class="dropdown-input"
        @mousedown.prevent="handleInputClick"
        @focus="open"
        @keydown.tab="close"
        @keydown.up="changeHover('pre', $event)"
        @keydown.down="changeHover('next', $event)"
        @keydown.enter="selectItem($event)"
        @keydown.esc="close"
        :placeholder="placeholder"
        ref="input"
        @input="handleInput"
        v-model="showText">
    </div>
    <transition name="fade">
      <ul class="dropdown-list" ref="popper" v-show="opened">
        <slot>
          <template>
            <v-suggest-item v-for="(suggestion, index) in suggestions" :key="index" :value="suggestion.value" :label="suggestion.label" :visiable="suggestion.visiable == undefined?true:suggestion.visiable">
            </v-suggest-item>
            <li class="dropdown-item" v-if="visiableCount == 0">
              无结果
            </li>
          </template>
        </slot>
      </ul>
    </transition>
  </div>
  <em class="error" v-if="!validity.valid">{{validity.msg}}</em>
</div>
</template>

<script>
  import clickoutside from '../../src/utils/clickoutside.js'
  import validatable from '../validatable/';
  import VSuggestItem from './suggest-item.vue'
  export default {
    name: 'v-suggest',
    props: {
      value: '',
      suggestions: {
        type:  Array,
        default() {
          return []
        }
      },
      filter: {
        type: Function,
        default(suggestion, text) {
          return suggestion.currentLabel.indexOf(text) > -1;
        }
      },
      rules: Object,
      placeholder: String
    },
    directives: {clickoutside},
    mixins: [validatable],
    components: {
      "v-suggest-item": VSuggestItem
    },
    data() {
      return {
        showText: '',
        tempValue: '',
        opened: false,
        suggestion: [],
        hoverIndex: -1,
        isSuggest: true,
        selectedSuggest: undefined,
        visiableCount: 0
      }
    },
    watch: {
      value() {
        this.valuechange();
      }
    },
    methods: {
      valuechange() {
        if (this.value == this.tempValue) {
          return;
        } else {
          this.tempValue = this.value;
        }
        if (!this.selectedSuggest || this.value != this.selectedSuggest.value) {
          this.selectedSuggest = undefined;
          this.suggestion.forEach((item) => {
            if (item.value === this.value) {
              this.selectedSuggest = item;
              return false;
            }
          });
          this.onChange();
        }
      },
      handleInput() {
        !this.opened && this.open(true);
        let count = 0;
        let hoverIndex = -1;
        this.suggestion.forEach((item, index) => {
            item.innerVisiable = this.filter.call(this, item, this.showText);
            if (item.innerVisiable) {
              count++;
              if (hoverIndex < 0) {
                hoverIndex = index;
              }
            }
        });
        this.hoverIndex = hoverIndex;
        this.visiableCount = count;
      },
      onChange() {
        if (this.selectedSuggest) {
          this.tempValue = this.selectedSuggest && this.selectedSuggest.value || '';
          this.showText = this.selectedSuggest.currentLabel;
          this.$emit('input', this.selectedSuggest && this.selectedSuggest.value || '');
        } else {
          this.tempValue = '';
          this.showText = '';
          this.$emit('input', '');
        }
      },
      handleInputClick() {
        if (this.opened) {
          this.$nextTick(() => {
            this.close();
            this.$refs.input.blur();
          });
        } else {
          this.$refs.input.focus();
          this.open();
        }
      },
      toggle() {
        if (this.opened) {
          this.close();
        } else {
          this.open();
        }
      },
      open(cancelSelect) {
        this.opened = true;
        !cancelSelect && this.$refs.input.select();
        this.suggestion.forEach((item, index) => {
          item.innerVisiable = true;
        });
        this.visiableCount = this.suggestion.length;
        if (this.selectedSuggest) {
          this.hoverIndex = this.selectedSuggest.index;
          this.$nextTick(() => {
            this.resetScrollTop();
          });
        }
      },
      close() {
        this.opened = false;
        if (this.showText) {
          //唯一匹配并且没有选中，或者选中了不是一样的
          if (this.visiableCount == 1 && (!this.selectedSuggest || this.selectedSuggest.currentLabel != this.showText )) {
            let hasMatch = false;
            this.suggestion.forEach((item) => {
              if (item.innerVisiable && item.currentLabel == this.showText) {
                hasMatch = item;
              }
            });
            if (hasMatch) {
              this.selectedSuggest = hasMatch;
              this.onChange();
            } else if (this.selectedSuggest) {
              this.showText = this.selectedSuggest.currentLabel;
            } else {
              this.showText = '';
            }
          } else if (this.selectedSuggest) {
            this.showText = this.selectedSuggest.currentLabel;
          } else {
            this.showText = '';
          }
        } else {
          this.selectedSuggest = undefined;
          this.onChange();
        }
      },
      changeHover(op, start) {
        if (start && start.preventDefault) {
          start.preventDefault();
        }
        if (this.visiableCount == 0) {
          return;
        }
        if (op == 'pre') {
          if (this.hoverIndex > 0) {
            this.hoverIndex --;
          } else {
            this.hoverIndex = this.suggestion.length - 1;
          }
        } else if (op == 'next') {
          if (this.hoverIndex < this.suggestion.length - 1) {
            this.hoverIndex ++;
          } else {
            this.hoverIndex = 0;
          }
        }
        this.resetScrollTop();
        if (!this.suggestion[this.hoverIndex].innerVisiable) {
          // 防止全部的都为不可见
          if (this.hoverIndex != start) {
            this.changeHover(op, start || this.hoverIndex);
          } else {
            this.hoverIndex = -1;
            this.resetScrollTop();
          }
        }
      },
      resetScrollTop() {
        if (this.hoverIndex < 0) {
          return;
        }
        let bottomOverflowDistance = this.suggestion[this.hoverIndex].$el.getBoundingClientRect().bottom -
          this.$refs.popper.getBoundingClientRect().bottom;
        let topOverflowDistance = this.suggestion[this.hoverIndex].$el.getBoundingClientRect().top -
          this.$refs.popper.getBoundingClientRect().top;
        if (bottomOverflowDistance > 0) {
          this.$refs.popper.scrollTop += bottomOverflowDistance;
        }
        if (topOverflowDistance < 0) {
          this.$refs.popper.scrollTop += topOverflowDistance;
        }
      },
      selectItem($event) {
        if ($event) {
          $event.preventDefault();
        }
        if (!this.opened) {
          this.open();
          return;
        }
        if (this.hoverIndex < 0 || !this.suggestion[this.hoverIndex] || !this.suggestion[this.hoverIndex].innerVisiable) {
          return;
        }
        this.selectedSuggest = this.suggestion[this.hoverIndex];
        this.onChange();
        this.close();
      }
    },
    mounted() {
      let count = 0;
      this.suggestion.forEach((item) => {
        item.innerVisiable && (count++)
      });
      this.visiableCount = count;
      this.valuechange();
    }
  }
</script>

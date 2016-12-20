<template>
<div class="tooltip" @mouseover="show" @mouseleave="hide">
  <slot></slot>
</div>
</template>

<script>
export default {
  name: 'v-tooltip',
  props: {
    tip: String,
    pos: {
      default: 'top'
    },
    maxWidth: {
      default: '200px'
    }
  },
  data() {
    return {
      tipEl: ''
    };
  },
  methods: {
    show() {
      this.tipEl = document.querySelector('.v-tags-tip');
      if(!this.tipEl) {
        this.tipEl = document.createElement('div');
        document.body.appendChild(this.tipEl);
      }
      this.tipEl.className = 'v-tags-tip tip ' + this.pos;
      this.tipEl.style.maxWidth = this.maxWidth;
      this.tipEl.innerHTML = this.tip;
      this.tipEl.style.cssText = this.getStyle();
    },
    hide() {
      this.tipEl.style.visibility = 'hidden';
    },
    getStyle() {//计算tip的style样式
      var size = {//计算需要提示的元素的尺寸及相对于页面左上角的x,y值
        w: this.$el.offsetWidth,
        h: this.$el.offsetHeight,
        top: this.$el.offsetTop,
        left: this.$el.offsetLeft
      };
      var tipSize = {//计算tip的尺寸
        w: this.tipEl.offsetWidth,
        h: this.tipEl.offsetHeight
      };
      var top = '', left = '';//计算tip相对于页面左上角的top,left值
      if (this.pos == 'bottom') {
        top = size.top + size.h / 1 + 6 + 'px';
        left = size.left + (size.w - tipSize.w )/ 2 + 'px';
      } else if (this.pos == 'top') {
        top = size.top - tipSize.h / 1 - 6 + 'px';
        left =  size.left + (size.w - tipSize.w )/ 2 + 'px';
      } else if (this.pos == 'right') {
        top = size.top + (size.h - tipSize.h )/ 2 + 'px';
        left =  size.left + size.w / 1 + 6 + 'px';
      } else if (this.pos == 'left') {
        top = size.top + (size.h - tipSize.h )/ 2 + 'px';
        left = size.left - tipSize.w / 1 - 6 + 'px';
      }
      return `max-width: ${this.maxWidth}; top: ${top}; left: ${left}`;
    }
  }
}
</script>

<template>
<div class="tooltip" @mouseover="show" @mouseleave="hide">
  <slot></slot>
  <div class="tip" v-show="isShow" :class="pos" :style="style">
    {{tip}}
  </div>
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
      default: '200'
    }
  },
  data() {
    return {
      isShow: false,
      size: {
        w: 0,
        h: 0
      },
      tipSize: {
        w: 0,
        h: 0
      }
    };
  },
  computed: {
    style() {
      var temp = {
        'max-width': this.maxWidth + 'px'
      };
      if (this.pos == 'bottom') {
        temp.top = this.size.h / 1 + 4 + 'px';
      } else if (this.pos == 'top') {
        temp.bottom = this.size.h / 1 + 4 + 'px';
        temp.left = (this.size.w - this.tipSize.w )/ 2 + 'px';
      } else if (this.pos == 'right') {
        temp.left = this.size.w / 1 + 'px';
        temp.top = (this.size.h - this.tipSize.h )/ 2 + 'px';
      } else if (this.pos == 'left') {
        temp.right = this.size.w / 1 + 'px';
      }
      return temp;
    }
  },
  methods: {
    show() {
      this.size = {
        w: this.$el.offsetWidth,
        h: this.$el.offsetHeight
      };
      this.isShow = true;
      var tipEl = this.$el.querySelector('.tip');
      this.tipSize = {
        w: tipEl.offsetWidth,
        h: tipEl.offsetHeight
      };
    },
    hide() {
      this.isShow = false;
    }
  }
}
</script>

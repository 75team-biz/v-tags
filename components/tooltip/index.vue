<template>
<div class="tooltip" @mouseover="show=true" @mouseleave="show=false">
  <slot></slot>
  <div class="tip-wrap" v-show="show" :class="position" :style="style">
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
      default: 'bottom'
    },
    arrow: {
      default: 'left'
    },
    width: {
      default: '250'
    }
  },
  data() {
    return {
      show: false,
      co: {
        x: 0,
        y: 0
      },
      size: {
        w: 0,
        h: 0
      }
    };
  },
  computed: {
    position() {
      return 'pos-' + this.pos + ' arrow-' + this.arrow;
    },
    style() {
      var temp = {
        width: this.width + 'px'
      };
      if (this.arrow == 'left') {
        temp.left = this.size.w / 2 - 13.1 + 'px';
      } else if (this.arrow == 'right') {
        temp.right = this.size.w / 2 - 13.1 + 'px';
      } else if (this.arrow == 'bottom') {
        temp.bottom = this.size.h / 2 - 19 + 'px';
      }
      if (this.pos == 'bottom') {
        temp.top = this.size.h / 1 + 10 + 'px';
      } else if (this.pos == 'top') {
        temp.bottom = this.size.h / 1 + 10 + 'px';
      } else if (this.pos == 'right') {
        temp.left = this.size.w / 1 + 'px';
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
      this.show = true;
    },
    hide() {
      this.show = false;
    }
  }
}
</script>

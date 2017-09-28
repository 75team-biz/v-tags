<template>
<div class="input-range" @click="move" :disabled="disabled">
  <input type="hidden" v-model="val">
  <div class="range">
    <div class="track" :style="{width: percentage}"></div>
    <div class="thumb" :style="{left: percentage}" @mousedown="dragStart"></div>
    <div class="value" :style="{left: percentage}">
      <slot>
        {{ val }}
      </slot>
    </div>
  </div>
  <ul class="mark">
    <li v-for="s in scale" :style="{left: _getPercentage(s)}">
      {{ s }}
    </li>
  </ul>
</div>
</template>

<script>

export default {
  name: 'v-input-range',
  props: {
    step: {
      default: 1
    },
    value: {
      type: [Number, String],
      default: 50
    },
    scale: {
      type: Array,
      default: function() {
        return [0, 100];
      }
    },
    disabled: false
  },
  data() {
    return {
      val: 50
    }
  },
  computed: {
    max () {
      var max = this.scale[this.scale.length -1];
      if(this.val > max) this.val = max;
      return max;
    },
    min () {
      var min = this.scale[0];
      if(this.val < min) this.val = min;
      return min;
    },
    precision() {
      return (this.step.toString().split('.')[1] || []).length;
    },
    percentage () {
      return this._getPercentage(this.val);
    }
  },
  watch: {
    value(newVal, oldVal) {
      this.val = (this.value || this.value === 0) ? this.value : (this.max+this.min)/2;
    },
    val() {
      this.$emit('input', this.val);
    }
  },
  mounted () {
    this.val = (this.value || this.value === 0) ? this.value : (this.max+this.min)/2;
    this._getWholeWidth();
    window.addEventListener('resize', this._getWholeWidth);
  },
  methods: {
    dragStart (e) {
      e.preventDefault();
      window.addEventListener('mousemove',this.move);
      window.addEventListener('mouseup',this.dragEnd);
    },
    dragEnd () {
      window.removeEventListener('mousemove',this.move);
      window.removeEventListener('mouseup',this.dragEnd);
    },
    move (e) {
      if(this.disabled) return;
      const me = this;
      const left = e.pageX - window.scrollX - me.$el.getBoundingClientRect().left;
      if (left < 0 || left > me.wholeWidth) return false;
      const delta = (left * (me.max-me.min) / me.wholeWidth).toFixed(me.precision+1);
      me.val = (delta % me.step < me.step / 2)
               ? (Math.floor(delta / me.step) * me.step + me.min)
               : (Math.ceil(delta / me.step) * me.step + me.min);
      me.val = parseFloat(parseFloat(me.val).toFixed(this.precision));
    },
    _getWholeWidth() {
      this.wholeWidth = this.$el.querySelector('.range').offsetWidth;
    },
    _getPercentage(value) {
      return (value - this.min) * 100 / (this.max - this.min) + '%';
    }
  },
  destroyed() {
    window.removeEventListener('resize',this._getWholeWidth);
  }
}
</script>

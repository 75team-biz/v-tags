<template>
<div class="datepicker">
  <v-input type="text" v-model="date" @focus="showPanel=true"><v-input>
  <em class="error" v-if="!validity.valid">{{validity.msg}}</em>
  <div class="panel" v-show="showPanel">
    <div class="header">
      2016
    </div>
  </div>
</div>
</template>

<script>
import validatable from '../validatable/';

export default {
  name: 'datepicker',
  props: {
    value: String,
    rules: {
      type: Object,
      default: function() {
        return {}
      }
    },
    pattern: {
      type: String,
      default: 'yyyy-MM-dd'
    }
  },
  data() {
    return {
      date: '',
      showPanel: false
    }
  },
  mixins: [validatable],
  mounted() {
    this.date = this.value;
    var body = document.querySelector('body');
    if(document.addEventListener) {
      body.addEventListener('click', this.showPanel, false);
    }else if(document.attachEvent) {
      body.attachEvent('click', this.showPanel);
    }
  },
  beforeDestroy() {
    var body = document.querySelector('body');
    if(document.removeEventListener) {
      body.removeEventListener('click', this.showPanel, false);
    }else if(document.detachEvent) {
      body.detachEvent('click', this.showPanel);
    }
  }
}
/**
 * 格式化日期
 * @method format
 * @static
 * @param {Date} d 日期对象
 * @param {string} pattern 日期格式(y年M月d天h时m分s秒)，默认为"yyyy-MM-dd"
 * @return {string}  返回format后的字符串
 * @example
 var d=new Date();
 alert(format(d," yyyy年M月d日\n yyyy-MM-dd\n MM-dd-yy\n yyyy-MM-dd hh:mm:ss"));
 */

Date.prototype.format = function (pattern) {
  pattern = pattern || 'yyyy-MM-dd hh:mm:ss';
  var y = this.getFullYear().toString(),
    o = {
    M: this.getMonth() + 1, //month
    d: this.getDate(), //day
    h: this.getHours(), //hour
    m: this.getMinutes(), //minute
    s: this.getSeconds() //second
  };
  pattern = pattern.replace(/(y+)/ig, function (a, b) {
    return y.substr(4 - Math.min(4, b.length));
  });
  for (var i in o) {
    pattern = pattern.replace(new RegExp('(' + i + '+)', 'g'), function (a, b) {
      return o[i] < 10 && b.length > 1 ? '0' + o[i] : o[i];
    });
  }
  return pattern;
};
</script>

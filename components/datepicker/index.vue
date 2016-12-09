<template>
<div class="datepicker">
  <input type="text" v-model="date" @click.prevent="showPanelWrap" />
  <div class="panel" v-show="showPanel">
    <div class="header">
      <select class="size-small" v-model="year">
        <option v-for="item in ['2015','2016']">{{item}}</option>
      </select>
      <select class="size-small" v-model="month">
        <option v-for="item in 12">{{item}}</option>
      </select>
      <div class="week-wrap">
        <div v-for="item in weeks" class="week">{{item}}</div>
      </div>
      <div class="day-wrap">
        <div v-for="item in startWeek" class="day"></div>
        <div v-for="item in days" class="day" :class="{active: item==day}" @click="selectDay(item)">{{item}}</div>
      </div>
    </div>
  </div>
  <em class="error" v-if="!validity.valid">{{validity.msg}}</em>
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
      date: '1970-01-01',
      year: 1970,
      month: 1,
      day: 1,
      weeks: ['一','二','三','四','五','六','日'],
      showPanel: false
    }
  },
  computed: {
    days() {
      return new Date(this.year,this.month,0).getDate();
    },
    startWeek() {
      var s = new Date(this.year,this.month-1,1).getDay();
      return !!s ? s-1 : 6;
    }
  },
  mixins: [validatable],
  methods: {
    showPanelWrap() {
      this.showPanel = true;
    },
    hidePanelWrap() {
      var datePickerEle = document.querySelector('.datepicker');
      if(!datePickerEle.contains(event.target)){
        this.showPanel = false;
      }
    },
    selectDay(day) {
      this.day = day;
      this.date = `${this.year}-${this.month}-${this.day}`;
      this.showPanel = false;
    }
  },
  mounted() {
    this.date = this.value;
    var d = new Date(this.value);
    this.year = d.getFullYear();
    this.month = d.getMonth()+1;
    this.day = d.getDate();
    var body = document.querySelector('body');
    if(document.addEventListener) {
      body.addEventListener('click', this.hidePanelWrap, false);
    }else if(document.attachEvent) {
      body.attachEvent('click', this.hidePanelWrap);
    }
  },
  beforeDestroy() {
    var body = document.querySelector('body');
    if(document.removeEventListener) {
      body.removeEventListener('click', this.hidePanelWrap, false);
    }else if(document.detachEvent) {
      body.detachEvent('click', this.hidePanelWrap);
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

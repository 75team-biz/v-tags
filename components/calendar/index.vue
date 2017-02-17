<template>
<div class="calendar clearfix">
  <div class="head">
    <span class="fa fa-chevron-left" @click="preMonth" :class="{disabled: !isPreMonthCanSelect}"></span>
    <select v-model="year">
      <option v-for="item in deltaYear">{{item+minYear-1}}</option>
    </select>
    年
    <select v-model="month" class="month-select">
      <option v-for="item in 12" v-show="isMonthCanSelect(item)">{{item}}</option>
    </select>
    月
    <span class="fa fa-chevron-right" @click="nextMonth" :class="{disabled: !isNextMonthCanSelect}"></span>
  </div>
  <div class="week-wrap">
    <div v-for="item in weeks" class="week">{{item}}</div>
  </div>
  <div class="day-wrap">
    <div v-for="item in startWeek" class="day place"></div>
    <div v-for="item in days" class="day" :class="{active: isDaySelected(item), disabled: !isDayCanSelect(item), inrange: inRange(item)}" @click="selectDay(item)">{{item}}</div>
  </div>
</div>
</template>

<script>

export default {
  name: 'calendar',
  props: {
    value: String,
    minDate: {
      type: String,
      default: '1970-01-01'
    },
    maxDate: {
      type: String,
      default: '2099-12-31'
    },
    pattern: {
      type: String,
      default: 'yyyy-MM-dd'
    },
    type: {
      type: String //日期范围组件使用时，区别start与end
    }
  },
  data() {
    return {
      date: new Date().format(this.pattern), //所选日期
      year: 1970, //所选日期-年
      month: 1, //所选日期-月
      day: 1, //所选日期-日
      today: new Date(), //今天
      weeks: ['一','二','三','四','五','六','日'] //
    }
  },
  computed: {
    days() {//获取当前日期所在月有多少天
      return new Date(this.year,this.month,0).getDate();
    },
    startWeek() {//获取当前日期所在月的第一天是星期几
      var s = new Date(this.year,this.month-1,1).getDay();
      return !!s ? s-1 : 6;
    },
    minYear() {//最小日期的年份
      return new Date(this.minDate).getFullYear();
    },
    maxYear() {//最大日期的年份
      return new Date(this.maxDate).getFullYear();
    },
    minMonth() {//最小日期的年份
      return new Date(this.minDate).getMonth()+1;
    },
    maxMonth() {//最大日期的年份
      return new Date(this.maxDate).getMonth()+1;
    },
    deltaYear() {//年份差，用于模板显示年份
      return this.maxYear - this.minYear + 1;
    },
    isPreMonthCanSelect() {//前一个月是否可以选择
      return !(this.year == this.minYear && this.month == this.minMonth);
    },
    isNextMonthCanSelect() {//后一个月是否可以选择
      return !(this.year == this.maxYear && this.month == this.maxMonth);
    }
  },
  methods: {
    selectDay(day) {//选择日期
      if(!this.isDayCanSelect(day)) return false;
      this.day = day;
      this.date = new Date(`${this.year}-${this.month}-${this.day}`).format(this.pattern);
      this.$emit('update', this.date);
    },
    preMonth() {//选择前一个月
      if(!this.isPreMonthCanSelect) {
        return false;
      }
      if(this.month == 1 ) {
        this.month = 12;
        this.year = +this.year -1;
      }else {
        this.month = +this.month -1;
      }
    },
    nextMonth() {//选择后一个月
      if(!this.isNextMonthCanSelect) {
        return false;
      }
      if(this.month == 12 ) {
        this.month = 1;
        this.year = +this.year + 1;
      }else {
        this.month = +this.month + 1;
      }
    },
    isMonthCanSelect(month) {//计算当前月份是否可选
      if(this.year < this.maxYear && this.year > this.minYear) {
        return true;
      }else if(this.year == this.maxYear && this.year == this.minYear) {
        return month <= this.maxMonth && month >= this.minMonth;
      }else if(this.year == this.maxYear) {
        return month <= this.maxMonth;
      }else if(this.year == this.minYear) {
        return month >= this.minMonth;
      }
    },
    isDayCanSelect(day) {//计算当前日期是否可选
      if(this.year < this.maxYear && this.year > this.minYear) {
        return true;
      }else if(this.year == this.maxYear && this.month == this.maxMonth) {
        return day <= new Date(this.maxDate).getDate() && day >= new Date(this.minDate).getDate();
      }else if(this.year == this.maxYear && this.month > this.maxMonth) {
        return day <= new Date(this.maxDate).getDate();
      }else if(this.year == this.minYear && this.month == this.minMonth) {
        return day >= new Date(this.minDate).getDate() && day <= new Date(this.maxDate).getDate();
      }else if(this.year == this.minYear && this.month < this.minMonth) {
        return day >= new Date(this.minDate).getDate();
      }
      return true;
    },
    isDaySelected(day) {//计算当前日期是否是选中的日期
      return new Date(this.year, this.month-1, day).format(this.pattern)
            == new Date(this.value).format(this.pattern);
    },
    inRange(day) {//计算当前日期是否是在选中的日期范围内
      day = day<10 ? `0${day}` : day;
      var month = this.month <10 ? `0${this.month}` : this.month;
      var d = new Date(`${this.year}-${month}-${day}`);
      if(!this.type) return false;
      if(this.type == 'start') {
        return d >= new Date(this.value) && d <= new Date(this.maxDate);
      } else if (this.type == 'end') {
        return d >= new Date(this.minDate) && d <= new Date(this.value);
      }
    },
    syncDate() {
      this.date = this.value || this.date || new Date().format(this.pattern);
      if(new Date(this.value) > new Date(this.maxDate)) this.date = this.maxDate;
      if(new Date(this.value) < new Date(this.minDate)) this.date = this.minDate;
      this.date = new Date(this.date).format(this.pattern);
      var d = new Date(this.date);
      this.year = d.getFullYear();
      this.month = d.getMonth()+1;
      this.day = d.getDate();
    }
  },
  mounted() {
    this.syncDate();
  },
  watch: {
    value() {
      this.syncDate();
    },
    year(val, oldVal) {
      if(val == this.maxYear && this.month > this.maxMonth) {
        this.month = this.maxMonth;
      }
      else if(val == this.minYear && this.month < this.minMonth) {
        this.month = this.minMonth;
      }
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

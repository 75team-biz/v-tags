<template>
<div class="daterange" @keyup.esc="showCalendar=false">
  <input type="text" v-model="dateRange" @click.prevent="showCalendar=true" readonly/>
  <div v-show="showCalendar" class="calendar-wrap">
    <div class="shortcut" v-if="shortcut"  @click.prevent="setRange">
      <span date-range="yesterday">昨天</span>
      <span date-range="daybeforeyesterday">前天</span>
      <span date-range="latest7days">最近 7 天</span>
      <span date-range="lastweek">上周</span>
      <span date-range="latest30days">最近 30 天</span>
    </div>
    <calendar ref="calendar" v-model="start" :min-date="minDate" :max-date="startMaxDate" :pattern="pattern" type="start" @update="updateStart"></calendar>
    <calendar ref="calendar" v-model="end" :min-date="endMinDate" :max-date="maxDate" :pattern="pattern" type="end" @update="updateEnd"></calendar>
    <div class="range-str">{{range}}</div>
    <div class="operations">
      <button class="btn btn-primary" @click.prevent="updateRange">确定</button>
      <button class="btn btn-default" @click.prevent="showCalendar=false">取消</button>
    </div>
  </div>
</div>
</template>

<script>
import Calendar from '../calendar'

export default {
  name: 'v-date-range',
  props: {
    startDate: String,
    endDate: String,
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
    shortcut: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Calendar
  },
  data() {
    return {
      showCalendar: false,
      start: '',
      end: ''
    }
  },
  computed: {
    dateRange() {
      return `${this.startDate} 至 ${this.endDate}`;
    },
    range() {
      return `${this.start} 至 ${this.end}`;
    },
    startMaxDate() {
      return this.end || this.maxDate;
    },
    endMinDate() {
      return this.start || this.minDate;
    }
  },
  watch: {
    startDate(val) {
      this.start = val;
    },
    endDate(val) {
      this.end = val;
    }
  },
  mounted() {
    this.start = this.startDate;
    this.end = this.endDate;
    window.addEventListener('click', this.hideCalendar, false);
  },
  methods: {
    hideCalendar(event) {//隐藏日期panel
      if(!this.$el.contains(event.target)){
        this.showCalendar = false;
      }
    },
    setRange(e) {
      var rangeType = e.target.getAttribute('date-range');
      var week = new Date().getDay() ? new Date().getDay()-1 : 6;
      switch(rangeType) {
        case 'yesterday':
          this.start = this.getDate(1);
          this.end = this.getDate(1);
          break;
        case 'daybeforeyesterday':
          this.start = this.getDate(2);
          this.end = this.getDate(2);
          break;
        case 'latest7days':
          this.start = this.getDate(7);
          this.end = this.getDate(1);
          break;
        case 'lastweek':
          this.start = this.getDate(7+week);
          this.end = this.getDate(1+week);
          break;
        case 'latest30days':
          this.start = this.getDate(30);
          this.end = this.getDate(1);
          break;
      }
    },
    getDate(day) {
      var today = new Date(),
        todayTime = today.getTime(),
        oneday = 24*60*60*1000;
      return new Date(todayTime - day*oneday).format(this.pattern);
    },
    updateStart(date) {
      this.start = date;
    },
    updateEnd(date) {
      this.end = date;
    },
    updateRange() {
      this.$emit('update', {startDate: this.start, endDate:this.end});
      this.showCalendar = false;
    }
  },
  beforeDestroy() {//将点击页面上其他地方关闭日期panel的事件移除
    window.removeEventListener('click', this.hideCalendar);
  }
}
</script>

<template>
<div class="datepicker" @keyup.esc="showCalendar=false">
  <input type="text" v-model="date" :placeholder='placeholder' :disabled='disabled' @click.prevent="showCalendar=true" readonly/>
  <calendar ref="calendar" :value="date" :min-date="minDate" :max-date="maxDate" :pattern="pattern" @update="update" v-show="showCalendar"></calendar>
</div>
</template>

<script>
import Calendar from '../calendar'

export default {
  name: 'v-date-picker',
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
    placeholder: String,
    disabled: {
        type: Boolean,
        default: false
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Calendar
  },
  data() {
    return {
      date: '',
      showCalendar: false
    }
  },
  watch: {
    value(val) {
      this.date = val && new Date(val).format(this.pattern);
    },
    show(val) {
      this.showCalendar = val;
    }
  },
  mounted() {
    this.date = this.value && new Date(this.value).format(this.pattern);
    this.showCalendar = this.show;
    window.addEventListener('click', this.hideCalendar, false);
  },
  methods: {
    hideCalendar(event) {//隐藏日期panel
      if(!this.$el.contains(event.target)){
        this.showCalendar = false;
      }
    },
    update(date) {
      this.date = date;
      this.$emit('input', date);
      this.showCalendar = false;
    }
  },
  beforeDestroy() {//将点击页面上其他地方关闭日期panel的事件移除
    window.removeEventListener('click', this.hideCalendar);
  }
}
</script>

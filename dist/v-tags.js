(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.VTags = factory());
}(this, (function () { 'use strict';

/**
 * 获取变量的字符串值
 */
function toString(value) {
    return value === undefined || value === null
      ? ''
      : value.toString().trim();
}

var ruleset$1 = {

  /**
   * 必填(选)验证
   */
  required: function(value) {
    // value需要转换成字符串再计算length，不然数字或者0都会是invalid
    var valid = !!toString(value).length;
    var msg = valid ? '' : '请填写此项';
    return { valid: valid, msg: msg };
  },

  /**
   * 最小长度验证
   * @param param {String} 最少输入多少个字
   */
  minlength: function(value, param) {
    // value需要转换成字符串计算length，不然数字或者0都会是invalid
    var valid = toString(value).length >= parseInt(param);
    var msg = valid ? '' : ("请最少填写" + param + "个字");
    return { valid: valid, msg: msg };
  },

  /**
   * 最大长度验证， 主要针对 IE9 下 textarea 的 maxlength 无效的情况
   * @param param {String} 最多输入多少个字
   */
  maxlength: function(value, param) {
    // value需要转换成字符串计算length，不然数字或者0都会是invalid
    var valid = toString(value).length <= parseInt(param);
    var msg = valid ? '' : ("最多填写" + param + "个字");
    return { valid: valid, msg: msg };
  },

  /**
   * 验证输入是否某种指定类型的格式
   * @param param {String} 类型，比如email、tel等
   */
  type: function(value, param) {
    var method = param + "Type";
    return ruleset$1[method](value);
  },

  /**
   * 邮箱格式验证
   */
  emailType: function(value) {
    var pattern =  /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
    var valid  = pattern.test(toString(value));
    var msg = valid ? '' : '邮箱格式不正确';
    return { valid: valid, msg: msg };
  },

  /**
   * 手机号码格式
   */
  mobileType: function(value) {
    var pattern = /^1[3|4|5|7|8]\d{9}$/;
    var valid  = pattern.test(toString(value));
    var msg = valid ? '' : '手机号码格式不正确';
    return { valid: valid, msg: msg };
  },

  /**
   * 固定电话格式
   */
  telType: function(value) {
    var pattern = /^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/;
    var valid  = pattern.test(toString(value));
    var msg = valid ? '' : '固定电话号码格式不正确';
    return { valid: valid, msg: msg };
  },

  /**
   * 数字格式
   */
  numberType: function(value) {
    var valid = !isNaN(value);
    var msg = valid ? '' : '请输入数字';
    return { valid: valid, msg: msg };
  },

  /**
   * max格式
   */
  max: function(value, param) {
    var valid = !isNaN(value);
    var msg = valid ? '' : '请输入数字';
    if(!valid) { return { valid: valid, msg: msg }; }
    valid = parseFloat(value) <= parseFloat(param);
    msg = valid ? '' : '输入值最大为' + param;
    return { valid: valid, msg: msg };
  },

  /**
   * min格式
   */
  min: function(value, param) {
    var valid = !isNaN(value);
    var msg = valid ? '' : '请输入数字';
    if(!valid) { return { valid: valid, msg: msg }; }
    valid = parseFloat(value) >= parseFloat(param);
    msg = valid ? '' : '输入值最小为' + param;
    return { valid: valid, msg: msg };
  },
  /**
   * 整数格式
   */
  integerType: function(value, input) {
    var pattern = /^\d*$/;
    var valid  = pattern.test(toString(value));
    var msg = valid ? '' : '请输入整数';
    return { valid: valid, msg: msg };
  },

  /**
   * URL格式
   */
  urlType: function(value) {
    var pattern = /^(https?\:\/\/)?([a-z\d\-]+\.)+[a-z]{2,6}[\/\?\#]?([\/\?\#][\w|\:|\/|\.|\-|\#|\!|\~|\%|\&|\+|\=|\?|\$]+)?$/i;
    var valid = pattern.test(toString(value));
    var msg = valid ? '' : 'URL 格式不正确';
    return { valid: valid, msg: msg };
  },

  /**
   * 自定义正则
   */
  pattern: function(value, param) {
    var valid = param.test(toString(value));
    var msg = valid ? '' : '格式不符合要求';
    return { valid: valid, msg: msg };
  }
};

var Validator = { validate: validate };

/**
 * 验证 value 是否符合规则
 * @param value {String} 要验证的值
 * @param rules {Object} 规则
 * @return {Object} 结果对象，有valid和msg两个字段
 */
function validate(value, rules) {
  if ( rules === void 0 ) rules = {};

  // msg 为自定义错误信息
  var msg = rules.msg;
  var failResult = Object.keys(rules).filter(
    function (ruleName) { return ruleName != 'msg'
    && typeof ruleset$1[ruleName] == 'function'
    || typeof rules[ruleName] == 'function'; } // 验证规则本身可以是一个函数
  ).filter(function (ruleName) { return toString(value).length || ruleName == 'required'; }).map(function (ruleName) {
    // 验证单条规则
    var param = rules[ruleName];
    var validFunction = typeof rules[ruleName] == 'function'
      ? rules[ruleName]
      : ruleset$1[ruleName];
    var result = validFunction(value, param);
    // 处理自定义错误提示
    if (!result.valid && msg) {
      if (typeof msg == 'string') {
        result.msg = msg;
      } else if (msg[ruleName]) {
        result.msg = msg[ruleName];
      }
    }
    return result;
  });
  var fail = null;
  failResult.every(function (result) {
      if(!result.valid) {
        fail = result;
        return false;
      }
      return true;
  });
  return fail || { valid: true };
}

/**
 * A Vue.js mixin to add validate functionality
 */
var validatable = {

  data: function () { return ({
    // store validation result
    validity: {
      valid: true,
      msg: '',
      dirty: false
    }
  }); },

  created: function() {
    var this$1 = this;

    if (!this.$options.props.value || !this.$options.props.rules) {
      var msg = "Prop 'value' and 'rules' are required to use 'Validatable'.";
      throw new Error(msg);
    }
    var dirty = function () { return this$1.validity.dirty = true; };
    this.$on('input', dirty);
    this.$on('change', dirty);
  },

  watch: {
    value: function() {
      if (this.validity.dirty) {
        Object.assign(this.validity, this.validate());
      }
    }
  },

  methods: {
    validate: function() {
      this.validity.dirty = true;
      return Object.assign(
        this.validity, 
        Validator.validate(this.value, this.rules)
      );
    }
  }

};

var Component = { template: "<div class=\"input-wrap\"><input v-if=\"type!='textarea' && type!='radio'\" :class=\"className\" :type=\"type\" :name=\"name\" :value=\"value\" :placeholder=\"placeholder\" :readonly=\"readonly\" :disabled=\"disabled\" :maxlength=\"maxlength\" @input=\"onInput\" @change=\"onInput\"><textarea v-if=\"type=='textarea'\" :class=\"className\" :name=\"name\" :value=\"value\" :placeholder=\"placeholder\" :readonly=\"readonly\" :disabled=\"disabled\" :maxlength=\"maxlength\" :rows=\"rows\" :cols=\"cols\" @input=\"onInput\" @change=\"onInput\">\n  </textarea><em class=\"error\" v-if=\"!validity.valid\">{{validity.msg}}</em></div>",
  name: 'v-input',
  props: {
    value: [String, Number],
    rules: Object,
    placeholder: String,
    size: String,
    readonly: Boolean,
    disabled: Boolean,
    type: {
      type: String,
      default: 'text'
    },
    name: String,
    rows: {
      type: Number,
      default: 3
    },
    cols: {
      type: Number,
      default: 60
    },
    maxlength: [Number, String]
  },
  computed: {
    className: function className() {
      var cn = this.validity.valid ? '' : 'error';
      if(this.size){
        cn = cn + " size-" + (this.size);
      }
      return cn;
    }
  },
  mixins: [validatable],
  methods: {
    onInput: function onInput(e) {
      this.$emit('input', e.target.value);
    },
    onChange: function onChange(e) {
      this.$emit('input', e.target.value);
    }
  }
};

Component.install = function (Vue) { return Vue.component(Component.name, Component); };

var Component$1 = { template: "<span class=\"checkbox\" @change=\"onChange\"><label><input type=\"checkbox\" :name=\"name\" :disabled=\"disabled\" :checked=\"value\"><i></i>{{title}}</label></span>",
  name: 'v-checkbox',
  props: {
    value: Boolean,
    name: String,
    title: String,
    disabled: Boolean
  },
  methods: {
    onChange: function onChange(e) {
      this.$emit('input', e.target.checked);
    }
  }
};

Component$1.install = function (Vue) { return Vue.component(Component$1.name, Component$1); };

var Component$2 = { template: "<div class=\"checkbox-group\" @change=\"onChange\"><label v-for=\"option in options\"><input type=\"checkbox\" :value=\"option.value\" :disabled=\"option.disabled\" :checked=\"isChecked(option.value)\"><i></i>{{option.title}}</label><em class=\"error\" v-if=\"!validity.valid\">{{validity.msg}}</em></div>",
  name: 'v-checkbox-group',
  props: {
    value: Array,
    rules: {
      type: Object,
      default: function() {
        return {}
      }
    },
    required: Boolean,
    options: Array
  },
  mounted: function() {
    if (this.required) {
      this.rules.required = true;
      this.rules.msg = '请选择此项';
    }
  },
  mixins: [validatable],
  methods: {
    onChange: function onChange(e) {
      var result = Array.from(this.$el.querySelectorAll('input'))
        .filter(function (input) { return input.checked; })
        .map(function (input) { return input.value; });
      this.$emit('input', result);
    },
    isChecked: function isChecked(value) {
      return this.value.some(function (val) { return val == value; })
    }
  }
};

Component$2.install = function (Vue) { return Vue.component(Component$2.name, Component$2); };

var Component$3 = { template: "<div class=\"radio-group\" @change=\"onChange\"><label v-for=\"option in options\"><input type=\"radio\" :name=\"name\" :value=\"option.value\" :disabled=\"option.disabled\" :checked=\"value==option.value\"><i></i>{{option.title}}</label><em class=\"error\" v-if=\"!validity.valid\">{{validity.msg}}</em></div>",
  name: 'v-radio-group',
  props: {
    value: [String, Number],
    rules: {
      type: Object,
      default: function(){
        return {}
      }
    },
    required: Boolean,
    name: String,
    options: Array
  },
  created: function() {
    if (this.required) {
      this.rules.required = true;
      this.rules.msg = '请选择此项';
    }
  },
  mixins: [validatable],
  methods: {
    onChange: function onChange(e) {
      this.$emit('input', e.target.value);
    }
  }
};

Component$3.install = function (Vue) { return Vue.component(Component$3.name, Component$3); };

var Component$4 = { template: "<div class=\"item\"><div class=\"label\" :style=\"{width: usedLabelWidth}\" :class=\"{required: required}\">{{usedLabel}}</div><div class=\"control\"><slot></slot></div></div>",
  name: 'v-form-item',
  props: ['label', 'required'],
  computed: {
    form: function form() {
      var parent = this.$parent;
      while (parent && parent.$options.name != 'v-form') {
        parent = parent.$parent;
      }
      return parent;
    },
    usedLabelWidth: function usedLabelWidth() {
      var labelWidth = this.form && this.form.labelWidth;
      return  labelWidth ? (labelWidth + "em") : 'default';
    },
    usedLabel: function usedLabel() {
      var labelSuffix = this.form && this.form.labelSuffix || '';
      return this.label ? this.label + labelSuffix : '';
    }
  }
};

Component$4.install = function (Vue) { return Vue.component(Component$4.name, Component$4); };

function isValidatable(component) {
  var mixins = component.$options.mixins;
  return Array.isArray(mixins) && mixins.indexOf(validatable) > -1;
}

/**
 * 获取一个组件的所有子孙级组件
 */
function getDescendants(component) {
  var result = [];
  var children = component.$children;
  if (!children.length) {
    return result;
  }
  return children.reduce(function (a, child) {
    a.push(child);
    return a.concat(getDescendants(child));
  }, result);
}

/**
 * 获取一个表单下所有的可验证组件
 */
function  getValidatables(component) {
  return getDescendants(component).filter(isValidatable);
}

/**
 * ajax
 */

var Component$5 = { template: "<form class=\"form\" :class=\"{loading: loading}\" :method=\"method\" :action=\"action\" @submit=\"onSubmit\"><slot></slot></form>",
  name: 'v-form',
  data: function data() {
    return {
      loading: false
    }
  },
  props: {
    value: [Object, String],
    type: {
      type: String,
      default: 'ajax'
    },
    method: {
      type: String,
      default: 'post'
    },
    action: String,
    labelSuffix: {
      type: String,
      default: '：'
    },
    beforeSubmit: Function
  },
  methods: {
    isValid: function isValid() {
      var inputs = getValidatables(this);
      return inputs.map(function (i) { return i.validate(); }).every(function (v) { return v.valid; });
    },

    /**
      * Reset validate states of all fields
      */
    resetValidity: function resetValidity() {
      getValidatables(this).forEach(function (input) {
        input.validity = {
          valid: true,
          msg: ''
        };
      });
    },
    onSubmit: function(e) {
      var this$1 = this;

      // 表单验证
      if (!this.isValid()) {
        e.preventDefault();
        return;
      }
      // ajax 提交时阻止默认提交
      if (this.type == 'ajax') {
        e.preventDefault();
      } else {
        return true;
      }
      // 阻止重复提交
      if (this.loading) {
        return;
      }

      // 执行提交前用户自定义函数
      var customData = this.beforeSubmit && this.beforeSubmit();
      if (this.beforeSubmit && !customData) {
        return false;
      }
      var payload = (customData === true || customData === undefined) ? this.value : customData;

      // 发送请求
      this.loading = true;
      this.$http[this.method](this.action, payload).then(function (response) {
        var result = response.body;
        this$1.loading = false;
        if (result.errno) {
          alert(result.errmsg);
          return false;
        }
        this$1.$emit('success', response);
      }).catch(function (response) {
        this$1.loading = false;
        this$1.$emit('fail', response);
      });
    }
  }
};

Component$5.install = function (Vue) { return Vue.component(Component$5.name, Component$5); };

//import Vue from 'vue'
var Modal$1 = { template: "<div :style=\"{display: visible ? 'block' : 'none'}\" class=\"modal-box\"><div class=\"modal-dialog\"><div :class=\"{'public-modal': type!='modal'}\" class=\"modal\"><div v-if=\"title\" class=\"modal-hd\"><span class=\"title\">{{title}}</span> <span v-if=\"subTitle\" class=\"sub-title\">{{subTitle}}</span> <a @click=\"hide\" class=\"fa fa-times close\"></a></div><div class=\"modal-bd\"><slot></slot></div></div></div><div class=\"modal-mask\"></div></div>",
  name: 'v-modal',
  props: {
    type: {
      default : 'modal'
    },
    title: String,
    subTitle: String,
    visible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    _centerModal: function _centerModal () {
      var elem = this.$el.querySelector('.modal');
      var w = elem.offsetWidth;
      var h = elem.offsetHeight;
      elem.style.marginLeft = '-' + w / 2 + 'px';
      elem.style.marginTop = '-' + h / 2 + 'px';
    },
    _removeModal: function _removeModal () {
      this.$el.parentNode.removeChild(this.$el);
    },
    show: function show () {
      this.$emit('openmodal');
    },
    hide: function hide () {
      this.$emit('closemodal');
    }
  },
  created: function created () {
    this.$watch('visible', function(){
      this.visible && this.$nextTick(this._centerModal);
    });
  },
  mounted: function mounted() {
    this._centerModal();
  },
  destroy: function destroy() {
     this._removeModal();
  }
};

Modal$1.install = function (Vue) {
    Vue.component(Modal$1.name, Modal$1);
    Modal$1.Vue = Vue;
    Vue.prototype.$Modal = Modal$1;
};

var template = "\n    <v-modal type=\"confirm\" :visible=\"true\">\n        <div class=\"msg-wrap\">\n            <i class=\"fa fa-exclamation-triangle icon icon-warn\" v-if=\"type == 'warn'\"></i>\n            <i class=\"fa fa-exclamation-triangle icon icon-confirm\" v-if=\"type == 'confirm'\"></i>\n            <span>{{msg}}</span>\n        </div>\n        <div class=\"btn-wrap\">\n            <a href=\"javascript:void(0)\" class=\"btn btn-primary modal-confirm\" @click=\"onclicked(true)\" id=\"modalBtnDefault\">确定</a>\n            <a href=\"javascript:void(0)\" class=\"btn btn-default modal-cancel\" @click=\"onclicked(false)\" v-if=\"type == 'confirm'\">取消</a>\n        </div>\n    </v-modal>\n";

var openModal = function(Vue, type, msg, callback) {
    var container = document.createElement('div');
    document.body.appendChild(container);
    var vm = new Vue({
        el: container,
        replace: false,
        template: template,
        data: function() {
            return {
                msg: msg,
                type: type
            };
        },
        methods: {
            onclicked: function onclicked(result) {
                callback && callback(result);
                this.$el.parentNode.removeChild(this.$el);
                vm.$destroy();
            }
        },
        mounted: function mounted (){
            var btn = this.$el.querySelector('#modalBtnDefault');
            btn.focus();
        }
    });
};

Modal$1.confirm = function(msg, callback) {
    var Vue = this.Vue;
    openModal(Vue, 'confirm', msg, callback);
};

Modal$1.warn = function(msg, callback) {
    var Vue = this.Vue;
    openModal(Vue, 'warn', msg, callback);
};

Modal$1.alert = function(msg, callback) {
    var Vue = this.Vue;
    openModal(Vue, 'alert', msg, callback);
};

var Component$6 = { template: "<div class=\"pagination\"><span class=\"total\">共<em>{{total}}</em>条</span> <span @click.prevent=\"go\" v-show=\"pageCount > 1\" class=\"pages\"><a href=\"#\" :class=\"{disabled: pageNumber == 1}\" :data-page=\"pageNumber-1\" class=\"page\">上一页</a> <a href=\"#\" :class=\"{current: pageNumber == 1}\" data-page=\"1\" class=\"page\">1</a> <em v-show=\"spanRange[0] > 2\" class=\"page ellipsis\">⋯</em> <a v-for=\"n in spanRange\" href=\"#\" :class=\"{current: n == pageNumber}\" :data-page=\"n\" class=\"page\">{{n}}</a> <em v-show=\"showEndEllipse\" class=\"page ellipsis\">⋯</em> <a href=\"#\" :class=\"{current: pageNumber == pageCount}\" :data-page=\"pageCount\" class=\"page\">{{pageCount}}</a> <a href=\"#\" :class=\"{disabled: pageNumber == pageCount}\" :data-page=\"pageNumber+1\" class=\"page\">下一页</a></span></div>",
  name: "v-pagination",
  props: {
    total: {
     default: 0       //总条数
    },
    pn: {
      default: 1       //当前页
    },
    ps: {
      default: 20      //每页显示条数
    },
    span: {
        default: 3       //页码的显示个数
    }
  },
  data: function data() {
    return {
      pageNumber: Number.parseInt(this.pn)
    }
  },
  watch: {
    pn: function pn(val) {
      var pn = Number.parseInt(val);
      this.pageNumber = pn > this.pageCount ? this.pageCount : (pn < 1 ? 1: pn);
    }
  },
  computed: {
    pageCount: function pageCount () {              //计算总页码
      return Math.ceil(this.total / this.ps) || 0;
    },
    showEndEllipse: function showEndEllipse () {
      return this.spanRange[this.spanRange.length-1] < (this.pageCount-1);
    },
    /**
     * 计算要显示的页码，不包括第一页和最后一页
     * e.g. [4,5,6,7,8,9,10]
     */
    spanRange: function spanRange () {
      var sr = [],
      /*
         half = Math.floor(this.span / 2),  //显示页码个数的一半
         start = Math.max(Math.min(this.pn - half, this.pageCount - 1 - this.span), 2),   //显示页码范围的起始页
         end = Math.min(Math.max(this.pn + half, start + this.span), this.pageCount - 1); //显示页码范围的终止页
       */
      start = Math.max(this.pageNumber - this.span, 2),   //显示页码范围的起始页
      end = Math.min(this.pageNumber + this.span, this.pageCount - 1); //显示页码范围的终止页
      for(var i = start; i <= end; i++){
        sr.push(i);
      }
      return sr;
    }
  },
  methods: {
    /**
     * 切换页码
     * event 点击事件，用以获取target
     */
    go: function go (event) {
      var target = event.target;
      //若点击的元素带有 disabled、current、ellipsis的class，则返回
      if(/\b(disabled|current|ellipsis)\b/.test(target.className)){
        return;
      }
      this.pageNumber = parseInt(target.getAttribute('data-page'));
      this.$emit("updatepage", this.pageNumber);
    }
  }
};

Component$6.install = function (Vue) { return Vue.component(Component$6.name, Component$6); };

var Calendar$1 = { template: "<div class=\"calendar clearfix\"><div class=\"head\"><span class=\"fa fa-chevron-left\" @click=\"preMonth\" :class=\"{disabled: !isPreMonthCanSelect}\"></span><select v-model=\"year\"><option v-for=\"item in deltaYear\">{{item+minYear-1}}</option></select>年<select v-model=\"month\" class=\"month-select\"><option v-for=\"item in 12\" v-show=\"isMonthCanSelect(item)\">{{item}}</option></select>月 <span class=\"fa fa-chevron-right\" @click=\"nextMonth\" :class=\"{disabled: !isNextMonthCanSelect}\"></span></div><div class=\"week-wrap\"><div v-for=\"item in weeks\" class=\"week\">{{item}}</div></div><div class=\"day-wrap\"><div v-for=\"item in startWeek\" class=\"day place\"></div><div v-for=\"item in days\" class=\"day\" :class=\"{active: isDaySelected(item), disabled: !isDayCanSelect(item), inrange: inRange(item)}\" @click=\"selectDay(item)\">{{item}}</div></div></div>",
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
  data: function data() {
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
    days: function days() {//获取当前日期所在月有多少天
      return new Date(this.year,this.month,0).getDate();
    },
    startWeek: function startWeek() {//获取当前日期所在月的第一天是星期几
      var s = new Date(this.year,this.month-1,1).getDay();
      return !!s ? s-1 : 6;
    },
    minYear: function minYear() {//最小日期的年份
      return new Date(this.minDate).getFullYear();
    },
    maxYear: function maxYear() {//最大日期的年份
      return new Date(this.maxDate).getFullYear();
    },
    minMonth: function minMonth() {//最小日期的年份
      return new Date(this.minDate).getMonth()+1;
    },
    maxMonth: function maxMonth() {//最大日期的年份
      return new Date(this.maxDate).getMonth()+1;
    },
    deltaYear: function deltaYear() {//年份差，用于模板显示年份
      return this.maxYear - this.minYear + 1;
    },
    isPreMonthCanSelect: function isPreMonthCanSelect() {//前一个月是否可以选择
      return !(this.year == this.minYear && this.month == this.minMonth);
    },
    isNextMonthCanSelect: function isNextMonthCanSelect() {//后一个月是否可以选择
      return !(this.year == this.maxYear && this.month == this.maxMonth);
    }
  },
  methods: {
    selectDay: function selectDay(day) {//选择日期
      if(!this.isDayCanSelect(day)) { return false; }
      this.day = day;
      this.date = new Date(((this.year) + "-" + (this.month<10?'0':'') + (this.month) + "-" + (this.day<10?'0':'') + (this.day))).format(this.pattern);
      this.$emit('update', this.date);
    },
    preMonth: function preMonth() {//选择前一个月
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
    nextMonth: function nextMonth() {//选择后一个月
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
    isMonthCanSelect: function isMonthCanSelect(month) {//计算当前月份是否可选
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
    isDayCanSelect: function isDayCanSelect(day) {//计算当前日期是否可选
      var dateStr = (this.year) + "-" + (this.month<10?'0':'') + (this.month) + "-" + (day<10?'0':'') + day;
      var date = new Date(dateStr);
      return new Date(this.minDate) <= date && date <= new Date(this.maxDate)
    },
    isDaySelected: function isDaySelected(day) {//计算当前日期是否是选中的日期
      return new Date(this.year, this.month-1, day).format(this.pattern)
            == new Date(this.value).format(this.pattern);
    },
    inRange: function inRange(day) {//计算当前日期是否是在选中的日期范围内
      day = day<10 ? ("0" + day) : day;
      var month = this.month <10 ? ("0" + (this.month)) : this.month;
      var d = new Date(((this.year) + "-" + month + "-" + day));
      if(!this.type) { return false; }
      if(this.type == 'start') {
        return d >= new Date(this.value) && d <= new Date(this.maxDate);
      } else if (this.type == 'end') {
        return d >= new Date(this.minDate) && d <= new Date(this.value);
      }
    },
    syncDate: function syncDate() {
      this.date = this.value || this.date || new Date().format(this.pattern);
      if(new Date(this.date) > new Date(this.maxDate)) { this.date = this.maxDate; }
      if(new Date(this.date) < new Date(this.minDate)) { this.date = this.minDate; }
      this.date = new Date(this.date).format(this.pattern);
      var d = new Date(this.date);
      this.year = d.getFullYear();
      this.month = d.getMonth()+1;
      this.day = d.getDate();
    }
  },
  mounted: function mounted() {
    this.syncDate();
  },
  watch: {
    value: function value() {
      this.syncDate();
    },
    year: function year(val, oldVal) {
      if(val == this.maxYear && this.month > this.maxMonth) {
        this.month = this.maxMonth;
      }
      else if(val == this.minYear && this.month < this.minMonth) {
        this.month = this.minMonth;
      }
    }
  }
};
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

Calendar$1.install = function (Vue) { return Vue.component(Calendar$1.name, Calendar$1); };

var Component$7 = { template: "<div class=\"datepicker\" @keyup.esc=\"showCalendar=false\"><input type=\"text\" class=\"calendar-input\" v-model=\"date\" :placeholder=\"placeholder\" :disabled=\"disabled\" @click.prevent=\"showCalendar=!showCalendar\" readonly=\"readonly\"> <i class=\"fa fa-calendar\"></i><calendar ref=\"calendar\" :value=\"date\" :min-date=\"minDate\" :max-date=\"maxDate\" :pattern=\"pattern\" @update=\"update\" v-show=\"showCalendar\"></calendar></div>",
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
    Calendar: Calendar$1
  },
  data: function data() {
    return {
      date: '',
      showCalendar: false
    }
  },
  watch: {
    value: function value(val) {
      this.date = val && new Date(val).format(this.pattern);
    },
    show: function show(val) {
      this.showCalendar = val;
    },
    showCalendar: function showCalendar(val) {
      if (val) {
        window.addEventListener('click', this.hideCalendar, false);
      } else {
        window.removeEventListener('click', this.hideCalendar);
      }
    }
  },
  mounted: function mounted() {
    this.date = this.value && new Date(this.value).format(this.pattern);
    this.showCalendar = this.show;
  },
  methods: {
    hideCalendar: function hideCalendar(event) {//隐藏日期panel
      if(!this.$el.contains(event.target)){
        this.showCalendar = false;
      }
    },
    update: function update(date) {
      this.date = date;
      this.$emit('input', date);
      this.showCalendar = false;
    }
  },
  beforeDestroy: function beforeDestroy() {//将点击页面上其他地方关闭日期panel的事件移除
    window.removeEventListener('click', this.hideCalendar);
  }
};

Component$7.install = function (Vue) { return Vue.component(Component$7.name, Component$7); };

var Component$8 = { template: "<div class=\"daterange\" @keyup.esc=\"showCalendar=false\"><input type=\"text\" class=\"calendar-input\" v-model=\"dateRange\" @click.prevent=\"showCalendar=!showCalendar\" readonly=\"readonly\"> <i class=\"fa fa-calendar\"></i><div v-show=\"showCalendar\" class=\"calendar-wrap\"><div class=\"datespan clearfix\"><span class=\"start\">开始日期</span> <span class=\"end\">结束日期</span></div><calendar ref=\"calendar\" v-model=\"start\" :min-date=\"minDate\" :max-date=\"startMaxDate\" :pattern=\"pattern\" type=\"start\" @update=\"updateStart\"></calendar><calendar ref=\"calendar\" v-model=\"end\" :min-date=\"endMinDate\" :max-date=\"maxDate\" :pattern=\"pattern\" type=\"end\" @update=\"updateEnd\"></calendar><div class=\"shortcut\" v-if=\"shortcut\" @click.prevent=\"setRange\"><span date-range=\"yesterday\">昨天</span> <span date-range=\"daybeforeyesterday\">前天</span> <span date-range=\"latest7days\">最近 7 天</span> <span date-range=\"lastweek\">上周</span> <span date-range=\"latest30days\">最近 30 天</span></div><div class=\"range-str\">{{range}}</div><div class=\"operations\"><button class=\"btn btn-primary\" @click.prevent=\"updateRange\">确定</button> <button class=\"btn btn-default\" @click.prevent=\"showCalendar=false\">取消</button></div></div></div>",
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
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Calendar: Calendar$1
  },
  data: function data() {
    return {
      showCalendar: false,
      start: '',
      end: ''
    }
  },
  computed: {
    dateRange: function dateRange() {
      return (this.startDate && this.endDate) ? ((this.startDate) + " 至 " + (this.endDate)) : '';
    },
    range: function range() {
      return (this.start && this.end) ? ((this.start) + " 至 " + (this.end)) : '';
    },
    startMaxDate: function startMaxDate() {
      return this.end || this.maxDate;
    },
    endMinDate: function endMinDate() {
      return this.start || this.minDate;
    }
  },
  watch: {
    startDate: function startDate(val) {
      this.start = val && new Date(val).format(this.pattern);
    },
    endDate: function endDate(val) {
      this.end = val && new Date(val).format(this.pattern);
    },
    show: function show(val) {
      this.showCalendar = val;
    },
    showCalendar: function showCalendar(val) {
      if (val) {
        window.addEventListener('click', this.hideCalendar, false);
      } else {
        window.removeEventListener('click', this.hideCalendar);
      }
    }
  },
  mounted: function mounted() {
    this.start = this.startDate && new Date(this.startDate).format(this.pattern);
    this.end = this.endDate && new Date(this.endDate).format(this.pattern);
    this.showCalendar = this.show;
  },
  methods: {
    hideCalendar: function hideCalendar(event) {//隐藏日期panel
      if(!this.$el.contains(event.target)){
        this.showCalendar = false;
      }
    },
    setRange: function setRange(e) {
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
    getDate: function getDate(day) {
      var today = new Date(),
        todayTime = today.getTime(),
        oneday = 24*60*60*1000;
      return new Date(todayTime - day*oneday).format(this.pattern);
    },
    updateStart: function updateStart(date) {
      this.start = date;
    },
    updateEnd: function updateEnd(date) {
      this.end = date;
    },
    updateRange: function updateRange() {
      this.$emit('update', {startDate: this.start, endDate:this.end});
      this.showCalendar = false;
    }
  },
  beforeDestroy: function beforeDestroy() {//将点击页面上其他地方关闭日期panel的事件移除
    window.removeEventListener('click', this.hideCalendar);
  }
};

Component$8.install = function (Vue) { return Vue.component(Component$8.name, Component$8); };

var Component$9 = { template: "<div class=\"tooltip\" @mouseover=\"show\" @mouseleave=\"hide\"><slot></slot></div>",
  name: 'v-tooltip',
  props: {
    tip: String,
    pos: {
      default: 'top'
    },
    maxWidth: {
      default: '20em'
    }
  },
  data: function data() {
    return {
      tipEl: ''
    };
  },
  methods: {
    show: function show() {
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
    hide: function hide() {
      this.tipEl.style.visibility = 'hidden';
    },
    getStyle: function getStyle() {//计算tip的style样式
      var clientRect = this.$el.getBoundingClientRect();
      var rect = {//计算需要提示的元素的尺寸及相对于页面左上角的x,y值
        w: clientRect.width,
        h: clientRect.height,
        top: clientRect.top + window.scrollY,
        left: clientRect.left + window.scrollX
      };
      var tipSize = {//计算tip的尺寸
        w: this.tipEl.offsetWidth,
        h: this.tipEl.offsetHeight
      };
      var top = '', left = '';//计算tip相对于页面左上角的top,left值
      if (this.pos == 'bottom') {
        top = rect.top + rect.h / 1 + 6 + 'px';
        left = rect.left + (rect.w - tipSize.w )/ 2 + 'px';
      } else if (this.pos == 'top') {
        top = rect.top - tipSize.h / 1 - 6 + 'px';
        left =  rect.left + (rect.w - tipSize.w )/ 2 + 'px';
      } else if (this.pos == 'right') {
        top = rect.top + (rect.h - tipSize.h )/ 2 + 'px';
        left =  rect.left + rect.w / 1 + 6 + 'px';
      } else if (this.pos == 'left') {
        top = rect.top + (rect.h - tipSize.h )/ 2 + 'px';
        left = rect.left - tipSize.w / 1 - 6 + 'px';
      }
      return ("max-width: " + (this.maxWidth) + "; top: " + top + "; left: " + left);
    }
  }
};

Component$9.install = function (Vue) { return Vue.component(Component$9.name, Component$9); };

var Vtag = { template: "<span :class=\"['v-tag', type?'v-tag--'+type:'']\"><span class=\"v-tag-label\"><slot>{{value}}</slot></span><i v-if=\"closable\" @click=\"close($event)\" class=\"fa fa-times v-tag-close\"></i></span>",
  name: 'v-tag',
  props: {
    closable: {
      type: Boolean,
      default: false
    },
    value: String,
    type: String
  },
  methods: {
    close: function close(e) {
      this.$emit('close', e);
    }
  }
};

Vtag.install = function (Vue) { return Vue.component(Vtag.name, Vtag); };

var nodeList = [];
var ctx = '@@clickoutsideContext';

window.addEventListener('click', function (e) {
    nodeList.forEach(function (node) { return node[ctx].documentHandler(e); });
}, false);
/**
 *  * v-clickoutside
 *   * @desc 点击元素外面才会触发的事件
 *    * @example
 *     * ```vue
 *      * <div v-element-clickoutside="handleClose">
 *       * ```
 *        */
 var clickoutside = {
     bind: function bind(el, binding, vnode) {
           var id = nodeList.push(el) - 1;
           var documentHandler = function(e) {
                   if (!vnode.context ||
                               el.contains(e.target) ||
                               (vnode.context.popperElm &&
                                        vnode.context.popperElm.contains(e.target))) { return; }

                   if (binding.expression &&
                               el[ctx].methodName &&
                               vnode.context[el[ctx].methodName]) {
                                         vnode.context[el[ctx].methodName]();
                                       } else {
                                                 el[ctx].bindingFn && el[ctx].bindingFn();
                                               }
                 };
           el[ctx] = {
                   id: id,
                   documentHandler: documentHandler,
                   methodName: binding.expression,
                   bindingFn: binding.value
                 };
         },

     update: function update(el, binding) {
           el[ctx].methodName = binding.expression;
           el[ctx].bindingFn = binding.value;
         },

     unbind: function unbind(el) {
           var len = nodeList.length;

           for (var i = 0; i < len; i++) {
                   if (nodeList[i][ctx].id === el[ctx].id) {
                             nodeList.splice(i, 1);
                             break;
                           }
                 }
         }
 };

var VOption = { template: "<li @click=\"selectItem\" @mouseenter=\"hoverItem\" class=\"dropdown-item\" :class=\"{'selected': selected,'is-disabled': disabled,'hover': select.hoverIndex === index}\"><span class=\"v-select-option-wrap\" ref=\"option\"><slot>{{ currentLabel }}</slot></span></li>",
  name: 'v-option',
  props: {
    label: String,
    value: '',
    disabled: Boolean
  },
  computed: {
    currentLabel: function currentLabel() { return this.label || this.innerHTML;},
    currentValue: function currentValue() { return this.value || this.label || this.innerHTML;},
    innerHTML: function innerHTML() {
      var html = '';
      if (this.$refs.option) {
        html = this.$refs.option.innerHTML;
      }
      return html;
    },
    select: function select() {
      var result = this.$parent;
      while (!result.isSelect) {
        result = result.$parent;
      }
      return result;
    },
    index: function index() {
      return this.select.option.indexOf(this);
    },
    selected: function selected() {
      if (this.select.multiple) {
        return this.select.selectedOption.indexOf(this) > -1;
      } else {
        return this.select.selectedOption === this;
      }
    }
  },
  watch: {
    disabled: function disabled() {
      if (this.disabled) {
        this.destroyOrDisabled();
      }
    }
  },
  methods: {
    hoverItem: function hoverItem() {
      if (!this.disabled) {
        this.select.hoverIndex = this.index;
      } else {
        this.select.hoverIndex = -1;
      }
    },
    selectItem: function selectItem() {
      this.select.selectItem();
    },
    destroyOrDisabled: function destroyOrDisabled() {
      if (this.selected) {
        if (this.select.multiple) {
          this.select.removeItem(this);
        } else {
          this.select.selectedOption = undefined;
          this.select.onChange();
        }
      }
      if (this.select.hoverIndex == this.index) {
        this.select.hoverIndex = -1;
      }
    }
  },
  created: function created() {
    this.select.option.push(this);
  },
  beforeDestroy: function beforeDestroy() {
    this.select.option.splice(this.index, 1);
    this.destroyOrDisabled();
  }
};

var VOptionGroup = { template: "<ul class=\"v-select-group__wrap\"><li class=\"v-select-group__title\">{{ label }}</li><li><ul class=\"v-select-group\"><slot></slot></ul></li></ul>",
  name: 'v-option-group',
  props: {
    label: String
  },
  methods: {
  } 
};

var Select = { template: "<div class=\"v-select\" :class=\"[multiple? 'multiple' : 'not-multiple', {'is-disabled': disabled}]\"><div :class=\"['v-select-wrap', 'dropdown']\" v-clickoutside=\"close\"><div class=\"dropdown-wrap\"><div class=\"multiple\" v-if=\"multiple\" @click=\"handleInputClick\" ref=\"tags\"><v-tag v-for=\"(tag, index) in selectedOption\" :key=\"index\" :closable=\"true\" @close=\"removeItem(tag, $event)\">{{tag.currentLabel}}</v-tag></div><input :style=\"inputStyle\" class=\"dropdown-input\" :disabled=\"disabled\" @mousedown.prevent=\"handleInputClick\" @focus=\"open\" @keydown.tab=\"close\" @keydown.up=\"changeHover('pre', $event)\" @keydown.down=\"changeHover('next', $event)\" @keydown.enter=\"selectItem($event)\" @keydown.esc=\"close\" :placeholder=\"placeholder\" readonly=\"readonly\" ref=\"input\" v-model=\"showText\"> <i :class=\"['fa','fa-caret-down',{opened: opened}]\" @click=\"handleInputClick\"></i></div><transition name=\"fade\"><ul class=\"dropdown-list\" ref=\"popper\" v-show=\"opened\"><slot><template v-for=\"(option, key) in options\"><v-option v-if=\"!option.options\" :key=\"key\" :disabled=\"option.disabled\" :label=\"option.label\" :value=\"option.value\"></v-option><v-option-group v-else :key=\"key\" :label=\"option.label\"><v-option v-for=\"(item, index) in option.options\" :key=\"index\" :disabled=\"item.disabled\" :label=\"item.label\" :value=\"item.value\"></v-option></v-option-group></template></slot></ul></transition></div><em class=\"error\" v-if=\"!validity.valid\">{{validity.msg}}</em></div>",
  name: 'v-select',
  props: {
    value: {},
    options: {
      type: [Object, Array],
      default: function default$1() {
        return []
      }
    },
    disabled: Boolean,
    multiple: {
      type: Boolean,
      default: false 
    },
    placeholder: String,
    rules: Object
  },
  directives: {clickoutside: clickoutside},
  components: {
      "v-option": VOption,
      "v-option-group": VOptionGroup,
      "v-tag": Vtag
  },
  mixins: [validatable],
  data: function data() {
    return {
      searchText: '',
      tempValue: undefined,
      opened: false,
      option: [],
      hoverIndex: -1,
      isSelect: true,
      selectedOption: undefined,
      inputStyle: {}
    }
  },
  computed: {
    showText: function showText() {
        if (!this.multiple) {
          return this.selectedOption?this.selectedOption.currentLabel:'';
        } else if (this.value.length) {
          // 隐藏占位
          return ' ';
        } else {
          return '';
        }
    }
  },
  watch: {
    disabled: function disabled() {
      if (this.disabled) {
        this.close();
      }
    },
    value: function value() {
      return this.valuechange();
    },
    multiple: function multiple() {
      if (this.multiple) {//从单转为多
        if (this.selectedOption) {
          this.selectedOption = [this.selectedOption];
        } else {
          this.selectedOption = [];
        }
      } else {
        if (this.selectedOption.length == 1) {
          this.selectedOption = this.selectedOption[0];
        } else {
          this.selectedOption = undefined;
        }
      }
      this.onChange();
    }
  },
  methods: {
    valuechange: function valuechange() {
      var this$1 = this;

      // console.log(this.value, this.selectedOption);
      if (this.value == this.tempValue) {
        return;
      } else {
        //if (this.disabled) {
        //  this.$emit('input', this.tempValue);
        //  console.log('Faild: try to change a disabled select value');
        //  //throw new Error('Faild: try to change a disabled select value');
        //  return;
        //}
        this.tempValue = this.value;
      }
      if (this.multiple) {
        if (!Array.isArray(this.value)) {
          this.selectedOption = [];
          this.tempValue = [];
          this.$emit('input', this.tempValue);
          return;
        } else if (this.value.length == 0) {
          this.selectedOption = [];
          return;
        }
        var selectedOption = [];
        var value = Object.assign([], this.value);
        var indexed = {};
        this.option.forEach(function (item) {
          if (item.disabled) { return true; }
          var tempIndex = value.indexOf(item.value);
          if (tempIndex > -1) {
            indexed[tempIndex] = true;
            selectedOption.push(item);
          }
        });
        this.selectedOption = selectedOption;
        var deleted = false;
        for (var index = value.length - 1; index >= 0; index --) {
          if (!indexed[index]) {
            deleted = true;
            value.splice(index, 1);
          }
        }
        if (deleted) {
          this.tempIndex = value;
          this.$emit('input', value);
        }
      } else {
        if (!this.selectedOption || this.value !== this.selectedOption.value) {
          this.selectedOption = undefined;
          var has = false;
          this.option.forEach(function (item) {
            if (!item.disabled && item.value === this$1.value) {
              has = true;
              this$1.selectedOption = item;
            }
          });
          if (!has && this.value !== '') {
            this.tempValue = '';
            this.$emit('input', '');
          }
        }
      }
    },
    onChange: function onChange() {
      var this$1 = this;

      if (this.multiple) {
        var val = [];
        this.selectedOption.forEach(function(item, index) {
          val.push(item.value);
        });
        this.tempValue = val;
        this.$emit('input', val);
        this.$nextTick(function () {
          if (this$1.selectedOption.length == 0) {
            this$1.inputStyle = {};
            return;
          }
          this$1.inputStyle = {
            height: parseInt(getComputedStyle(this$1.$refs.tags).height) + 3 + 'px'
          };
        });
      } else {
        this.tempValue = this.selectedOption && this.selectedOption.value || '';
        this.$emit('input', this.selectedOption && this.selectedOption.value || '');
        this.inputStyle = {};
        this.close();
      }
    },
    handleInputClick: function handleInputClick() {
      var this$1 = this;

      if (this.opened) {
        this.$nextTick(function () {
          this$1.close();
          this$1.$refs.input.blur();
        });
      } else {
        this.$refs.input.focus();
        this.open();
      }
    },
    toggle: function toggle() {
      if (this.opened) {
        this.close();
      } else {
        this.open();
      }
    },
    open: function open() {
      if (this.disabled) { return; }
      this.opened = true;
    },
    close: function close() {
      this.opened = false;
    },
    changeHover: function changeHover(op, start) {
      if (start && start.preventDefault) {
        start.preventDefault();
      }
      if (this.option.length == 0) {
        return;
      }
      if (op == 'pre') {
        if (this.hoverIndex > 0) {
          this.hoverIndex --;
        } else {
          this.hoverIndex = this.option.length - 1;
        }
      } else if (op == 'next') {
        if (this.hoverIndex < this.option.length - 1) {
          this.hoverIndex ++;
        } else {
          this.hoverIndex = 0;
        }
      }
      this.resetScrollTop();
      if (this.option[this.hoverIndex].disabled) {
        // 防止全部的Option都为disabled
        if (this.hoverIndex != start) {
          this.changeHover(op, start || this.hoverIndex);
        } else {
          this.hoverIndex = -1;
          this.resetScrollTop();
        }
      }
    },
    resetScrollTop: function resetScrollTop() {
      if (this.hoverIndex < 0) {
        return;
      }
      var bottomOverflowDistance = this.option[this.hoverIndex].$el.getBoundingClientRect().bottom -
        this.$refs.popper.getBoundingClientRect().bottom;
      var topOverflowDistance = this.option[this.hoverIndex].$el.getBoundingClientRect().top -
        this.$refs.popper.getBoundingClientRect().top;
      if (bottomOverflowDistance > 0) {
        this.$refs.popper.scrollTop += bottomOverflowDistance;
      }
      if (topOverflowDistance < 0) {
        this.$refs.popper.scrollTop += topOverflowDistance;
      }
    },
    selectItem: function selectItem($event) {
      if ($event) {
        $event.preventDefault();
      }
      if (this.disabled) { return; }
      if (!this.opened) {
        this.open();
        return;
      }
      if (this.hoverIndex < 0 || !this.option[this.hoverIndex] || this.option[this.hoverIndex].disabled) {
        return;
      }
      if (!this.multiple) {
        this.selectedOption = this.option[this.hoverIndex];
        this.onChange();
      } else {
        var index = this.selectedOption.indexOf(this.option[this.hoverIndex]);
        if (index >= 0) {
          this.selectedOption.splice(index, 1);
        } else {
          this.selectedOption.push(this.option[this.hoverIndex]);
        }
        this.onChange();
      }
    },
    removeItem: function removeItem(option, event) {
      event && event.stopPropagation();
      if (this.disabled) { return; }
      this.selectedOption.splice(this.selectedOption.indexOf(option), 1);
      this.onChange();
    }
  },
  created: function created() {
    if (this.multiple && !Array.isArray(this.value)) {
      this.tempValue = [];
      this.$emit('input', this.tempValue);
      this.selectedOption = [];
    }
    if (!this.multiple && Array.isArray(this.value)) {
      this.tempValue = '';
      this.$emit('input', '');
    } 
  },
  mounted: function mounted() {
    if ((this.multiple && this.value.length > 0) || !this.multiple) {
      this.valuechange();
    }
  }
};

Select.install = function (Vue) { return Vue.component(Select.name, Select); };
VOption.install = function (Vue) { return Vue.component(VOption.name, VOption); };
VOptionGroup.install = function (Vue) { return Vue.component(VOptionGroup.name, VOptionGroup); };

var Component$10 = { template: "<div class=\"input-range\" @click=\"move\" :disabled=\"disabled\"><input type=\"hidden\" v-model=\"val\"><div class=\"range\"><div class=\"track\" :style=\"{width: percentage}\"></div><div class=\"thumb\" :style=\"{left: percentage}\" @mousedown=\"dragStart\"></div><div class=\"value\" :style=\"{left: percentage}\"><slot>{{ val }}</slot></div></div><ul class=\"mark\"><li v-for=\"s in scale\" :style=\"{left: _getPercentage(s)}\">{{ s }}</li></ul></div>",
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
  data: function data() {
    return {
      val: 50
    }
  },
  computed: {
    max: function max () {
      var max = this.scale[this.scale.length -1];
      if(this.val > max) { this.val = max; }
      return max;
    },
    min: function min () {
      var min = this.scale[0];
      if(this.val < min) { this.val = min; }
      return min;
    },
    precision: function precision() {
      return (this.step.toString().split('.')[1] || []).length;
    },
    percentage: function percentage () {
      return this._getPercentage(this.val);
    }
  },
  watch: {
    value: function value(newVal, oldVal) {
      this.val = (this.value || this.value === 0) ? this.value : (this.max+this.min)/2;
    },
    val: function val() {
      this.$emit('input', this.val);
    }
  },
  mounted: function mounted () {
    this.val = (this.value || this.value === 0) ? this.value : (this.max+this.min)/2;
    this._getWholeWidth();
    window.addEventListener('resize', this._getWholeWidth);
  },
  methods: {
    dragStart: function dragStart () {
      document.body.addEventListener('mousemove',this.move);
      document.body.addEventListener('mouseup',this.dragEnd);
    },
    dragEnd: function dragEnd () {
      document.body.removeEventListener('mousemove',this.move);
      document.body.removeEventListener('mouseup',this.dragEnd);
    },
    move: function move (e) {
      if(this.disabled) { return; }
      var me = this;
      var left = e.pageX - window.scrollX - me.$el.getBoundingClientRect().left;
      if (left < 0 || left > me.wholeWidth) { return false; }
      var delta = (left * (me.max-me.min) / me.wholeWidth).toFixed(me.precision+1);
      me.val = (delta % me.step < me.step / 2)
               ? (Math.floor(delta / me.step) * me.step + me.min)
               : (Math.ceil(delta / me.step) * me.step + me.min);
      me.val = parseFloat(parseFloat(me.val).toFixed(this.precision));
    },
    _getWholeWidth: function _getWholeWidth() {
      this.wholeWidth = this.$el.querySelector('.range').offsetWidth;
    },
    _getPercentage: function _getPercentage(value) {
      return (value - this.min) * 100 / (this.max - this.min) + '%';
    }
  },
  destroyed: function destroyed() {
    window.removeEventListener('resize',this._getWholeWidth);
  }
};

Component$10.install = function (Vue) { return Vue.component(Component$10.name, Component$10); };

var VSuggestItem = { template: "<li v-show=\"innerVisiable\" @click=\"selectItem\" @mouseenter=\"hoverItem\" class=\"dropdown-item\" :class=\"{'selected': selected,'hover': hovered}\"><span class=\"wrap\" ref=\"label\"><slot>{{ currentLabel }}</slot></span></li>",
  name: 'v-suggest-item',
  props: {
    label: String,
    value: '',
    visiable: {
      type: Boolean,
      default: true
    }
  },
  data: function data() {
    return {
      innerVisiable: true
    }
  },
  computed: {
    currentLabel: function currentLabel() { return  this.label || this.$refs.label.innerHTML},
    suggest: function suggest() {
      var result = this.$parent;
      while (!result.isSuggest) {
        result = result.$parent;
      }
      return result;
    },
    index: function index() {
      return this.suggest.suggestion.indexOf(this);
    },
    selected: function selected() {
      return this.suggest.selectedSuggest === this;
    },
    hovered: function hovered() {
      return this.suggest.hoverIndex == this.index
    }
  },
  watch: {
    visiable: function visiable() {
      this.innerVisiable = this.visiable;
    }
  },
  methods: {
    hoverItem: function hoverItem() {
      this.suggest.hoverIndex = this.index;
    },
    selectItem: function selectItem() {
      this.suggest.selectItem();
    },
    destroyOrDisabled: function destroyOrDisabled() {
      if (this.selected) {
        this.suggest.selectedSuggest = undefined;
        this.suggest.onChange();
      }
      if (this.suggest.hoverIndex == this.index) {
        this.suggest.hoverIndex = -1;
      }
    }
  },
  created: function created() {
    this.suggest.suggestion.push(this);
  },
  beforeDestroy: function beforeDestroy() {
    this.suggest.suggestion.splice(this.index, 1);
    this.destroyOrDisabled();
  }
};

var Suggest = { template: "<div class=\"v-suggest\"><div class=\"v-suggest-wrap dropdown\" v-clickoutside=\"close\"><div class=\"dropdown-wrap\"><input class=\"dropdown-input\" @mousedown.prevent=\"handleInputClick\" @focus=\"open\" @keydown.tab=\"close\" @keydown.up=\"changeHover('pre', $event)\" @keydown.down=\"changeHover('next', $event)\" @keydown.enter=\"selectItem($event)\" @keydown.esc=\"close\" :placeholder=\"placeholder\" ref=\"input\" @input=\"handleInput\" v-model=\"showText\"></div><transition name=\"fade\"><ul class=\"dropdown-list\" ref=\"popper\" v-show=\"opened\"><slot><template><v-suggest-item v-for=\"(suggestion, index) in suggestions\" :key=\"index\" :value=\"suggestion.value\" :label=\"suggestion.label\" :visiable=\"suggestion.visiable == undefined?true:suggestion.visiable\"></v-suggest-item><li class=\"dropdown-item\" v-if=\"visiableCount == 0\">无结果</li></template></slot></ul></transition></div><em class=\"error\" v-if=\"!validity.valid\">{{validity.msg}}</em></div>",
  name: 'v-suggest',
  props: {
    value: '',
    suggestions: {
      type:  Array,
      default: function default$1() {
        return []
      }
    },
    filter: {
      type: Function,
      default: function default$2(suggestion, text) {
        return suggestion.currentLabel.indexOf(text) > -1;
      }
    },
    rules: Object,
    placeholder: String
  },
  directives: {clickoutside: clickoutside},
  mixins: [validatable],
  components: {
    "v-suggest-item": VSuggestItem
  },
  data: function data() {
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
    value: function value() {
      this.valuechange();
    }
  },
  methods: {
    valuechange: function valuechange() {
      var this$1 = this;

      if (this.value == this.tempValue) {
        return;
      } else {
        this.tempValue = this.value;
      }
      if (!this.selectedSuggest || this.value != this.selectedSuggest.value) {
        this.selectedSuggest = undefined;
        this.suggestion.forEach(function (item) {
          if (item.value === this$1.value) {
            this$1.selectedSuggest = item;
            return false;
          }
        });
        this.onChange();
      }
    },
    handleInput: function handleInput() {
      var this$1 = this;

      !this.opened && this.open(true);
      var count = 0;
      var hoverIndex = -1;
      this.suggestion.forEach(function (item, index) {
          item.innerVisiable = this$1.filter.call(this$1, item, this$1.showText);
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
    onChange: function onChange() {
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
    handleInputClick: function handleInputClick() {
      var this$1 = this;

      if (this.opened) {
        this.$nextTick(function () {
          this$1.close();
          this$1.$refs.input.blur();
        });
      } else {
        this.$refs.input.focus();
        this.open();
      }
    },
    toggle: function toggle() {
      if (this.opened) {
        this.close();
      } else {
        this.open();
      }
    },
    open: function open(cancelSelect) {
      var this$1 = this;

      this.opened = true;
      !cancelSelect && this.$refs.input.select();
      this.suggestion.forEach(function (item, index) {
        item.innerVisiable = true;
      });
      this.visiableCount = this.suggestion.length;
      if (this.selectedSuggest) {
        this.hoverIndex = this.selectedSuggest.index;
        this.$nextTick(function () {
          this$1.resetScrollTop();
        });
      }
    },
    close: function close() {
      var this$1 = this;

      this.opened = false;
      if (this.showText) {
        //唯一匹配并且没有选中，或者选中了不是一样的
        if (this.visiableCount == 1 && (!this.selectedSuggest || this.selectedSuggest.currentLabel != this.showText )) {
          var hasMatch = false;
          this.suggestion.forEach(function (item) {
            if (item.innerVisiable && item.currentLabel == this$1.showText) {
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
    changeHover: function changeHover(op, start) {
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
    resetScrollTop: function resetScrollTop() {
      if (this.hoverIndex < 0) {
        return;
      }
      var bottomOverflowDistance = this.suggestion[this.hoverIndex].$el.getBoundingClientRect().bottom -
        this.$refs.popper.getBoundingClientRect().bottom;
      var topOverflowDistance = this.suggestion[this.hoverIndex].$el.getBoundingClientRect().top -
        this.$refs.popper.getBoundingClientRect().top;
      if (bottomOverflowDistance > 0) {
        this.$refs.popper.scrollTop += bottomOverflowDistance;
      }
      if (topOverflowDistance < 0) {
        this.$refs.popper.scrollTop += topOverflowDistance;
      }
    },
    selectItem: function selectItem($event) {
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
  mounted: function mounted() {
    var count = 0;
    this.suggestion.forEach(function (item) {
      item.innerVisiable && (count++);
    });
    this.visiableCount = count;
    this.valuechange();
  }
};

Suggest.install = function (Vue) { return Vue.component(Suggest.name, Suggest); };
VSuggestItem.install = function (Vue) { return Vue.component(VSuggestItem.name, VSuggestItem); };

var TreeItem = { template: "<li><div @click=\"toggle\"><i :class=\"'fa fa-'+folderFoldIcon\" v-if=\"(data.children && data.children.length) && !unfold\"></i> <i :class=\"'fa fa-'+folderUnfoldIcon\" v-if=\"(data.children && data.children.length) && unfold\"></i> <i :class=\"'fa fa-'+nofolderIcon\" v-if=\"!data.children || (data.children && !data.children.length)\"></i> {{data.name}}</div><ul v-if=\"data.children\" v-show=\"unfold\"><tree-item v-for=\"d in data.children\" :data=\"d\" :folder-fold-icon=\"folderFoldIcon\" :folder-unfold-icon=\"folderUnfoldIcon\" :nofolder-icon=\"nofolderIcon\"></tree-item></ul></li>",
  name: 'tree-item',
  props: {
    data: {
      default: {}
    },
    folderFoldIcon: {
      default: 'plus-square-o'
    },
    folderUnfoldIcon: {
      default: 'minus-square-o'
    },
    nofolderIcon: {
      default: 'circle-thin'
    }
  },
  data: function data () {
    return {
      unfold: true
    }
  },
  methods: {
    toggle: function toggle () {
      this.unfold = !this.unfold;
    }
  }
};

var Component$11 = { template: "<ul class=\"vue-tree\"><tree-item v-for=\"d in data\" :data=\"d\" :folder-fold-icon=\"folderFoldIcon\" :folder-unfold-icon=\"folderUnfoldIcon\" :nofolder-icon=\"nofolderIcon\"></tree-item></ul>",
  name: 'v-tree',
  props: {
    data: {
      default: {}
    },
    unfold: {
      default: true
    },
    folderFoldIcon: {
      default: 'plus-square-o'
    },
    folderUnfoldIcon: {
      default: 'minus-square-o'
    },
    nofolderIcon: {
      default: 'circle-thin'
    }
  },
  components: {
    TreeItem: TreeItem
  },
  created: function created () {
  }
};

Component$11.install = function (Vue) { return Vue.component(Component$11.name, Component$11); };

var install = function(Vue) {
  var this$1 = this;

  Object.keys(this).map(function (key) { return this$1[key]; }).filter(
    function (C) { return C && typeof C.install === 'function'; } // Find all Vue plugins
  ).forEach(function (C) { return Vue.use(C); });                 // and use them
};

var index$1 = {
  install: install,
  Validatable: validatable,
  Input: Component,
  Checkbox: Component$1,
  CheckboxGroup: Component$2,
  RadioGroup: Component$3,
  FormItem: Component$4,
  Form: Component$5,
  Modal: Modal$1,
  Pagination: Component$6,
  DatePicker: Component$7,
  DateRange: Component$8,
  Tooltip: Component$9,
  Tag: Vtag,
  Select: Select,
  Option: VOption,
  OptionGroup: VOptionGroup,
  Suggest: Suggest,
  SuggestItem: VSuggestItem,
//  VDropdown,
//  VDropdownMenu,
//  VDropdownItem,
  InputRange: Component$10,
  Tree: Component$11
};

return index$1;

})));
//# sourceMappingURL=v-tags.js.map

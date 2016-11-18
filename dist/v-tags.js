(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (factory((global.VTags = global.VTags || {})));
}(this, (function (exports) { 'use strict';

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
  maxType: function(value, param) {
    var valid = isNaN(value);
    var msg = valid ? '' : '请输入数字';
    if(!valid) { return { valid: valid, msg: msg }; }
    valid = parseFloat(value) <= parseFloat(param);
    msg = valid ? '' : '输入值最大为' + param;
    return { valid: valid, msg: msg };
  },

  /**
   * min格式
   */
  maxType: function(value, param) {
    var valid = isNaN(value);
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
    return {
      valid: param.test(toString(value)),
      msg: '格式不符合要求'
    }
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
    function (ruleName) { return ruleName != 'msg' && typeof ruleset$1[ruleName] == 'function'; }
  ).filter(function (ruleName) { return toString(value).length || ruleName == 'required'; }).map(function (ruleName) {
    // 验证单条规则
    var param = rules[ruleName];
    var result = ruleset$1[ruleName](value, param);
    // 处理自定义错误提示
    if (!result.valid && msg) {
      if (typeof msg == 'string') {
        result.msg = msg;
      } else if (msg[ruleName]) {
        result.msg = msg[ruleName];
      }
    }
    return result;
  }).find(function (result) { return !result.valid; });
  return failResult || { valid: true };
}

/**
 * A Vue.js mixin to add validate functionality
 */
var Validatable = {

  data: function () { return ({
    // store validation result
    validity: {
      valid: true,
      msg: ''
    }
  }); },

  created: function() {
    if (!this.$options.props.value || !this.$options.props.rules) {
      var msg = "Prop 'value' and 'rules' are required to use 'Validatable'.";
      throw new Error(msg);
    }
  },

  watch: {
    value: function() {
      this.validity = this.validate();
    }
  },

  methods: {
    validate: function() {
      return this.validity = Validator.validate(this.value, this.rules);
    }
  }

};

var Component$1 = { template: "<div class=\"input-wrap\"><input v-if=\"type!='textarea' && type!='radio'\" :class=\"className\" :type=\"type\" :name=\"name\" :value=\"value\" :placeholder=\"placeholder\" :readonly=\"readonly\" :disabled=\"disabled\" :maxlength=\"maxlength\" @input=\"onInput\"><label v-if=\"type=='radio'\"><input :class=\"className\" :type=\"type\" :value=\"val\" :name=\"name\" :readonly=\"readonly\" :disabled=\"disabled\" :checked=\"val==value\" @change=\"onChange\"> <i></i> {{placeholder}}</label><textarea v-if=\"type=='textarea'\" :name=\"name\" :value=\"value\" :placeholder=\"placeholder\" :readonly=\"readonly\" :disabled=\"disabled\" :maxlength=\"maxlength\" :rows=\"rows\" @input=\"onInput\">\n  </textarea><em class=\"error\" v-if=\"!validity.valid\">{{validity.msg}}</em></div>",
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
    val: String,
    rows: {
      type: Number,
      default: 3
    },
    maxlength: Number
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
  mixins: [Validatable],
  methods: {
    onInput: function onInput(e) {
      this.$emit('input', e.target.value);
    },
    onChange: function onChange(e) {
      this.$emit('input', e.target.value);
    }
  }
};

Component$1.install = function (Vue) { return Vue.component(Component$1.name, Component$1); };

var Component$3 = { template: "<div class=\"item\"><div class=\"label\" :style=\"{width: usedLabelWidth}\" :class=\"{required: required}\">{{usedLabel}}</div><div class=\"control\"><slot></slot></div></div>",
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

Component$3.install = function (Vue) { return Vue.component(Component$3.name, Component$3); };

function isValidatable(component) {
  var mixins = component.$options.mixins;
  return Array.isArray(mixins) && mixins.indexOf(Validatable) > -1;
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
    }
  },
  methods: {
    isValid: function isValid() {
      var inputs = getValidatables(this);
      return inputs.map(function (i) { return i.validate(); }).every(function (v) { return v.valid; });
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
      // 发送请求
      this.loading = true;
      this.$http[this.method](this.action, this.value).then(function (response) {
        var result = response.body;
        if (result.errno) {
          alert(result.errmsg);
        }
        this$1.loading = false;
        this$1.$emit('success', response);
      }).catch(function (response) {
        alert('服务端错误');
        this$1.loading = false;
        this$1.$emit('fail', response);
      });
    }
  }
};

Component$5.install = function (Vue) { return Vue.component(Component$5.name, Component$5); };

//import Vue from 'vue'
var Modal$1 = { template: "<div :style=\"{display: visible ? 'block' : 'none'}\" class=\"modal-box\"><div :class=\"{'public-modal': type!='modal'}\" class=\"modal\"><div v-if=\"title\" class=\"modal-hd\">{{title}}<a @click=\"hide\" class=\"fa fa-times close\"></a></div><div class=\"modal-bd\"><slot></slot></div></div><div class=\"modal-mask\"></div></div>",
    name: 'v-modal',
    props: {
        type: {
            default : 'modal'
        },
        title: String,
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

Vue.component('v-modal', Modal$1);

var template = "\n    <v-modal type=\"confirm\" :visible=\"true\">\n        <div class=\"msg-wrap\">\n            <i class=\"fa fa-exclamation-triangle icon icon-warn\" v-if=\"type == 'warn'\"></i>\n            <i class=\"fa fa-exclamation-triangle icon icon-confirm\" v-if=\"type == 'confirm'\"></i>\n            <span>{{msg}}</span>\n        </div>\n        <div class=\"btn-wrap\">\n            <a href=\"javascript:void(0)\" class=\"btn btn-primary modal-confirm\" @click=\"onclicked(true)\" id=\"modalBtnDefault\">确定</a>\n            <a href=\"javascript:void(0)\" class=\"btn btn-default modal-cancel\" @click=\"onclicked(false)\" v-if=\"type == 'confirm'\">取消</a>\n        </div>\n    </v-modal>\n";

var openModal = function(type, msg, callback) {
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
    openModal('confirm', msg, callback);
};

Modal$1.warn = function(msg, callback) {
    openModal('warn', msg, callback);
};

Modal$1.alert = function(msg, callback) {
    openModal('alert', msg, callback);
};

var install = function(Vue) {
  var this$1 = this;

  Object.keys(this).map(function (key) { return this$1[key]; }).filter(
    function (C) { return C && typeof C.install === 'function'; } // Find all Vue plugins
  ).forEach(function (C) { return Vue.use(C); });                 // and use them
};

exports.install = install;
exports.Validatable = Validatable;
exports.Input = Component$1;
exports.FormItem = Component$3;
exports.Form = Component$5;
exports.Modal = Modal$1;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=v-tags.js.map

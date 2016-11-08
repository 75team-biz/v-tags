(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (factory((global.VTags = global.VTags || {})));
}(this, (function (exports) {

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
    return {
      valid: false,
      msg: '该规则未实现'
    };
  },

  /**
   * 整数格式
   */
  integerType: function(value, input) {
    return {
      valid: false,
      msg: '该规则未实现'
    };
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
  ).map(function (ruleName) {
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
var Validatable$1 = Validatable = {

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

var Component$1 = {render: function(){with(this){return _h('div',{staticClass:"input-wrap"},[(type!='textarea')?_h('input',{class:'size-'+size,attrs:{"type":type,"placeholder":placeholder,"readonly":readonly,"disabled":disabled,"maxlength":maxlength},domProps:{"value":value},on:{"input":onInput}}):_h('textarea',{attrs:{"placeholder":placeholder,"readonly":readonly,"disabled":disabled,"maxlength":maxlength,"rows":rows},domProps:{"value":value},on:{"input":onInput}}),(!validity.valid)?_h('em',{staticClass:"error"},[_s(validity.msg)]):_e()])}},staticRenderFns: [],
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
    maxlength: Number
  },
  mixins: [Validatable$1],
  methods: {
    onInput: function onInput$1(e) {
      this.$emit('input', e.target.value);
    }
  }
};

Component$1.install = function (Vue) { return Vue.component(Component$1.name, Component$1); };

var Component$3 = {render: function(){with(this){return _h('div',{staticClass:"item",class:{required: required}},[_h('div',{staticClass:"label",style:({width: usedLabelWidth})},[_s(usedLabel)]),_h('div',{staticClass:"control"},[_t("default")])])}},staticRenderFns: [],
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
    usedLabelWidth: function usedLabelWidth$1() {
      var labelWidth = this.form && this.form.labelWidth;
      return  labelWidth ? (labelWidth + "em") : 'default';
    },
    usedLabel: function usedLabel$1() {
      var labelSuffix = this.form && this.form.labelSuffix || '';
      return this.label ? this.label + labelSuffix : '';
    }
  }
};

Component$3.install = function (Vue) { return Vue.component(Component$3.name, Component$3); };

function isValidatable(component) {
  var mixins = component.$options.mixins;
  return Array.isArray(mixins) && mixins.indexOf(Validatable$1) > -1;
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

var Component$5 = {render: function(){with(this){return _h('form',{staticClass:"form",class:{loading: loading},on:{"submit":onSubmit}},[_t("default")])}},staticRenderFns: [],
  name: 'v-form',
  data: function data() {
    return {
      loading: false
    }
  },
  props: {
    type: {
      type: String,
      default: 'ajax'
    },
    method: {
      type: String,
      default: 'post'
    },
    action: String,
    scope: Object,
    getPayload: Function
  },
  methods: {
    isValid: function isValid() {
      var inputs = getValidatables(this);
      return inputs.map(function (i) { return i.validate(); }).every(function (v) { return v.valid; });
    },
    onSubmit: function(e) {
      var this$1 = this;

      // ajax 提交时阻止默认提交
      if (this.type == 'ajax') {
        e.preventDefault();
      }
      // 阻止重复提交
      if (this.loading) {
        return;
      }
      // 表单验证
      if (!this.isValid()) {
        return;
      }
      // 获取要提交的数据
      var context = this.$vnode.context;
      var payload = context.$data;
      if (this.getPayload) {
        payload = this.getPayload.call(context);
      }
      // 使用者可以返回false阻止提交
      if (payload === false) {
        return;
      }
      // 发送请求
      this.loading = true;
      this.$http[this.method](this.action, payload).then(function (response) {
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

exports.Validatable = Validatable$1;
exports.Input = Component$1;
exports.FormItem = Component$3;
exports.Form = Component$5;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=index.js.map

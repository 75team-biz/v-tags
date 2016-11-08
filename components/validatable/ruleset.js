import {toString} from './util';

export default ruleset;

const ruleset = {

  /**
   * 必填(选)验证
   */
  required: function(value) {
    // value需要转换成字符串再计算length，不然数字或者0都会是invalid
    const valid = !!toString(value).length;
    const msg = valid ? '' : '请填写此项';
    return { valid, msg };
  },

  /**
   * 最小长度验证
   * @param param {String} 最少输入多少个字
   */
  minlength: function(value, param) {
    // value需要转换成字符串计算length，不然数字或者0都会是invalid
    const valid = toString(value).length >= parseInt(param);
    const msg = valid ? '' : `请最少填写${param}个字`;
    return { valid, msg };
  },

  /**
   * 最大长度验证， 主要针对 IE9 下 textarea 的 maxlength 无效的情况
   * @param param {String} 最多输入多少个字
   */
  maxlength: function(value, param) {
    // value需要转换成字符串计算length，不然数字或者0都会是invalid
    const valid = toString(value).length <= parseInt(param);
    const msg = valid ? '' : `最多填写${param}个字`;
    return { valid, msg };
  },

  /**
   * 验证输入是否某种指定类型的格式
   * @param param {String} 类型，比如email、tel等
   */
  type: function(value, param) {
    const method = `${param}Type`;
    return ruleset[method](value);
  },

  /**
   * 邮箱格式验证
   */
  emailType: function(value) {
    const pattern =  /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
    const valid  = pattern.test(toString(value));
    const msg = valid ? '' : '邮箱格式不正确';
    return { valid, msg };
  },

  /**
   * 手机号码格式
   */
  mobileType: function(value) {
    const pattern = /^1[3|4|5|7|8]\d{9}$/;
    const valid  = pattern.test(toString(value));
    const msg = valid ? '' : '手机号码格式不正确';
    return { valid, msg };
  },

  /**
   * 固定电话格式
   */
  telType: function(value) {
    const pattern = /^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/;
    const valid  = pattern.test(toString(value));
    const msg = valid ? '' : '固定电话号码格式不正确';
    return { valid, msg };
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


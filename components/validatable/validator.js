import ruleset from './ruleset';
export default { validate };

/**
 * 验证 value 是否符合规则
 * @param value {String} 要验证的值
 * @param rules {Object} 规则
 * @return {Object} 结果对象，有valid和msg两个字段
 */
function validate(value, rules = {}) {
  // msg 为自定义错误信息
  const msg = rules.msg;
  const failResult = Object.keys(rules).filter(
    ruleName => ruleName != 'msg' && typeof ruleset[ruleName] == 'function'
  ).map((ruleName) => {
    // 验证单条规则
    const param = rules[ruleName];
    const result = ruleset[ruleName](value, param);
    // 处理自定义错误提示
    if (!result.valid && msg) {
      if (typeof msg == 'string') {
        result.msg = msg;
      } else if (msg[ruleName]) {
        result.msg = msg[ruleName];
      }
    }
    return result;
  }).find(result => !result.valid);
  return failResult || { valid: true };
}



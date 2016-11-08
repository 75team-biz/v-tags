/**
 * 获取变量的字符串值
 */
export function toString(value) {
    return value === undefined || value === null
      ? ''
      : value.toString().trim();
}

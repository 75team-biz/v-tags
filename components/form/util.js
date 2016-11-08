import Validatable from '../validatable/';
export { getValidatables };

/**
 * 判断一个组件是否Validatable
 */
function isValidatable(component) {
  const mixins = component.$options.mixins;
  return Array.isArray(mixins) && mixins.indexOf(Validatable) > -1;
}

/**
 * 获取一个组件的所有子孙级组件
 */
function getDescendants(component) {
  let result = [];
  let children = component.$children;
  if (!children.length) {
    return result;
  }
  return children.reduce((a, child) => {
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
function ajax({
  method = 'get',
}) {

}

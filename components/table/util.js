export default {
  /**
     * 频率控制 返回函数连续调用时，func 执行频率限定为 次 / wait
     *
     * @param  {function}   func      传入函数
     * @param  {number}     wait      表示时间窗口的间隔
     * @param  {object}     options   果想忽略开始边界上的调用，传入{leading: false}。
     *                                如果想忽略结尾边界上的调用，传入{trailing: false}
     * @return {function}             返回客户调用函数
     */
    throttle (func, wait, options) {
      var context, args, result;
      var timeout = null;
      // 上次执行时间点
      var previous = 0;
      if (!options) options = {};
      // 延迟§行函数
      var later = function() {
        // 若设定了开始边界不执行选项，上次执行时间始终为0
        previous = options.leading === false ? 0 : new Date().getTime();
        timeout = null;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      };
      return function() {
        var now = new Date().getTime();
        // 首次执行时，如果设定了开始边界不执行选项，将上次执¡时间设定为当前时间。
        if (!previous && options.leading === false) previous = now;
        // 延迟执行时间间隔
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
        // 延迟时间间隔remaining小于等于0，表示上次执行至此所间隔时间已经超过一个时间窗口
        // remaining大于时间窗口wait，表示客户端系统时间被调整过
        if (remaining <= 0 || remaining > wait) {
          clearTimeout(timeout);
          timeout = null;
          previous = now;
          result = func.apply(context, args);
          if (!timeout) context = args = null;
        //如果延迟执行不存在且没有设定结尾边界不执行选项
        } else if (!timeout && options.trailing !== false) {
          timeout = setTimeout(later, remaining);
        }
        return result;
      };
    }
}

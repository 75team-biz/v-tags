import Vue from 'vue';
import Resource from 'vue-resource';

Vue.use(Resource);

export default {

    /**
     * 随机字符串
     */
    randomStr(length) {
        length = length || 6;
        return Math.random().toString(36).substr(-length);
    },

    /**
     * 准备一个 Vue 组件测试容器
     */
    getAppContainer(content) {
        var app = document.createElement('div');
        var id = `app_${this.randomStr()}`;
        app.id = id;
        app.innerHTML = content || '';
        document.body.appendChild(app);
        return app;
    },

    /**
     * 以给定的模版和数据创建一个 App
     */
    createApp(template, configs) {
        var container = this.getAppContainer(template);
        configs = configs || {};
        configs.el = container;
        var vm = new Vue(configs);
        return vm;
    },

    /**
     * 销毁一个组件实例及其DOM
     */
    destroyApp(vm) {
        var el = vm.$el;
        vm.$destroy();
        el.parentNode.removeChild(el);
    },

    /**
     * 获取元素相对于窗口的位置
     */
    getPosition(node) {
        var top = 0,
            left = 0;
        while (node) {
            top += node.offsetTop || 0;
            left += node.offsetLeft || 0;
            node = node.offsetParent;
        }
        return { top, left };
    }


};

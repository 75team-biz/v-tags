import Modal from './index.vue'

Modal.install = Vue => {
    Vue.component(Modal.name, Modal);
    Modal.Vue = Vue;
    Vue.prototype.$Modal = Modal;
}

var template = `
    <v-modal type="confirm" :visible="true">
        <div class="msg-wrap">
            <i class="fa fa-exclamation-triangle icon icon-warn" v-if="type == 'warn'"></i>
            <i class="fa fa-exclamation-triangle icon icon-confirm" v-if="type == 'confirm'"></i>
            <span>{{msg}}</span>
        </div>
        <div class="btn-wrap">
            <a href="javascript:void(0)" class="btn btn-primary modal-confirm" @click="onclicked(true)" id="modalBtnDefault">确定</a>
            <a href="javascript:void(0)" class="btn btn-default modal-cancel" @click="onclicked(false)" v-if="type == 'confirm'">取消</a>
        </div>
    </v-modal>
`;
let modals = [];
let showed = false;
var openModal = function openModal(Vue, type, msg, callback) {
    if (showed) {
      modals.push(arguments);
      return;
    }
    showed = true;
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
            onclicked(result) {
                callback && callback(result);
                this.$el.parentNode.removeChild(this.$el);
                vm.$destroy();
                showed = false;
                if (modals.length) {
                  let args = modals.shift();
                  openModal.apply(null, args);
                }
            }
        },
        mounted (){
            var btn = this.$el.querySelector('#modalBtnDefault');
            btn.focus();
        }
    });
}

Modal.confirm = function(msg, callback) {
    let Vue = this.Vue;
    openModal(Vue, 'confirm', msg, callback);
}

Modal.warn = function(msg, callback) {
    let Vue = this.Vue;
    openModal(Vue, 'warn', msg, callback);
}

Modal.alert = function(msg, callback) {
    let Vue = this.Vue;
    openModal(Vue, 'alert', msg, callback);
}

export default Modal;

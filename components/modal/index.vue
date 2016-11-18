<template>
    <div :style="{display: visible ? 'block' : 'none'}" class="modal-box">
        <div :class="{'public-modal': type!='modal'}" class="modal">
            <div v-if="title" class="modal-hd">{{title}}<a @click="hide" class="fa fa-times close"></a></div>
            <div class="modal-bd">
                <slot></slot>
            </div>
        </div>
        <div class="modal-mask"></div>
    </div>
</template>


<script>
    //import Vue from 'vue'
    export default {
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
            _centerModal () {
                var elem = this.$el.querySelector('.modal');
                var w = elem.offsetWidth;
                var h = elem.offsetHeight;
                elem.style.marginLeft = '-' + w / 2 + 'px';
                elem.style.marginTop = '-' + h / 2 + 'px';
            },
            _removeModal () {
                this.$el.parentNode.removeChild(this.$el);
            },
            show () {
                this.$emit('openmodal');
            },
            hide () {
                this.$emit('closemodal');
            }
        },
        created () {
            this.$watch('visible', function(){
                this.visible && this.$nextTick(this._centerModal);
            });
        },
        mounted() {
            this._centerModal();
        },
        destroy() {
            this._removeModal();
        }
    }

</script>

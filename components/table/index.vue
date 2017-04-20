<template>
<div>
  <slot></slot>
  <v-pagination v-if="needpagination" :total="total" :pn="pn" :ps="ps" @updatepage="getPageData"></v-pagination>
</div>
</template>

<script>
    import VPagination from '../pagination'
    import util from './util.js'

    export default {
        name: 'v-table',
        props: {
            //请求数据的Ajax URL
            url: {
                required: true
            },
            //处理返回数据
            datafilter : {
                type: Function
            },
            //配置是否需要分页
            needpagination: {
                default: true
            },
            //初始化的时候是否默认执行一次getPageData
            initrequest: {
                default: true,
                type: Boolean
            },
            ps: {
                default: 20
            },
            pn: {
                default: 0
            }
        },
        data () {
            return {
                total: 0,
                //Table表格数据列表
                list: [],
                pageNumber: this.pn,
                throttle: util.throttle
            }
        },
        mounted () {
          var getFirstPage = function() {
            this.getPageData(this.pn);
          }
          this.$watch('url', this.throttle(getFirstPage, 800));
          if(this.initrequest){
            this.getPageData(this.pn);
          }
        },
        components: {
            VPagination
        },
        methods: {
            /**
             * Ajax获取Table数据
             * pn: 页码，根据页码获取该页数据
             * ajax 请求返回的数据格式若如下，则可不传datafilter处理函数：
             * {
             *      errno:0,
             *      errmsg:'',
             *      total:100,
             *      list:[]
             * }
             */
            getPageData (pn) {
                var me = this;
                me.pageNumber = pn; //设置组件Pagination的当前页码
                var params = me.needpagination ? `${/\?/.test(me.url) ? '&' : '?'}pn=${pn}&ps=${me.ps}` : '';
                var resource = me.$resource(me.url + params);
                this.$http.get(me.url + params).then(function (responce) {
                    var data = responce.data;
                    if(data.errno){
                        alert(data.errmsg);
                        me.list = [];
                        me.total = 0;
                        return false;
                    }
                    if (typeof me.datafilter === 'function') {  //若传入数据处理函数，则处理该数据
                        data = me.datafilter(data);  //数据处理函数返回的数据需满足上面的格式
                    }
                    //规避错误：若在最后一页只有一条数据且将其删除，再次请求当前页就会出现错误，此时需要pageNumber-1，请求上一页直到0
                    if(me.pageNumber > 0 && data.total <= me.ps * me.pageNumber){
                        me.pageNumber = me.pageNumber -1;
                        me.refresh();
                    }
                    me.list = data.list || [];
                    me.total = data.total || 0;
                    me.$emit('updatedata', data, pn);
                }, function (responce) {
                    //me.list = [];
                    //me.total = 0;
                    me.$emit('updatedata', {list: [], total: 0});
                })
            },
            /**
             * 刷新当前页
             */
            refresh () {
                this.getPageData(this.pageNumber);
            }
        },
        events: {
            needupdate () {
                this.refresh();
            }
        }
    }
</script>

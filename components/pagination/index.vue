<template>
<div class="pagination">
  <span class="total">共<em>{{total}}</em>条</span>
  <span @click.prevent="go" v-show="pageCount > 1" class="pages"> 
    <a href="#" :class="{disabled: pn == 1}" :data-page="pn-1" class="page">上一页</a>
    <a href="#" :class="{current: pn == 1}" data-page="1" class="page">1</a>
    <em v-show="spanRange[0] > 2" class="page ellipsis">⋯</em>
    <a v-for="n in spanRange" href="#" :class="{current: n == pn}" :data-page="n" class="page">{{n}}</a>
    <em v-show="showEndEllipse" class="page ellipsis">⋯</em>
    <a href="#" :class="{current: pn == pageCount}" :data-page="pageCount" class="page">{{pageCount}}</a>
    <a href="#" :class="{disabled: pn == pageCount}" :data-page="pn+1" class="page">下一页</a>
  </span>
</div>
</template>


<script>
export default {
  name: "v-pagination",
  props: {
    total: {
     default: 0       //总条数
    },
    pn: {
      default: 1       //当前页
    },
    ps: {
      default: 20      //每页显示条数
    },
    span: {
        default: 3       //页码的显示个数
    }
  },
  computed: {
    pageCount () {              //计算总页码
      return Math.ceil(this.total / this.ps) || 0;
    },
    showEndEllipse () {
      return this.spanRange[this.spanRange.length-1] < (this.pageCount-1);
    },
    /**
     * 计算要显示的页码，不包括第一页和最后一页
     * e.g. [4,5,6,7,8,9,10]
     */
    spanRange () {
      let sr = [],
      /*
         half = Math.floor(this.span / 2),  //显示页码个数的一半
         start = Math.max(Math.min(this.pn - half, this.pageCount - 1 - this.span), 2),   //显示页码范围的起始页
         end = Math.min(Math.max(this.pn + half, start + this.span), this.pageCount - 1); //显示页码范围的终止页
       */
      start = Math.max(this.pn - this.span, 2),   //显示页码范围的起始页
      end = Math.min(this.pn + this.span, this.pageCount - 1); //显示页码范围的终止页
      for(let i = start; i <= end; i++){
        sr.push(i);
      }
      return sr;
    }
  },
  methods: {
    /**
     * 切换页码
     * event 点击事件，用以获取target
     */
    go (event) {
      var target = event.target;
      //若点击的元素带有 disabled、current、ellipsis的class，则返回
      if(/\b(disabled|current|ellipsis)\b/.test(target.className)){
        return;
      }
      let jumpPn = parseInt(target.getAttribute('data-page'));
      this.$emit("updatepage", jumpPn);
    }
  }
}
</script>

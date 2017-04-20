import Vue from 'vue';
import VPagination from '../components/pagination/index.vue';
import assert from 'assert';
import util from './util';


/**
 * 测试 data-table 组件
 */
describe('pagination 组件', function() {
  describe('pagination 默认值测试', function() {
    var template, vm, el,
      total, page, current, prePage, nextPage, firstEllipsis, secondEllipsis;
    it('creat', function(){
      template = `
      <v-pagination :total="total"></v-pagination>
      `;
      vm = util.createApp(template, {
        data : {
          total: 0
        },
        components: {
          VPagination
        }
      });
      el = vm.$el;
      total = el.querySelectorAll('.total em'); //页面中展示的页码总数
      current = el.querySelectorAll('.pages .page.current')[0]; //当前页码
      firstEllipsis = el.querySelectorAll('.pages em')[0]; //第一个 ...
      secondEllipsis = el.querySelectorAll('.pages em')[1]; //第二个 ...
    });

    // total=0
    it('total = 0', function(done) {
      assert.equal(total[0].innerHTML, '0');
      assert.equal(el.querySelectorAll('.pages')[0].style.display, 'none');
      done();
    });

    // total=1
    it('total = 1', function(done) {
      vm.total = 1;
      setTimeout(function(){
        assert.equal(total[0].innerHTML, '1');
        assert.equal(el.querySelectorAll('.pages')[0].style.display, 'none');
        done();
      }, 10);
    });

    // total=20
    it('total = 20', function(done) {
      vm.total = 20;
      setTimeout(function(){
        assert.equal(total[0].innerHTML, '20');
        assert.equal(el.querySelectorAll('.pages')[0].style.display, 'none');
        done();
      }, 10);
    });

    // total=21
    it('total = 21', function(done) {
      vm.total = 21;
      setTimeout(function(){
        page = el.querySelectorAll('.pages a.page'); //页码个数
        prePage = page[0]; //前一页
        nextPage = page[page.length -1]; //下一页

        assert.equal(total[0].innerHTML, '21');
        assert.equal(el.querySelectorAll('.pages')[0].style.display, '');
        assert.equal(page.length, 4);
        assert.equal(current.innerHTML, '1');
        assert(prePage.classList.contains('disabled'));
        assert.equal(nextPage.dataset.page, 2);
        assert.equal(firstEllipsis.style.display, 'none');
        assert.equal(secondEllipsis.style.display, 'none');
        done();
      }, 10);
    });

    // total=100
    it('total = 100', function(done) {
      vm.total = 100;
      setTimeout(function(){
        page = el.querySelectorAll('.pages a.page'); //页码个数
        prePage = page[0]; //前一页
        nextPage = page[page.length -1]; //下一页
        let maxPage = page[page.length -2]; //下一页

        assert.equal(total[0].innerHTML, '100');
        assert.equal(el.querySelectorAll('.pages')[0].style.display, '');
        assert.equal(page.length, 7);
        assert.equal(current.innerHTML, '1');
        assert(prePage.classList.contains('disabled'));
        assert.equal(nextPage.dataset.page, 2);
        assert.equal(maxPage.dataset.page, 5);
        assert.equal(firstEllipsis.style.display, 'none');
        assert.equal(secondEllipsis.style.display, 'none');
        done();
      }, 10);
    });

    // total=100
    it('total = 101', function(done) {
      vm.total = 101;
      setTimeout(function(){
        page = el.querySelectorAll('.pages a.page'); //页码个数
        prePage = page[0]; //前一页
        nextPage = page[page.length -1]; //下一页
        let maxPage = page[page.length -2]; //下一页

        assert.equal(total[0].innerHTML, '101');
        assert.equal(el.querySelectorAll('.pages')[0].style.display, '');
        assert.equal(page.length, 7);
        assert.equal(current.innerHTML, '1');
        assert(prePage.classList.contains('disabled'));
        assert.equal(nextPage.dataset.page, 2);
        assert.equal(maxPage.dataset.page, 6);
        assert.equal(firstEllipsis.style.display, 'none');
        assert.equal(secondEllipsis.style.display, '');
        done();
      }, 10);
    });

    // total=116
    it('total = 116', function(done) {
      vm.total = 116;
      setTimeout(function(){
        page = el.querySelectorAll('.pages a.page'); //页码个数
        prePage = page[0]; //前一页
        nextPage = page[page.length -1]; //下一页

        assert.equal(total[0].innerHTML, '116');
        assert.equal(page.length, 7);
        assert.equal(current.innerHTML, '1');
        assert(prePage.classList.contains('disabled'));
        assert.equal(nextPage.dataset.page, 2);
        assert.equal(firstEllipsis.style.display, 'none');
        assert.equal(secondEllipsis.style.display, '');
        done();
      }, 10);
    });

    after(function(){
      util.destroyApp(vm);
    });

  });
  describe('pagination 参数测试', function() {
    var template, vm, el,
      total, page, current, prePage, nextPage, firstEllipsis, secondEllipsis;
    it('creat', function(){
      template = `
      <v-pagination :total="total" :pn="pn" :ps="ps"></v-pagination>
      `;
      vm = util.createApp(template, {
        data : {
          total: 200,
          pn: 0,
          ps: 20,
          span: 3
        },
        components: {
          VPagination
        }
      });
      el = vm.$el;
      total = el.querySelectorAll('.total em'); //页面中展示的页码总数
      firstEllipsis = el.querySelectorAll('.pages em')[0]; //第一个 ...
      secondEllipsis = el.querySelectorAll('.pages em')[1]; //第二个 ...
    });

    it('pn: 1 --> 2', function(done) {
      vm.pn = 2;
      setTimeout(function(){
        current = el.querySelectorAll('.pages .page.current')[0]; //当前页码
        page = el.querySelectorAll('.pages a.page'); //页码个数
        prePage = page[0]; //前一页
        nextPage = page[page.length -1]; //下一页
        let maxPage = page[page.length -2]; //下一页

        assert.equal(page.length, 8);
        assert.equal(current.innerHTML, '2');
        assert(!prePage.classList.contains('disabled'));
        assert.equal(nextPage.dataset.page, 3);
        assert.equal(prePage.dataset.page, 1);
        assert.equal(maxPage.dataset.page, 10);
        assert.equal(firstEllipsis.style.display, 'none');
        assert.equal(secondEllipsis.style.display, '');
        done();
      }, 10);
    });

    it('pn: 2 --> 5', function(done) {
      vm.pn = 5;
      setTimeout(function(){
        current = el.querySelectorAll('.pages .page.current')[0]; //当前页码
        page = el.querySelectorAll('.pages a.page'); //页码个数
        prePage = page[0]; //前一页
        nextPage = page[page.length -1]; //下一页
        let maxPage = page[page.length -2]; //下一页

        assert.equal(page.length, 11);
        assert.equal(current.innerHTML, '5');
        assert(!prePage.classList.contains('disabled'));
        assert(!nextPage.classList.contains('disabled'));
        assert.equal(prePage.dataset.page, 4);
        assert.equal(nextPage.dataset.page, 6);
        assert.equal(maxPage.dataset.page, 10);
        assert.equal(firstEllipsis.style.display, 'none');
        assert.equal(secondEllipsis.style.display, '');
        done();
      }, 10);
    });

    it('pn: 5 --> 6', function(done) {
      vm.pn = 6;
      setTimeout(function(){
        current = el.querySelectorAll('.pages .page.current')[0]; //当前页码
        page = el.querySelectorAll('.pages a.page'); //页码个数
        prePage = page[0]; //前一页
        nextPage = page[page.length -1]; //下一页
        let maxPage = page[page.length -2]; //下一页

        assert.equal(page.length, 11);
        assert.equal(current.innerHTML, '6');
        assert(!prePage.classList.contains('disabled'));
        assert(!nextPage.classList.contains('disabled'));
        assert.equal(prePage.dataset.page, 5);
        assert.equal(nextPage.dataset.page, 7);
        assert.equal(maxPage.dataset.page, 10);
        assert.equal(firstEllipsis.style.display, '');
        assert.equal(secondEllipsis.style.display, 'none');
        done();
      }, 10);
    });
    it('pn: 6 --> 10', function(done) {
      vm.pn = 10;
      setTimeout(function(){
        current = el.querySelectorAll('.pages .page.current')[0]; //当前页码
        page = el.querySelectorAll('.pages a.page'); //页码个数
        prePage = page[0]; //前一页
        nextPage = page[page.length -1]; //下一页
        let maxPage = page[page.length -2]; //下一页

        assert.equal(page.length, 7);
        assert.equal(current.innerHTML, '10');
        assert(!prePage.classList.contains('disabled'));
        assert(nextPage.classList.contains('disabled'));
        assert.equal(prePage.dataset.page, 9);
        assert.equal(nextPage.dataset.page, 11);
        assert.equal(maxPage.dataset.page, 10);
        assert.equal(firstEllipsis.style.display, '');
        assert.equal(secondEllipsis.style.display, 'none');
        done();
      }, 10);
    });

    it('pn: 10, ps: 10', function(done) {
      vm.pn = 10;
      vm.ps = 10;
      setTimeout(function(){
        current = el.querySelectorAll('.pages .page.current')[0]; //当前页码
        page = el.querySelectorAll('.pages a.page'); //页码个数
        prePage = page[0]; //前一页
        nextPage = page[page.length -1]; //下一页
        let maxPage = page[page.length -2]; //下一页

        assert.equal(page.length, 11);
        assert.equal(current.innerHTML, '10');
        assert(!prePage.classList.contains('disabled'));
        assert(!nextPage.classList.contains('disabled'));
        assert.equal(prePage.dataset.page, 9);
        assert.equal(nextPage.dataset.page, 11);
        assert.equal(maxPage.dataset.page, 20);
        assert.equal(firstEllipsis.style.display, '');
        assert.equal(secondEllipsis.style.display, '');
        done();
      }, 10);
    });

    it('pn: 10, ps: 10, span: 2', function(done) {
      vm.pn = 10;
      vm.ps = 10;
      vm.span = 2;
      setTimeout(function(){
        current = el.querySelectorAll('.pages .page.current')[0]; //当前页码
        page = el.querySelectorAll('.pages a.page'); //页码个数
        prePage = page[0]; //前一页
        nextPage = page[page.length -1]; //下一页
        let maxPage = page[page.length -2]; //下一页

        assert.equal(page.length, 11);
        assert.equal(current.innerHTML, '10');
        assert(!prePage.classList.contains('disabled'));
        assert(!nextPage.classList.contains('disabled'));
        assert.equal(prePage.dataset.page, 9);
        assert.equal(nextPage.dataset.page, 11);
        assert.equal(maxPage.dataset.page, 20);
        assert.equal(firstEllipsis.style.display, '');
        assert.equal(secondEllipsis.style.display, '');
        done();
      }, 10);
    });
  });
});

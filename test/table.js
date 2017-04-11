import Vue from 'vue';
import VTable from '../components/table/index.vue';
import assert from 'assert';
import util from './util';

/**
 * 测试 data-table 组件
 */
describe('data-table 组件', function() {

    //mock ajax
    var fakeXHR = sinon.useFakeXMLHttpRequest();
    var requests = [];
    fakeXHR.onCreate = function (xhr) {
      requests.push(xhr);
    }

    /**
     * 基本测试
     */
    describe('the data table', function() {
        var template, vm, el;
        it('set up test', function(){
            template = `
                <v-table :url="url" :list="list" @updatedata="updateData" :needpagination="needpagination">
                    <table class="data-table">
                        <tbody v-if="list && list.length > 0" >
                            <tr v-for="item in list">
                                <td>{{item.title}}</td>
                            </tr>
                        </tbody>
                    </table>
                </v-table>
            `;
            vm = util.createApp(template, {
                data: {
                    url: '/get/list',
                    list: [],
                    needpagination: false
                },
                methods: {
                  updateData(data) {
                    this.list = data.list;
                  }
                },
                components: {
                    VTable
                }
            });
            el = vm.$el;
        });

        // needpagination 为 false，不显示分页
        it('should hide pagination', function(done) {
          assert.equal(el.querySelectorAll('.pagination').length, 0);
          done();
        });

        it('should create the dom structure', function(done) {
          //因为 vue-resource 发了一个假的 ajax 被 sinon 截获，所以测试从第二个 request 开始
            assert.equal(requests.length, 2);
            requests[1].respond(200, {'Content-Type': 'application/json'}, JSON.stringify({
                errno: 0,
                list: new Array(10).fill(1).map((a, i) => `item ${i}`)
            }));
            setTimeout(function(){
                assert.equal(el.querySelectorAll('tr').length, 10);
                done();
            }, 10);
        });

        it('should update data after url change', function(done) {
            vm.url = '/updated/url';
            setTimeout(function(){
                assert.equal(requests[2].url, '/updated/url');
                requests[2].respond(200, {'Content-Type': 'application/json'}, JSON.stringify({
                    errno: 0,
                    list: new Array(40).fill(1).map((a, i) => `item ${i}`)
                }));
                setTimeout(function(){
                    assert.equal(el.querySelectorAll('tr').length, 40);
                    done();
                }, 10);
            }, 10);
        });

        //将 needpagination 改为 true，显示分页
        it('should show pagination after change needpagination to true', function(done) {
            vm.needpagination = true;
            setTimeout(function(){
              assert.equal(el.querySelectorAll('.pagination').length, 1);
              done();
            }, 10);
        });

        after(function(){
            util.destroyApp(vm);
            fakeXHR.restore();
        });
    });


});


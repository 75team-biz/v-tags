{
  /**
   * plugins
   */
  Vue.use(VTags);

  /**
   * 一篇文档
   */
  const Doc = {
    template: `
      <div class="doc markdown"></div>
    `,
    data: function() {
      return {
        md: '',
        demos: []
      }
    },
    computed: {
      html: function() {
        return this.parse(this.md);
      }
    },
    created: function() {
      this.render();
    },
    watch: {
      '$route': function() {
        this.render();
      },
      'html': function() {
        const self = this;
        var demo = document.querySelector("#demo");
        demo.innerHTML = this.html;
        setTimeout(function() {
          self.initDemos();
          Prism.highlightAll();
        }, 100);
      }
    },
    methods: {
      parse: function(md) {
        const renderer = new marked.Renderer();
        const builtinCode = renderer.code;
        renderer.code = function(code, lang, other) {
          var result = builtinCode.call(renderer, code, lang == 'vue' ? 'markup' : lang, other);
          if (lang === 'vue') {
            const id = 'demo_' + Math.random().toString(36).substr(-8);
            result = '<div class="demo"><div class="inner"></div><input id="' + id + '" type="checkbox"><label for="'
              + id + '"></label>' + result + '</div>';
          }
          return result;
        }
        return marked(md, { renderer: renderer });
      },
      render: function() {
        const name = this.$route.params.name;
        const self = this;
        fetch(`contents/${name}.md`).then(function(response) {
          return response.text();
        }).then(function(md) {
          self.md = md;
        });
      },
      initDemos: function() {
        const self = this;
        //const demoContainers = this.$el.querySelectorAll('.demo');
        const demoContainers = document.querySelector("#demo").querySelectorAll('.demo');
        const demos = Array.from(demoContainers).map(function(container) {
          const rawCode = container.querySelector('code').textContent;
          return {
            el: container.querySelector('.inner'),
            raw: rawCode,
            parsed: self.parseCode(rawCode)
          };
        }).map(function(obj) {
          // create app container
          eval(`var _config = ${obj.parsed.script}`);
          _config.el = obj.el;
          //_config.el = "#example";
          _config.template = '<div class="inner">' + obj.parsed.template + '</div>';
          Vue.config.debug = true;
          return new Vue(_config);
        });
      },
      parseCode: function(rawCode) {
        const $c = document.createElement('div');
        $c.innerHTML = rawCode;
        const $s = $c.querySelector('script');
        var script;
        if ($s) {
          script = $s.innerHTML.replace('<script>', '').replace('</script>', '').replace('export default', '');
          $s.parentNode.removeChild($s);
        } else {
          script = '{}';
        }
        const template = $c.innerHTML;
        return { script, template };
      }
    }
  };


  const router = new VueRouter({
    linkActiveClass: 'active',
    routes: [
      { path: '/:name', component: Doc },
      { path: '/', redirect: '/install' }
    ]
  });
  Vue.config.devtools = true;
  const app = new Vue({ router }).$mount('#app');

}

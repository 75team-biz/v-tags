{
  /**
   * sidebar
   */
  const toc = [
    {
      title: '使用说明',
      icon: 'book',
      subs: [
        {
          name: 'install',
          title: '安装'
        },
        {
          name: 'usage',
          title: '在项目中使用'
        }
      ]
    },
    {
      title: '表单元素',
      icon: 'list-alt',
      subs: [
        {
          name: 'input',
          title: 'Input'
        },
        {
          name: 'checkbox',
          title: 'Checkbox'
        },
        {
          name: 'checkbox-group',
          title: 'Checkbox Group'
        },
        {
          name: 'radio-group',
          title: 'Radio Group'
        },
        {
          name: 'input-range',
          title: 'InputRange'
        },
        {
          name: 'select',
          title: 'Select'
        },
        {
          name: 'suggest',
          title: 'Suggest'
        },
        {
          name: 'form-item',
          title: 'Form Item'
        },
        {
          name: 'form',
          title: 'Form'
        }
      ]
    },
    {
      title: '组件',
      icon: 'cubes',
      subs: [
        {
          name: 'tag',
          title: 'Tag'
        },
        {
          name: 'modal',
          title: 'Modal'
        },
        {
          name: 'pagination',
          title: 'Pagination'
        },
        {
          name: 'table',
          title: 'Table'
        },        {
          name: 'date-picker',
          title: 'DatePicker'
        },
        {
          name: 'date-range',
          title: 'DateRange'
        },
        {
          name: 'tooltip',
          title: 'Tooltip'
        },
        {
          name: 'tree',
          title: 'Tree'
        }
      ]
    }
  ];
  Vue.component('sidebar', {
    template: `
      <section class="sidebar">
        <div v-for="item in list">
          <h3 class="hd">
            <i class="fa" :class="'fa-'+item.icon"></i>
            {{item.title}}
          </h3>
          <ul class="navigator">
            <li v-for="sub in item.subs">
              <router-link :to="'/'+sub.name" exact>{{sub.title}}</a>
            </li>
          </ul>
        </div>
      </section>
    `,
    data: function() {
      return {
        list: toc
      }
    }
  });
}

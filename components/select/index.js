import Select from './select.vue';
import Option from './option.vue';
import OptionGroup from './option-group.vue';
Select.install = Vue => Vue.component(Select.name, Select);
Option.install = Vue => Vue.component(Option.name, Option);
OptionGroup.install = Vue => Vue.component(OptionGroup.name, OptionGroup);
export {Select, Option, OptionGroup};

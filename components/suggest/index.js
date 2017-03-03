import Suggest from './suggest.vue';
import SuggestItem from './suggest-item.vue';
Suggest.install = Vue => Vue.component(Suggest.name, Suggest);
SuggestItem.install = Vue => Vue.component(SuggestItem.name, SuggestItem);
export {SuggestItem, Suggest};

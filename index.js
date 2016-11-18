import Validatable from './components/validatable/';
import Input from './components/input/';
import FormItem from './components/form-item/';
import Form from './components/form/';
import RadioGroup from './components/radio-group/';

const install = function(Vue) {
  Object.keys(this).map(key => this[key]).filter(
    C => C && typeof C.install === 'function' // Find all Vue plugins
  ).forEach(C => Vue.use(C));                 // and use them
};

export default {
  install,
  Validatable,
  Input,
  FormItem,
  Form,
  RadioGroup
};

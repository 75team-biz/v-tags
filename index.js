import Validatable from './components/validatable/';
import Input from './components/input/';
import Checkbox from './components/checkbox/';
import CheckboxGroup from './components/checkbox-group/';
import RadioGroup from './components/radio-group/';
import FormItem from './components/form-item/';
import Form from './components/form/';
import Modal from './components/modal/';
import Pagination from './components/pagination/';
import DatePicker from './components/datepicker/';
import DateRange from './components/daterange/';

const install = function(Vue) {
  Object.keys(this).map(key => this[key]).filter(
    C => C && typeof C.install === 'function' // Find all Vue plugins
  ).forEach(C => Vue.use(C));                 // and use them
};

export default {
  install,
  Validatable,
  Input,
  Checkbox,
  CheckboxGroup,
  RadioGroup,
  FormItem,
  Form,
  Modal,
  Pagination,
  DatePicker,
  DateRange
};

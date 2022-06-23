import Vue from 'vue'
import {
  message,
  Avatar,
  Badge,
  Breadcrumb,
  Button,
  Card,
  Col,
  DatePicker,
  Divider,
  Dropdown,
  Form,
  FormModel,
  Icon,
  Input,
  List,
  LocaleProvider,
  ConfigProvider,
  Menu,
  Modal,
  Popover,
  Popconfirm,
  Radio,
  Upload,
  Switch,
  Steps,
  Checkbox,
  Row,
  Select,
  Spin,
  Table,
  Tabs,
  Tag,
  Tree,
  TimePicker,
  Pagination,
  Result,
  Descriptions,
  InputNumber,
  Calendar,
  Layout, Collapse
} from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

const antdComponents = [Avatar,
  Pagination,
  Tree,
  Badge,
  Breadcrumb,
  Button,
  Card,
  Col,
  DatePicker,
  Divider,
  Dropdown,
  Form,
  FormModel,
  Icon,
  Input,
  List,
  LocaleProvider,
  ConfigProvider,
  Menu,
  Modal,
  Popover,
  Popconfirm,
  Radio,
  Upload,
  Switch,
  Steps,
  Checkbox,
  Row,
  Select,
  Spin,
  Table,
  Tabs,
  Tag,
  TimePicker,
  Result,
  Descriptions,
  InputNumber, Calendar, Layout, Collapse]
antdComponents.forEach(comp => {
  Vue.use(comp)
})
Vue.prototype.$message = message
const components = [
  // 功能组件
  'cardTitle',
  'zhlDialog',
  'gridlist',
  'upFilesComp',
  'upImgComp',
  'upManyImgComp',
  'selector',
  'Editor',
  'nx-svg-icon'
]
// 注册公共组件
components.forEach(name => {
  const component = require(`@components/${name}/index.vue`).default
  Vue.component(component.name, component)
})

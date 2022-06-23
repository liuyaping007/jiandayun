export const helper = {
  formName: {
    title: '表单名称',
    content: '流程表单名称,一般与流程名称一致,如:差旅报销流程'
  },
  formType: {
    title: '表单分类',
    content: '流程表单分类,必须与流程的分类一致,如:财务类流程'
  },
  formPrefix: {
    title: '流程编号前缀',
    content: '单据的流程编号的前缀,一般是流程拼音算字母大写(建议4~6字母),如：CLBX'
  },
  formCallbackUrl: {
    title: '表单业务回调地址',
    content: '保存业务数据的回调地址(API),如:/workflow/API/CallBack/CallBackFuntion?CallBackName=MindrayApp.API.Workflow$FlowCallBack'
  },

  formDesc: {
    title: '表单描述',
    content: '针对当前表单的功能详细描述'
  },
  beforeInitData: {
    title: '表单数据加载之前事件',
    content: '表单数据加载之前执行的JS函数'
  },
  afterInitData: {
    title: '表单数据加载之后事件',
    content: '表单数据加载之后执行的JS函数'
  },
  bizFormData: {
    title: '表单提交校验事件',
    content: '流程提交或审批前执行的JS函数'
  },
  bizSaveFormData: {
    title: '表单暂存数据校验事件',
    content: '流程暂存前执行的JS函数'
  },
  userDefinedJS: {
    title: '自定义脚本块',
    content: '流程自定义的JS脚本,编写平台支撑以外的JS逻辑区域'
  },
  labelTitle: {
    title: '标题',
    content: '控件的标题,一般是对应的字段'
  },
  controlId: {
    title: '控件ID',
    content: '控件的ID,程序使用到的ID'
  },
  defaultValue: {
    title: '默认值',
    content: '控件默认值'
  },
  defaultText: {
    title: '默认文本',
    content: '控件默认显示文本'
  },
  controlType: {
    title: '控件类型',
    content: '控件的类型',
    type: 'select',
    data: []
  },
  format: {
    title: '格式化串',
    content: '控件的格式化显示类型',
    type: 'select',
    data: [{ value: 'yyyy-MM-DD', label: 'yyyy-MM-DD' }, { value: 'yyyy-MM-DD HH:mm:ss', label: 'yyyy-MM-DD HH:mm:ss' }, { value: 'yyyy', label: 'yyyy' }, { value: 'yyyy-MM', label: 'yyyy-MM' }]
  },
  timeformat: {
    title: '格式化串',
    content: '时间的格式化显示类型',
    type: 'select',
    data: [{ value: 'h:mm:ss a', label: 'h:mm:ss a' }, { value: 'h:mm a', label: 'h:mm a' }]
  },
  minute: {
    title: '分钟倍数',
    content: '分钟倍数',
    type: 'select',
    data: [{ value: 1, label: '1' }, { value: 5, label: '5' }, { value: 10, label: '10' }]
  },
  second: {
    title: '秒的倍数',
    content: '秒的倍数',
    type: 'select',
    data: [{ value: 1, label: '1' }, { value: 5, label: '5' }, { value: 10, label: '10' }]
  },
  icon: {
    title: '图标选择',
    content: '图标',
    type: 'icon'
  },
  butType: {
    title: '按钮类型',
    content: '按钮类型',
    type: 'select',
    data: [{ value: 'button', label: '按钮' }, { value: 'link', label: '超链接' }]
  },
  tagattr: {
    title: '自定义属性',
    content: '自定义属性满足于未覆盖的控件属性和vue语法的支持'
  },
  placeholder: {
    title: '提示内容',
    content: '控件为空时显示的提示内容'
  },
  rows: {
    title: '行数',
    content: '多行文本显示的行数(控件的高度)',
    type: 'number'
  },
  describe: {
    title: '描述信息',
    content: '详细描述该字段的业务或备注说明'
  },
  columns: {
    title: '列配置项',
    content: '配置表格的列字段',
    type: 'columnslist'
  },
  panelist: {
    title: '选项面板',
    content: '如添加tab标签页，折叠面板项，步骤项等',
    type: 'panelist'
  },
  layoutitemlist: {
    title: 'Layout布局设置',
    content: '添加Layout布局模块',
    type: 'layoutitemlist'
  },
  layerlist: {
    title: '弹出层',
    content: '弹出层模块添加',
    type: 'layerlist'
  },
  buttons: {
    title: '按钮项',
    content: '按钮的集合',
    type: 'buttonlist'
  },
  dynamiclist: {
    title: '动态面板',
    content: '动态面板有分为很多层，方便切换，如各种事件和条件 可以控制动态面板的显示与隐藏',
    type: 'dynamiclist'
  },
  options: {
    title: '选项',
    content: '选项的集合',
    type: 'selectoptionlist'
  },
  required: {
    title: '必填校验',
    content: '字段是否为必填',
    type: 'switch'
  },
  isMulty: {
    title: '可多选设置',
    content: '是否允许多选',
    type: 'switch'
  },
  multy: {
    title: '可多选设置',
    content: '配置支持多选功能',
    type: 'switch'
  },
  isshowtime: {
    title: '是否显示时分秒',
    content: '是否显示时分秒',
    type: 'switch'
  },
  disabled: {
    title: '是否只读',
    content: '是否只读',
    type: 'switch'
  },
  isSearch: {
    title: '可搜索设置',
    content: '控件是否支持搜索',
    type: 'switch'
  },
  isEdit: {
    title: '是否可编辑',
    content: '控件是否可编辑',
    type: 'switch'
  },
  minDate: {
    title: '最小日期/时间',
    content: '日期控件的最小日期/时间'
  },
  maxDate: {
    title: '最大日期/时间',
    content: '日期控件的最小日期/时间'
  },
  dataLength: {
    title: '数据长度',
    content: '限制控件可输入的字符长度',
    type: 'number'
  },
  labelSpan: {
    title: '标题占整行比例',
    content: '控件标题占整行的列数',
    type: 'select',
    data: [{ value: '2', label: '1/6' }, { value: '4', label: '2/6' }, { value: '6', label: '3/6' }]

  },
  ctrlSpan: {
    title: '控件占整行比例',
    content: '控件占整行的列数',
    type: 'select',
    data: [{ value: '2', label: '1/6' }, { value: '4', label: '2/6' }, { value: '6', label: '3/6' }, { value: '8', label: '4/6' }, { value: '10', label: '5/6' }, { value: '12', label: '6/6' }]
  },
  spans: {
    title: '占整行比例',
    content: '占整行的列数',
    type: 'select',
    data: [{ value: '2', label: '1/6' }, { value: '4', label: '2/6' }, { value: '6', label: '3/6' }, { value: '8', label: '4/6' }, { value: '10', label: '5/6' }, { value: '12', label: '6/6' }]
  },
  level: {
    title: '指定层级部门',
    content: '指定层级部门，默认为10000001（深迈）'
  },
  lang: {
    title: '语言类型',
    content: '流程的语言类型',
    type: 'select',
    data: [{ value: 'cn', label: '中文' }, { value: 'en', label: '英文' }]

  },
  rowSpan: {
    title: '占整行数',
    content: '如占两行，三行',
    type: 'number'

  },
  modeltype: {
    title: '控件类型',
    content: '控件类型如选日期，选月份，选星期，选日期范围',
    type: 'select',
    data: [{ value: 'date', label: '选日期' }, { value: 'month', label: '选月份' }, { value: 'week', label: '选星期' }, { value: 'range', label: '日期范围' }]
  },
  htmlContent: {
    title: '自定义Html区域',
    content: '设置自定义的Html区域'
  },
  width: {
    title: '宽度',
    content: '控件的宽度，单位：px'
  },
  height: {
    title: '高度',
    content: '控件的高度，单位：px'
  },
  idPrefix: {
    title: '控件ID',
    content: '控件唯一ID'
  },
  filed: {
    title: '绑定字段名',
    content: '需要绑定的数据源字段名'
  },
  maxShow: {
    title: '最大显示条目',
    content: '控件可显示元素的最大数目'
  },
  newData: {
    title: '新增显示数据',
    content: ''
  },
  remote: {
    title: '远程加载数据',
    content: '通过远程接口加载数据'
  },
  companyCode: {
    title: '指定公司编码',
    content: '指定公司编码，如：1000,1001'
  },
  prefix: {
    title: '指定项目前缀',
    content: '指定项目前缀，如：MIS，MLK'
  },
  Language: {
    title: '指定语言代码',
    content: '语言代码，如：1033-英文；2052-中文'
  },
  showUserid: {
    title: '显示用户ID',
    content: '是否显示用户ID'
  },
  beforeConfirmFunName: {
    title: '确定回调前事件',
    content: '设置确定回调前JS事件'
  },
  confirmFunName: {
    title: '确定回调事件',
    content: '设置确定回调JS事件'
  },
  cancelFunName: {
    title: '取消回调事件',
    content: '设置取消回调JS事件'
  },
  closeFunName: {
    title: '关闭回调事件',
    content: '设置关闭回调JS事件'
  },
  clearFunName: {
    title: '清空回调事件',
    content: '设置清空回调JS事件'
  },
  activeParameterFunName: {
    title: '动态参数',
    content: '设置动态参数赋值事件'
  },
  sourceApi: {
    title: '数据源API',
    content: '设置数据源的API',
    type: 'selectApi'
  },
  keyField: {
    title: 'Key字段名',
    content: '标识唯一的字段名'
  },
  valueField: {
    title: 'Key字段名',
    content: '标识唯一的字段名'
  },
  textField: {
    title: '显示名称',
    content: '显示字段名'
  },
  searchPlane: {
    title: '搜索表单id',
    content: '搜索表单元素id，表格会自动获取该元素里面的所有输入控件的值作为参数传递给列表的查询api'
  },
  enableChoose: {
    title: '可选择',
    content: '允许选择，显示勾选框',
    type: 'switch'
  },
  showNo: {
    title: '序号',
    content: '显示序号字段',
    type: 'switch'
  },
  langId: {
    title: '语言Key',
    content: '对应多语言配置中的关键字'
  },
  maxLevel: {
    title: '部门最大层级',
    content: '显示层级，1，2，3，4，5，6最大6层'
  },
  isRemote: {
    title: '远程数据源',
    content: '远程数据源',
    type: 'switch'
  },
  align: {
    title: '排列方式',
    content: '横向排列对齐方式',
    type: 'select',
    data: [{ value: 'left', label: '靠左' }, { value: 'center', label: '居中' }, { value: 'right', label: '靠右' }]
  },
  layertype: {
    title: '弹出方式',
    content: '设置那种弹出方式',
    type: 'select',
    data: [{ value: 'left', label: '靠左' }, { value: 'center', label: '居中' }, { value: 'right', label: '靠右' }, { value: 'top', label: '靠上' }, { value: 'down', label: '靠下' }]
  },
  preLoadFunName: {
    title: '加载数据之前事件',
    content: '选择弹出框中数据加载之前事件，可在此调整获取listview数据参数'
  },
  afterLoadFunName: {
    title: '加载数据之后事件',
    content: '选择弹出框中数据加载之后事件，可在调整绑定到listview的数据'
  },
  preRenderFunName: {
    title: '页面显示加载之前事件',
    content: '页面显示加载之前事件，此时不可以获取到弹出内容，可以修改弹窗layer参数'
  },
  afterRenderFunName: {
    title: '页面显示加载之后事件',
    content: '页面显示加载之后事件，可在此获取到弹窗内容，做自定义修改，等同于layer的success事件'
  },
  preClickFunName: {
    title: '按钮排列',
    content: '按钮横向排列对齐方式'
  }
}

export const layoutComponents = [{
  type: 'gridPanel',
  name: '模块控件',
  icon: 'el-icon-s-grid',
  isShowSpanSetting: true,
  columns: [
    {
      span: 24,
      list: []
    }
  ],
  options: {
    labelTitle: '',
    langId: '',
    idPrefix: 'pnl_',
    controlId: '',
    spans: '24',
    tagattr: ''
  }
},
{
  type: 'tabs',
  name: '标签页',
  icon: 'fa fa-bookmark',
  layout: 'inline',
  isShowSpanSetting: true,
  options: {
    spans: '24',
    idPrefix: 'tabs_',
    describe: '',
    type: '',
    tabPosition: 'top',
    panelist: [
      {
        name: 'tab1',
        title: '用户管理',
        columns: [
          {
            span: 24,
            list: []
          }
        ]
      },
      {
        name: 'tab2',
        title: '用户管理2',
        columns: [
          {
            span: 24,
            list: []
          }
        ]
      }
    ],
    tagattr: ''
  }
},
{
  type: 'collapse',
  name: '折叠面板',
  icon: 'fa fa-bookmark',
  layout: 'inline',
  isShowSpanSetting: true,
  options: {
    spans: '24',
    describe: '',
    panelist: [
      {
        name: 'collapse1',
        title: '面板1',
        columns: [
          {
            span: 24,
            list: []
          }
        ]
      },
      {
        name: 'collapse2',
        title: '面板2',
        columns: [
          {
            span: 24,
            list: []
          }
        ]
      }
    ],
    tagattr: ''

  }
}]

export const basicComponents = [{
  type: 'input',
  name: '单行文本',
  dragType: 'control',
  icon: 'fa fa-text-width',
  isShowCheck: true,
  isShowSpanSetting: true,
  layout: 'inline',
  eventlist: [],
  options: {
    labelTitle: '单行文本',
    defaultValue: '',
    placeholder: '',
    required: false,
    dataType: 'string',
    dataLength: '50',
    labelSpan: '2',
    ctrlSpan: '2',
    filed: '',
    tagattr: ''
  }
},
{
  type: 'textarea',
  name: '多行文本',
  dragType: 'control',
  icon: 'fa fa-text-height',
  isShowCheck: true,
  isShowSpanSetting: true,
  eventlist: [],
  options: {
    labelTitle: '多行文本',
    defaultValue: '',
    placeholder: '',
    dataLength: '500',
    rows: 3,
    required: false,
    labelSpan: '2',
    ctrlSpan: '10',
    filed: '',
    tagattr: ''
  }
},
{
  type: 'select',
  name: '下拉列表',
  dragType: 'control',
  icon: 'fa fa-caret-square-o-down',
  isShowCheck: true,
  isShowSpanSetting: true,
  layout: 'inline',
  eventlist: [],
  options: {
    labelTitle: '下拉列表',
    labelSpan: '2',
    ctrlSpan: '2',
    options: [
      {
        label: '选项1',
        value: '1'
      },
      {
        label: '选项2',
        value: '2'
      }
    ],
    isRemote: false,
    sourceApi: '',
    valueField: 'Value',
    textField: 'Text',
    defaultValue: '',
    isMulty: false,
    isSearch: false,
    required: false,
    edit: '',
    placeholder: '',
    filed: '',
    tagattr: ''
  }
},
{
  type: 'date',
  name: '日期控件',
  dragType: 'control',
  icon: 'fa fa-calendar',
  isShowCheck: true,
  isShowSpanSetting: true,
  layout: 'inline',
  eventlist: [],
  options: {
    labelTitle: '日期控件',
    langId: '',
    placeholder: '',
    dataType: 'date',
    format: 'yyyy-MM-dd',
    required: false,
    labelSpan: '2',
    ctrlSpan: '2',
    modeltype: 'date',
    isshowtime: false,
    disabled: false,
    filed: '',
    tagattr: ''
  }
},
{
  type: 'radio',
  name: '单选控件',
  icon: 'fa fa-dot-circle-o',
  dragType: 'control',
  isShowCheck: true,
  isShowSpanSetting: true,
  layout: 'inline',
  eventlist: [],
  options: {
    labelTitle: '单选项',
    labelSpan: '2',
    ctrlSpan: '2',
    options: [
      {
        label: '选项1',
        value: '1'
      }
    ],
    defaultValue: '',
    filed: '',
    required: false,
    tagattr: ''
  }
},
{
  type: 'checkbox',
  name: '多选控件',
  icon: 'fa fa-check-square-o',
  dragType: 'control',
  isShowCheck: true,
  isShowSpanSetting: true,
  layout: 'inline',
  eventlist: [],
  options: {
    labelTitle: '多选项',
    labelSpan: '2',
    ctrlSpan: '2',
    options: [
      {
        label: '选项1',
        value: '1'
      }
    ],
    defaultValue: [],
    filed: '',
    required: false,
    tagattr: ''
  }
},
{
  type: 'button',
  name: '按钮控件',
  icon: 'fa fa-bold',
  dragType: 'control',
  isShowCheck: false,
  isShowSpanSetting: true,
  options: {
    spans: '4',
    align: 'left',
    buttons: [
      {
        name: '按钮',
        isShowCheck: true,
        isShowSpanSetting: true,
        layout: 'inline',
        id: 'butadd',
        eventlist: [],
        options: {
          labelTitle: '按钮',
          icon: 'gou',
          butType: 'button',
          tagattr: ''
        }
      }
    ]
  }
},
{
  type: 'htmlArea',
  name: 'Html区域',
  icon: 'fa fa-file-code-o',
  layout: 'inline',
  isShowSpanSetting: true,
  options: {
    labelTitle: 'Html区域',
    langId: '',
    htmlContent: '<p>这是一个HTML代码块</p>',
    idPrefix: 'htl_',
    controlId: '',
    labelSpan: '0',
    ctrlSpan: '12',
    filed: '',
    rowSpan: '1',
    tagattr: ''
  }
},
{
  type: 'editor',
  name: '富文本',
  icon: 'fa fa-bookmark',
  layout: 'inline',
  isShowSpanSetting: true,
  options: {
    labelTitle: '富文本',
    defaultValue: '',
    placeholder: '',
    required: false,
    labelSpan: '2',
    ctrlSpan: '10',
    height: 350,
    filed: '',
    tagattr: ''
  }
},
{
  type: 'blank',
  name: '占位栏',
  icon: 'fa fa-bookmark',
  layout: 'inline',
  isShowSpanSetting: true,
  options: {
    spans: '4',
    tagattr: ''

  }
}, {
  type: 'partlayout',
  name: '局部模块',
  icon: 'fa fa-bookmark',
  layout: 'inline',
  list: [],
  isShowSpanSetting: true,
  eventlist: [],
  options: {
    spans: '4',
    labelTitle: '局部模块',
    tagattr: ''
  }
},
{
  type: 'dynamiclayout',
  name: '动态容器',
  icon: 'fa fa-bookmark',
  layout: 'inline',
  isShowSpanSetting: true,
  eventlist: [],
  options: {
    labelTitle: '动态容器',
    spans: '4',
    rowSpan: '1',
    dynamiclist: [{ list: [], options: { name: 'dynamicplane1', title: '面板1' } }],
    tagattr: ''
  }
},

{
  type: 'rate',
  name: 'Rate评分',
  icon: 'fa fa-bookmark',
  dragType: 'control',
  layout: 'inline',
  isShowSpanSetting: true,
  eventlist: [],
  options: {
    labelSpan: '2',
    ctrlSpan: '2',
    labelTitle: 'Rate评分',
    defaultValue: '',
    filed: '',
    required: false,
    tagattr: ''
  }
},
{
  type: 'inputnumber',
  name: '数字控件',
  icon: 'fa fa-bookmark',
  dragType: 'control',
  layout: 'inline',
  isShowSpanSetting: true,
  eventlist: [],
  options: {
    labelSpan: '2',
    ctrlSpan: '2',
    labelTitle: '数字',
    defaultValue: '',
    filed: '',
    min: '-10000000000',
    max: '10000000000',
    precision: '0',
    step: '1',
    required: false,
    tagattr: ''
  }
},
{
  type: 'tree',
  name: '树控件',
  icon: 'fa fa-bookmark',
  layout: 'inline',
  isShowSpanSetting: true,
  options: {
    spans: '24',
    langId: '',
    idPrefix: 'tree_',
    describe: '',
    defaultValue: [
      {
        label: '一级 1',
        children: [
          {
            label: '二级 1-1',
            children: [
              {
                label: '三级 1-1-1'
              }
            ]
          }
        ]
      },
      {
        label: '一级 2',
        children: [
          {
            label: '二级 2-1',
            children: [
              {
                label: '三级 2-1-1'
              }
            ]
          },
          {
            label: '二级 2-2',
            children: [
              {
                label: '三级 2-2-1'
              }
            ]
          }
        ]
      },
      {
        label: '一级 3',
        children: [
          {
            label: '二级 3-1',
            children: [
              {
                label: '三级 3-1-1'
              }
            ]
          },
          {
            label: '二级 3-2',
            children: [
              {
                label: '三级 3-2-1'
              }
            ]
          }
        ]
      }
    ],
    defaultProps: {
      children: 'children',
      label: 'label'
    },
    rowSpan: '1',
    tagattr: ''
  }
},
// {
//   type: 'navmenu',
//   name: '导航菜单',
//   icon: 'fa fa-bookmark',
//   layout: 'inline',
//   isShowSpanSetting: true,
//   options: {
//     spans: '24',
//     langId: '',
//     idPrefix: 'menu_',
//     describe: '',
//     type: '',
//     tabPosition: 'top',
//     defaultValue: [{ tabname: '', tablabel: '' }],
//     rowSpan: '1'
//   }
// },
{
  type: 'imgage',
  name: '图片控件',
  icon: 'fa fa-bookmark',
  layout: 'inline',
  isShowSpanSetting: true,
  eventlist: [],
  options: {
    labelTitle: '图片',
    langId: '',
    idPrefix: 'img_',
    describe: '',
    filed: '',
    tagattr: ''
  }
},
{
  type: 'calendar',
  name: '日历控件',
  icon: 'fa fa-bookmark',
  layout: 'inline',
  isShowSpanSetting: true,
  eventlist: [],
  options: {
    labelTitle: '日历',
    spans: '24',
    langId: '',
    idPrefix: 'img_',
    describe: '',
    tagattr: ''
  }
},
{
  type: 'timepicker',
  name: '时间选择',
  dragType: 'control',
  icon: 'fa fa-bookmark',
  layout: 'inline',
  isShowSpanSetting: true,
  eventlist: [],
  options: {
    labelTitle: '时间选择',
    labelSpan: '2',
    ctrlSpan: '2',
    disabled: false,
    timeformat: '',
    minute: 1,
    second: 1,
    required: false,
    filed: '',
    tagattr: ''

  }
},
{
  type: 'upFilesComp',
  name: '上传控件',
  icon: 'fa fa-bookmark',
  layout: 'inline',
  isShowSpanSetting: true,
  options: {
    labelTitle: '上传',
    required: false,
    filed: '',
    tagattr: ''
  }
},
{
  type: 'pageheader',
  name: '返回详情',
  icon: 'fa fa-bookmark',
  layout: 'inline',
  isShowSpanSetting: true,
  options: {
    labelTitle: '详情页面',
    labelSpan: '2',
    ctrlSpan: '2',
    langId: '',
    idPrefix: 'hder_',
    describe: ''
  }
}]
export const platformComponents = [{
  type: 'user',
  name: '选人控件',
  icon: 'fa fa-user',
  dragType: 'control',
  isShowCheck: true,
  isShowSpanSetting: true,
  options: {
    labelTitle: '选人控件',
    langId: '',
    idPrefix: 'usr_',
    controlId: '',
    describe: '',
    required: 'false',
    labelSpan: '2',
    ctrlSpan: '2',
    defaultValue: '',
    defaultText: '',
    multy: 'false',
    confirmFunName: '',
    confirm: '',
    edit: 'false',
    deptId: '',
    showUserid: 'false',
    placeholder: '',
    init: '',
    filed: '',
    tagattr: ''
  }
},
{
  type: 'department',
  name: '选部门控件',
  icon: 'fa fa-users',
  isShowCheck: true,
  isShowSpanSetting: true,
  dragType: 'control',
  options: {
    labelTitle: '选部门控件',
    langId: '',
    idPrefix: 'dep_',
    controlId: '',
    defaultValue: '',
    placeholder: '',
    describe: '',
    required: 'false',
    dataType: 'string',
    labelSpan: '2',
    ctrlSpan: '2',
    multy: 'false',
    confirmFunName: '',
    confirm: '',
    edit: false,
    ActiveParameterFunName: '',
    ActiveParameter: '',
    level: '10000001',
    maxLevel: '6',
    filed: '',
    tagattr: ''
  }
},
{
  type: 'project',
  name: '选项目控件',
  icon: 'fa fa-file-powerpoint-o',
  dragType: 'control',
  isShowCheck: true,
  isShowSpanSetting: true,
  options: {
    labelTitle: '选项目控件',
    langId: '',
    idPrefix: 'pro_',
    controlId: '',
    defaultValue: '',
    placeholder: '',
    describe: '',
    required: 'false',
    dataType: 'string',
    labelSpan: '2',
    ctrlSpan: '2',
    multy: 'false',
    confirmFunName: '',
    confirm: '',
    edit: false,
    beforeConfirmFunName: '',
    beforeConfirm: '',
    ActiveParameterFunName: '',
    ActiveParameter: '',
    companyCode: '',
    prefix: '',
    filed: '',
    tagattr: ''
  }
},
{
  type: 'cost',
  name: '选成本中心',
  icon: 'fa fa-cny',
  dragType: 'control',
  isShowCheck: true,
  isShowSpanSetting: true,
  options: {
    labelTitle: '选成本中心',
    langId: '',
    idPrefix: 'cos_',
    controlId: '',
    defaultValue: '',
    placeholder: '',
    describe: '',
    required: 'false',
    dataType: 'string',
    labelSpan: '2',
    ctrlSpan: '2',
    multy: 'false',
    confirmFunName: '',
    confirm: '',
    edit: 'false',
    beforeConfirmFunName: '',
    beforeConfirm: '',
    ActiveParameterFunName: '',
    ActiveParameter: '',
    Language: '2052',
    companyCode: '',
    filed: '',
    tagattr: ''
  }
},
{
  type: 'choose',
  name: '选择控件',
  icon: 'fa fa-search',
  dragType: 'control',
  isShowCheck: true,
  isShowSpanSetting: true,
  list: [],
  options: {
    labelTitle: '选择控件',
    langId: '',
    idPrefix: 'chs_',
    controlId: '',
    describe: '',
    required: false,
    labelSpan: '2',
    ctrlSpan: '2',
    dialogHeight: '500',
    dialogWidth: '800',
    placeholder: '',
    filed: '',
    valueField: 'FID',
    textField: 'Name',
    gridId: '',
    multy: false,
    tagattr: ''

  }
},
{
  type: 'wmpDetail',
  name: '明细控件',
  icon: 'el-icon-s-grid',
  options: {
    labelTitle: '明细控件',
    langId: '',
    idPrefix: 'tbl_',
    controlId: 'wmpdetail1',
    keyField: 'FID',
    enableChoose: true,
    multy: false,
    showNo: true,
    columns: [
      {
        type: 'showno',
        name: '序号',
        width: '60',
        options: { labelTitle: '序号' }
      }
    ],
    tagattr: ''
  }
},
{
  type: 'listview',
  name: '列表控件',
  icon: 'el-icon-s-grid',
  isShowCheck: true,
  options: {
    labelTitle: '列表控件',
    langId: '',
    idPrefix: 'lst_',
    controlId: 'view1',
    sourceApi: '',
    enableChoose: false,
    multy: false,
    showNo: true,
    columns: [
    ],
    tagattr: ''
  }
}]

export const controlComponents = [
  { controls: layoutComponents, title: '布局控件', draggablebind: { group: { name: 'people', pull: 'clone', put: false }, animation: 150, sort: false, ghostClass: 'ghost' } },
  { controls: basicComponents, title: '基础控件', draggablebind: { group: { name: 'people1', pull: 'clone', put: false }, sort: false, ghostClass: 'ghost' } },
  { controls: platformComponents, title: '平台控件', draggablebind: { group: { name: 'people1', pull: 'clone', put: false }, sort: false, ghostClass: 'ghost' } },
  { controls: [], title: '用户控件', draggablebind: { group: { name: 'people1', pull: 'clone', put: false }, sort: false, ghostClass: 'ghost' } }
]

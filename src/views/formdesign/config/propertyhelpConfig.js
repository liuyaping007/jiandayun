import configs from '@/configs/index.js';
export const helper = {
    title: {
        title: '标题名称',
        content: '清空标题名称将不显示列。',
        propertytype: '基本设置',
    },
    filed: {
        title: '绑定字段',
        content: '绑定字段',
        propertytype: '基本设置',
        showfun (fromInfo, element, designType) {
            let isExist = isListView(fromInfo, element.model);
            if (isExist) {
                return true;
            } else {
                return false;
            }
        },
    },
    icon: {
        title: '图标',
        content: '图标',
        propertytype: '布局设置',
        type: 'openselect',
    },
    planelist: {
        title: '子布局',
        content: '子布局',
        propertytype: '基本设置',
        type: 'planelist',
        classname: 'com-hidetitle',
    },
    defaultValue: {
        title: '默认值',
        content: '默认值',
        propertytype: '基本设置',
    },
    isMulty: {
        title: '是否多选',
        content: '是否多选',
        propertytype: '基本设置',
        classname: '',
        type: 'switch',
    },
    required: {
        title: '是否必填',
        content: '是否必填',
        propertytype: '基本设置',
        classname: '',
        type: 'switch',
    },
    disabled: {
        title: '是否只读',
        content: '是否只读',
        propertytype: '基本设置',
        classname: '',
        type: 'switch',
    },
    istitle: {
        title: '显示标题',
        content: '是否显示标题',
        propertytype: '基本设置',
        classname: '',
        type: 'switch',
    },
    ishide: {
        title: '是否隐藏',
        content: '是否隐藏',
        propertytype: '基本设置',
        classname: '',
        type: 'switch',
    },
    showwordlimit: {
        title: '显示字数',
        content: '是否显示字数',
        propertytype: '基本设置',
        classname: '',
        type: 'switch',
    },
    clearable: {
        title: '一键清空',
        content: '一键清空',
        type: 'switch',
        propertytype: '基本设置',
        classname: '',
    },
    password: {
        title: '是否密码',
        content: '是否密码',
        type: 'switch',
        propertytype: '基本设置',
        classname: '',
    },
    prefixicon: {
        title: '头部图标',
        content: '文本框头部图标',
        type: 'openselect',
        propertytype: '布局设置',
        classname: '',
    },
    suffixicon: {
        title: '尾部图标',
        content: '文本框尾部图标',
        type: 'openselect',
        propertytype: '布局设置',
        classname: '',
    },
    ruleslist: {
        type: 'ruleslist',
        title: '正则验证',
        content: '设置表单提交数据正则验证！',
        propertytype: '基本设置',
        classname: 'com-hidetitle',
    },
    dataLength: {
        title: '数据长度',
        content: '限制控件可输入的字符长度',
        type: 'number',
        propertytype: '基本设置',
        classname: '',
    },
    minRows: {
        title: '最小行数',
        content: '多行文本最小行数',
        type: 'number',
        propertytype: '基本设置',
        classname: '',
    },
    maxRows: {
        title: '最大行数',
        content: '多行文本最大行数,超过显示滚动条',
        type: 'number',
        propertytype: '基本设置',
        classname: '',
    },
    isMulty: {
        title: '可多选设置',
        content: '是否允许多选',
        type: 'switch',
        propertytype: '基本设置',
        classname: '',
    },
    isSearch: {
        title: '可搜索设置',
        content: '控件是否支持搜索',
        type: 'switch',
        propertytype: '基本设置',
        classname: '',
    },
    collapsetags: {
        title: 'collapse-tags',
        content: '多选时是否将选中值按文字的形式展示',
        type: 'switch',
        propertytype: '基本设置',
        classname: '',
    },
    allowcreate: {
        title: 'allowcreate',
        content: '是否可创建新的条目',
        type: 'switch',
        propertytype: '基本设置',
        classname: '',
        showfun (fromInfo, data) {
            return data.options.isSearch;
        },
    },
    linktype: {
        title: '链接类型',
        content: '链接类型',
        type: 'select',
        propertytype: '基本设置',
        classname: '',
        data: [{ value: '', label: '默认' },
        { value: 'primary', label: '主要链接' },
        { value: 'success', label: '成功链接' },
        { value: 'warning', label: '警告链接' },
        { value: 'danger', label: '危险链接' },
        { value: 'info', label: '信息链接' },]
    },
    underline: {
        title: '是否下划线',
        content: '是否下划线',
        propertytype: '基本设置',
        classname: '',
        type: 'switch',
    },
    disabled: {
        title: '是否禁用',
        content: '是否禁用',
        propertytype: '基本设置',
        classname: '',
        type: 'switch',
    },
    target: {
        title: 'target',
        content: 'target',
        propertytype: '基本设置',
        classname: '',
        type: 'select',
        data: [
            { value: '', label: '' },
            { value: '_blank', label: '_blank' },
            {
                value: '_self',
                label: '_self',
            },
            { value: '_parent', label: '_parent' },
            { value: '_top', label: '_top' },
        ],
    },
    colorDark: {
        title: '二维码颜色',
        content: '二维码颜色',
        type: 'color',
        propertytype: '基本设置',
        classname: '',
    },
    colorLight: {
        title: '维码背景色',
        content: '维码背景色',
        type: 'color',
        propertytype: '基本设置',
        classname: '',
    },
    contentposition:{
        title: 'target',
        content: 'target',
        propertytype: '基本设置',
        classname: '',
        type: 'select',
        data: [
            { value: 'left', label: '靠左' },
            {
                value: 'right',
                label: '靠右',
            },
            { value: 'center', label: '居中' }
        ],
    },
    format: {
        title: '格式化串',
        content: '控件的格式化显示类型',
        type: 'select',
        propertytype: '基本设置',
        classname: '',
        data: [
            { value: 'yyyy-MM-DD', label: 'yyyy-MM-DD' },
            {
                value: 'yyyy-MM-DD HH:mm:ss',
                label: 'yyyy-MM-DD HH:mm:ss',
            },
            { value: 'yyyy', label: 'yyyy' },
            { value: 'yyyy-MM', label: 'yyyy-MM' },
        ],
    },
    modeltype: {
        title: '控件类型',
        content: '控件类型如选日期，选月份，选星期，选日期范围',
        type: 'select',
        propertytype: '基本设置',
        classname: '',
        data: [
            { value: 'date', label: '选日期' },
            { value: 'year', label: '选年' },
            { value: 'month', label: '选月份' },
            { value: 'week', label: '选星期' },
            { value: 'range', label: '日期范围' },
        ],
    },
    range: {
        title: 'range',
        content: '是否为范围选择',
        type: 'switch',
        propertytype: '基本设置',
    },
    isshowtime: {
        title: '是否显示时分秒',
        content: '是否显示时分秒',
        type: 'switch',
        propertytype: '基本设置',
        classname: '',
    },
    isbutton: {
        title: 'isbutton',
        content: '是否按钮风格',
        type: 'switch',
        propertytype: '基本设置',
        classname: '',
    },
    isRemote: {
        title: '选项',
        content: '选项的集合',
        type: 'optionlist',
        propertytype: '基本设置',
        classname: 'com-hidetitle',
    },
    butType: {
        title: '按钮类型',
        content: '按钮类型',
        type: 'select',
        propertytype: '基本设置',
        classname: '',
        data: [
            { value: '', label: '' },
            { value: 'text', label: 'text' },
            { value: 'primary', label: 'primary' },
            { value: 'success', label: 'success' },
            { value: 'info', label: 'info' },
            { value: 'warning', label: 'warning' },
            { value: 'danger', label: 'danger' },
        ],
    },
    isplain: {
        title: 'plain',
        content: '是否朴素按钮',
        type: 'switch',
        propertytype: '布局设置',
        classname: '',
    },
    isround: {
        title: 'round',
        content: '是否圆角按钮',
        type: 'switch',
        propertytype: '布局设置',
        classname: '',
    },
    iscircle: {
        title: 'circle',
        content: '是否圆形按钮',
        type: 'switch',
        propertytype: '布局设置',
        classname: '',
    },
    activecolor: {
        title: '开启颜色',
        content: '开启时颜色',
        type: 'colorpicker',
        propertytype: '基本设置',
        classname: '',
    },
    inactivecolor: {
        title: '关闭颜色',
        content: '关闭时颜色',
        type: 'colorpicker',
        propertytype: '基本设置',
        classname: '',
    },
    butsize: {
        title: '控件尺寸',
        content: '控件尺寸',
        type: 'select',
        data: [
            { value: '', label: '默认' },
            { value: 'medium', label: '中等' },
            { value: 'small', label: '小型' },
            { value: 'mini', label: '超小' },
        ],
        propertytype: '布局设置',
        classname: '',
    },
    component: {
        title: '自定义内容',
        content: '自定义内容vue代码',
        propertytype: '基本设置',
        type: 'htmlcode',
    },
    uptype: {
        title: '控件类型',
        content: '上传控件类型',
        type: 'select',
        data: [
            { value: 'file', label: '文件上传' },
            { value: 'img', label: '图片上传' },
            { value: 'arryimg', label: '多图片上传' },
        ],
    },
    labelwidth: {
        title: '标题宽度',
        content: '标题宽度',
        type: 'number',
        classname: '',
        propertytype: '布局设置',
    },
    css: {
        title: 'style',
        content: '自定义css',
        type: 'csscode',
        propertytype: '其它设置',
    },
    parentcss: {
        title: 'style',
        content: '父级自定义css',
        type: 'csscode',
        propertytype: '其它设置',
    },
    tagattr: {
        title: '自定义属性',
        content: '自定义属性满足于未覆盖的控件属性和vue语法的支持',
        type: 'tagattr',
        propertytype: '其它设置',
    },
    component: {
        title: '自定义代码',
        content: '自定义组件就是随意的vue代码',
        type: 'component',
        propertytype: '基本设置',
    },
    parenttagattr: {
        title: '父级自定义属性',
        content: '父级自定义属性满足于未覆盖的控件属性和vue语法的支持',
        type: 'tagattr',
        propertytype: '其它设置',
    },
    // scalewidth: {
    //   title: '宽度比例',
    //   content: '宽度比例',
    //   type: 'number',
    //   max: 100,
    //   min: 0,
    //   propertytype: '布局设置',
    //   showfun(fromInfo, element, designType) {
    //     let isExist = islayouttableChind(fromInfo, element.model)
    //     if (designType === 'pc' && isExist) {
    //       return true
    //     } else {
    //       return false
    //     }
    //   },
    // },
    // phonescalewidth: {
    //   title: '宽度比例',
    //   content: '宽度比例',
    //   type: 'number',
    //   max: 100,
    //   min: 0,
    //   propertytype: '布局设置',
    //   showfun(fromInfo, element, designType) {
    //     let isExist = islayouttableChind(fromInfo, element.model)
    //     if (designType === 'mobile' && isExist) {
    //       return true
    //     } else {
    //       return false
    //     }
    //   },
    // },
    // ipadscalewidth: {
    //   title: '宽度比例',
    //   content: '宽度比例',
    //   type: 'number',
    //   max: 100,
    //   min: 0,
    //   propertytype: '布局设置',
    //   showfun(fromInfo, element, designType) {
    //     let isExist = islayouttableChind(fromInfo, element.model)
    //     if (designType === 'ipad' && isExist) {
    //       return true
    //     } else {
    //       return false
    //     }
    //   },
    // },
    lg: {
        title: '栅格',
        content: '栅格比例',
        type: 'slider',
        max: 24,
        min: 1,
        propertytype: '布局设置',
        classname: 'com-context-row',
        showfun (fromInfo, element, designType) {
            let isExist = isExistGrid(fromInfo, element.model);
            if (designType === 'pc' && !isExist) {
                return true;
            } else {
                return false;
            }
        },
    },
    ctrlsize: {
        title: '控件尺寸',
        content: '控件尺寸',
        type: 'select',
        propertytype: '布局设置',
        data: [
            { value: '', label: '默认' },
            { value: 'medium', label: '中等' },
            { value: 'small', label: '小型' },
            { value: 'mini', label: '超小' },
        ],
    },
    md: {
        title: '栅格',
        content: '栅格比例',
        type: 'slider',
        propertytype: '布局设置',
        max: 24,
        min: 1,
        classname: 'com-context-row',
        showfun (fromInfo, element, designType) {
            let isExist = isExistGrid(fromInfo, element.model);
            if (designType === 'ipad' && !isExist) {
                return true;
            } else {
                return false;
            }
        },
    },
    xs: {
        title: '栅格',
        content: '栅格比例',
        type: 'slider',
        propertytype: '布局设置',
        max: 24,
        min: 1,
        classname: 'com-context-row',
        showfun (fromInfo, element, designType) {
            let isExist = isExistGrid(fromInfo, element.model);
            if (designType === 'mobile' && !isExist) {
                return true;
            } else {
                return false;
            }
        },
    },
    borderradius: {
        title: '圆角',
        content: '圆角',
        type: 'number',
        classname: 'com-context-row',
        min: 0,
        max: 2000,
        propertytype: '布局设置',
    },
    borderwidth: {
        title: '边框宽度',
        content: '边框宽度',
        type: 'number',
        classname: '',
        min: 0,
        max: 2000,
        propertytype: '布局设置',
    },
    borderstyle: {
        title: '边框样式',
        content: '边框样式',
        type: 'select',
        data: [
            { value: 'none', label: '无边框' },
            { value: 'dotted', label: '点状虚线边框' },
            { value: 'dashed', label: '虚线边框' },
            { value: 'solid', label: '实线边框' },
            { value: 'double', label: '双实线边框' },
            { value: 'groove', label: '3D 凹槽边框' },
            { value: 'ridge', label: '3D 垄状边框' },
            { value: 'inset', label: '3D 嵌入边框' },
            { value: 'outset', label: '3D 突出边框' },
            { value: 'inherit', label: '从父元素继承边框' },
        ],
        propertytype: '布局设置',
    },
    bordercolor: {
        title: '边框颜色',
        content: '边框颜色',
        type: 'color',
        propertytype: '布局设置',
        classname: '',
    },
    fontcolor: {
        title: '字体颜色',
        content: '字体颜色',
        type: 'color',
        propertytype: '布局设置',
        classname: '',
    },
    lineheight: {
        title: '行间距',
        content: '行间距',
        type: 'number',
        propertytype: '布局设置',
        min: 5,
        max: 200,
        classname: '',
    },
    opacity: {
        title: '透明度',
        content: '透明度',
        type: 'slider',
        propertytype: '布局设置',
        min: 0,
        max: 1,
        classname: 'com-context-row',
        step: 0.05,
    },
    step: {
        title: 'step',
        content: '最大值',
        type: 'number',
        propertytype: '布局设置',
    },
    min: {
        title: 'min',
        content: '最小值',
        type: 'number',
        propertytype: '布局设置',
    },
    max: {
        title: 'max',
        content: '步长',
        type: 'number',
        propertytype: '布局设置',
    },
    showstops: {
        title: 'showstops',
        content: '是否显示间断点',
        type: 'switch',
        propertytype: '布局设置',
    },
    fontsize: {
        title: '字体大小',
        content: '字体大小',
        type: 'number',
        min: 6,
        max: 100,
        propertytype: '布局设置',
        classname: '',
    },
    height: {
        title: '高度',
        content: '控件的高度，默认单位：px,可以添加%和calc',
        propertytype: '布局设置',
    },
    width: {
        title: '宽度',
        content: '控件的宽度，默认单位：px,可以添加%和calc',
        propertytype: '布局设置',
    },
    precision: {
        title: '保留几位小数',
        content: '保留几位小数',
        type: 'number',
        propertytype: '布局设置',
    },
    wherelist: {
        title: '过滤条件设置',
        content: '过滤条件设置',
        type: 'wherelist',
        propertytype: '布局设置',
        showfun (fromInfo, data) {
            if (
                (data.type === 'datarelevance' ||
                    data.type === 'queryrelevance' ||
                    data.type === 'operatedata' ||
                    data.type === 'gridlist') &&
                fromInfo.designType !== '/buildquestionnaire.html'
            ) {
                return true;
            } else {
                return false;
            }
        },
    },
    buttons: {
        title: '按钮项',
        content: '按钮的集合',
        type: 'buttonlist',
        propertytype: '基本设置',
        classname: 'com-hidetitle',
    },
    uptype: {
        title: '控件类型',
        content: '上传控件类型',
        type: 'select',
        data: [
            { value: 'file', label: '文件上传' },
            { value: 'img', label: '图片上传' },
            { value: 'arryimg', label: '多图片上传' },
        ],
        propertytype: '基本设置',
        classname: '',
    },
    h: {
        title: '高度',
        content: '显示高度',
        type: 'number',
        propertytype: '布局设置',
        classname: '',
    },
    w: {
        title: '宽度',
        content: '显示宽度',
        type: 'number',
        propertytype: '布局设置',
        classname: '',
    },
};
export function islayouttableChind (fromInfo, model) {
    let json = fromInfo;
    const result = kylinjson.kylinjson({
        path:
            "$.ctrls[?(@.type=='layouttable')].options.planelist[?(@.model=='" +
            model +
            "')]",
        json,
        key: configs.keycode,
    });
    if (result.length === 0) {
        return false;
    } else {
        return true;
    }
}
export function isGridList (fromInfo, model) {
    let json = fromInfo;
    const result = kylinjson.kylinjson({
        path:
            "$..options.columns[?(@.type=='gridlist')].options.columns[?(@.model=='" +
            model +
            "')]",
        json,
        key: configs.keycode,
    });
    if (result.length === 0) {
        return false;
    } else {
        return true;
    }
}
export function isListView (fromInfo, model) {
    let json = fromInfo;
    const result = kylinjson.kylinjson({
        path:
            "$..options.columns[?(@.type=='listview')].options.columns[?(@.model=='" +
            model +
            "')]",
        json,
        key: configs.keycode,
    });
    if (result.length === 0) {
        return false;
    } else {
        return true;
    }
}
export function isExistGrid (fromInfo, model) {
    const result = isGridList(fromInfo, model);
    const result2 = isListView(fromInfo, model);
    if (!result && !result2) {
        return false;
    } else {
        return true;
    }
}
export const propertytype = ['基本设置', '布局设置', '其它设置'];

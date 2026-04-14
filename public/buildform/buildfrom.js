function BuildFrom (buildtype) {
    this.rules = {}; /// 验证对象
    this.formData = {}; /// fromData 对象
    this.methodsfunction = {}; /// 方法集合
    this.watchfunction = {}; /// 监控方法
    this.watchfunctionContext = {}; /// 监控方法
    this.watchdetailfiled = {}; /// 为了明细列字段监控设定的
    this.loaddatabeforecode = ''; /// 加载之前事件
    this.loaddataaftercode = ''; /// 数据加载之后事件
    this.beforesubmitcode = ''; /// 提交前事件
    this.detailfromInfo = {};
    this.cortorlid =
        'div' + Date.parse(new Date()) + '_' + Math.ceil(Math.random() * 99999);
    this.vuetemp = {
        data () {
            return {};
        },
        methods: {},
    };
    this.controlData = {}; /// 控件参数或者加载对象
    this.adddataCode = []; /// /新增时 需要执行的代码
    this.rowcontrolstr =
        'tree,navmenu,blank,partlayout,dynamiclayout,calendar,imgage,upFilesComp,upImgComp,upManyImgComp'; /// 占整行的控件
    this.dynamicheight = 'partlayout,tree,calendar,imgage,upFilesComp,'; /// 由内部控件撑高度的控件
    this.minheight = 'partlayout,dynamiclayout,';
    this.initfunstr = ''; /// 初始化加载js方法
    this.buildtype = buildtype; /// 生成类型
    this.fromTableName = ''; /// 主表名称
    this.swaggerconfig = getStorageValue('swaggerconfig'); /// swagger配置信息
    this.defaultprops = [
        'businessid',
        'IsPower',
        'fromstatus',
        'fromid',
        '$user',
    ];
    this.casestring = {
        zhldialog: 'zhlDialog',
        showsizechange: 'showSizeChange',
    };
    this.modelfiled = {};
    this.readDataPermission = {};
    this.writeDataPermission = {};
    this.errormsglist = [];
    this.formInfo = {};
    function getStorageValue (key) {
        let strStorage = localStorage.getItem(key);
        if (strStorage == null) {
            strStorage = sessionStorage.getItem(key);
        }
        if (strStorage != null) {
            const obj = JSON.parse(strStorage);
            let content = {};
            if (obj.dataType === 'string') {
                content = obj.content;
            } else if (obj.dataType === 'number') {
                content = Number(obj.content);
            } else if (obj.dataType === 'boolean') {
                /* eslint-disable */
                content = eval(obj.content);
            } else if (obj.dataType === 'object') {
                content = obj.content;
            }
            return content;
        }
    }
}
BuildFrom.prototype.validatecotrl = function (options, title, type) {
    switch (type) {
        case 'select':
        case 'checkbox':
        case 'radio':
            if (options.sourceApi === undefined || options.sourceApi === '') {
                this.errormsglist.push(title + '控件属性【数据源】未设置！');
            }
            if (options.labelValue === undefined || options.labelValue === '') {
                this.errormsglist.push(title + '控件属性【选项字段】未设置！！');
            }
            break;
        case 'datarelevance':
            if (options.sourceApi === undefined || options.sourceApi === '') {
                this.errormsglist.push(title + '控件属性【数据源】未设置！');
            }
            if (
                options.filedList.bindname === undefined ||
                options.filedList.bindname === ''
            ) {
                this.errormsglist.push(title + '控件属性【显示字段】未设置！！');
            }
            break;
        case 'queryrelevance':
            if (options.sourceApi === undefined || options.sourceApi === '') {
                this.errormsglist.push(title + '控件属性【数据源】未设置！');
            }
            if (
                options.assignFiledList === undefined ||
                options.assignFiledList.length === 0
            ) {
                this.errormsglist.push(title + '控件属性【填充规则设置】未设置！！');
            }
            break;
        case 'operatedata':
            if (options.sourceApi === undefined || options.sourceApi === '') {
                this.errormsglist.push(title + '控件属性【数据源】未设置！');
            }
            if (
                options.assignFiledList === undefined ||
                options.assignFiledList.length === 0
            ) {
                this.errormsglist.push(title + '控件属性【填充规则设置】未设置！！');
            }
            break;
        case 'gridlist':
            if (options.sourceApi === undefined || options.sourceApi === '') {
                this.errormsglist.push(title + '控件属性【数据源】未设置！');
            }
            break;
        default:
            break;
    }
    return '';
};
BuildFrom.prototype.buildpubish = function ({ formInfo, jscode, csscode }) {
    this.errormsglist = [];
    this.fromTableName = formInfo.fromTableName;
    this.formInfo = formInfo;
    var isError = this.clearInit(jscode);
    if (isError == false) {
        return { code: -1, msg: '编写js代码语法有错误！请检查！' };
    }
    this.buildCommonJsCode();
    var htmlcode = $('#miantmpl')
        .tmpl(formInfo)
        .prop('outerHTML');
    ////将有大小写的标签进行转换一下
    for (var key in this.casestring) {
        var reg = new RegExp(key, 'g');
        htmlcode = htmlcode.replace(reg, this.casestring[key]);
    }
    var jscode = this.bulidjscode(formInfo);
    var buildObject = {
        htmlcode: htmlcode,
        jscode: 'export default ' + jscode,
        syscss: this.getcss(),
        csscode: csscode,
    };
    if (this.errormsglist.length > 0) {
        return {
            code: 400,
            msg:
                this.errormsglist.join('<br/>') +
                '<br/>请先设置好对应属性，才能继续操作',
        };
    }
    return buildObject;
};
BuildFrom.prototype.buildcss = function (csscode) {
    if (csscode === undefined && csscode === '') {
        return '';
    }
    let regex = new RegExp('{([^}]*)}', 'g');
    let resultList = csscode.match(regex);
    if (resultList != null) {
        let newcsscode = '[' + this.cortorlid + '] ' + csscode;
        for (let i = 0; i < resultList.length; i++) {
            newcsscode = newcsscode.replaceAll(
                resultList[i],
                resultList[i] + ' [' + this.cortorlid + '] '
            );
        }
        return newcsscode;
    }
    return '';
};

BuildFrom.prototype.clearInit = function (jscode) {
    this.rules = {}; /// 验证对象
    this.formData = {}; /// fromData 对象
    this.methodsfunction = {}; /// 事件集合对象
    this.adddataCode = [];
    this.modelfiled = {};
    this.readDataPermission = {};
    this.writeDataPermission = {};
    this.vuetemp = {
        data () {
            return {};
        },
        methods: {},
        watch: {},
    };
    this.controlData = {};
    this.initfunstr = '';
    this.watchfunctionContext = {};
    this.watchdetailfiled = {};
    this.watchfunction = {};
    if (jscode != undefined && jscode != '') {
        try {
            this.vuetemp = eval('(' + jscode.replace('export default', '') + ')');
        } catch {
            //// 为了兼容 如果是系统生成js语法错误，进行删除生成的js方法内容，从而达到无错误。
            try {
                var reg = /([^\n|^.]*)_sys\(([^{\n]*){/g;
                jscode = jscode.replace(reg, function (params) {
                    return '★' + params;
                });
                var reg2 = new RegExp(/([^\n|^.]*)_sys\(([^{\n]*){([^★]*)★/g);
                var res = jscode.match(reg2);
                res.forEach((ee) => {
                    var reg3 = /{([\s\S]*)}/;
                    jscode = jscode.replace(ee, ee.replace(reg3, '{}'));
                });
                jscode = jscode.replace(/★/g, '');
                this.vuetemp = eval('(' + jscode.replace('export default', '') + ')');
            } catch {
                return false;
            }
        }
        if (this.vuetemp.methods != undefined) {
            for (let key in this.vuetemp.methods) {
                let prefix = key.substr(key.length - 4, key.length);
                if (prefix !== '_sys') {
                    this.methodsfunction[key] = this.vuetemp.methods[key];
                }
            }
        }
        if (this.vuetemp.watch != undefined) {
            // this.watchfunction = Object.assign(this.vuetemp.watch)
        } else {
            this.vuetemp.watch = {};
        }
    }
    return true;
};
BuildFrom.prototype.bulidjscode = function (frominfo) {
    var jscode = '';
    var newjsdata = Object.assign(this.vuetemp.data());
    newjsdata['formData'] = this.formData;
    newjsdata['formData']['$tableNewId'] = '';
    newjsdata['deviceMode'] = 'Mobile';
    newjsdata['fromdialog'] = {
        fromid: '',
        selectId: '',
        loaddata: '',
    };
    newjsdata['exportexcel'] = {
        DetailsForm: [],
        json_fields: {},
        title: '',
        cotrlid: '',
    };
    newjsdata['rules'] = this.rules;
    newjsdata['controlData'] = this.controlData;
    newjsdata['selectindex'] = -1;
    newjsdata['isedit'] = false;
    newjsdata['selectproperty'] = '';
    newjsdata['modelfiled'] = this.modelfiled;
    newjsdata['watchdetailfiled'] = this.watchdetailfiled;
    newjsdata['readDataPermission'] = this.readDataPermission;
    newjsdata['writeDataPermission'] = this.writeDataPermission;
    if (this.vuetemp['props'] === undefined) {
        this.vuetemp['props'] = this.defaultprops;
    } else {
        this.defaultprops.forEach((ee) => {
            if (this.vuetemp['props'].indexOf(ee) < 0) {
                this.vuetemp['props'].push(ee);
            }
        });
    }
    var methodseventfunction = '';
    this.buildformulaCode(frominfo.logicList);
    this.buildCommonJsCode();
    function bulidobject (obj) {
        var jscode = '{';
        for (key in obj) {
            var codestr = jscode == '{' ? '' : ',';
            if (key == 'formData') {
                jscode =
                    jscode + codestr + ' ' + key + ":'" + JSON.stringify(obj[key]) + "'";
            } else if (typeof obj[key] == 'function') {
                jscode = jscode + codestr + obj[key].toString();
            } else if (typeof obj[key] == 'object') {
                if (obj[key] instanceof Array) {
                    jscode = jscode + codestr + key + ':' + buildArray(obj[key]) + '';
                } else {
                    jscode = jscode + codestr + key + ':{' + bulidobject(obj[key]) + '}';
                }
            } else if (typeof obj[key] != 'undefined') {
                jscode =
                    jscode +
                    codestr +
                    key +
                    ":'" +
                    obj[key].toString().replace(/\"/g, '\\"') +
                    "'";
            }
        }
        jscode = jscode + '}';
        return jscode;
    }
    function buildArray (arry) {
        var jscode = '[';
        for (let idex = 0; idex < arry.length; idex++) {
            var codestr = jscode == '[' ? '' : ',';
            if (typeof arry[idex] == 'object') {
                if (arry[idex] instanceof Array) {
                    jscode = jscode + codestr + buildArray(arry[idex]);
                } else {
                    jscode = jscode + codestr + bulidobject(arry[idex]);
                }
            } else {
                jscode = jscode + codestr + '"' + arry[idex] + '"';
            }
        }
        jscode = jscode + ']';
        return jscode;
    }
    // this.methodsfunction["funmounted"] = `\n//系统方法页面加载方法 \nfunmounted(){${this.initfunstr}}`
    for (var key in this.methodsfunction) {
        methodseventfunction =
            methodseventfunction == ''
                ? this.methodsfunction[key].toString()
                : methodseventfunction + ',' + this.methodsfunction[key].toString();
    }
    let watchfunctioncode = '';
    for (var key in this.watchfunction) {
        let watchfunctionjscode =
            this.watchfunctionContext[key] instanceof Array
                ? this.watchfunctionContext[key].join('\n')
                : this.watchfunctionContext[key];
        watchfunctioncode =
            watchfunctioncode == ''
                ? this.watchfunction[key]
                    .toString()
                    .replace('$$##$$', watchfunctionjscode)
                : watchfunctioncode +
                ',' +
                this.watchfunction[key]
                    .toString()
                    .replace('$$##$$', watchfunctionjscode);
    }
    jscode = jscode + '{';
    for (key in this.vuetemp) {
        var codestr = jscode == '{' ? '' : ',';
        if (key == 'data' && typeof this.vuetemp[key] == 'function') {
            jscode =
                jscode +
                codestr +
                ' data(){ return ' +
                JSON.stringify(newjsdata) +
                '} ';
        } else if (typeof this.vuetemp[key] == 'function') {
            jscode = jscode + codestr + this.vuetemp[key].toString();
        } else if (key == 'methods' && typeof this.vuetemp[key] == 'object') {
            jscode = jscode + codestr + ' methods:{' + methodseventfunction + '} ';
        } else if (key == 'watch' && typeof this.vuetemp[key] == 'object') {
            jscode = jscode + codestr + ' watch:{' + watchfunctioncode + '} ';
        } else if (typeof this.vuetemp[key] == 'object') {
            if (this.vuetemp[key] instanceof Array) {
                jscode =
                    jscode +
                    codestr +
                    ' ' +
                    key +
                    ':' +
                    buildArray(this.vuetemp[key]) +
                    '';
            } else {
                jscode =
                    jscode +
                    codestr +
                    ' ' +
                    key +
                    ':{' +
                    bulidobject(this.vuetemp[key]) +
                    '} ';
            }
        } else if (typeof this.vuetemp[key] != 'undefined') {
            jscode =
                jscode +
                codestr +
                ' ' +
                key +
                ":'" +
                this.vuetemp[key].toString().replace(/\"/g, '\\"') +
                "'";
        }
    }
    if (this.vuetemp['mounted'] == undefined || this.vuetemp['mounted'] == null) {
        jscode = jscode + `,mounted(){this.funmounted_sys();}`;
    }
    jscode = jscode + '}';
    return jscode;
};
BuildFrom.prototype.buildCommonJsCode = function () {
    switch (this.buildtype) {
        case 'buildpublish':
            this.buildCommonBuildFromTmpe();
            break;
        case 'buildpublishAntDesign':
            this.buildCommonBuildFromTmpe();
            break;
        case 'buildquestionnaire':
            this.buildCommonBuildFromTmpe();
            break;
        case 'buildscreenanalyse':
            break;
        case 'buildpublish':
            break;
    }
};
BuildFrom.prototype.buildformulaCode = function (logicList) {
    if (logicList !== undefined) {
        logicList.forEach((ee) => {
            if (ee.relationfield.indexOf('loaddatabefore') >= 0) {
                this.loaddatabeforecode = 'this.loaddatabefore_sys();';
                this.buildformulaItemCode('loaddatabefore_sys', ee.jscode, '');
            } else if (ee.relationfield.indexOf('loaddataafter') >= 0) {
                this.loaddataaftercode = 'this.loaddataafter_sys();';
                this.buildformulaItemCode('loaddataafter_sys', ee.jscode, '');
            } else if (ee.relationfield.indexOf('beforesubmit') >= 0) {
                this.beforesubmitcode =
                    'let beforesubbool= this.beforesubmit_sys(); if(beforesubbool===false){return false;}';
                this.buildformulaItemCode('beforesubmit_sys', ee.jscode, '');
            } else if (ee.relationfield.indexOf('.') < 0) {
                ////然后还剩逻辑设置代码未生成。
                this.watchfunction[`formData.${ee.relationfield}`] = `'formData.${ee.relationfield
                    }':{
          deep:true,
          handler:function(newVal){$$##$$}}`;
                let key = `formData.${ee.relationfield}`;
                if (this.watchfunctionContext[key] !== undefined) {
                    this.watchfunctionContext[key] = this.watchfunctionContext[
                        key
                    ].concat(`   this.${ee.logickey + '_sys'}();`);
                } else {
                    this.watchfunctionContext[key] = `   this.${ee.logickey + '_sys'}();`;
                }
                this.buildformulaItemCode(ee.logickey + '_sys', ee.jscode);
            } else {
                let filed = ee.relationfield.split('.');
                this.watchdetailfiled[filed[1]] = '';
                this.watchfunction[
                    `watchdetailfiled.${filed[1]}`
                ] = `'watchdetailfiled.${filed[1]}'(){ $$##$$}`;
                this.watchfunction[`formData.${filed[0]}`] = `'formData.${filed[0]}':{
          deep:true,
          handler:function(newVal){
            if(this.selectproperty!==undefined&&this.selectindex!==undefined){
            if(newVal[this.selectindex]!==undefined&&newVal[this.selectindex][this.selectproperty]!==undefined){
              $$##$$}
            }
          }
        }`;
                let key = `formData.${filed[0]}`;
                if (this.watchfunctionContext[key] !== undefined) {
                    this.watchfunctionContext[key] = this.watchfunctionContext[
                        key
                    ].concat(
                        `  this.watchdetailfiled.${filed[1]}=newVal[this.selectindex].${filed[1]
                        };`
                    );
                } else {
                    this.watchfunctionContext[key] = `  this.watchdetailfiled.${filed[1]
                        }=newVal[this.selectindex].${filed[1]};`;
                }
                key = `watchdetailfiled.${filed[1]}`;
                ///监控列变化时 调用逻辑配置
                if (this.watchfunctionContext[key] !== undefined) {
                    this.watchfunctionContext[key] = this.watchfunctionContext[
                        key
                    ].concat(
                        `   this.${ee.logickey + '_sys'}(this.formData.${filed[0]
                        }[this.selectindex]);`
                    );
                } else {
                    this.watchfunctionContext[key] = `   this.${ee.logickey +
                        '_sys'}(this.formData.${filed[0]}[this.selectindex]);`;
                }
                this.buildformulaItemCode(ee.logickey + '_sys', ee.jscode, filed[0]);
            }
        });
    }
};
////生成具体的逻辑代码
BuildFrom.prototype.buildformulaItemCode = function (
    funname,
    htmlcode,
    detailfiled
) {
    let jscode = htmlcode;
    const formulahtml = $('<div></div>').append(htmlcode);
    const spanparam = formulahtml.find('[val]');
    for (let i = 0; i < spanparam.length; i++) {
        const ee = spanparam[i];
        let formulaparam = {
            formulname: $(ee).attr('val'),
            vartype: $(ee).attr('vartype'),
            variabletype: $(ee).attr('variabletype'),
            isedit: $(ee).attr('isedit'),
        };
        if (formulaparam.vartype === '2') {
            jscode = jscode.replace(
                $(ee).prop('outerHTML'),
                'this.' + formulaparam.formulname
            );
        } else if (formulaparam.vartype === '3') {
            jscode = jscode.replace(
                $(ee).prop('outerHTML'),
                "this.$query(" + formulaparam.formulname+ ")"
            );
        } else {
            if (formulaparam.isedit === '0') {
                jscode = jscode.replace(
                    $(ee).prop('outerHTML'),
                    'this.formData.' + formulaparam.formulname
                );
            } else {
                if (formulaparam.variabletype === '0') {
                    // if (funname.indexOf('.') > 0) {
                    let filed = formulaparam.formulname.split('.');
                    jscode = jscode.replace(
                        $(ee).prop('outerHTML'),
                        `datarow.${filed[1]}`
                    );
                    // }
                    // childlogicjscode = childlogicjscode.replaceAll(
                    //   ee.outerHTML,
                    //   `"${filedArry[0]}","${filedArry[1]}"`
                    // )
                } else {
                    let filed = formulaparam.formulname.split('.');
                    jscode = jscode.replace(
                        $(ee).prop('outerHTML'),
                        `this.formData.${filed[0]},'${filed[1]}'`
                    );
                }
            }
        }
        // switch (formulaparam.vartype) {
        //   case '1':
        //     if (formulaparam.formulname.indexOf('.') < 0) {
        //       jscode = jscode.replace(
        //         $(ee).prop('outerHTML'),
        //         'this.formData.' + formulaparam.formulname
        //       )
        //     } else {
        //       let filed = formulaparam.formulname.split('.')
        //       if (detailfiled === filed[0] && formulaparam.variabletype !== '1') {
        //         jscode = jscode.replace(
        //           $(ee).prop('outerHTML'),
        //           `datarow.${filed[1]}`
        //         )
        //       } else {
        //         jscode = jscode.replace(
        //           $(ee).prop('outerHTML'),
        //           `this.formData.${filed[0]},'${filed[1]}'`
        //         )
        //       }
        //     }
        //     break
        //   case '2':
        //     jscode = jscode.replace(
        //       $(ee).prop('outerHTML'),
        //       'this.' + formulaparam.formulname
        //     )
        //     break
        //   case '3':
        //     jscode = jscode.replace(
        //       $(ee).prop('outerHTML'),
        //       'this.$route.query.' + formulaparam.formulname
        //     )
        //     break
        // }
    }
    this.methodsfunction[funname] = `${funname}(datarow){
    try{
     ${jscode
            .replace(/<\/?.+?>/g, '')
            .replaceAll('；', ';')
            .replaceAll('，', '，')
            .replaceAll('“', '"')
            .replaceAll('’', "'")
            .replaceAll('&nbsp;', '')
            .replaceAll('&amp;', '&')}

    }catch (ex) {
      this.$message.error('函数${funname}逻辑代码报错！'+ex)
      return false
    }
    return true
  }`;
};

////生成通用方法
BuildFrom.prototype.buildCommonBuildFromTmpe = function () {
    this.methodsfunction[
        'testsubmitData_sys'
    ] = `\n //系统方法 关闭弹出层的方法  \n testsubmitData_sys(){
        this.$confirm(JSON.stringify(this.formData), '表单数据', {
              confirmButtonText: '确定',
              callback: action => {
                
              }
            });
    }`;
    this.methodsfunction[
        'fromdialogclose_sys'
    ] = `\n //系统方法 关闭弹出层的方法  \n fromdialogclose_sys(issave){
  this.$refs.reffromdialog.clasedialog();
    if (issave&& this.fromdialog.loaddata!==undefined &&  typeof(this.fromdialog.loaddata)==='function') {
      this.fromdialog.loaddata()
    }   }`;

    this.methodsfunction[
        'exportListView_sys'
    ] = `\n //系统方法 通用通用导出明细方法  \n exportListView_sys(datalistname, title){
    if(this.formData[datalistname].length===0){
      this.$message.error("导出失败！导出无数据")
      return 
    }
      this.exportexcel.json_fields = {}
      this.controlData[datalistname].scopedSlots.forEach((ee) => {
        if(this.exportexcel.json_fields[ee[1]]!==undefined){
         this.exportexcel.json_fields[ee[1]+ ee[0]]= ee[0]
         ee[0]=ee[1]+ ee[0]
        }else{
        this.exportexcel.json_fields[ee[1]] = ee[0]
        }
      })
      this.exportexcel.title = title
      this.exportexcel.DetailsForm = this.formData[datalistname]
    }`;
    this.methodsfunction[
        'importListView_sys'
    ] = `\n //系统方法 通用通用导入明细方法  \n importListView_sys(datalistname, title){
      this.exportexcel.cotrlid = datalistname
      this.exportexcel.json_fields = {}
      this.controlData[datalistname].scopedSlots.forEach((ee) => {
        if(this.exportexcel.json_fields[ee[1]]!==undefined){
         this.exportexcel.json_fields[ee[1]+ ee[0]]= ee[0]
         ee[0]=ee[1]+ ee[0]
        }else{
        this.exportexcel.json_fields[ee[1]] = ee[0]
        }
      })
      this.exportexcel.json_fields['fid'] = 'fid'
      this.exportexcel.title = title
      this.exportexcel.DetailsForm = this.formData[datalistname]
      this.$refs.fileExcel.click()
    }`;
    this.methodsfunction[
        'commonimport_sys'
    ] = `\n //系统方法 通用通用导入明细方法  \n commonimport_sys(e){
      const { files } = e.target
      if (files.length <= 0) {
        return
      } else if (!/.(xls|xlsx)$/.test(files[0].name.toLowerCase())) {
        this.$message.warning('上传格式不正确，请上传xls或xlsx格式')
        return
      } else {
        this.fileName = files[0].name // 拿到excel文件名
      }
      const fileReader = new FileReader()
      fileReader.onload = (ev) => {
        try {
          // console.log(ev);
          const data = ev.target.result
          const workbook = this.$XLSX.read(data, { type: 'binary' })

          // console.log(workbook);
          const wsname = workbook.SheetNames[0]
          workbook.Sheets[wsname]['!ref'] = workbook.Sheets[wsname][
            '!ref'
          ].replace('A1:', 'A2:')
          const ws = this.$XLSX.utils.sheet_to_json(workbook.Sheets[wsname], 2)
          if (ws.length > 0) {
            let isEorr = false
            for (let key in this.exportexcel.json_fields) {
              if (ws[0][key] === undefined) {
                isEorr = true
                break
              }
            }
            if (isEorr) {
              this.$message.error('导入xls的模板不正确，请先下载对应模板！')
            }
          }
          for (let i = 0; i < ws.length; i++) {
            if (ws[i].fid !== undefined) {
              const listviewlist = kylinjson.kylinjson({
                path: "$.[?(@.fid=='" + ws[i].fid + "')]",
                json: this.formData[this.exportexcel.cotrlid],
               key:
      'Aq1UtHWTr1/ewrWt/SydI1JcUWosyNypSb1S8QwheZPIrrP2Zo6vJ6rkYyEJhxzSH6L/aXHH7UKgGPfgjBlfYHRbVVnsgfTrxf1bEn2JrdOa8APf1/VsHCYfjOJFEKMhFP7QDA3mb4NxHJ61+hvfI821rd0QQi9Bz/XXJyjpzSM=',
              })
              if (listviewlist.length > 0) {
                listviewlist[0] = this.getexcelrow_sys(ws[i])
              } else {
                this.formData[this.exportexcel.cotrlid].push(
                  this.getexcelrow_sys(ws[i])
                )
              }
            } else {
              this.formData[this.exportexcel.cotrlid].push(
                this.getexcelrow_sys(ws[i])
              )
            }
          }

          // console.log(ws) // 文件中的数据都在这json格式
        } catch (error) {}
      }
      fileReader.readAsBinaryString(files[0])
    }`;
    this.methodsfunction[
        'getexcelrow_sys'
    ] = `\n //系统方法 通用通用导入明细方法  \n getexcelrow_sys(obj){
      let rowobj = {}
      for (let key in this.exportexcel.json_fields) {
        rowobj[this.exportexcel.json_fields[key]] = obj[key]
      }
      return rowobj
    }`;
    this.methodsfunction[
        'addGridlist_sys'
    ] = `\n //系统方法 列表新增方法  \n addGridlist_sys(controlId,fromid){
    if(fromid===undefined||fromid===''||fromid===null){
      this.$message.error("找不到表单信息！");
    }
    this.fromdialog.loaddata=this[ 'load' + controlId + '_sys']
    this.fromdialog.selectId=''
    this.$refs.reffromdialog.opendialog(fromid,'')
     }`;
    this.methodsfunction[
        'updateGridlist_sys'
    ] = `\n //系统方法 列表新增方法  \n updateGridlist_sys(controlId,fromid,rowdata){
      if(fromid===undefined||fromid===''||fromid===null){
        this.$message.error("找不到表单信息！");
      }
      this.fromdialog.loaddata=this[ 'load' + controlId + '_sys']
      this.$refs.reffromdialog.opendialog(fromid,rowdata.fid)
       }`;
    this.methodsfunction[
        'delGridlist_sys'
    ] = `\n //系统方法 删除行方法 \n delGridlist_sys(controlId,rowdata){
        this.$confirm('确定删除，删除后将无法恢复, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.$apiComm(this.controlData[controlId].tablename+".deleteInfo", {body:{fid:rowdata.fid}}).then(res => {
              if (res.code !== 0) {
                  this.$message.error(res.msg);
              }
              this[ 'load' + controlId + '_sys']()
              this.$message.success("保存成功！")
          });

        });

       }`;
    this.methodsfunction[
        'submitData_sys'
    ] = `\n //系统方法 通用提交保存方法 \n  submitData_sys() {
    // console.log(JSON.stringify(this.formData))
    // return
    this.$refs['elForm'].validate(valid => {
        if (!valid) return
        const param = {
            body: { ...this.formData,$fromid:this.fromid }
        };
        ${this.beforesubmitcode}
        this.$message.success("提交内容："+JSON.stringify(param))
        // this.$apiComm("${this.fromTableName
        }.SaveDataInfo", param).then(res => {
        //     if (res.code !== 0) {
        //         this.$message.error(res.msg);
        //     }
        //     if(typeof this.dialogclose ==='function'){
        //       this.dialogclose(true)
        //     }
        //     this.$message.success("保存成功！")
        // });
    })
}`;
    this.methodsfunction[
        'addListViewRow_sys'
    ] = `\n //系统方法 通用添加明细行方法 \n  addListViewRow_sys(datalistname) {
    var newrowobj={}
    this.controlData[datalistname].scopedSlots.forEach(ee=>{
newrowobj[ee[0]]="";
    })
    this.formData[datalistname].push(newrowobj);
}`;
    this.methodsfunction[
        'delListViewRow_sys'
    ] = `\n //系统方法 通用删除明细方法 \n  delListViewRow_sys(datalistname,rows) {
     if(rows.fid!==undefined && rows.fid!==""){
        this.formData["del"+datalistname].push(rows.fid);
    }
    this.formData[datalistname].splice(this.formData[datalistname].indexOf(rows),1);

}`;

    this.methodsfunction[
        'getTableNewId_sys'
    ] = `\n //系统方法 判断url是否传入ID，如果传入给各个控件赋值 \n  getTableNewId_sys() {
    ${this.loaddatabeforecode}
  const tablefid =this.$query('tablefid');
    let newbusinessid=this.businessid;
    if(tablefid!==null&&tablefid!==''){
        newbusinessid=tablefid;
    }
if(newbusinessid!==null&&newbusinessid!==undefined &&newbusinessid.trim()!==""&&newbusinessid.trim()!=="0"){
this.formData.$tableNewId=newbusinessid;
const param = {
    body: {fid:newbusinessid},
};
this.$apiComm("${this.fromTableName}.getDataInfo",param).then(res=>{
if(res.code===0){
  this.isedit=true
for(let key in this.formData){
if(res.data[key]!==undefined&&res.data[key]!==null){
if(typeof(res.data[key])==="string"&& ((res.data[key].indexOf("[")>=0&&res.data[key].indexOf("]")>=0)||(res.data[key].indexOf("{")>=0&&res.data[key].indexOf("}")>=0))){
try { this.formData[key]=JSON.parse(res.data[key]) } catch {
this.formData[key]=res.data[key];
}
}else{
this.formData[key]=res.data[key];
}
}
${this.loaddataaftercode}
}
}
})
}else{
  ${this.loaddataaftercode}
    // this.$getNewId().then(res=>{
    //     if(res.code===0){
    //       ${this.adddataCode.join('\n')}
    //       this.formData.$tableNewId=res.data
    //     }
    // })
}
}`;
    this.methodsfunction['goBack_sys'] = `\n//系统方法返回\n goBack_sys() {
history.go(-1)
}`;
    this.methodsfunction[
        'funmounted_sys'
    ] = `\n //系统方法页面加载方法 \n funmounted_sys(){
    if( this.deviceMode !=='dialog'){
      const docWidth = document.body.clientWidth\n
        if (docWidth < 1024) {\n
          this.deviceMode = 'Mobile'\n
        } else {\n
          this.deviceMode = 'pc'\n
        }
    }
  this.getTableNewId_sys(); ///解决手机端 文本框输入时被键盘挡住问题 \n  const clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
  window.addEventListener('resize', () => {
    if( this.deviceMode !=='dialog'){
      const docWidth = document.body.clientWidth\n
        if (docWidth < 1024) {\n
          this.deviceMode = 'Mobile'\n
        } else {\n
          this.deviceMode = 'pc'\n
        }
    }
const nowClientHeight = document.documentElement.clientHeight || document.body.clientHeight;
if (clientHeight - nowClientHeight > 60 ) {//因为ios有自带的底部高度
//键盘弹出的事件处理
if(document.getElementById("maincontent")!==null){
document.getElementById("maincontent").classList.add("focusState");
}
}
else if(document.getElementById("maincontent")!==null){//键盘收起的事件处理
document.getElementById("maincontent").classList.remove("focusState");
}
})
${this.initfunstr}}`;
};
BuildFrom.prototype.getcss = function () {
    return $('#commoncss')
        .html()
        .replace(/data-v-1fc0fehfff/g, this.cortorlid);
};
BuildFrom.prototype.recombinationDetailFrom = function (columns) {
    var listfromlable = [];
    columns.forEach((ee) => {
        var lablekey =
            Date.parse(new Date()) + '_' + Math.ceil(Math.random() * 99999);
        let filed = ee.options.filed;
        switch (ee.type) {
            case 'datarelevance':
                filed = ee.options.filed + '_text';
                break;
            default:
                filed = ee.options.filed;
                break;
        }
        listfromlable.push({
            type: 'fromlable',
            name: ee.name,
            icon: ee.icon,
            isShowCheck: true,
            isShowSpanSetting: true,
            dragType: 'control',
            title: ee.title,
            key: lablekey,
            model: 'fromlable_' + lablekey,
            options: {
                filed: filed,
                labelwidth: ee.options.labelwidth,
                defaultValue: ee.options.defaultValue,
                lg: ee.options.lg,
                md: ee.options.md,
                xs: ee.options.xs,
                titleRow: ee.options.titleRow,
                tagattr: ee.options.tagattr,
                titlecolor: '',
            },
        });
    });
    return listfromlable;
};
BuildFrom.prototype.setfromData = function (options, type, title, $this) {
    switch (type) {
        case 'listview':
            this.readDataPermission[$this.model] =
                options.ishide === true ? false : true;
            this.writeDataPermission[$this.model] = true;
            this.listviewfromData(options, title, $this);
            // var detailfrominfo = JSON.parse(JSON.stringify(this.defaultfromInfo))
            // detailfrominfo.formName = title
            // detailfrominfo.formCode = title
            // detailfrominfo.designType = '/buildpublish.html'
            // detailfrominfo.fromTableName = options.controlId
            // detailfrominfo.layoutitemlist[0].widgetForm.list[0].title = ''

            // detailfrominfo.layoutitemlist[0].widgetForm.list[0].columns[0].list = this.recombinationDetailFrom(
            //   options.columns
            // )
            // this.detailfromInfo[options.controlId] = detailfrominfo
            break;
        case 'gridlist':
            this.readDataPermission[$this.model] =
                options.ishide === true ? false : true;
            this.writeDataPermission[$this.model] = true;
            this.gridlistfromData(options, title, $this);
        case 'upFilesComp':
            if (options.filed != undefined) {
                this.readDataPermission[$this.model] =
                    options.ishide === true ? false : true;
                this.writeDataPermission[$this.model] = true;
                this.modelfiled[$this.model] = options.filed;
                if (this.formData[options.filed] == undefined) {
                    this.formData[options.filed] = [];
                }
            }
            break;
        case 'user':
        case 'organ':
        case 'department':
        case 'role':
            if (options.filed != undefined) {
                this.readDataPermission[$this.model] =
                    options.ishide === true ? false : true;
                this.writeDataPermission[$this.model] = true;
                this.modelfiled[$this.model] = options.filed;
                if (this.formData[options.filed] == undefined) {
                    this.formData[options.filed] = { text: '', value: [] };
                }
            }
            break;
        case 'select':
        case 'checkbox':
        case 'radio':
            if (options.filed != undefined) {
                this.readDataPermission[$this.model] =
                    options.ishide === true ? false : true;
                this.writeDataPermission[$this.model] = true;
                this.modelfiled[$this.model] = options.filed;
                if (options.defaultValue != undefined) {
                    this.formData[options.filed] = options.defaultValue;
                } else {
                    this.formData[options.filed] = '';
                }
            }
            if (options.isRemote) {
                this.buildloaddata(options, false, title);
            } else {
                this.controlData[options.filed] = options.options;
            }
            break;
        case 'autonumber':
            if (options.filed != undefined) {
                this.readDataPermission[$this.model] =
                    options.ishide === true ? false : true;
                this.writeDataPermission[$this.model] = true;
                this.modelfiled[$this.model] = options.filed;
                if (options.defaultValue != undefined) {
                    this.formData[options.filed] = options.defaultValue;
                } else {
                    this.formData[options.filed] = '';
                }
            }
            this.adddataCode.push(
                `this.$refs.autono${options.filed}.getmodelcode();`
            );
            break;
        case 'datarelevance':
            if (options.filed != undefined) {
                this.readDataPermission[$this.model] =
                    options.ishide === true ? false : true;
                this.writeDataPermission[$this.model] = true;
                this.modelfiled[$this.model] = options.filed;
                if (options.defaultValue != undefined) {
                    this.formData[options.filed] = options.defaultValue;
                    this.formData[options.filed + '_text'] = '';
                } else {
                    this.formData[options.filed] = '';
                    this.formData[options.filed + '_text'] = '';
                }
            }
            this.builddatarelevance(options, title);
            break;
        default:
            if (options.filed != undefined) {
                this.readDataPermission[$this.model] =
                    options.ishide === true ? false : true;
                this.writeDataPermission[$this.model] = true;
                this.modelfiled[$this.model] = options.filed;
                if (options.defaultValue != undefined) {
                    this.formData[options.filed] = options.defaultValue;
                } else {
                    this.formData[options.filed] = '';
                }
            }
            break;
    }
    if (type !== 'listview') {
        this.rules[options.filed] = [];
        if (options.ruleslist != undefined) {
            this.rules[options.filed] = JSON.parse(JSON.stringify(options.ruleslist));
        }
        if (options.required) {
            this.rules[options.filed].push({
                required: true,
                message: title + '必填',
                trigger: 'blur',
            });
        }
    }
    return '';
};
BuildFrom.prototype.setReadData = function (model, ishide) {
    this.readDataPermission[model] = ishide === true ? false : true;
    return '';
};
///关联列表查询控件 组装
BuildFrom.prototype.gridlistfromData = function (options, title, $this) {
    if (options.controlId != undefined) {
        if (this.formData[options.controlId] == undefined) {
            this.formData[options.controlId] = [];
            //if (options.sourceApi != undefined && options.sourceApi != '' && options.sourceApi.indexOf('/') < 0) {
            this.controlData[options.controlId] = {};
            if (options.sourceApi !== undefined && options.sourceApi !== '') {
                this.controlData[options.controlId][
                    'tablename'
                ] = options.sourceApi.split('.')[0];
            }
            this.controlData[options.controlId]['queryparam'] = {};
            this.controlData[options.controlId]['scopedSlots'] = [];
            this.controlData[options.controlId]['pagination'] =
                options.isPage == true
                    ? {
                        currnet: 1,
                        total: 0,
                        pagesize: 10,
                        isloading: false,
                    }
                    : {};
            for (var i = 0; i < options.columns.length; i++) {
                var columnitem = options.columns[i];
                if (columnitem.isScopedSlots) {
                    this.controlData[options.controlId].scopedSlots.push([
                        columnitem.options.filed,
                        columnitem.options.title,
                    ]);
                }
            }
            this.methodsfunction[
                'load' + options.controlId + '_sys'
            ] = `\n //关联列表查询控件[${title}]查询数据方法 \n load${options.controlId +
            '_sys'}(page){
    console.log(page);
    const param = {
        body: {
          ${this.WhereBuild(
                options.wherelist,
                true,
                `load${options.controlId + '_sys'}`
            )}
        }
      };
      ${options.isPage == true
                    ? `    param.body.page=page;
      param.body.rows=this.controlData.${options.controlId
                    }.pagination.pagesize;`
                    : ''
                }
      this.controlData.${options.controlId}.pagination.isloading=true;
      this.$apiComm("${options.sourceApi}",param).then(res=>{
        this.controlData.${options.controlId}.pagination.isloading=false;
          if(res.code!==0){
              this.$message.error(res.msg);
              return;
          }
          this.formData.${options.controlId}=res.data.list;
          ${options.isPage == true
                    ? `  this.controlData.${options.controlId
                    }.pagination.isloading=false;
              this.controlData.${options.controlId
                    }.pagination.total=res.totalcount;`
                    : ''
                }
        });
  }`;
            if (options.isPage == true) {
                this.handleTableChange(options.controlId, options.sourceApi);
            }
            this.initfunstr =
                this.initfunstr + `this.load${options.controlId}_sys();`;
        }
    }
};
BuildFrom.prototype.handleTableChange = function (controlId, sourceApiId) {
    var handlefunname = `${controlId}handleTableChange_sys`;
    var showSizefunname = `${controlId}showSizeChange_sys`;
    if (this.methodsfunction[handlefunname] == undefined) {
        this.methodsfunction[
            handlefunname
        ] = `${controlId}handleTableChange_sys(pagination) {
                                          this.load${controlId}_sys(pagination)
                                      }`;
    }
    if (this.methodsfunction[showSizefunname] == undefined) {
        this.methodsfunction[
            showSizefunname
        ] = `${controlId}showSizeChange_sys(page, pageSize) {
    this.controlData.${controlId}.pagination.pagesize=pageSize;
                                          this.load${controlId}_sys(1)
                                      }`;
    }
    return '';
};
///生成数据关联控件
BuildFrom.prototype.builddatarelevance = function (options, title) {
    // if (options.wherelist !== undefined && options.wherelist.length > 0) {
    this.methodsfunction[
        'queryparam' + options.filed + '_sys'
    ] = `\n//数据关联控件[${title}]查询查询参数方法 \n queryparam${options.filed
    }_sys(datarow){
          console.log(datarow);
          const param = {
            ${this.WhereBuild(options.wherelist)}
            };
        return param;
        }`;
    // }
    // if (
    //   options.assignFiledList !== undefined &&
    //   options.assignFiledList.length > 0
    // ) {
    this.methodsfunction[
        'assign' + options.filed + '_sys'
    ] = `\n//数据关联控件[${title}]选择控件后 \n assign${options.filed
    }_sys(data,datarow){
    console.log(datarow);
    ${this.AssignBuild(options.assignFiledList)}

  }`;
    // }
    this.controlData[options.filed] = options.filedList;
};
///生成传入查询参数
BuildFrom.prototype.WhereBuild = function (
    wherelist,
    iswatch,
    funname,
    islistview,
    gridid
) {
    var wherecode = '';
    var watchitem = {}; ////监听属性  如果明细列表设置条件过滤 有设置明细列表中的条件 那以明细列表中的字段改变 查询或者搜索 如果明细字段都是非明细字段查询的  那就要监听所有过滤条件 而过滤
    var watchdetaillist = {};
    var watchdetailfiledlist = {};
    var iswatchdetaillist = false;
    wherelist.forEach((ee) => {
        if (
            ee.filed !== '' &&
            ee.value !== '' &&
            ee.filed !== undefined &&
            ee.value !== undefined
        ) {
            switch (ee.variabletype) {
                case 1:
                    if (ee.value.indexOf('.') < 0) {
                        wherecode = wherecode + ` ${ee.filed}:this.formData.${ee.value},`;
                    } else {
                        let filed = ee.value.split('.');
                        wherecode =
                            wherecode +
                            ` ${ee.filed}:datarow!==undefined? datarow.${filed[1]
                            }:undefined,`;
                    }
                    if (iswatch) {
                        if (ee.value.indexOf('.') < 0) {
                            if (watchitem[`formData.${ee.value}`] === undefined) {
                                watchitem[`formData.${ee.value}`] = [];
                            }
                            watchitem[`formData.${ee.value}`].push(`this.${funname}();`);
                        } else {
                            iswatchdetaillist = true;
                            let filed = ee.value.split('.');
                            this.watchdetailfiled[filed[1]] = '';
                            if (watchdetaillist[`formData.${filed[0]}`] === undefined) {
                                watchdetaillist[`formData.${filed[0]}`] = [];
                            }
                            watchdetaillist[`formData.${filed[0]}`].push(
                                `  this.watchdetailfiled.${filed[1]}=newVal[this.selectindex].${filed[1]
                                };`
                            );
                            if (
                                watchdetailfiledlist[`watchdetailfiled.${filed[1]}`] ===
                                undefined
                            ) {
                                watchdetailfiledlist[`watchdetailfiled.${filed[1]}`] = [];
                            }
                            watchdetailfiledlist[`watchdetailfiled.${filed[1]}`].push(
                                `   this.${funname}(this.formData.${filed[0]
                                }[this.selectindex]);`
                            );
                        }
                    }
                    break;
                case 2:
                    wherecode =
                        wherecode + ` ${ee.filed}:'${ee.value.replace("'", '"')}',`;
                    break;
                case 3:
                    wherecode =
                        wherecode +
                        ` ${ee.filed}:this.$query('${ee.value.replace("'", '"')}'),`
                    break;
                case 4:
                    wherecode = wherecode + ` ${ee.filed}:this.${ee.value},`;
                    break;
            }
        }
    });
    if (iswatchdetaillist === true) {
        watchitem = {};
    }

    if (islistview === true && JSON.stringify(watchdetaillist) === '{}') {
        watchdetaillist[`formData.${gridid}`] = [];
        watchdetaillist[`formData.${gridid}`].push(
            `  this.${funname}(newVal[this.selectindex]);`
        );
    }
    for (var key in watchitem) {
        this.watchfunction[key] = `'${key}'(){$$##$$}`;
        if (this.watchfunctionContext[key] !== undefined) {
            this.watchfunctionContext[key] = this.watchfunctionContext[key].concat(
                watchitem[key]
            );
        } else {
            this.watchfunctionContext[key] = watchitem[key];
        }
    }
    for (var key in watchdetaillist) {
        this.watchfunction[key] = `'${key}':{
      deep:true,
      handler:function(newVal){
        if(this.selectproperty!==undefined&&this.selectindex!==undefined){
        if(newVal[this.selectindex]!==undefined&&newVal[this.selectindex][this.selectproperty]!==undefined){$$##$$}
        }
      }
    }`;
        if (this.watchfunctionContext[key] !== undefined) {
            this.watchfunctionContext[key] = this.watchfunctionContext[key].concat(
                watchdetaillist[key]
            );
        } else {
            this.watchfunctionContext[key] = watchdetaillist[key];
        }
    }
    for (var key in watchdetailfiledlist) {
        this.watchfunction[key] = `'${key}'(){$$##$$}`;
        if (this.watchfunctionContext[key] !== undefined) {
            this.watchfunctionContext[key] = this.watchfunctionContext[key].concat(
                watchdetailfiledlist[key]
            );
        } else {
            this.watchfunctionContext[key] = watchdetailfiledlist[key];
        }
    }
    if (wherecode.length > 0) {
        return wherecode.substring(0, wherecode.length - 1);
    } else {
        return '';
    }
};
///生成下拉列表过滤条件方法
BuildFrom.prototype.WhereBuildDownList = function (wherelist, datafiled) {
    if (wherelist.length === 0 || wherelist === undefined) {
        return 'return this.controlData.' + datafiled + ';';
    }
    let wherecode =
        'let newoptionslist=[]; this.controlData.' + datafiled + '.forEach(ee => {';
    let whereitemcodelist = [];
    wherelist.forEach((ee) => {
        if (
            ee.filed !== '' &&
            ee.value !== '' &&
            ee.filed !== undefined &&
            ee.value !== undefined
        ) {
            switch (ee.variabletype) {
                case 1:
                    if (ee.value.indexOf('.') < 0) {
                        whereitemcodelist.push(
                            `ee.${ee.filed}.indexOf(this.formData.${ee.value
                            })>=0||this.formData.${ee.value}===''||this.formData.${ee.value
                            }===undefined||this.formData.${ee.value}===null`
                        );
                    } else {
                        let filed = ee.value.split('.');
                        whereitemcodelist.push(
                            `ee.${ee.filed}.indexOf(datarow.${filed[1]})>=0||datarow.${filed[1]
                            }===''||datarow.${filed[1]}===undefined||datarow.${filed[1]
                            }===null`
                        );
                    }
                    break;
                case 2:
                    whereitemcodelist.push(
                        ` ee.${ee.filed}==='${ee.value.replace("'", '"')}'`
                    );
                    break;
                case 3:
                    whereitemcodelist.push(
                        `@.${ee.filed}==\\"\"+this.$query('${ee.value.replace("'", '"')}')+\"\\"`
                      )
                    break;
                case 4:
                    whereitemcodelist.push(`  ee.${ee.filed}===this.${ee.value}`);
                    break;
            }
        }
    });
    wherecode =
        wherecode +
        '\r\n if(' +
        whereitemcodelist.join('&&') +
        '){newoptionslist.push(ee)}});\r\n return newoptionslist;';
    return wherecode;
};

///生成赋值规则函数
BuildFrom.prototype.AssignBuild = function (assignlist) {
    var assigncode = '';
    assignlist.forEach((ee) => {
        if (
            ee.filed !== '' &&
            ee.value !== '' &&
            ee.filed !== undefined &&
            ee.value !== undefined
        ) {
            if (ee.value.indexOf('.') < 0) {
                assigncode =
                    assigncode +
                    `this.formData.${ee.value}=data===undefined?undefined:data.${ee.filed
                    };`;
            } else {
                let filed = ee.value.split('.');
                assigncode =
                    assigncode +
                    `datarow.${filed[1]}=data===undefined?undefined:data.${ee.filed};`;
            }
        }
    });
    return assigncode;
};
///生成查询关联控件
BuildFrom.prototype.buildqueryrelevance = function (element, islistview) {
    this.methodsfunction['load' + element.model + '_sys'] = `\n //查询关联控件[${element.title
        }]查询数据方法 \n load${element.model + '_sys'}(datarow){
    const param = {
        body: {
          ${this.WhereBuild(
            element.options.wherelist,
            true,
            `load${element.model + '_sys'}`,
            islistview,
            element.gridid
        )}
        }
      };
      this.$apiComm("${element.options.sourceApi}",param).then(res=>{
          if(res.code!==0){
              this.$message.error(res.msg);
              return;
          }
          if(res.data.list.length>0){
              this.assign${element.model}_sys(res.data.list[0],datarow)
          }else{
              this.assign${element.model}_sys(undefined,datarow)
          }
        });
  }`;
    this.methodsfunction['assign' + element.model + '_sys'] = `\n//查询关联控件[${element.title
        }]查询数据后赋值方法 \n assign${element.model + '_sys'}(data,datarow){
    ${this.AssignBuild(element.options.assignFiledList)}
  }`;
    ////如果没有监控明细列
    if (islistview != true) {
        this.initfunstr = this.initfunstr + `this.load${element.model}_sys();`;
    }
    return '';
};
///生成操作数据控件
BuildFrom.prototype.buildoperatedata = function (element, islistview) {
    this.methodsfunction['load' + element.model + '_sys'] = `\n //操作数据控件[${element.title
        }]操作数据控件 \n load${element.model + '_sys'}(datarow){
    const param = {
        body: {
          ${this.WhereBuild(
            element.options.wherelist,
            true,
            `load${element.model + '_sys'}`,
            islistview,
            element.gridid
        )}
        }
      };
      this.$apiComm("${element.options.sourceApi}",param).then(res=>{
          if(res.code!==0){
              this.$message.error(res.msg);
              return;
          }
          if(res.data.list.length>0){
              this.assign${element.model}_sys(res.data.list[0],datarow)
          }else{
              this.assign${element.model}_sys(undefined,datarow)
          }
        });
  }`;
    this.methodsfunction['assign' + element.model + '_sys'] = `\n//操作数据控件[${element.title
        }]操作数据控件后赋值方法 \n assign${element.model + '_sys'}(data,datarow){
    ${this.AssignBuild(element.options.assignFiledList)}
  }`;
    ////如果没有监控明细列
    if (islistview != true) {
        this.initfunstr = this.initfunstr + `this.load${element.model}_sys();`;
    }
    return '';
};

BuildFrom.prototype.buildloaddata = function (options, islistview, title) {
    this.methodsfunction[
        'load' + options.filed + '_sys'
    ] = `\n ///【${title}】加载选项方法\n load${options.filed}_sys(){
    const param = {
      body: {},
      };
      this.$apiComm("${options.sourceApi}",param).then(res=>{
        if(res.code!=0){
        this.$message.error(res.msg);
        return;
        }
        this.controlData.${options.filed}=res.data.list
        });
  }`;
    // if (islistview !== true) {
    this.initfunstr = this.initfunstr + `this.load${options.filed}_sys();`;
    // }

    this.methodsfunction[options.filed + 'where_sys'] =
        options.filed +
        'where_sys(datarow){' +
        this.WhereBuildDownList(options.wherelist, options.filed) +
        '}';
    // this.WhereBuildDownList(options.wherelist, options.filed)
    this.controlData[options.filed] = [];
};
///生成下拉列表，单选，多选，关联数据，查询数据的动态数据绑定代码 入口
BuildFrom.prototype.setlistviewfromItemData = function (columnitem, $this) {
    switch (columnitem.type) {
        case 'select':
        case 'checkbox':
        case 'radio':
            ///生成单选多选方法
            if (columnitem.options.isRemote) {
                this.buildloaddata(columnitem.options, true, columnitem.title);
            } else {
                this.controlData[columnitem.options.filed] = columnitem.options.options;
            }
            break;
        case 'datarelevance':
            this.builddatarelevance(columnitem.options, columnitem.title);
            break;
        case 'queryrelevance':
            this.buildqueryrelevance(columnitem, true);
            break;
        case 'operatedata':
            this.buildoperatedata(columnitem, true);
            break;
        default:
            break;
    }
};

///子表fromdata 组装
BuildFrom.prototype.listviewfromData = function (options, title, $this) {
    if (options.controlId != undefined) {
        if (this.formData[options.controlId] == undefined) {
            this.formData[options.controlId] = [];
            this.formData['del' + options.controlId] = [];
            //if (options.sourceApi != undefined && options.sourceApi != '' && options.sourceApi.indexOf('/') < 0) {
            this.controlData[options.controlId] = {};
            this.controlData[options.controlId]['queryparam'] = {};
            this.controlData[options.controlId]['scopedSlots'] = [];
            this.controlData[options.controlId]['pagination'] = {};
            for (var i = 0; i < options.columns.length; i++) {
                var columnitem = options.columns[i];
                // if (columnitem.isScopedSlots) {
                this.controlData[options.controlId].scopedSlots.push([
                    columnitem.options.filed,
                    columnitem.options.title,
                ]);
                if (columnitem.type === 'datarelevance') {
                    this.controlData[options.controlId].scopedSlots.push([
                        columnitem.options.filed + '_text',
                        columnitem.options.title + '显示值',
                    ]);
                }
                // }
                if (
                    columnitem.options != null &&
                    columnitem.options.filed != '' &&
                    columnitem.options.filed != undefined
                ) {
                    this.readDataPermission[columnitem.model] =
                        columnitem.options.ishide === true ? false : true;
                    this.writeDataPermission[columnitem.model] = true;
                    this.modelfiled[columnitem.model] = columnitem.options.filed;
                    this.rules[columnitem.options.filed] = [];
                    if (columnitem.options.ruleslist != undefined) {
                        this.rules[columnitem.options.filed] = JSON.parse(
                            JSON.stringify(columnitem.options.ruleslist)
                        );
                    }
                    if (columnitem.options.required == true) {
                        this.rules[columnitem.options.filed].push({
                            required: true,
                            message: columnitem.title + '必填',
                            trigger: 'blur',
                        });
                    }
                }
                this.setlistviewfromItemData(columnitem, $this);
            }
            this.methodsfunction[
                'load' + options.controlId + '_sys'
            ] = `\n//子表[${title}]数据加载事件 \n load${options.controlId +
            '_sys'}(){
      if(this.formData.$tableNewId!=null&&this.formData.$tableNewId!=""){
      const param = {
      body: {$tableNewId:this.formData.$tableNewId},
      };
      this.$apiComm("${options.controlId}.querylist",param).then(res=>{
      if(res.code!=0){
      this.$message.error(res.msg);
      return;
      }
      this.formData.${options.controlId}=res.data.list
      });
      }
      }`;
            this.methodsfunction[
                options.controlId + 'rowclick_sys'
            ] = `\n//子表[${title}]单机行事件 \n ${options.controlId
            }rowclick_sys(rows,column,event){ this.selectproperty=column===undefined?undefined:column.property; this.selectindex=this.formData.${options.controlId
                }.indexOf(rows);} `;
            this.initfunstr =
                this.initfunstr + `this.load${options.controlId}_sys();`;
        }
    }
};
//生成事件方法
BuildFrom.prototype.buildEvent = function (element, isMobile) {
    var eventcode = '';
    if (element.options.eventlist == undefined) {
        return eventcode;
    }
    for (var i = 0; i < element.options.eventlist.length; i++) {
        let value = element.options.eventlist[i].value;
        let label = element.options.eventlist[i].label;
        if (isMobile === true) {
            value = value.replace('scope.row', 'rowitem');
        }
        if (value != '' && value != undefined) {
            eventcode = eventcode + ' @' + label + '="' + value + '"';
            if (value.indexOf('(') < 0) {
                if (this.methodsfunction[value] == undefined) {
                    this.methodsfunction[value] =
                        '\n // [' + element.options.title + element.eventlist[i] ===
                            undefined
                            ? ''
                            : label + ']事件方法 \n' + value + '() { }';
                } else {
                    this.methodsfunction[funname] =
                        '\n // [' +
                        element.title +
                        label +
                        ']事件方法 \n' +
                        methodsfunction[funname];
                }
            } else {
                var funname = value;
                funname = funname.substring(0, value.indexOf('('));
                if (this.methodsfunction[funname] == undefined) {
                    var funparamstr = value
                        .replace(funname + '(', '')
                        .replace(')', '')
                        .split(',');
                    var funname = funname + '(';
                    if (funparamstr[0] != '') {
                        for (var idex = 0; idex < funparamstr.length; idex++) {
                            if (idex == 0) {
                                funname = funname + 'param' + idex;
                            } else {
                                funname = funname + ',param' + idex;
                            }
                        }
                    }
                    funname = funname + ')';
                    this.methodsfunction[funname] =
                        '\n // [' +
                        element.options.title +
                        label +
                        ']事件方法 \n' +
                        funname +
                        '{ }';
                } else {
                    this.methodsfunction[funname] =
                        '\n // [' +
                        element.options.title +
                        label +
                        ']事件方法 \n' +
                        this.methodsfunction[funname];
                }
            }
        }
    }
    return eventcode;
};
BuildFrom.prototype.getParentControlId = function (element) {
    const listviewlist = kylinjson.kylinjson({
        path: "$..options.columns[?(@.type=='listview')]",
        json: this.formInfo,
        key:
            'Aq1UtHWTr1/ewrWt/SydI1JcUWosyNypSb1S8QwheZPIrrP2Zo6vJ6rkYyEJhxzSH6L/aXHH7UKgGPfgjBlfYHRbVVnsgfTrxf1bEn2JrdOa8APf1/VsHCYfjOJFEKMhFP7QDA3mb4NxHJ61+hvfI821rd0QQi9Bz/XXJyjpzSM=',
    });
    for (let i = 0; i < listviewlist.length; i++) {
        let findresult = kylinjson.kylinjson({
            path: "$...options.columns[?(@.model=='" + element.model + "')]",
            json: listviewlist[i],
            key:
                'Aq1UtHWTr1/ewrWt/SydI1JcUWosyNypSb1S8QwheZPIrrP2Zo6vJ6rkYyEJhxzSH6L/aXHH7UKgGPfgjBlfYHRbVVnsgfTrxf1bEn2JrdOa8APf1/VsHCYfjOJFEKMhFP7QDA3mb4NxHJ61+hvfI821rd0QQi9Bz/XXJyjpzSM=',
        });
        if (findresult.length > 0) {
            return listviewlist[i].options.controlId;
        }
    }
    return '';
};
BuildFrom.prototype.getrowcontrolcss = function (element) {
    var cssstr = 'padding:0px';
    cssstr =
        cssstr +
        (this.minheight.indexOf(element.type + ',') == 0 ? 'min-height:42px' : '');
    cssstr =
        cssstr + this.dynamicheight.indexOf(element.type + ',') >= 0
            ? 'height:auto'
            : element.options.rowSpan !== undefined
                ? 'height' + element.options.rowSpan * 42 + 'px'
                : 'height:auto';
    return cssstr;
};
var buildcodeObj = new BuildFrom('buildpublish');

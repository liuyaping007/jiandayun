var vuetemp = {
  data() {
    return {
      formData: {},
      deviceMode: 'Mobile',
      fromdialog: {
        fromid: '',
        selectId: '',
        loaddata: '',
      },
      rules: {},
      exportexcel: {
        DetailsForm: [],
        json_fields: {},
        title: '',
        cotrlid: '',
      },
      controlData: {},
      selectindex: -1,
      isedit: false,
      selectproperty: '',
      modelfiled: {},
      watchdetailfiled: {},
      readDataPermission: {},
      writeDataPermission: {},
      exportexcel: { DetailsForm: [], json_fields: [], title: '' },
    }
  },
  methods: {
    ////系统方法 通用通用导出明细方法
    exportListView_sys(datalistname, title) {
      this.exportexcel.json_fields = {}
      this.controlData[datalistname].scopedSlots.forEach((ee) => {
        this.exportexcel.json_fields[ee[1]] = ee[0]
      })
      this.exportexcel.title = title
      this.exportexcel.DetailsForm = this.formData[datalistname]
      this.formData[datalistname].push(newrowobj)
    },
    ////弹出层模式下 关闭弹层
    fromdialogclose_sys(issave) {
      this.$refs.reffromdialog.clasedialog()
      if (
        issave &&
        this.fromdialog.loaddata !== undefined &&
        typeof this.fromdialog.loaddata === 'function'
      ) {
        this.fromdialog.loaddata()
      }
    },
    ///查询列表的通用添加方法
    addGridlist_sys(controlId, fromid) {
      if (fromid === undefined || fromid === '' || fromid === null) {
        this.$message.error('找不到表单信息！')
      }
      this.fromdialog.loaddata = this['load' + controlId + '_sys']
      this.fromdialog.selectId = ''
      this.$refs.reffromdialog.opendialog(fromid, '')
    },
    ///查询列表的通用修改方法
    updateGridlist_sys(controlId, fromid, rowdata) {
      if (fromid === undefined || fromid === '' || fromid === null) {
        this.$message.error('找不到表单信息！')
      }
      this.fromdialog.loaddata = this['load' + controlId + '_sys']
      this.$refs.reffromdialog.opendialog(fromid, rowdata.fid)
    },
    ///查询列表的通用删除方法
    delGridlist_sys(controlId, rowdata) {
      this.$confirm('确定删除，删除后将无法恢复, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.$apiComm(this.controlData[controlId].tablename + '.deleteInfo', {
          body: { fid: rowdata.fid },
        }).then((res) => {
          if (res.code !== 0) {
            this.$message.error(res.msg)
          }
          this['load' + controlId + '_sys']()
          this.$message.success('保存成功！')
        })
      })
    },
    ///查询列表的通用删除方法
    exportGridlist_sys(controlId, fromid) {},
    ///查询列表的通用删除方法
    importGridlist_sys(controlId, fromid) {},
    ///通用添加明细行方法`
    addListViewRow_sys() {
      var newrowobj = {}
      this.controlData[datalistname].scopedSlots.forEach((ee) => {
        newrowobj[ee] = ''
      })
      this.formData[datalistname].push(newrowobj)
    },
    ////系统方法 通用删除明细方法
    delListViewRow_sys(datalistname, rows) {
      if (rows.fid !== undefined && rows.fid !== '') {
        this.formData['del' + datalistname].push(rows.fid)
      }
      this.formData[datalistname].splice(
        this.formData[datalistname].indexOf(rows),
        1
      )
    },

    ////系统方法 通用通用导入明细方法
    importListView_sys(datalistname, title) {
      this.exportexcel.cotrlid = datalistname
      this.exportexcel.json_fields = {}
      this.controlData[datalistname].scopedSlots.forEach((ee) => {
        this.exportexcel.json_fields[ee[1]] = ee[0]
      })
      this.exportexcel.json_fields['fid'] = 'fid'
      this.exportexcel.title = title
      this.exportexcel.DetailsForm = this.formData[datalistname]
      this.$refs.fileExcel.click()
    }, ////系统方法 通用通用导入明细方法
    commonimport_sys(e) {
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
          const workbook = XLSX.read(data, { type: 'binary' })

          // console.log(workbook);
          const wsname = workbook.SheetNames[0]
          workbook.Sheets[wsname]['!ref'] = workbook.Sheets[wsname][
            '!ref'
          ].replace('A1:', 'A2:')
          const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname], 2)
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
    }, ////系统方法 通用通用导入明细方法
    getexcelrow_sys(obj) {
      let rowobj = {}
      for (let key in this.exportexcel.json_fields) {
        rowobj[this.exportexcel.json_fields[key]] = obj[key]
      }
      return rowobj
    },
    ////后退
    goBack_sys() {
      history.go(-1)
    },
    funmounted_sys() {
      if (this.deviceMode !== 'dialog') {
        const docWidth = document.body.clientWidth
        if (docWidth < 1024) {
          this.deviceMode = 'Mobile'
        } else {
          this.deviceMode = 'pc'
        }
      }
      const clientHeight =
        document.documentElement.clientHeight || document.body.clientHeight
      window.addEventListener('resize', () => {
        if (this.deviceMode !== 'dialog') {
          const docWidth = document.body.clientWidth

          if (docWidth < 1024) {
            this.deviceMode = 'Mobile'
          } else {
            this.deviceMode = 'pc'
          }
        }
        const nowClientHeight =
          document.documentElement.clientHeight || document.body.clientHeight
        if (clientHeight - nowClientHeight > 60) {
          //因为ios有自带的底部高度
          //键盘弹出的事件处理
          if (document.getElementById('maincontent') !== null) {
            document.getElementById('maincontent').classList.add('focusState')
          }
        } else if (document.getElementById('maincontent') !== null) {
          //键盘收起的事件处理
          document.getElementById('maincontent').classList.remove('focusState')
        }
      })
    },
    //系统方法 通用提交保存方法
    submitData_sys() {
      // console.log(JSON.stringify(this.formData))
      // return
      this.$refs['elForm'].validate((valid) => {
        if (!valid) return
        const param = {
          body: {
            ...this.formData,
            $fromid: this.fromid,
          },
        }
        this.$apiComm('.SaveDataInfo', param).then((res) => {
          if (res.code !== 0) {
            this.$message.error(res.msg)
          }
          if (typeof this.dialogclose === 'function') {
            this.dialogclose(true)
          }
          this.$message.success('保存成功！')
        })
      })
    },
    //系统方法 判断url是否传入ID，如果传入给各个控件赋值
    getTableNewId_sys() {
      const tablefid = this.$query('tablefid')
      let newbusinessid = this.businessid
      if (tablefid !== null && tablefid !== '') {
        newbusinessid = tablefid
      }
      if (
        newbusinessid !== null &&
        newbusinessid !== undefined &&
        newbusinessid.trim() !== '' &&
        newbusinessid.trim() !== '0'
      ) {
        this.formData.$tableNewId = newbusinessid
        const param = {
          body: {
            fid: newbusinessid,
          },
        }
        this.$apiComm('.getDataInfo', param).then((res) => {
          if (res.code === 0) {
            this.isedit = true
            for (let key in this.formData) {
              if (res.data[key] !== undefined && res.data[key] !== null) {
                if (
                  typeof res.data[key] === 'string' &&
                  ((res.data[key].indexOf('[') >= 0 &&
                    res.data[key].indexOf(']') >= 0) ||
                    (res.data[key].indexOf('{') >= 0 &&
                      res.data[key].indexOf('}') >= 0))
                ) {
                  try {
                    this.formData[key] = JSON.parse(res.data[key])
                  } catch {
                    this.formData[key] = res.data[key]
                  }
                } else {
                  this.formData[key] = res.data[key]
                }
              }
            }
          }
        })
      } else {
        this.$getNewId().then((res) => {
          if (res.code === 0) {
            this.formData.$tableNewId = res.data
          }
        })
      }
    },
  },
  watch: {},
  props: ['businessid', 'IsPower', 'fromstatus', 'fromid', '$user'],
  mounted() {
    this.funmounted_sys()
  },
}

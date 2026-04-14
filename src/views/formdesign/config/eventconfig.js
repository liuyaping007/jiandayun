export function buildfunction(eventtype, element, funname, isdetail) {
  funname =
    element.options.filed !== undefined ? element.options.filed : funname
  if (element.dataIndex !== undefined || isdetail) {
    return funname + '_' + eventtype + `('${element.dataIndex}',scope.row)`
  }
  return funname + '_' + eventtype + '()'
}
export const cotorlEventConfig = {
  input: [
    {
      label: 'change',
      content: '仅在输入框失去焦点或用户按下回车时触发',
      getfunction(element) {
        return buildfunction(this.label, element)
      }
    },
    {
      label: 'blur',
      content: '在 Input 失去焦点时触发',
      getfunction(element) {
        return buildfunction(this.label, element)
      }
    },
    {
      label: 'focus',
      content: '在 Input 获得焦点时触发',
      getfunction(element) {
        return buildfunction(this.label, element)
      }
    },
    {
      label: 'input',
      content: '在 Input 值改变时触发',
      getfunction(element) {
        return buildfunction(this.label, element)
      }
    },
    {
      label: 'clear',
      content: '在点击由 clearable 属性生成的清空按钮时触发',
      getfunction(element) {
        return buildfunction(this.label, element)
      }
    }
  ],
  textarea: [
    {
      label: 'change',
      content: '仅在输入框失去焦点或用户按下回车时触发',
      getfunction(element) {
        return buildfunction(this.label, element)
      }
    },
    {
      label: 'blur',
      content: '在 Input 失去焦点时触发',
      getfunction(element) {
        return buildfunction(this.label, element)
      }
    },
    {
      label: 'focus',
      content: '在 Input 获得焦点时触发',
      getfunction(element) {
        return buildfunction(this.label, element)
      }
    },
    {
      label: 'input',
      content: '在 Input 值改变时触发',
      getfunction(element) {
        return buildfunction(this.label, element)
      }
    },
    {
      label: 'clear',
      content: '在点击由 clearable 属性生成的清空按钮时触发',
      getfunction(element) {
        return buildfunction(this.label, element)
      }
    }
  ],
  date: [
    {
      label: 'change',
      content: '用户确认选定的值时触发',
      getfunction(element) {
        return buildfunction(this.label, element)
      }
    },
    {
      label: 'blur',
      content: '当 input 失去焦点时触发',
      getfunction(element) {
        return buildfunction(this.label, element)
      }
    },
    {
      label: 'focus',
      content: '当 input 获得焦点时触发',
      getfunction(element) {
        return buildfunction(this.label, element)
      }
    }
  ],
  radio: [
    {
      label: 'change',
      content: '绑定值变化时触发的事件',
      getfunction(element) {
        return buildfunction(this.label, element)
      }
    }
  ],
  checkbox: [
    {
      label: 'change',
      content: '绑定值变化时触发的事件',
      getfunction(element) {
        return buildfunction(this.label, element)
      }
    }
  ],
  buttonitem: [
    {
      label: 'click',
      content: '当单击button时触发',
      getfunction(element, isdetail) {
        const funname =
          String('but' + Date.parse(new Date()) / 1000) +
          Math.ceil(Math.random() * 99999)
        return buildfunction(this.label, element, funname, isdetail)
      }
    },
    {
      label: 'dbclick',
      content: '当双击button时触发',
      getfunction(element, isdetail) {
        const funname =
          String('but' + Date.parse(new Date()) / 1000) +
          Math.ceil(Math.random() * 99999)
        return buildfunction(this.label, element, funname, isdetail)
      }
    },
    {
      label: 'blur',
      content: '当 button 失去焦点时触发',
      getfunction(element, isdetail) {
        const funname =
          String('but' + Date.parse(new Date()) / 1000) +
          Math.ceil(Math.random() * 99999)
        return buildfunction(this.label, element, funname, isdetail)
      }
    },
    {
      label: 'focus',
      content: '当 button 获得焦点时触发',
      getfunction(element, isdetail) {
        const funname =
          String('but' + Date.parse(new Date()) / 1000) +
          Math.ceil(Math.random() * 99999)
        return buildfunction(this.label, element, funname, isdetail)
      }
    }
  ],
  switch: [
    {
      label: 'change',
      content: '当单击时触发',
      getfunction(element) {
        return buildfunction(this.label, element)
      }
    }
  ],
  slider: [
    {
      label: 'change',
      content: '当单击时触发',
      getfunction(element) {
        return buildfunction(this.label, element)
      }
    },
    {
      label: 'input',
      content: '当 input 获得焦点时触发',
      getfunction(element) {
        return buildfunction(this.label, element)
      }
    }
  ],
  colorpicker: [
    {
      label: 'change',
      getfunction(element) {
        return buildfunction(this.label, element)
      }
    },
    {
      label: 'active-change',
      getfunction(element) {
        return buildfunction(this.label, element)
      }
    }
  ],
  editor: [],
  rate: [
    {
      label: 'change',
      getfunction(element) {
        return buildfunction(this.label, element)
      }
    }
  ],
  inputnumber: [
    {
      label: 'change',
      getfunction(element) {
        return buildfunction(this.label, element)
      }
    },
    {
      label: 'focus',
      getfunction(element) {
        return buildfunction(this.label, element)
      }
    },
    {
      label: 'blur',
      getfunction(element) {
        return buildfunction(this.label, element)
      }
    }
  ],
  timepicker: [
    {
      label: 'change',
      getfunction(element) {
        return buildfunction(this.label, element)
      },
      content: '当 input 获得焦点时触发'
    },
    {
      label: 'focus',
      getfunction(element) {
        return buildfunction(this.label, element)
      }
    },
    {
      label: 'blur',
      getfunction(element) {
        return buildfunction(this.label, element)
      }
    }
  ],
  upFilesComp: [],
  listview: [],
  select: [
    {
      label: 'change',
      content: '选中值发生变化时触发',
      getfunction(element) {
        return buildfunction(this.label, element)
      }
    },
    {
      label: 'visible-change',
      getfunction(element) {
        return buildfunction(this.label, element)
      },
      content: '下拉框出现/隐藏时触发'
    },
    {
      label: 'remove-tag',
      getfunction(element) {
        return buildfunction(this.label, element)
      },
      content: '多选模式下移除tag时触发'
    },
    {
      label: 'clear',
      getfunction(element) {
        return buildfunction(this.label, element)
      },
      content: '可清空的单选模式下用户点击清空按钮时触发'
    },
    {
      label: 'blur',
      getfunction(element) {
        return buildfunction(this.label, element)
      },
      content: '当 input 失去焦点时触发'
    },
    {
      label: 'focus',
      getfunction(element) {
        return buildfunction(this.label, element)
      },
      content: '当 input 获得焦点时触发'
    }
  ],
  user: [
    {
      label: 'confirm',
      content: '更改选择人员确定时触发',
      getfunction(element) {
        return buildfunction(this.label, element)
      }
    }
  ],
  department: [
    {
      label: 'confirm',
      content: '更改选择部门确定时触发',
      getfunction(element) {
        return buildfunction(this.label, element)
      }
    }
  ],
  organ: [
    {
      label: 'confirm',
      content: '更改选择机构确定时触发',
      getfunction(element) {
        return buildfunction(this.label, element)
      }
    }
  ],
  role: [
    {
      label: 'confirm',
      content: '更改选择角色确定时触发',
      getfunction(element) {
        return buildfunction(this.label, element)
      }
    }
  ],
  queryrelevance: [
    {
      label: 'selected',
      content: '更改选择关联数据确定时触发',
      getfunction(element) {
        return buildfunction(this.label, element)
      }
    }
  ],
  datarelevance: [
    {
      label: 'confirm',
      content: '更改选择关联数据确定时触发',
      getfunction(element) {
        return buildfunction(this.label, element)
      }
    }
  ]
}

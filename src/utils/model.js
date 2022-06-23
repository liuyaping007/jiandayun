export const validateTel = (rule, value, callback) => {
  console.info('rule:', rule)
  if (!value) {
    callback(new Error('请输入电话号码'))
  } else if (!validate(value)) {
    callback(new Error('请输入正确的11位手机号码'))
  } else {
    callback()
  }
}

const validate = tel => {
  // 校验电话
  if (tel !== '') {
    const strRegex = /^(13|14|15|17|18)\d{9}$/
    if (!strRegex.test(tel)) {
      //  this.$message.error("请输入正确的联系方式！")
      return false
    }
  }
  return true
}

export const validateChildren = (rule, value, callback) => {
  console.info('rule:', rule)
  console.info('value:', value)
  callback()
}

// 价格验证
export const checkPrice = value => {
  // 只允许输入数字或小数点
  value = value.replace(/[^\d^.]+/g, '')
  // 控制输入框只能输入两位小数和一个小数点
  const array = value.split('.')
  if ((array.length > 1 && array[1].length > 2) || array.length > 2) {
    value = array[0] + '.' + array[1].substr(0, 2)
  }
  return value
}
/**
 * 防抖函数  处理点击按钮多次触发bug
 * @param { context } that  传入小程序上下文对象  需在data中预留 timeout变量
 *  @param  {function} func        传入函数，最后一个参数是额外增加的this对象，.apply(this, args) 这种方式，this无法传递进函数
 * @param  {number}   wait        表示时间窗口的间隔
 * @param  {boolean}  immediate   设置为ture时，调用触发于开始边界而不是结束边界
 * @return {function}             返回客户调用函数
 */
export const debounce = (that2, func, wait, immediate) => {
  let args, context, timestamp, result
  const later = () => {
    // 据上一次触发时间间隔
    const last = Number(new Date()) - timestamp

    // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
    if (last < wait && last > 0) {
      that2.timeout = setTimeout(later, wait - last)
    } else {
      that2.timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.call(context, ...args, context)
        if (!that2.timeout) {
          context = args = null
        }
      }
    }
  }
  return (..._args) => {
    const that = this
    context = that
    args = _args
    timestamp = Number(new Date())
    const callNow = immediate && !that2.timeout
    // 如果延时不存在，重新设定延时
    if (!that2.timeout) {
      that2.timeout = setTimeout(later, wait)
    }
    if (callNow) {
      result = func.call(context, ...args, context)
      context = args = null
    }
    return result
  }
}

/**
 * 匹配景区名称
 * @method matchScenicName 传入只包含code的景区数据数组，处理之后添加上对应的景区name
 * @param {Array} dataArray 需要处理的景区数据数组
 * @param {Array} nameArray 所有景区数据数组
 * @return {Array}} 返回值处理过后的景区数据
 */
export function matchScenicName (dataArray, nameArray) {
  return dataArray.map(item => {
    const t = nameArray.find(element => element.scenicCode === item.scenicCode)
    if (t) {
      item.scenicName = t.scenicName
    }
    return item
  })
}

/**
 * 处理流文件并进行下载
 * @method downLoadFile 传入流文件数据，浏览器自动下载
 * @param {Blob} file 需要下载的流文件
 * @return {null} 浏览器直接下载文件
 */
export function downLoadFile (file, filename) {
  const blob = new Blob([file], { type: 'application/vnd.ms-excel' })
  const fileName = (filename || '报表') + new Date().toISOString() + '.xls'
  if ('download' in document.createElement('a')) {
    // 非IE下载
    const elink = document.createElement('a')
    elink.download = fileName
    elink.style.display = 'none'
    elink.href = URL.createObjectURL(blob)
    document.body.appendChild(elink)
    elink.click()
    URL.revokeObjectURL(elink.href) // 释放URL 对象
    document.body.removeChild(elink)
  } else {
    // IE10+下载
    navigator.msSaveBlob(blob, fileName)
  }
}

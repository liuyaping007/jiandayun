// 生成页面唯一Id方法
export function getnewid(frominfo, prefix) {
  let newid = (prefix === undefined ? 'file' : prefix) + '_' + randomString(4)
  let formjsonstr = JSON.stringify(frominfo)
  while (formjsonstr.indexOf(newid) >= 0) {
    newid = (prefix === undefined ? 'file' : prefix) + '_' + randomString(4)
  }
  return newid
}
// 随机生成字段名方法
export function randomString(len) {
  len = len || 32
  let $chars =
    'abacdefghjklmnopqrstuvwxyz0123456789' /** **默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
  let maxPos = $chars.length
  let pwd = ''
  for (let i = 0; i < len; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return pwd
}

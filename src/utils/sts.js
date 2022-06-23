import service from './service'

const OSS = require('ali-oss')
// 获取上传oss key
export const getUploadKey = () => {
  return service({
    method: 'GET',
    url: '/tourism/sts/basis',
    headers: {
      'Content-Type': 'application/json'
    },
    data: {}
  })
}
export const upLoadFile = (file, cb) => {
  // eslint-disable-next-line
  return new Promise(async (resolve, reject) => {
    try {
      const res = await getUploadKey()
      console.log(res, 'res')
      const client = new OSS({
        accessKeyId: res.data.accessKeyId,
        accessKeySecret: res.data.accessKeySecret,
        stsToken: res.data.securityToken,
        endpoint: res.data.endpoint,
        bucket: res.data.bucketName
      })
      const exNameArr = file.name.split('.')
      let exName = ''
      if (exNameArr.length > 0) {
        exName = exNameArr[exNameArr.length - 1]
      }
      // const fileName = exNameArr.splice(0, exNameArr.length - 1).join(',')
      const url = `${res.data.path}/${new Date().getTime()}.${exName}`
      client.multipartUpload(url, file, {
        progress: (p) => {
          return (done) => {
            cb && cb(Math.round(p * 100))
            done()
          }
        },
        headers: {
          'Cache-Control': 'no-cache'
        }
      }).then(() => {
        resolve(`/${url}`)
      })
    } catch (err) {
      reject(err)
    }
  })
}

// 一键部署 oss
const co = require('co')
const OSS = require('ali-oss')
const path = require('path')
const fs = require('fs')

class Uploader {
  constructor(root, ossConfig) {
    this.root = path.resolve(root)
    this._retries = {}
    this.client = new OSS({
      region: ossConfig.region,
      accessKeyId: ossConfig.accessKeyId,
      accessKeySecret: ossConfig.accessKeySecret,
      bucket: ossConfig.bucket
    })
  }

  scan(dir) {
    const currentDirectory = dir || this.root
    fs.readdirSync(currentDirectory)
      .forEach(file => {
        //去除隐藏文件
        // if(file.indexOf('.')===0) return;

        const filePath = path.resolve(currentDirectory, file)
        const stats = fs.statSync(filePath)
        if (stats.isFile(filePath)) {
          this.upload(filePath)
            .then(() => console.log('uploaded file: ' + filePath))
            .catch(e => {
              process.exit(1)
            })
          return
        }
        if (stats.isDirectory()) {
          this.scan(filePath)
        }
      })
  }

  upload(file) {
    const root = this.root
    const _this = this
    return co(function *() {
      let name = file.replace(root, '').split(path.sep).join('/')
      if (name.charAt(0) === '/') {
        name = name.substr(1)
      }
      return yield _this.client.put(process.env.folder+name, file)
    }).catch(e => {
      const c = this._retries[file] || 1
      if (c < 3) { //出错时，再重试2次
        this._retries[file] = c + 1
        return this.upload(file)
      }
      return Promise.reject(e)
    })
  }
}


const { region, accessKeyId, accessKeySecret, bucket } = process.env
const ossConfig = { region, accessKeyId, accessKeySecret, bucket }

const up = new Uploader('./dist', ossConfig)

up.scan()

'use strict'
function resolve(dir) {
    return path.join(__dirname, dir)
  }
const path = require('path')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const shell = require('shelljs')
const prod = process.env.API_ENV

shell.cp(`./src/configs/${prod}.js`, './src/configs/index.js')

// 是否使用gzip
const productionGzip = true
    // 需要gzip压缩的文件后缀
const productionGzipExtensions = ['js', 'css']

module.exports = {
    css: {
        loaderOptions: {
            less: {
                javascriptEnabled: true
            }
        }
    },
    chainWebpack: config => {
        const svgRule = config.module.rule('svg');
        svgRule.exclude.add(resolve('src/icons')).end()
        config.module
      .rule('icons').test(/\.svg$/).include.add(resolve('src/icons'))
      .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            }).end();
            config.plugin('define').tap(args => {
                // .env
                args[0]['process.env'].BASE_URL = JSON.stringify(process.env.BASE_URL)
                return args
            })
    },
    configureWebpack: () => {
        const myConfig = {}
        myConfig.plugins = []

        if (process.env.NODE_ENV === 'production') {
            // 构建时开启gzip，降低服务器压缩对CPU资源的占用，服务器也要相应开启gzip
            productionGzip && myConfig.plugins.push(
                new CompressionWebpackPlugin({
                    test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
                    threshold: 8192,
                    minRatio: 0.8
                })
            )
        }

        myConfig.resolve = {
            alias: {
                "@assets": path.resolve(__dirname, "./src/assets"),
                "@commons": path.resolve(__dirname, "./src/commons"),
                "@components": path.resolve(__dirname, "./src/components"),
                "@layouts": path.resolve(__dirname, "./src/layouts"),
                "@utils": path.resolve(__dirname, "./src/utils"),
                "@store": path.resolve(__dirname, "./src/store"),
                "@router": path.resolve(__dirname, "./src/router"),
                "@configs": path.resolve(__dirname, "./src/configs"),
                "@views": path.resolve(__dirname, "./src/views"),
                "@api": path.resolve(__dirname, "./src/api")
            }
        };

        if (process.env.NODE_ENV === "development") {
            // 关闭host check  方便ngrok等内网穿透工具
            myConfig.devServer = {
                disableHostCheck: true //  禁用webpack热重载检查 解决热更新失效问题
                    // host: "localhost",
                    // port: 8083,
                    // https: false,
                    // proxy: {
                    //   "/jd": {
                    //     target: "http://11.75.1.53:4010", // 要请求的后台地址
                    //     ws: true, // 启用websockets
                    //     changeOrigin: true, // 是否跨域
                    //     pathRewrite: {
                    //       "^/jd": "" // 这里理解成用路径中的‘/dev/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替
                    //     }
                    //   }
                    // }
            };
        }

        return myConfig;
    },
    productionSourceMap: false,
    filenameHashing: true,
    publicPath: process.env.NODE_ENV === 'development' ? process.env.VUE_APP_BASE_PATH : '/',
    runtimeCompiler: true
};

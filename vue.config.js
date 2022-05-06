const path = require('path')
const webpack = require('webpack')
const resolve = (dir) => path.join(__dirname, dir)
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')

/* const ChangeNginxConfig = require(resolve(
      './loadersPlugins/pluginTranslateNginxConfig'
    )) */
const px2rem = require('postcss-px2rem')
const postcss = px2rem({
  remUnit: 16
})

const BASE_IP = 'http://rise-nginx-internal.apps.vmocp-test.csvw.com'
// const BASE_IP = '10.122.18.166'
// const BASE_IP = '10.122.17.38'
// const BASE_IP = "http://rise-gateway-runtime.apps.vmocp-dev.csvw.com";

console.log(BASE_IP)

module.exports = {
  publicPath: process.env.VUE_APP_PUBLICPATH,
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: false,
  productionSourceMap: process.env.NODE_ENV !== 'production',
  parallel: require('os').cpus().length > 1,
  chainWebpack: (config) => {
    //定义全局别名
    config.resolve.alias
      .set('@', resolve('src'))
      .set('pages', resolve('src/views'))
    if (process.env.NODE_ENV !== 'dev') {
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          vendors: {
            name: 'vendors',
            test: /[\\/]node_modules[\\/]/,
            priority: 10
          },
          commons: {
            name: 'commons',
            test: resolve('src/components'),
            minChunks: 3,
            priority: 5,
            reuseExistingChunk: true
          }
        }
      }),
        config.optimization.runtimeChunk('single')
    }
  },
  configureWebpack: (config) => {
    config.plugins.forEach((val) => {
      if (val['__pluginConstructorName'] === 'HtmlWebpackPlugin') {
        val.options.CDN_HOST = process.env.CDN_HOST
        // 标记打包版本号
        const version =
          process.env.NODE_ENV !== 'production'
            ? `DEV_${new Date().toLocaleString()}`
            : `PROD_${new Date().toLocaleString()}`
        val.options.VUE_APP_VERSION = version
      }
    })
    config.plugins.push(
      new webpack.DllReferencePlugin({
        context: __dirname,
        manifest: require('./vendor-manifest.json')
      })
    )
    //为生产环境移除console debugger 代码压缩
    if (process.env.NODE_ENV !== 'dev') {
      config.plugins.push(
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              drop_debugger: true
              // drop_console: true,
              // pure_funcs: ['console.log']
            }
          },
          sourceMap: false,
          parallel: true
        })
        //环境代码
        /* process.env.NODE_ENV === 'dev' ? '' : new ChangeNginxConfig() */
      )
      config.plugins.push(
        new CompressionPlugin({
          algorithm: 'gzip',
          test: /\.(js|css)$/,
          threshold: 5120,
          minRatio: 0.8,
          cache: true,
          deleteOriginalAssets: false
        })
      )
    }
    config['externals'] = {
      vue: 'Vue',
      vuex: 'Vuex',
      'vue-router': 'VueRouter',
      axios: 'axios',
      moment: 'moment',
      'element-ui': 'ELEMENT',
      'vue-i18n': 'VueI18n',
      i18n: 'i18n',
      Ellipsis: 'Ellipsis',
      lodash: '_'
    }
    //开启gizp压缩
    config.devtool = 'source-map'

    if (process.env.NODE_ENV === 'dev') {
      config.watchOptions = {
        ignored: /node_modules/
      }
    }
  },
  //引入全局css变量
  css: {
    //是否开起css分离
    extract: false,
    sourceMap: process.env.NODE_ENV !== 'production',
    requireModuleExtension: true,
    loaderOptions: {
      sass: {
        implementation: require('sass'),
        additionalData: `@import "@/assets/style/global/variables.scss";`
      },
      postcss: {
        plugins: {
          postcss
        }
      }
    }
  },
  //本地server配置
  devServer: {
    open: true,
    host: '0.0.0.0',
    port: 8080,
    https: false,
    hot: true,
    compress: true,
    proxy: {
      [process.env.VUE_APP_PROJECT]: {
        target: `${BASE_IP}/projectmgt/`,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_PROJECT]: ''
        }
      },
      [process.env.VUE_APP_EKL]: {
        target: `${BASE_IP}/riseekl/`,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_EKL]: ''
        }
      },
      [process.env.VUE_APP_COMMON]: {
        target: `${BASE_IP}/common/`,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_COMMON]: ''
        }
      },
      [process.env.VUE_APP_USER_CENTER]: {
        target: `${BASE_IP}/usercenterApi/`,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_USER_CENTER]: ''
        }
      },
      [process.env.VUE_APP_APPROVAL]: {
        target: `${BASE_IP}/approval`,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_APPROVAL]: ''
        }
      },
      // -----------------ws3 供应商---------------------------
      // [process.env.VUE_APP_SUPPLIER]: {
      //   //   供应商
      //   target: `http://${BASE_IP}:8010/supplierservice`,
      //   // target:'http://rise-gateway-runtime.apps.vmocp-test.csvw.com/supplierservice/',
      //   changeOrigin: true,
      //   pathRewrite: {
      //     ['^' + process.env.VUE_APP_SUPPLIER]: ''
      //   }
      // },
      // -----------------ws3 供应商---------------------------
      [process.env.VUE_APP_SUPPLIER]: {
        target: `${BASE_IP}/supplierservice/`,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_SUPPLIER]: ''
        }
      },
      // ------------------ 上传 ----------------------------
      '/fileApi': {
        target: `${BASE_IP}/fileApi`,
        changeOrigin: true,
        pathRewrite: {
          '/fileApi': ''
        }
      },
      //------------------- 业务日志 ---------------------
      [process.env.VUE_APP_BIZLOG]: {
        target: `${BASE_IP}/bizlog`,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BIZLOG]: ''
        }
      },
      // 站内信
      [process.env.VUE_APP_MAIL]: {
        target: `${BASE_IP}/risemessage`,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_MAIL]: ''
        }
      }, // 主数据
      [process.env.VUE_APP_BASE_INFO]: {
        target: `${BASE_IP}/baseApi`,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_INFO]: ''
        }
      }, // SEARCH
      [process.env.VUE_APP_SEARCH]: {
        target: `${BASE_IP}/risesearch/`,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_SEARCH]: ''
        }
      }, //RISEDASHBOARD
      [process.env.VUE_APP_RISEDASHBOARD]: {
        target: `${BASE_IP}/risedashboard/`,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_RISEDASHBOARD]: ''
        }
      },
      [process.env.VUE_APP_AON]: {
        target: `${BASE_IP}/aon/`,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_AON]: ''
        }
      },
      [process.env.VUE_APP_NTIER]: {
        target: `${BASE_IP}/ntier/`,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_NTIER]: ''
        }
      },
      [process.env.VUE_APP_MTZ]: {
        target: `${BASE_IP}/mtz/`,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_MTZ]: ''
        }
      },
      [process.env.VUE_APP_MATERIEL]: {
        // target: `${BASE_IP}/parts`,
        // target: `http://${BASE_IP}:8018/parts`,
        target: `http://rise-gateway-runtime.apps.vmocp-uat.csvw.com/parts/`,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_MATERIEL]: ''
        }
      },
      [process.env.VUE_APP_RFQ]: {
        target: `${BASE_IP}/sourcing/`,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_RFQ]: ''
        }
      },
      [process.env.VUE_APP_SOURCING]: {
        target: `${BASE_IP}/sourcing/web`,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_SOURCING]: ''
        }
      },
      [process.env.VUE_APP_MEETING]: {
        target: `${BASE_IP}/rise-meeting/`,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_MEETING]: ''
        }
      },
      [process.env.VUE_APP_NEWS]: {
        target: `${BASE_IP}/news/`,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_NEWS]: ''
        }
      },
      [process.env.VUE_APP_SURVEY]: {
        target: `${BASE_IP}/rise-survey/`,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_SURVEY]: ''
        }
      },
      [process.env.VUE_APP_CHANGEPRICE]: {
        target: `${BASE_IP}/executionoperation/`,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_CHANGEPRICE]: ''
        }
      },
      // #零件生命周期
      [process.env.VUE_APP_PARTLIFECYCLEAPI]: {
        target: `http://${BASE_IP}:8037`,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_PARTLIFECYCLEAPI]: ''
        }
      },
      // 用户助手中心
      [process.env.VUE_APP_USER_ASSISTANT]: {
        target: `${BASE_IP}/riseassistant/`,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_USER_ASSISTANT]: ''
        }
      },
      // adminProcs
      [process.env.VUE_APP_ADMIN_PROCS]: {
        target: `${BASE_IP}/riseprocsApi`,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_ADMIN_PROCS]: ''
        }
      },
      [process.env.VUE_APP_AEKO]: {
        target: `${BASE_IP}/procurementrequirement/`,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_AEKO]: ''
        }
      }
    }
  }
}

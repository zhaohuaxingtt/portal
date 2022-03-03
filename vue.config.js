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

// const BASE_IP = 'http://rise-nginx-internal.apps.vmocp-uat.csvw.com'
// const BASE_IP = '10.122.18.166'
const BASE_IP = '10.122.17.38'

module.exports = {
  publicPath: process.env.VUE_APP_PUBLICPATH,
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: false,
  productionSourceMap: false,
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
  },
  //引入全局css变量
  css: {
    //是否开起css分离
    extract: false,
    sourceMap: false, // process.env.NODE_ENV !== 'production',
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
        target: `http://${BASE_IP}:8005/projectmgt`,
        // target: `http://rise-gateway-runtime.apps.vmocp-uat.csvw.com/projectmgt/`,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_PROJECT]: ''
        }
      },
      [process.env.VUE_APP_EKL]: {
        target: `http://${BASE_IP}:8043/riseekl`,
        // target: `http://rise-gateway-runtime.apps.vmocp-uat.csvw.com/riseekl/`,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_EKL]: ''
        }
      },
      [process.env.VUE_APP_COMMON]: {
        target: `http://${BASE_IP}:8014/common`,
        // target: `http://rise-gateway-runtime.apps.vmocp-uat.csvw.com/common/`,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_COMMON]: ''
        }
      },
      [process.env.VUE_APP_USER_CENTER]: {
        target: `http://${BASE_IP}:8015/usercenter/`,
        // target:
          // 'http://rise-gateway-runtime.apps.vmocp-uat.csvw.com/usercenter/',
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_USER_CENTER]: ''
        }
      },
      [process.env.VUE_APP_APPROVAL]: {
        target: `http://${BASE_IP}:8012/approval`,
        // target: `http://rise-gateway-runtime.apps.vmocp-uat.csvw.com/approval/`,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_APPROVAL]: ''
        }
      },
      // -----------------ws3 供应商---------------------------
      [process.env.VUE_APP_SUPPLIER]: {
        //   供应商
        target: `http://${BASE_IP}:8010/supplierservice`,
        // target:
          // 'http://rise-gateway-runtime.apps.vmocp-uat.csvw.com/supplierservice/',
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_SUPPLIER]: ''
        }
      },
      // ------------------ 上传 ----------------------------
      '/fileApi': {
        target: `http://${BASE_IP}:8034`,
        // target: `http://rise-nginx-internal.apps.vmocp-test.csvw.com/fileApi`,
        changeOrigin: true,
        pathRewrite: {
          '/fileApi': ''
        }
      },
      //------------------- 业务日志 ---------------------
      [process.env.VUE_APP_BIZLOG]: {
        target: `http://${BASE_IP}:8013/bizlog`,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BIZLOG]: ''
        }
      },
      // 站内信
      [process.env.VUE_APP_MAIL]: {
        target: `http://${BASE_IP}:8044/risemessage`,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_MAIL]: ''
        }
      }, // 主数据
      [process.env.VUE_APP_BASE_INFO]: {
        target: `http://${BASE_IP}:8011/baseinfo`,
        // target: 'http://rise-nginx-internal.apps.vmocp-uat.csvw.com/baseApi',
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_INFO]: ''
        }
      }, // SEARCH
      [process.env.VUE_APP_SEARCH]: {
        target: `http://${BASE_IP}:8039/risesearch`,
        // target: `http://rise-gateway-runtime.apps.vmocp-uat.csvw.com/risesearch/`,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_SEARCH]: ''
        }
      }, //RISEDASHBOARD
      [process.env.VUE_APP_RISEDASHBOARD]: {
        target: `http://${BASE_IP}:8037/risedashboard`,
        // target: `http://rise-gateway-runtime.apps.vmocp-uat.csvw.com/risedashboard/`,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_RISEDASHBOARD]: ''
        }
      },
      [process.env.VUE_APP_AON]: {
        target: `http://${BASE_IP}:8036/aon`,
        // target: `http://rise-gateway-runtime.apps.vmocp-uat.csvw.com/aon/`,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_AON]: ''
        }
      },
      [process.env.VUE_APP_NTIER]: {
        target: `http://${BASE_IP}:8045/ntier`,
        // target: `http://rise-gateway-runtime.apps.vmocp-uat.csvw.com/ntier/`,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_NTIER]: ''
        }
      },
      [process.env.VUE_APP_MTZ]: {
        target: `http://${BASE_IP}:8046/mtz`,
        // target: `http://rise-gateway-runtime.apps.vmocp-uat.csvw.com/mtz/`,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_MTZ]: ''
        }
      },
      [process.env.VUE_APP_MATERIEL]: {
        target: `http://${BASE_IP}:8018/parts`,
        // target: `http://rise-gateway-runtime.apps.vmocp-uat.csvw.com/parts/`,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_MATERIEL]: ''
        }
      },
      [process.env.VUE_APP_RFQ]: {
        target: `http://${BASE_IP}:8025/sourcing`,
        // target: `http://rise-gateway-runtime.apps.vmocp-uat.csvw.com/sourcing/`,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_RFQ]: ''
        }
      },
      [process.env.VUE_APP_SOURCING]: {
        target: `http://${BASE_IP}:8025/sourcing/web`,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_SOURCING]: ''
        }
      },
      [process.env.VUE_APP_MEETING]: {
        target: `http://${BASE_IP}:8051/rise-meeting`,
        // target: `http://rise-gateway-runtime.apps.vmocp-uat.csvw.com/rise-meeting/`,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_MEETING]: ''
        }
      },
      [process.env.VUE_APP_NEWS]: {
        target: `http://${BASE_IP}:8047/news`,
        // target: `http://rise-gateway-runtime.apps.vmocp-uat.csvw.com/news/`,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_NEWS]: ''
        }
      },
      [process.env.VUE_APP_SURVEY]: {
        target: `http://${BASE_IP}:8054/rise-survey`,
        // target: `http://rise-gateway-runtime.apps.vmocp-uat.csvw.com/rise-survey/`,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_SURVEY]: ''
        }
      },
      [process.env.VUE_APP_CHANGEPRICE]: {
        target: `http://${BASE_IP}:8026/executionoperation`,
        // target: `http://rise-gateway-runtime.apps.vmocp-uat.csvw.com/executionoperation/`,
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
        target: `http://${BASE_IP}:8059/riseassistant`,
        // target: `http://rise-gateway-runtime.apps.vmocp-uat.csvw.com/riseassistant/`,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_USER_ASSISTANT]: ''
        }
      },
      // adminProcs
      [process.env.VUE_APP_ADMIN_PROCS]: {
        target: `http://${BASE_IP}:8016/riseprocs`,
        // target: `http://rise-nginx-internal.apps.vmocp-test.csvw.com/riseprocsApi`,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_ADMIN_PROCS]: ''
        }
      },
      // '/fileCross': {
      //   target: `http://${BASE_IP}:8034`,
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '/fileCross': ''
      //   }
      // },
      [process.env.VUE_APP_AEKO]: {
        target: `http://${BASE_IP}:8023/procurementrequirement`,
        // target: `hhttp://rise-gateway-runtime.apps.vmocp-uat.csvw.com/procurementrequirement/`,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_AEKO]: ''
        }
      }
    }
  }
}

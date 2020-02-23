const webpack = require('webpack')
// const path = require('path')

// function resolve(dir) {
//   return path.join(__dirname, '..'1, dir)
// }

module.exports = {
  lintOnSave: false,
  publicPath: './', // 部署项目路径
  devServer: {
    port: 8086, // 端口号
    open: false, //配置自动启动浏览器
    proxy: {
      '/recruitassemble': {
        // target: 'http://47.100.200.255:9966/kindnessplatform', // 线上
        // target: 'http://47.100.200.255:19955/kindnessplatform',  // 测试
        target: 'http://47.100.200.255:19999/recruitassemble',  // 测试
        changeOrigin: true,
        pathRewrite: {
          '^/recruitassemble': '/'
        }
      }
    }
  },

  configureWebpack: {
    // webpack 配置项
    // resolve: {
    //   alias: {
    //     vue$: 'vue/dist/vue.esm.js'
    //     // '@': resolve('src'),
    //     // 'views': resolve('src/views')
    //   }
    // },
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'windows.jQuery': 'jquery'
      })
    ]
  },
  css: {
    loaderOptions: {
      sass: {
        // data: `@import "@/assets/css/global.scss";`
      },
    }
  }
}

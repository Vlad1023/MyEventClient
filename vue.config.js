const path = require('path'); 
module.exports = {
  publicPath: '/MyEvent/',
  lintOnSave: false,
  transpileDependencies: [
    'vuetify'
  ],
  configureWebpack: {
    devtool: 'source-map'
  },
  chainWebpack: (config) => {
     config.resolve.alias
          .set('@', path.resolve(__dirname, 'src/'))
          .set('@assets', path.resolve(__dirname, 'src/assets/'))
          .set('@components', path.resolve(__dirname, 'src/components/'))
          .set('@views', path.resolve(__dirname, 'src/views/'))
          .set('@store', path.resolve('src/store/'))
          .set('@router', path.resolve('src/router/'))
          .set('@api', path.resolve('src/apiService/'))
          .set('@filters', path.resolve('src/filters/'))
          .set('@sharedFunctions', path.resolve('src/sharedFunctions/'));
    }
}

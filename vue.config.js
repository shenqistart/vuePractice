const path = require('path')
// join是拼接例如：path.join('foo', 'baz', 'bar'); // 返回 'foo/baz/bar',这里面是一个方法
const resolve = dir => path.join(__dirname, dir)
const BASE_URL = process.env.NODE_ENV === 'production' ? '/build/' : '/'
// resolve.alias用于给模块路径指定别名。
module.exports = {
  baseUrl: BASE_URL,
  lintOnSave: false,
  // config.resolve.alias路径配置别名
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('_c', resolve('src/components'))
  },
  // 打包时不生成.map文件
  productionSourceMap: false,
  // 这个是webpack的跨域处理
  devServer: {
    proxy: 'http://localhost:4000'
  }
}

/***
 * vue cli3 webpack 配制文件
 */
const path = require('path');

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    publicPath: "/",   // 输出目录
    outputDir: 'dist',
    lintOnSave: true,
    productionSourceMap: false, // 是否为生产环境构建生成 source map？
    chainWebpack: (config) => {    // alias 配置
        config.resolve.alias.set('@', resolve('src'))
        config.module.rules.delete("svg");
        config.module
            .rule('svg-smart')
            .test(/\.svg$/) //正则匹配
            .include
            .add(resolve('src/views/icons/svg'))
            .end()
            .use('svg-sprite-loader') //svg 前置处理器
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
    },
    devServer: {
        port: 8081,
        proxy: {
            '/rest': {
                target: "https://tmjl.zje.com",
                changeOrigin: true
            },
            '/smartHome':{
                target:"http://192.168.1.20:8821",
                changeOrigin: true
            }
        }
    }
}

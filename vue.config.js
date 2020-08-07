const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const path = require('path')

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    publicPath: "./",
    productionSourceMap: false,
    outputDir: "./lib/public",
    devServer: {
        proxy: 'http://localhost:3000'
    },
    configureWebpack: {
        name: "name",
        resolve: {
            alias: {
                '@': resolve('src')
            }
        }
    },
    pages: {
        index: {
            // page 的入口
            entry: 'src/main.js',
            // 模板来源
            template: 'src/index.html',
            favicon: 'src/favicon.ico',
            // 在 dist/index.html 的输出
            filename: 'index.html'
        }
    }

}

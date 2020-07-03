const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    publicPath: "./",
    productionSourceMap: false,
    outputDir: "./lib/public",
    devServer: {
        proxy: 'http://localhost:3000'
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
    },
    configureWebpack: {
        plugins: [
            new MonacoWebpackPlugin(),
            new CopyPlugin([
                {
                    from: './node_modules/blockly/media',
                    to: 'media'
                }
            ])
        ]
    }

}

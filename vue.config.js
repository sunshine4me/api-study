const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
module.exports = {
    outputDir: "./lib/public",
    devServer: {
        proxy: 'http://localhost:8000'
    },
    configureWebpack: {
        plugins: [
            new MonacoWebpackPlugin()
        ]
    }

}
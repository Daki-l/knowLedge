const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    // output: {
    //     path: __dirname + '/dist',
    //     filename: 'bundle.js'
    // },
    devServer: {
        open: true,
        compress: true,
        port: 9000,
    },
    module: {
        rules: [{ test: /\.txt$/, use: 'raw-loader' }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    mode: 'development'
}


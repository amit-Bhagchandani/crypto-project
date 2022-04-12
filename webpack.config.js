const path = require('path');
const HtmlwebpackPlugin = require('html-webpack-plugin');

module.exports = {
    output: {
        path: path.join(__dirname, '/build'),
        filename: 'index.bundle.js',
        publicPath: '/'
    },

    devServer: {
        port: 5000,
        hot: true,
        historyApiFallback: true
        },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /nodeModules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },

    plugins : [new HtmlwebpackPlugin({template: './src/index.html', inject: false})]
    
}


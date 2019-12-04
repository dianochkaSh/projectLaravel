let path = require('path');
let webpack = require('webpack');

var devMode = true;

module.exports = {
    mode: 'development',
    entry: './resources/js/app.js',
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js',
        publicPath: '/',
    },
    devtool: "source-map",
    //devtool: 'inline-source-map',


    module: {
        rules: [
            {
                test: /\.js|\.es6$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    'file-loader',
                ],
            }
        ],

    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    plugins: [new webpack.HotModuleReplacementPlugin()]
};

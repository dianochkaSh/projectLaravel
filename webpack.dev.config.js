/* eslint-disable */
let path = require('path');
let webpack = require('webpack');

var devMode = true;

module.exports = {
    mode: 'development',
    entry: './resources/js/app.js',
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'app.bundle.js',
        publicPath: '/',
    },
    devtool: "source-map",
    //devtool: 'inline-source-map',


    module: {
        rules: [
            {
                loader: "babel-loader",
                test: /\.js|\.es6$/,
                exclude: /node_modules/

            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ],

    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
};

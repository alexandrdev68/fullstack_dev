'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';
const WEBPACK = require('webpack');
const config = require('config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const Client_ID = config.get('Client_ID');
const Redirect_uri = config.get('Callback_URL');

console.log('mode: ', NODE_ENV);
module.exports = {
    context: __dirname + '/src',

    entry: {
        src: __dirname + "/src/index.jsx"
    },
    output: {
        path: __dirname + '/api/public/static',
        filename: "[name].js",
        publicPath: "/static/",
        library: "[name]"
    },

    watch: NODE_ENV == 'development',//,
    devtool: NODE_ENV == 'development' ? "source-map" : null,

    plugins: [
        new WEBPACK.NoErrorsPlugin(),
        new WEBPACK.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV),
            'process.env': {
                ClientID: JSON.stringify(Client_ID),
                Redirect_uri : JSON.stringify(Redirect_uri)
            }

        }),
        new WEBPACK.ProvidePlugin({
            '$': 'jquery',
            'jQuery': 'jquery',
            'window.jQuery': 'jquery'
        }),
        new HtmlWebpackPlugin({
            hash: true,
            title: "Full Stack",
            template: "index.ejs",
            filename: '../../templates/index.phtml'
        })
    ],

    resolve: {
        modulesDirectories: ['node_modules'],
        extensions: ['', '.js', '.jsx']
    },

    resolveLoader: {
        modulesDirectories: ['node_modules'],
        moduleTemplates: ['*-loader', '*'],
        extensions: ['', '.js', '.jsx']
    },

    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                loader: ['babel-loader'],
                query: {
                    presets: [
                        'es2015',
                        'react'
                    ]
                }
            },
            {
                test: /\.css$/,
                loader: 'style!css!autoprefixer?browsers=last 2 versions'
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
            },
            {
                test: /\.(jpg|png|svg)$/,
                loader: 'file?name=img/[name].[ext]'
            },
            {
                test: /\.(eot|ttf|woff|woff2|otf)$/,
                loader: 'file?name=fonts/[name].[ext]'
            },
            {
                test: /jquery-mousewheel/,
                loader: "imports?define=>false&this=>window"
            },
            {
                test: /malihu-custom-scrollbar-plugin/,
                loader: "imports?define=>false&this=>window"
            }
        ]
    }

};

if (NODE_ENV == 'production') {

    module.exports.plugins.push(new WEBPACK.optimize.UglifyJsPlugin({
        compress: {
            warnings: false,
            drop_console: true,
            unsafe: true
        }
    }))

}
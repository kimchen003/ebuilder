const webpack = require('webpack');
const ip = require('ip').address();
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    devServer : {
        host : ip
    },
    entry: {
        //index : ['whatwg-fetch', path.resolve(__dirname, '../src/index.ts')]
        index : [ path.resolve(__dirname, '../test/index.ts')]
    },
    output: {
        path: path.resolve(__dirname, '../test/dist'),
        // filename: 'buty.bundle.js'
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../test/index.html'),
            filename: 'index.html',
            inject: true
        })
    ],
    module: {
        rules: [
            // {
            //     test: /\.ts$/,
            //     enforce: 'pre',
            //     loader: 'eslint-loader',
            //     exclude: /node_modules/,
            // },
            {
                test: /\.ts|\.js|\.tsx$/,
                // 如果需要增加编译的外部插件，按照下面这种写法
                exclude: /node_modules(\/|\\)(?!((allsome\-[0-9a-zA-Z\-]+)|whatwg-fetch|@webcomponents|lit-html)(\/|\\)).*/,
                use: [
                    {
                        loader: 'babel-loader',
                    }
                ],
            },
            {
                test: /\.less$/,
                use: [
                        {
                            loader: 'css-loader' ,
                            options: { 
                                modules: {
                                    localIdentName: '[name]__[local]',
                                    //localIdentName: '[path][name]__[local]--[hash:base64:5]',
                                },
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: loader => [
                                    require('autoprefixer'),
                                    require('cssnano')()
                                ]
                            }
                        },
                        { loader: 'less-loader' }
                    ]
               
            },
            {
                test: /\.(gif|jpg|png|woff|eot|ttf)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            //limit:8192, // 图片小于8k就转化为 base64, 或者单独作为文件
                            limit:81920000, // 图片小于8k就转化为 base64, 或者单独作为文件
                            outputPath:'img/'
                        }
                    }
                ]
            },
            {
                test: /\.svg/,
                use: [{
                    loader: "svg-url-loader",
                    options: {
                        dataUrlLimit: 1024
                    }
                }]
            }
        ]
    }
}
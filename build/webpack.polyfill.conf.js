const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: {
        index : [ path.resolve(__dirname, '../polyfill/all.ts')]
    },
    output: {
        path: path.resolve(__dirname, '../polyfill/dist'),
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    module: {
        rules: [
            {
                test: /\.ts|\.js|\.tsx$/,
                // 如果需要增加编译的外部插件，按照下面这种写法
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                    }
                ],
            }
        ]
    }
}
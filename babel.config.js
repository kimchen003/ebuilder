module.exports = function(api) {
    api.cache(true);

    const presets = [
        ["@babel/env", {
            //是否将ES6的模块化语法转译成其他类型
            //参数："amd" | "umd" | "systemjs" | "commonjs" | false，默认为'commonjs'
            "modules": 'commonjs',
            //是否进行debug操作，会在控制台打印出所有插件中的log，已经插件的版本
            "debug": false,
            //强制开启某些模块，默认为[]
            "include": [],
            //禁用某些模块，默认为[]
            "exclude": [],
            //babel / preset-env处理polyfill的方式。
            //参数：usage | entry | false，默认为false.
            "useBuiltIns": "usage"
        }]
    ];
    const plugins = [
        "@babel/transform-arrow-functions",
        "@babel/plugin-transform-typescript",
        [
            "@babel/plugin-proposal-decorators", {
                legacy: true
            }
        ],
        [
            "@babel/plugin-transform-runtime", {
                "absoluteRuntime": false,
                "corejs": '3',
                "helpers": true,
                "regenerator": false,
                "useESModules": true
            }
        ]
    ];

    return {
        presets,
        plugins
    };
}
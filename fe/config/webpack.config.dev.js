const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const copyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    // 模式   分为development和production
    mode: 'development',

    // 入口文件
    entry: {
        index: './src/app.js',
        register: './src/register.js',
        login: './src/login.js'
    },

    // 出口文件
    output: {
        // 路径必须为绝对路径
        // path.resolve() 方法会把一个路径或路径片段的序列解析为一个绝对路径。
        path: path.resolve(__dirname, '../dev'),
        // 输出文件名
        filename: '[name].js'
    },

    // webpack-dev-server的配置
    devServer: {
        contentBase: path.resolve(__dirname, '../dev'),
        host: '10.60.15.19',
        port: 8080,
        // 配置接口代理
        proxy: {
            '/api': {
                target: 'http://10.60.15.19:3000'
            }
        },
    },


    // loader
    module: {
        rules: [{
                test: /\.art$/,
                //加载art-template模块
                loader: 'art-template-loader'
            },
            {
                test: /\.(scss|css)$/,
                // 将 Sass 编译成 CSS
                // 将 CSS 转化成 CommonJS 模块
                // 将 JS 字符串生成为 style 节点
                // 从右向左依次执行
                loader: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    },

    // 插件
    plugins: [
        // 打包html+css+js
        // 打包首页
        new htmlWebpackPlugin({
            template: './index.html',
            filename: 'index.html',
            chunks: ['index']
        }),

        // 打包注册页
        new htmlWebpackPlugin({
            template: './register.html',
            filename: 'register.html',
            chunks: ['register']
        }),

        // 打包登录页
        new htmlWebpackPlugin({
            template: './login.html',
            filename: 'login.html',
            chunks: ['login']
        }),

        // 拷贝 public source
        new copyWebpackPlugin([{
            from: './public',
            to: './public'
        }])
    ]
}
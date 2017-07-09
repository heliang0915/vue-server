/**
 * Created by heliang on 17-7-8.
 */
var path = require('path')
const vueConfig = require('./vue-loader.config');
var ExtractTextPlugin=require("extract-text-webpack-plugin");
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
var webpack=require("webpack");

//定义公共路径
var ROOT_PATH = path.resolve(__dirname);
// var APP_PATH=path.resolve(ROOT_PATH,'src/app.js');
var BUILD_PATH=path.resolve(ROOT_PATH,'../dist');

let env=process.env.NODE_ENV||"development";
let isProd=(env!="development");
console.log(isProd);
module.exports = {
    devtool: isProd
        ? false
        : '#source-map',
    output: {
        path: BUILD_PATH,
        publicPath: '/dist/',
        filename: '[name].[chunkhash].js'
    },
    resolve: {
        extensions: ['.js', '.vue','.css'],
        alias: {
            'src': path.resolve(__dirname, '../src'),
            'assets': path.resolve(__dirname, '../src/assets'),
            'components': path.resolve(__dirname, '../src/components'),
            'vue':path.resolve(__dirname,'../node_modules/vue/dist/vue.js'),
            'vue-router':path.resolve(__dirname,'../node_modules/vue-router/dist/vue-router.js'),
            'axios':path.resolve(__dirname,'../node_modules//axios/dist/axios.js'),
            'vuex':path.resolve(__dirname,'../node_modules//vuex/dist/vuex.js')
        }
    },
    module: {
        noParse: /es6-promise\.js$/, // avoid webpack shimming process
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueConfig
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: 'url-loader?limit=1&name=[path][name].[ext]'
            },
            {
                test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
                use: 'url-loader?importLoaders=1&limit=1000&name=/fonts/[name].[hash:7].[ext]'
            },
            {
                test: /\.css$/,
                use: isProd
                    ? ExtractTextPlugin.extract({
                    use: 'css-loader?minimize',
                    fallback: 'vue-style-loader'
                })
                    : ['vue-style-loader', 'css-loader']
            }
        ]
    },
    performance: {
        maxEntrypointSize: 300000,
        hints: isProd ? 'warning' : false
    },
    plugins: isProd
        ? [
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false }
        }),
        new ExtractTextPlugin({
            filename: '[name].[chunkhash].css'
        })
    ]
        : [
        new FriendlyErrorsPlugin()
    ]
}
 

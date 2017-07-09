/**
 * Created by heliang on 17-7-8.
 */
require('babel-register');
var webpack=require("webpack");
const base = require('./webpack.base.config');
const merge = require('webpack-merge');
let {templateName}=require("../server/config");
const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const config = merge(base, {
    entry: {
        app: './src/entry-client.js'
    },
    plugins: [
        // strip dev-only code in Vue source
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            'process.env.VUE_ENV': '"client"'
        }),
        // extract vendor chunks for better caching
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module) {
                // a module is extracted into the vendor chunk if...
                return (
                    // it's inside node_modules
                    /node_modules/.test(module.context) &&
                    // and not a CSS file (due to extract-text-webpack-plugin limitation)
                    !/\.css$/.test(module.request)
                )
            }
        }),
        // new HtmlWebpackPlugin({
        //     template: path.join(__dirname, '/../template/index.ejs'),
        //     filename:templateName+'.html',
        //     title:"开发环境"
        // }),
        // extract webpack runtime & manifest to avoid vendor chunk hash changing
        // on every build.
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest'
        }),
        new VueSSRClientPlugin()
    ]
})

// if (process.env.NODE_ENV === 'production') {
//     config.plugins.push(
//         // auto generate service worker
//         new SWPrecachePlugin({
//             cacheId: 'vue-hn',
//             filename: 'service-worker.js',
//             minify: true,
//             dontCacheBustUrlsMatching: /./,
//             staticFileGlobsIgnorePatterns: [/\.map$/, /\.json$/],
//             runtimeCaching: [
//                 {
//                     urlPattern: '/',
//                     handler: 'networkFirst'
//                 },
//                 {
//                     urlPattern: /\/(top|new|show|ask|jobs)/,
//                     handler: 'networkFirst'
//                 },
//                 {
//                     urlPattern: '/item/:id',
//                     handler: 'networkFirst'
//                 },
//                 {
//                     urlPattern: '/user/:id',
//                     handler: 'networkFirst'
//                 }
//             ]
//         })
//     )
// }

module.exports = config
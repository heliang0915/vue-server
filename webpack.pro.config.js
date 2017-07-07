var path = require('path');
var fs=require('fs');
var webpack=require("webpack");
require('babel-register');
var ExtractTextPlugin=require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

var CommonsChunkPlugin=webpack.optimize.CommonsChunkPlugin;
// var config = require('./config');

//定义公共路径
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH=path.resolve(ROOT_PATH,'src/app.js');
var BUILD_PATH=path.resolve(ROOT_PATH,'build');
// let {env,conf,templateName}=require("./server/config");
let {env,templateName}=require("./server/config");
console.log("env>>"+env);
console.log("生产环境配置......");

var clientConfig={
  entry: {
    app:path.resolve(__dirname,'src/entry-client.js'),
    libs:['vue','vue-router','axios','vuex']
  },
  output: {
    path:BUILD_PATH+"/"+env,
    publicPath: '/',
    filename: '[name].js?[hash]',
    chunkFilename: "[name].chunk.js"//给require.ensure用
  },
  resolve: {
    extensions: [ '.js', '.vue','.css'],
    // fallback: [path.join(__dirname, '../node_modules')],
    alias: {
      'src': path.resolve(__dirname, '../src'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'components': path.resolve(__dirname, '../src/components'),
      'vue':ROOT_PATH+'/node_modules/vue/dist/vue.min.js',
      'vue-router':ROOT_PATH+'/node_modules/vue-router/dist/vue-router.min.js',
      'axios':ROOT_PATH+'/node_modules/axios/dist/axios.js',
      'vuex':ROOT_PATH+'/node_modules/vuex/dist/vuex.min.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
          use: 'vue-loader'
      },
      { test: /\.css$/, 
        //将分散的css合并
          use: ExtractTextPlugin.extract({
              use: 'css-loader',
              fallback: 'vue-style-loader'
          })
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
          use: 'json'
      },
      {
        test: /\.html$/,
          use: 'vue-html'
      },
      {
        test: /\.(png|jpe?g|jpg|gif)(\?.*)?$/,
          use: 'url-loader?importLoaders=1&limit=1000&name=assets/images/[name][hash].[ext]'
      },
      {
        test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
          use: 'url-loader?importLoaders=1&limit=1000&name=/fonts/[name].[hash:7].[ext]'
      },
      {
        test: /\.html$/,
          use: "html"
      }
    ]
  },
  // vue: {
  //   loaders:{
  //     css:ExtractTextPlugin.extract("css")
  //   }
  // },
  //第三方库配置
  plugins:[
      // 标记当前为生产环境 
      new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify('production')
        }
      }),
      //合并第三方代码(将第三方代码和本地代码统一合并成一个文件)
      new CommonsChunkPlugin({
        name:"libs",
        filename:"libs.js?[hash]",
        minChunks:Infinity
      }),
      //压缩时去掉警告
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        },
        output: {
            // remove all comments(注释)
            comments: false
        }
      }),
      //合并css
      new ExtractTextPlugin("[name].css?[hash]"),
      //自动生成模版
      new HtmlWebpackPlugin({
          template: path.join(__dirname, '/template/index.ejs'),
          filename:templateName+'.html',
          title:"生产环境"
      })
  ]
}


function getExternals() {
    return fs.readdirSync(path.resolve(__dirname, './node_modules'))
        .filter(filename => !filename.includes('.bin'))
        .reduce((externals, filename) => {
            externals[filename] = `commonjs ${filename}`

            return externals
        }, {})
}

let serverConfig = {
    entry: {
        app:path.resolve(__dirname,'server/app.js')
    },
    output: {
        path: path.resolve(__dirname, 'build/server'),
        filename: '[name].js'
    },
    target: 'node',
    node: {
        __filename: true,
        __dirname: true
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: 'babel-loader'
        },{
            test: /\.vue$/,
            use: 'vue-loader'
        }, {
            test: /\.css/,
            use: [
                'css/locals',
            ]
        },{
            test: /\.(png|jpe?g|gif)(\?.*)?$/,
            use: 'url-loader?limit=1&name=assets/images/[name].[ext]?[hash]'
        }, {
            test: /\.json$/,
            use: 'json'
        }]
    },
    externals: getExternals(),
    resolve: {extensions: ['.js', '.json', '.css','.vue']},
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        // new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {warnings: false},
            comments: false
        }),
        new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify(env)})
    ]
}

module.exports= [clientConfig,serverConfig];

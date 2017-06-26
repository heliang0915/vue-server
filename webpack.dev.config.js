var path = require('path')
var webpack=require("webpack");
var fs=require("fs");
require('babel-register');
let helper=require('./helper');
var ExtractTextPlugin=require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
let OpenBrowserWebpackPlugin=require("open-browser-webpack-plugin");
var CommonsChunkPlugin=webpack.optimize.CommonsChunkPlugin;

//定义公共路径
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH=path.resolve(ROOT_PATH,'src/app.js');
var BUILD_PATH=path.resolve(ROOT_PATH,'build');
let {env,templateName}=require("./server/config");
console.log("env>>"+env);
console.log('开发环境配置...')

let clientConfig = {
  entry: {
    app:path.resolve(__dirname,'src/entry-client.js'),
    libs:['vue','vue-router','axios','vuex']
  },
  output: {
    path:BUILD_PATH+"/"+env,
    publishPath: '/build/'+env,
    filename: '[name].js?[hash]'
    //   ,
    // chunkFilename: "[name].chunk.js"//给require.ensure用
  },
  resolve: {
    extensions: ['', '.js', '.vue','.css'],
    fallback: [path.join(__dirname, '../node_modules')],
    alias: {
      'src': path.resolve(__dirname, '../src'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'components': path.resolve(__dirname, '../src/components'),
      'vue':ROOT_PATH+'/node_modules/vue/dist/vue.js',
      'vue-router':ROOT_PATH+'/node_modules/vue-router/dist/vue-router.js',
      'axios':ROOT_PATH+'/node_modules/axios/dist/axios.js',
      'vuex':ROOT_PATH+'/node_modules/vuex/dist/vuex.js'
    }
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      { test: /\.css$/, 
        //将分散的css合并
        loader: ExtractTextPlugin.extract("style", "css")
      },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.html$/,
        loader: 'vue-html'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader?limit=1&name=[path][name].[ext]'
      },
      {
        test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
        loader: 'url-loader?importLoaders=1&limit=1000&name=/fonts/[name].[hash:7].[ext]'
      }
    ],
  },
  vue: {
    loaders:{
      css:ExtractTextPlugin.extract("css")
    }
  },
  devtool:"#source-map",
  //第三方库配置
  plugins:[
      // new webpack.DllReferencePlugin({
      //     context: __dirname,
      //     manifest: require('./build/vendor-manifest.json')
      // }),
      //合并第三方代码
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
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
          compress: {warnings: false},
          comments: false
      }),
      //合并css
      new ExtractTextPlugin("[name].css?[hash]"),
      // 热加载
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
          template: path.join(__dirname, '/template/index.ejs'),
          filename:templateName+'.html',
          title:"开发环境"
      }),
      new OpenBrowserWebpackPlugin({
            url:"http://"+helper.getLocalIp()+":4000"
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

//
let serverConfig = {
    entry: {
        app:path.resolve(__dirname,'server/app.js')
    },
    output: {
        path: path.resolve(__dirname, 'build/dev_server'),
        filename: '[name].js'
        // ,
        // chunkFilename: "[name].chunk.js"//给require.ensure用
    },
    target: 'node',
    node: {
        __filename: true,
        __dirname: true
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel'
        },{
            test: /\.vue$/,
            loader: 'vue'
        }, {
            test: /\.css/,
            loaders: [
                'css/locals',
            ]
        },{
            test: /\.(png|jpe?g|gif)(\?.*)?$/,
            loader: 'url-loader?limit=1&name=assets/images/[name].[ext]?[hash]'
        }, {
            test: /\.json$/,
            loader: 'json'
        }]
    },
    externals: getExternals(),
    resolve: {extensions: ['', '.js', '.json', '.css','.vue']},
    plugins: [
        // new webpack.optimize.OccurrenceOrderPlugin(),
        // new webpack.optimize.DedupePlugin(),
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {warnings: false},
        //     comments: false
        // }),
        new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify(env)})
    ]
}

module.exports=[clientConfig,serverConfig]

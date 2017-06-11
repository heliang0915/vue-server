var path = require('path')
var webpack=require("webpack");
var WebpackDevServer=require("webpack-dev-server");
var ExtractTextPlugin=require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

var CommonsChunkPlugin=webpack.optimize.CommonsChunkPlugin;
// var config = require('./config');

//定义公共路径
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH=path.resolve(ROOT_PATH,'src/app.js');
var BUILD_PATH=path.resolve(ROOT_PATH,'build');
console.log("生产环境配置......");

module.exports = {
  entry: {
    // app: APP_PATH,
    app:['vue','vue-router','axios','vuex','myapp']
  },
  output: {
    path:BUILD_PATH,
    publishPath: '/build/',
    filename: '[name].js?[hash]'
  },
  resolve: {
    extensions: ['', '.js', '.vue','.css'],
    fallback: [path.join(__dirname, '../node_modules')],
    alias: {
      'src': path.resolve(__dirname, '../src'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'components': path.resolve(__dirname, '../src/components'),
      'vue':ROOT_PATH+'/node_modules/vue/dist/vue.min.js',
      'vue-router':ROOT_PATH+'/node_modules/vue-router/dist/vue-router.min.js',
      'axios':ROOT_PATH+'/node_modules/axios/dist/axios.js',
      'vuex':ROOT_PATH+'/node_modules/vuex/dist/vuex.min.js',
      'myapp':APP_PATH
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
        test: /\.(png|jpe?g|jpg|gif)(\?.*)?$/,
        loader: 'url-loader?importLoaders=1&limit=1000&name=assets/images/[name][hash].[ext]'
      },
      {
        test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
        loader: 'url-loader?importLoaders=1&limit=1000&name=/fonts/[name].[hash:7].[ext]'
      },
      {
        test: /\.html$/,
        loader: "html"
      }
    ]
  },
  vue: {
    loaders:{
      css:ExtractTextPlugin.extract("css")
    }
  },
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
        name:"app",
        filename:"app.js?[hash]",
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
          template: path.join(__dirname, 'index.ejs'),
           title:"生产环境"
      }),
      new webpack.NoErrorsPlugin()
  ]
}

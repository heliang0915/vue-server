var path = require('path')
var webpack=require("webpack");
var fs=require("fs");
require('babel-register');
let helper=require('./helper');
var ExtractTextPlugin=require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
let OpenBrowserWebpackPlugin=require("open-browser-webpack-plugin");
var CommonsChunkPlugin=webpack.optimize.CommonsChunkPlugin;
const nodeExternals = require('webpack-node-externals')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');


//定义公共路径
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH=path.resolve(ROOT_PATH,'src/app.js');
var BUILD_PATH=path.resolve(ROOT_PATH,'dist');
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
    publicPath: '/',
    filename: '[name].js?[hash]'
    //   ,
    // chunkFilename: "[name].chunk.js"//给require.ensure用
  },
  resolve: {
    extensions: ['.js', '.vue','.css'],
    // fallback: [path.join(__dirname, '../node_modules')],
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
    rules: [
        {
            test: /\.vue$/,
            loader: 'vue-loader',
            
        },
      { test: /\.css$/,
        //将分散的css合并
          use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
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
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: 'url-loader?limit=1&name=[path][name].[ext]'
      },
      {
        test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
        use: 'url-loader?importLoaders=1&limit=1000&name=/fonts/[name].[hash:7].[ext]'
      }
    ]
  },
  //第三方库配置
  plugins:[
      //合并第三方代码
      new CommonsChunkPlugin({
        name:"libs",
        filename:"libs.js?[hash]",
        minChunks:Infinity
      }),
      new webpack.optimize.OccurrenceOrderPlugin(),
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


let  entryServerConfig={
    devtool: '#cheap-module-source-map',
    output: {
        path:BUILD_PATH,
        publicPath: '/',
        filename: '[name].[chunkhash].js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    extractCSS:false,
                    preserveWhitespace: false,
                    postcss: [
                        require('autoprefixer')({
                            browsers: ['last 3 versions']
                        })
                    ]
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: '[name].[ext]?[hash]'
                }
            },
            {
                test: /\.css$/,
                use: ['vue-style-loader', 'css-loader']
            }
        ]
    },
    target: 'node',
    entry:'./src/entry-server.js',
    output:{
        filename: 'server-bundle.js',
        libraryTarget: 'commonjs2',
        path:BUILD_PATH
    },
    externals: nodeExternals({
        // do not externalize CSS files in case we need to import it from a dep
        whitelist: /\.css$/
    }),
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            'process.env.VUE_ENV': '"server"'
        }),
        new VueSSRServerPlugin()
    ]
}   

//
let serverConfig = {
    entry: {
        app:path.resolve(__dirname,'server/app.js')
    },
    output: {
        path: path.resolve(__dirname, 'dist/dev_server'),
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
        },
            // ,
        //     {
        //     test: /\.vue$/,
        //     use: 'vue-loader'
        // }, 
        //     {
        //     test: /\.css/,
        //     rules: [
        //         'css/locals',
        //     ]
        // }
        //    
        //     ,
            {
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
        new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify(env)})
    ]
}

module.exports=[clientConfig,entryServerConfig,serverConfig]

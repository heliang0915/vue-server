/**
 * 定义web服务器 生产环境
 *@author heliang
 *@date 2017-05-26
 */
let env=process.env.NODE_ENV||"development";

if(env=="development"){
    console.log("babel-register 导入...")
    require('babel-register');
    //忽略css
    require('css-modules-require-hook')({
        extensions: ['.css'],
        preprocessCss: function (css, filepath) {
            return css;
        },
        camelCase: true,
        generateScopedName: '[name]__[local]__[hash:base64:8]'
    });
    //将require的图片转换为真实地址
    require('asset-require-hook')({
        extensions: ['jpg', 'png', 'gif'],
        name: '[name].[ext]',
        publicPath:'/assets/images/', //资源目录
        limit: 8000
    })

    // const hooks = require('require-extension-hooks');
    // hooks('vue').plugin('vue').push();
    // require('vuegister').register({
    //     plugins:{
    //         babel: {
    //           babelrc: true,
    //         }
    //     }
    // })
    // let loader=require('require-extension-vue');
    //
    // loader.script.register('babel', function(content,filePath,index){
    //     return content;
    // }).set('babel');
}

let app =require("./server").default;
let {conf:config} =require("./config");
let http=require('http');
let port=config.port||3000;
app.set("port",port);
let server=http.createServer(app);

server.listen(port)
let onListening=()=>{
    console.log("vue2渲染服务器启动.. 端口:%s",port);
}
let onError=(err)=>{
    if(err.code=="EADDRINUSE"){
        console.log("端口%s被占用",port);
    }else{
        console.log("出现错误%s",err.message);
    }
}
server.on('listening',onListening);
server.on('error',onError)
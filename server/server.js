import express from 'express';
import  path from 'path';
import debug from 'morgan';
import  cookieParser from 'cookie-parser';
import  bodyParser from 'body-parser';
import {env,cacheTime} from './config';
import api from './router/api';
import index from './router/index';
import history from 'connect-history-api-fallback';

let App=express();
App.use(debug('dev'));
App.use(cookieParser());
App.use(bodyParser.json());
App.use(bodyParser.urlencoded({extended:false}));
App.use((req,res,next)=>{
    let date=new Date();
    date.setTime(date.getTime()+cacheTime);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    console.log("req.originalUrl>>>"+req.originalUrl);
    let url=req.originalUrl;
    if(url.indexOf('/api/')==1){
        res.header("Cache-control","max-age:"+cacheTime);
        res.header("Expires",date.toUTCString());
    }
    next();
})

App.use("/api/",api)
App.use("/",index);

if(env!="development"){
    App.use(express.static(path.join(__dirname,"/../build/"+env)));
    App.use(express.static(path.join(__dirname,"/../build/server")));
    console.log("生产状态：静态目录地址==="+path.join(__dirname,"/../build/"+env));
}else{
    App.use(express.static(path.join(__dirname,"/../build/"+env)));
    App.use(express.static(path.join(__dirname,"/../build/dev_server")));
    console.log("开发状态：静态目录地址==="+path.join(__dirname,"/../build/"+env));

}
export default App;

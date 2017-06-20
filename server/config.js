let env=process.env.NODE_ENV||"development";
let cacheTime=24*60*60*60*1000;
//全局模板文件
let templateName="template";
let helper=require('../helper');

let config={
    development:{
        port:4000,
        api:'http://localhost:4000/api',
        proxyApi:'http://127.0.0.1:3000',
        host:helper.getLocalIp()
    },
    production:{
        port:5000,
        api:'http://localhost:5000/api',
        proxyApi:'http://127.0.0.1:3000',
        host:helper.getLocalIp()
    }
};

let conf= config[env];
export {conf,env,cacheTime,templateName};
/**
 * 服务端接口转发
 */
import fetch from 'isomorphic-fetch';
// let apiURl="https://api.github.com";
import {env,conf} from '../../config';


//转发请求
export default function(url){
    let apiURl=conf.api;
    if(url.indexOf("/api/")>-1){
        let urlReg=/(\/\w+)/;
        let  query="";
        let pathName="";
        let queryStr="";
        if(url.indexOf('?')==-1){
            url=url.replace(urlReg,'');
            url=apiURl+url;
        }else{
            query=url.split('?');
            pathName=query[0];
            queryStr=query[1]==undefined?"":query[1];
            pathName=pathName.replace(urlReg,'');
            url=apiURl+pathName+"?"+queryStr;
        }
    }
    console.log("代理后的url地址[%s]",url)
    return fetch(url).then((res)=>res.json()).then((data)=>{
        return {
            data,
            err:null
        }
        return data;
    }).catch((err)=>{
        return {
            data:null,
            err:err
        }
    });
}
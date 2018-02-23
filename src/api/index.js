/**
 * API
 */
import fetch from "../util/fetch";
import  {conf} from '../../config';
let {host,port}=conf;
let APIBase=`${host}:${port}`;

const getIndexData=(cb)=>{
    return fetch.get(`${APIBase}/data`).then((res)=>res.data).then((data)=>{
        // console.log("data>>"+data);
        cb(data);
    });
}

export {getIndexData}
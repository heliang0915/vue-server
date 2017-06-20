/**
 * Created by hotread on 2017/6/12.
 */
import * as types from './mutaion-types';
import fetch from '../util/fetch';
import {conf} from '../../server/config';
let {port,host}=conf;
let localApi=`http://${host}:${port}/api`
// export const fetchIndexList=({commit})=>{
//     return fetch.get('http://localhost:'+port+'/data').then((res)=>res.data).then((data)=>{
//         commit(types.FETCH_INDEX_LIST,data)
//     });
// }
export const fetchHotList=({commit})=>{
    return  fetch.get(`${localApi}/hot`).then((res)=>res.data.data).then((data)=>{
        commit(types.FETCH_HOT_LIST,data)
    });
}

export const fetchLimitFree=({commit})=>{
    return fetch.get(`${localApi}/limitfree`).then((res)=>res.data.data).then((data)=>{
        commit(types.FETCH_LIMIT_FREE,data)
    })
}


/**
 *Action
 */
import * as types from './mutaion-types';
import fetch from '../util/fetch';
import {conf,env} from '../../config';
let {port,host}=conf;
export const fetchIndexList=({commit})=>{
    console.log(`url>>>>http://localhost:${port}/data`);
    return fetch.get(`${host}/`+port+'/data').then((res)=>res.data).then((data)=>{
        console.log("data>>"+data);
        commit(types.FETCH_INDEX_LIST,data)
    });
}




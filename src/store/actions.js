/**
 * Created by hotread on 2017/6/12.
 */
import Vue from 'vue';
import * as types from './mutaion-types';
import fetch from '../util/fetch';
import {conf} from '../../server/config';
let {port}=conf;

export const fetchIndexList=({commit})=>{
    return fetch.get('http://localhost:'+port+'/data').then((res)=>res.data).then((data)=>{
        commit(types.FETCH_INDEX_LIST,data)
    });
}




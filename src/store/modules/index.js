/**
 * Created by hotread on 2017/6/12.
 */

import * as types from '../mutaion-types';
import {getIndexData} from '../../api/index';


/*
*初始化状态
*
* */
const state={
   list:[],
   fetching:true
}

/**
 * 定义mutations
 * @type {{}}
 */
const mutations={
    [types.FETCH_INDEX_LIST](state,payload){
        state.fetching=false;
        state.list=payload;
    }
}

/**
 *  定义actions
 * @type {{fetchIndexList: function({commit: *})}}
 */
const actions={
    fetchIndexList:({commit})=>{
        // console.log(`url>>>>http://localhost:${port}/data`);
        // return fetch.get(`${host}:`+port+'/data').then((res)=>res.data).then((data)=>{
        //     console.log("data>>"+data);
        //     commit(types.FETCH_INDEX_LIST,data)
        // });
        return getIndexData((data)=>{
            commit(types.FETCH_INDEX_LIST,data)
        })

    }
}

//定义getters
const getters={
    getIndexList:state=>{
        // console.log(state);
        return state
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}
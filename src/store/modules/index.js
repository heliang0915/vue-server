/**
 * Created by hotread on 2017/6/12.
 */

import * as types from '../mutaion-types';

const state={
   // list:[],
   // fetching:true,
   //热门小说
   hot:{
       list:[],
       fetching:true
   }



}

const mutations={
    // [types.FETCH_INDEX_LIST](state,payload){
    //     state.fetching=false;
    //     state.list=payload;
    // },
    [types.FETCH_HOT_LIST](state,payload){
        // state= Object.assign({},state.hot,{
        //     list:payload,
        //     fetching:false
        // })
        state.hot.list=payload;
        state.hot.fetching=false;
    }
}

export default {
    state,
    mutations
}
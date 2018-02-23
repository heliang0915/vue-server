/**
 * vuex store
 */
import Vue from 'vue';
import Vuex from 'vuex';
import index from './modules/index';
Vue.use(Vuex);
var store=new Vuex.Store({
    modules:{
      index
    }
})

export default  store;
/*
* 客户端下入口文件
* */
import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import configRoutes from './router';
import initFetch from './util/fetch';

Vue.config.errorHandler=function(err,vm){
  console.log('Vue出现错误%s',err);
}

//初始化fetch
initFetch();

Vue.use(VueRouter);
let config=configRoutes();
let router=new VueRouter(config);
new Vue({
	el:'#app',
	router,
	render:h=>h(App)
})




/**
 * Created by lenovo on 2017/6/11.
 */
import 'babel-polyfill';
import  axios from 'axios';
import 'nprogress/nprogress.css'
import NProgress from 'nprogress';
import Vue from 'vue';
NProgress.configure({ showSpinner: false });
//请求前拦截
axios.interceptors.request.use(function(config){
	NProgress.start();
	return config;
},function(error){
	return Promise.reject(error);
})
//响应前拦截
axios.interceptors.response.use(function(response){
	NProgress.done();
	return response;
},function (error) {
	return Promise.reject(error)
})

let Fetch={
		baseURl:"/",
		parseConfig(config){
			return config=config==null?{}:config;
		},
		get(url,config){
			return axios.get(url,this.parseConfig(config));
		},
		post(url,params,config){
			return axios.post(url,params,this.parseConfig(config));
		}
}

let initFetch=()=>{
	Vue.prototype.$http=Fetch;
	return Fetch;
}

export default initFetch;

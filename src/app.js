/*
 * 客户端下入口文件
 * */
import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import {createRouter} from './router';
// import initFetch from './util/fetch';
import store from './store';
import vueg from 'vueg';
// import 'vueg/css/transition-min.css'


export function createApp() {
    Vue.config.errorHandler = function (err, vm) {
        console.log('Vue出现错误%s', err);
    }
    //初始化fetch
    // initFetch();
    let router = createRouter();
    const options={
        // duration: '.5',              //转场动画时长，默认为0.3，单位秒
        // firstEntryDisable: false,     //值为true时禁用首次进入应用时的渐现动画，默认为false
        // firstEntryDuration: '.6',     //首次进入应用时的渐现动画时长，默认为.6
        // forwardAnim: 'fadeInRight',   //前进动画，默认为fadeInRight
        // backAnim: 'fadeInLeft',       //后退动画，默认为fedeInLeft
        // sameDepthDisable: false,      //url深度相同时禁用动画，默认为false
        // tabs: [{
        //     name:'home'
        // },{
        //     name:'my'
        // }],                       //默认为[]，name对应路由的name,以实现类似app中点击tab页面水平转场效果，如tab[1]到tab[0]，会使用backAnim动画，tab[1]到tab[2]，会使用forwardAnim动画
        // tabsDisable: false,           //值为true时，tabs间的转场没有动画，默认为false
        // disable: false,               //禁用转场动画，默认为false，嵌套路由默认为true
    }
    Vue.use(vueg,router,options);

    // router.beforeEach((to, from, next) => {
    //     // ...
    //     console.log(to);
    //     next();
    // })

    let app = new Vue({
        router,
        store,
        render: h => h(App)
    })
    return {app,router,store}
}




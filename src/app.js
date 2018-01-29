/*
 * 客户端下入口文件
 * */
import Vue from 'vue';
import App from './App.vue';
import {createRouter} from './router';


// import VueAwesomeSwiper from 'vue-awesome-swiper';
import store from './store';


export function createApp() {
    Vue.config.errorHandler = function (err, vm) {
        console.log('Vue出现错误%s', err);
    }

    // Vue.use(VueAwesomeSwiper);
    // console.dir(process);

    if (process.browser) {
        require ('swiper/dist/css/swiper.css')
        const VueAwesomeSwiper = require('vue-awesome-swiper/ssr')
        Vue.use(VueAwesomeSwiper)
    }

    //初始化fetch
    // initFetch();
    let router = createRouter();
    let app = new Vue({
        router,
        store,
        render: h => h(App)
    })
    return {app,router,store}
}




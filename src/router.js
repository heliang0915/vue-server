/**
 * Created by lenovo on 2017/6/11.
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import index from  './views/index.vue';
import about from  './views/about.vue';

Vue.use(VueRouter);

export function createRouter() {
    return new VueRouter(getConfig());
}

let getConfig = () => {
    let config = {};
    config.mode = "history";
    config.routes = [
        {path: '/', component: index},
        {path: '/about', component: about}
    ]
    return config;
};
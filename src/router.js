/**
 * Created by lenovo on 2017/6/11.
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import { indexComponent,aboutComponent} from './routes/asyncRoutes';

Vue.use(VueRouter);

export function createRouter() {
    return new VueRouter(getConfig());
}

let getConfig = () => {
    let config = {};
    config.mode = "history";
    config.routes = [
        {path: '/', component: indexComponent},
        {path: '/about', component: aboutComponent}
    ]
    return config;
};




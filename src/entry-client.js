/**
 * Created by hotread on 2017/6/12.
 */
import{createApp}from './app';
let {app,store,router}=createApp();


if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__);
    console.log('初始化状态...');
}
router.onReady(()=>{
    app.$mount('#app');
})

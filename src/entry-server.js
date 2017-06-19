/**
 * Created by hotread on 2017/6/12.
 */
require('babel-polyfill')
import{createApp}from './app';
export default  context=>{
   return new Promise((resolve, reject) => {
        const { app, router,store } = createApp()
        // set server-side router's location
        router.push(context.url)

        // wait until router has resolved possible async components and hooks
        router.onReady(() => {
            let matchedComponents = router.getMatchedComponents();
            // no matched routes, reject with 404
            if (!matchedComponents.length) {
                reject({ code: 404 })
            }
            let ary=matchedComponents.map(component => {
                // console.log(component);
                let components=component.components;
                if(Object.keys(components).length>0){
                    for(var key in components){
                        var childComponent=components[key];
                        if (childComponent.asyncData) {
                            console.log("匹配发送异步请求 inner..."+childComponent.asyncData)
                            return childComponent.asyncData(store)
                        }
                    }
                }
                if (component.asyncData) {
                    console.log("匹配发送异步请求..."+component.asyncData)
                    return component.asyncData(store)
                }
            })
            Promise.all(ary).then(() => {
                let initialState=store.state;
                resolve({app,initialState})
            }).catch((err)=>{
                reject(err);
                console.log(err);
            })
        }, reject)
    })
}
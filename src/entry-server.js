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
        let initialState=store.state;
        // wait until router has resolved possible async components and hooks
        router.onReady(() => {
            let matchedComponents = router.getMatchedComponents()
            // no matched routes, reject with 404
            if (!matchedComponents.length) {
                reject({ code: 404 })
            }
            let ary=matchedComponents.map(component => {
                if (component.asyncData) {
                    return component.asyncData(store)
                }
            })
            Promise.all(ary).then(() => {
                resolve({app,initialState:store.state})
            }).catch((err)=>{
                reject(err);
                console.log(err);
            })
        }, reject)
    })
}
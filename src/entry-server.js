/**
 * Created by hotread on 2017/6/12.
 */
require('babel-polyfill')
import{createApp}from './app';
export default  context=>{
   return new Promise((resolve, reject) => {
        const { app, router,store } = createApp()
        router.push(context.url)
        router.onReady(() => {
            let matchedComponents = router.getMatchedComponents()
            if (!matchedComponents.length) {
                reject({ code: 404 })
            }
            let ary=matchedComponents.map(component => {
                if (component.asyncData) {
                    return component.asyncData(store)
                }
            })
            Promise.all(ary).then(() => {
                context.state = store.state;
                resolve(app)
            }).catch((err)=>{
                reject(err);
                console.log(err);
            })
        }, reject)
    })
}
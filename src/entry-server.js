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
            let syncFuns=[];
            let ary=matchedComponents.map(component => {

                let components=component.components;

                console.log("component>>>"+JSON.stringify(component));


                if(Object.keys(components).length>0){

                    for(var key in components){
                        console.log("key>>"+key);
                        var childComponent=components[key];
                        console.log("childComponent>>>"+JSON.stringify(childComponent.container));
                        if (childComponent.asyncData) {
                            console.log("匹配发送异步请求 inner..."+childComponent.asyncData)
                            syncFuns.push(childComponent.asyncData(store));
                        }
                    }
                }

                if (component.asyncData) {
                    console.log("匹配发送异步请求..."+component.asyncData)
                    syncFuns.push(component.asyncData(store))
                }
            })

            Promise.all(syncFuns).then(() => {
                let initialState=store.state;
                resolve({app,initialState})
            }).catch((err)=>{
                reject(err);
                console.log(err);
            })
        }, reject)
    })
}
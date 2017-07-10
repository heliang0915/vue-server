/**
 * Created by hotread on 2017/7/10.
 */

import {isServer} from '../config';

let   getTitle=(vm)=>{
    let {title}=vm.$options;
    if(title){
        console.log("title>>>>"+title);
        return typeof title=="function"?title.call(vm):title;
    }
}

const serverTitleMixin={
    create(){
        const title=getTitle(this);
        if(title){
            this.$ssrContext.title=title;
        }
    }
}
const  clientTitleMixin={

    mounted(){
       const title=getTitle(this);
       if(title){
           document.title=title;
       }
    }
}

export default isServer?serverTitleMixin:clientTitleMixin;

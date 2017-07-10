/**
 *   SEO和路由配置
 */
import { indexComponent,aboutComponent} from '../src/routes/asyncRoutes';

let seoMap={
    "/":{
        seo:{
            title:"首页",
            keywords:"首页关键字",
            description:"首页描述",
        },
        component:indexComponent
    },
    "/about":{
        seo: {
            title: "关于",
            keywords: "关于关键字",
            description: "关于描述"
        },
        component:aboutComponent
    }
}







export default seoMap;
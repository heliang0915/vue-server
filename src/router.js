/**
 * Created by lenovo on 2017/6/11.
 */
import index from  './views/index';
import about from  './views/about';



export default ()=>{
	let config={};
	config.mode="history";
	config.routes=[
		{path: '/',component: index},
		{path: '/about',component:about}
	]
	return config;
};
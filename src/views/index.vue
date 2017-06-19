<template>
    <container>
        <banner></banner>
        <!--热门小说-->
        <hot title="热门小说" type="1"></hot>
        <!--限时免费-->
        <limitfree></limitfree>
        <!--热销榜-->
        <ranks :opt="newbookopt"></ranks>
        <!--新书抢先-->
        <newbook title="新书抢先" type="2" ></newbook>
        <!--人气完本-->
        <newbook title="人气完本" type="2"></newbook>
        <!--分类推荐-->
        <hot title="分类推荐" type="2"></hot>
        <!--编辑推荐-->
        <newbook title="编辑推荐" type="3"></newbook>
        <!--最近更新-->
        <newupdate></newupdate>
    </container>
</template>
<script>
    import container  from '../containers/main';
    import banner from '../components/banner';
    import hot from '../containers/hot';
    import limitfree from '../containers/limitfree';
    import ranks from '../containers/ranks';
    import newbook from '../containers/newbook';
    import newupdate from '../containers/newupdate';
    export default{
        data(){
            return {
                newbookopt:[{title:"热销帮",type:1,pageSize:10},{title:"热销帮1",type:2,pageSize:10},{title:"热销帮2",type:3,pageSize:10},{title:"热销帮2",type:3,pageSize:10}]
            }
        },
        components:{
            container,
            banner,
            hot,
            limitfree,
            ranks,
            newbook,
            newupdate
        }
    }
//    import {mapActions,mapGetters} from 'vuex';
//    export default{
//        computed:{
//            ...mapGetters({
//                data:'getIndexList'
//            })
//        },
//        //给服务器端使用的方法
//        asyncData(store){
//            console.log('asyncData...');
//            store.dispatch('fetchIndexList')
//        },
//        mounted(){
//            console.log('mounted....');
//            this.fetchIndexList();
//        },
//        methods:{
//            ...mapActions(['fetchIndexList'])
//        }
//    }
</script>
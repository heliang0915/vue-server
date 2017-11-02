<template>
    <!--<section>-->
        <!--<p>{{data.list}}</p>-->
        <!--<button @click="fetchIndexList">点击</button>-->
    <!--</section>-->
    <WebContainer>
            <!--banner图-->
            <Banner></Banner>
            <!--热门小说-->
            <HotStory></HotStory>
            <!--限时免费-->
            <LimitFree></LimitFree>
            <!--热销榜-->
            <HotRank></HotRank>
            <!--新书抢先-->
            <NewBook title="新书抢先"></NewBook>
            <!--人气完本-->
            <NewBook title="人气完本"></NewBook>
            <!--分类推荐-->
            <HotStory class="recommend" :isShow="true"></HotStory>
            <!--编辑推荐-->
            <NewBook title="编辑推荐"></NewBook>
            <!--最近更新-->
            <StoryUpdate></StoryUpdate>
    </WebContainer>
</template>
<style>


    .new-book .container-inner .content .side-left {
        float: left;
        width: 228px;
        border: 1px solid #eee;
    }

    .new-book .container-inner .content .side-left .side-left-inner {
        width: 190px;
        margin: 20px auto;
        text-align: center;
    }

    .new-book .container-inner .content .side-left .side-left-inner .imgs {
        position: relative;
        height: 125px;
        margin: 4px auto 0;
    }

    .new-book .container-inner .content .side-left .side-left-inner .imgs li {
        width: 82px;
        position: absolute;
        top: 0px;
        height: 90px;
        left: 10px;
        border-radius: 5px;
        border: 1px solid #eee;
        background: #FFF;
        box-shadow: 0px 0px 15px #999;
    }

    .new-book .container-inner .content .side-left .side-left-inner .imgs li a {
        height: 100%;
        width: 100%;
    }

    .new-book .container-inner .content .side-left .side-left-inner .imgs li a img {
        height: 100%;
        width: 100%;
    }

    .new-book .container-inner .content .side-left .side-left-inner .imgs li:nth-child(2) {
        left: 50px;
        z-index: 2;
        top: -5px;
        height: 100px;
    }

    .new-book .container-inner .content .side-left .side-left-inner .imgs li:nth-child(3) {
        left: 90px;
    }

    .new-book .container-inner .content .side-left .side-left-inner p {
        font-size: 18px;
    }

    .new-book .container-inner .content .side-left .side-left-inner .desc .reader {
        font-size: 12px;
        color: #999;
        margin: 4px 0;
        display: inline-block;
    }

    .new-book .container-inner .content .side-left .side-left-inner .desc p {
        text-align: left;
        font-size: 12px;
        margin-top: 5px;
    }

    .new-book .container-inner .content .side-right {
        float: left;
        width: 768px;
    }

    .update {
        padding-right: 25px;
    }

    .update .table-list {
        width: 100%;
        font-size: 12px;
        color: #808080;
    }

    .update .table-list td {
        border-top: 1px solid #ccc;
        padding: 8px 0;
    }

    .update .table-list a {
        color: #262626;
        text-decoration: none;
        font-size: 12px;
        cursor: pointer;
        display: inline-block;
    }

    .update .table-list a:hover {
        color: #ff3955 !important;
    }

    .update .table-list .classify {
        font-size: 14px;
    }

    .update .table-list .name {
        max-width: 180px;
    }

    .update .table-list .name a {
        font-size: 14px;
    }

    .update .table-list .timer {
        width: 80px;
        text-align: right;
    }

    .update .table-list .c1 {
        width: 150px;
    }

    .update .table-list .counter {
        width: 100px;
    }

    .update .table-list .desc {
        max-width: 300px;
    }

    .update .table-list .desc a {
        color: #808080;
    }



</style>
<script>
    import {mapActions,mapGetters} from 'vuex';
    import WebContainer from '../components/common/WebContainer';
    import Banner from '../components/common/Banner';
    import HotStory from '../components/HotStory';
    import LimitFree from '../components/LimitFree';
    import HotRank from '../components/HotRank';
    import NewBook from '../components/NewBook';
    import StoryUpdate from '../components/StoryUpdate';


//    import titleMixin from '../../mixin/title-mixin';
    export default{
//        mixins: [titleMixin],
//        title(){
//            return "哈哈";
//        },
        computed:{
            ...mapGetters({
                data:'getIndexList'
            })
        },
        //给服务器端使用的方法
        asyncData(store){
            console.log('asyncData...');
            store.dispatch('fetchIndexList')
        },
        mounted(){
            console.log('mounted....');
            this.fetchIndexList();
        },
        methods:{
            ...mapActions(['fetchIndexList'])
        },
        components:{
            WebContainer,
            Banner,
            HotStory,
            LimitFree,
            HotRank,
            NewBook,
            StoryUpdate
        }
    }
</script>

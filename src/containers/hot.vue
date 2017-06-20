<template>
    <div class="container" :class="type==2?'recommend':'hot'">
        <div class="container-inner">

            <div :class="(type==2)?'recommend-title':''">
                <h3 class="channelName">{{title}}</h3>
                <div class="classify-list" v-if="type==2">
                    <ul>
                        <li class="active">仙侠奇缘1</li>
                        <li>仙侠奇缘1</li>
                        <li>仙侠奇缘1</li>
                        <li>仙侠奇缘1</li>
                        <li>仙侠奇缘1</li>
                        <li>仙侠奇缘1</li>
                    </ul>
                </div>
            </div>
            {{hot.list}}
            <ul class="hot-list">
                <hotitem></hotitem>
                <hotitem></hotitem>
                <hotitem></hotitem>
                <hotitem></hotitem>
                <hotitem></hotitem>
                <hotitem></hotitem>
                <hotitem></hotitem>
                <hotitem></hotitem>
            </ul>
        </div>
    </div>
</template>
<script>
    import '../assets/css/hot';
    import hotitem from '../components/hotitem';
    import fetch  from '../util/fetch';
    import {mapActions,mapGetters} from 'vuex';
    export default{
        methods:{
            ...mapActions(['fetchHotList'])
        },
        computed:{
            ...mapGetters({
                hot:'getHotList'
            })
        },
        asyncData(store){
            console.log("store>>>>");
            store.dispatch('fetchHotList')
        },
        mounted(){
//            this.fetchHotList();
        },
        props:['title','type'],
        components:{
            hotitem
        }
    }
</script>
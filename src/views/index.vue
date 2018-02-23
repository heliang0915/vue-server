<template>
    <div>
        Hello Vue
        <ul>
            <li v-show="indexState.fetching">加载中</li>
            <li  v-for="item in indexState.list">
                {{item.author}}
            </li>

        </ul>
    </div>
</template>
<script>
    import {mapActions,mapGetters} from 'vuex';
    export default{
        computed:{
            ...mapGetters({
                indexState:'getIndexList'
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
        }
    }
</script>

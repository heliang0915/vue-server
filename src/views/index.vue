<template>
    <section>
        <p>{{data.list}}</p>
        <button @click="fetchIndexList">点击</button>
    </section>
</template>
<style>
    body{
        background: red;
    }
</style>
<script>
    import {mapActions,mapGetters} from 'vuex';
    export default{
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
        }
    }
</script>

<template>
    <div class="container">
        <div class="container-inner">
            <div class="ranks">
                <rankitem :key="index" v-for="(obj,index) in opt" :style="{width:w}"  :config="obj"></rankitem>
            </div>
        </div>
    </div>
</template>
<script>
    import  '../assets/css/ranks';
    import rankitem from '../components/rankitem';
    export default{
        props:['opt'],
        data(){
            return {
                w:(100/this.opt.length)+"%"
            }
        },
        components:{
            rankitem
        }
    }
</script>
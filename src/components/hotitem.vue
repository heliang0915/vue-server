<!--热门小说模式每一项 作为一个组件-->
<template>
    <li>
        <img-comp :pic="item.pic"></img-comp>
        <p>{{item.title}}</p>
    </li>
</template>
<script>
    import imgComp from './commons/imgComp';
    export default {
        props:['item'],
        components:{
            imgComp
        }
    }
</script>

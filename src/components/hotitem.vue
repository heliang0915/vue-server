<!--热门小说模式每一项 作为一个组件-->
<template>
    <li>
        <div class="div-img">
            <a href="#">
                <img :src="item.pic" alt="图片">
            </a>
        </div>
        <p>{{item.title}}</p>
    </li>
</template>
<script>
    import '../assets/css/hotitem.css';
    export default {
        props:['item']
    }
</script>

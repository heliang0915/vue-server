<template>
    <section>
        about
        <i></i>
        <img src="../../assets/images/banner1.jpg" alt="">
    </section>
</template>

<style>
    i{
        background: url("../../assets/images/banner1.jpg") no-repeat;
        display: block;
    }
    i:after{
        width: 100px;
        height:100px;
        display: block;
        font-family: 'iconfont';
        content: "\e742";
        font-size:100px;
    }
</style>
<script>
    export default{
        mounted(){
            console.log(this);
        }
    }
</script>
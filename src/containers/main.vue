<template>
    <section class="wrap">
        <header-comp></header-comp>
        <!--主要内容-->
        <div class="main">
            <div class="main-inner">
                <slot></slot>
            </div>
        </div>
        <footer-comp></footer-comp>
        <!--index <a href="/about">转场</a>-->
        <!--{{data.list}}-->
    </section>
</template>
<script>
    import headerComp  from '../components/layout/header.vue';
    import footerComp  from '../components/layout/footer.vue';
    export default{
        components:{
            'header-comp':headerComp,
            'footer-comp':footerComp
        }
    }
</script>
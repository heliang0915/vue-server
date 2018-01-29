<template>
    <div id="app">
        <transition name="fade-router" mode="in-out">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </transition>
    </div>
</template>
<script>
    import '../assets/css/common';
</script>
<style>
    .fade-router-enter-active,.fade-router-leave-active{
        transition: all .5s ease-in-out;
    }

    .fade-router-enter{
        transform:translateX(100%);
    }
    .fade-router-leave{
        transform:translateX(-100%);
    }

    .fade-router-enter,.fade-router-leave-active{
        opacity: 0;
    }
</style>
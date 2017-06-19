
<template>
    <div class="container new-book">
        <div class="container-inner">
            <h3 class="channelName">{{title}}</h3>
            <div class="content">
                <leftitem></leftitem>
                <div class="side-right">
                    <sideitem></sideitem>
                    <sideitem></sideitem>
                    <sideitem></sideitem>
                    <sideitem></sideitem>
                </div>
            </div>
        </div></div>
</template>

<script>
    import leftitem from '../components/leftitem';
    import sideitem from '../components/rightitem';
    import '../assets/css/newbook'

    export default {
        props:['title'],
        components:{
            leftitem,
            sideitem
        }
    }
</script>
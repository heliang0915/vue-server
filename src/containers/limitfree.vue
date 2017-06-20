<template>
    <!--限时免费-->
    <div class="limit-free">
        <ul class="limit-free-list">
            <li>
                <!--limitFree>>> {{limitFree}}-->
                <div class="free-item-first">
                    <h3>限时免费</h3>
                    <p>VIP章节免费读</p>
                    <div class="clock">
                        <img src="https://qidian.gtimg.com/readnovel/images/index/icon-time_2x.0.1.png" alt="">
                    </div>
                    <em>2天19:02:39</em>
                    <a href="">进入限免频道 &gt;</a>
                </div>
            </li>
            <li class="free-item" v-for="item in limitFree.list">
                <div class="free-item-inner">
                    <div class="div-img">
                        <a href="#">
                            <img :src="item.pic" alt="图片">
                        </a>
                    </div>
                    <p><a href="###">{{item.title}}</a></p>
                    <p>
                        <del>{{item.price}}</del>
                    </p>
                    <a class="btn" href="">
                        立即阅读
                    </a>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
   import  '../assets/css/limitfree';
   import {mapGetters,mapActions} from 'vuex';

   export default{
       methods:{
           ...mapActions(['fetchLimitFree'])
       },
       computed:{
           ...mapGetters({
               limitFree:'getLimitFreeList'
           })
       },
       asyncData(store){
           store.dispatch('fetchLimitFree')
       },
       mounted(){
           this.fetchLimitFree();
       }
   }

</script>
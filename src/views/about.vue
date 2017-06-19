<template>
    <section style="height:500px;">
        about
        <a @click="this.back">返回</a>
        <a href="/linkme/123">转</a>
    </section>
</template>


<script>
    export default{
        data(){
            return {
//                vuegConfig: {
//                    forwardAnim: 'bounceInRight',
//                    backAnim: 'bounceInLeft',
//                    duration: '3'
//                } 
            }
        },
        methods:{
          back(){
              this.$router.back();
          }
        },
        mounted(){
            console.log(this);
        }
    }
</script>

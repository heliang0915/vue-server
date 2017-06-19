<template>
    <section>
         linkMe
        <a @click="this.back">about</a>
    </section>
</template>
<script>
    export default {
//        data(){
//          return {
//              id:this.$route.params.id
//          }
//        },
        methods:{
            back(){
                this.$router.back();
            }
        }
    }
</script>
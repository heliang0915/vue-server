<template>
    <section>
        index
        {{list}}
    </section>
</template>
<script>
    export default{
    	data(){
    		return {
    			list:[]
            }
        },
        mounted(){
    		this.$http.get('https://api.github.com/users').then(({data})=>{
                this.list=data;
            })
        }
    }
</script>
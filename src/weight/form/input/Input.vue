<template>
    <div>
        <input class="input-com"  :placeholder="placeholder"  type="text" v-model="currentVal" >
    </div>
</template>
<style>
    .input-com{
        border:1px solid #ccc;
        padding:8px 10px;
        border-radius: 3px;
        outline:none;
        margin: 10px;
        font-size:14px;
    }
</style>
<script>
    export default {
        name:"x-input",
        props:{
            require:{
                type:Boolean,
                default:false
            },
            reg:{
               type:String,
               default:''
            },
            placeholder:{
                type:String,
                default:''
            },
            value:{
                type:String
            }
        },
        data(){
            return {
                currentVal:this.value
            }
        },
        computed:{
            //组件校验状态
            valid(){
                let checkState=(!(this.require&&this.currentVal==""));
                if(checkState){
                    //再校验是否设置了正则
                    if(this.reg!=''){
                        let regExp=new RegExp(this.reg,'g');
                        checkState=regExp.test(this.currentVal);
                    }
                }
                return  checkState;
            }
        },
        watch:{
            currentVal(val){
                this.$emit('input',val)
            }
        }
    }
</script>
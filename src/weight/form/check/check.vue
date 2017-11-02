<template>
    <div class="checkbox-wrap" @click="toggle">
        <div class="checkbox">
            <div class="checkbox-inner" :class="{'checked':isCheck}"></div>
        </div>
        <span class="label">
            <slot></slot>
        </span>
    </div>
</template>
<style>
    .checkbox-wrap{
        position: relative;
        height: 20px;
        float: left;
    }
    .checkbox-wrap .check, .check-wrap .label{
        float: left;
        margin-right: 4px;
    }
    .checkbox{
        height: 12px;
        width: 12px;
        border: 2px solid #FFA000;
        position: relative;
        display: block;
        overflow: hidden;
        float: left;
    }
    .checkbox-inner{
        height: 10px;
        width: 4px;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -3px;
        margin-top: -8px;
        transition: all .2s;
        transform: scale(0) rotate(45deg);
        border-bottom: 3px solid #FFA000;
        border-right: 3px solid #FFA000;
    }
    .checked{
        transform: scale(1) rotate(45deg);
    }
</style>
<script>
    export default{
        props:{
            checkList:{
                type:Array
            },
            val:{
                type:Number
            }
        },
        computed:{
            isCheck(){
                return  this.checkList.indexOf(this.val)==-1?false:true;
            }
        },
        methods:{
            toggle(){
                this.$emit('checkChange',this.val)
            }
        }
    }
</script>
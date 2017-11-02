<template>
    <div class="radio-wrap" @click="toggle">
        <div class="radio">
            <div class="check-inner" :class="{'radioed':isCheck}"></div>
        </div>
        <span class="label">
            <slot></slot>
        </span>
    </div>
</template>
<style>
    .radio-wrap{
        position: relative;
        height: 20px;
        float: left;

    }
    .radio-wrap .check, .radio-wrap .label{
        float: left;
        margin-right: 4px;
    }
    .radio{
        height: 12px;
        width: 12px;
        border: 2px solid #FFA000;
        border-radius: 50%;
        position: relative;
        display: block;
        overflow: hidden;
        float: left;
    }
    .check-inner{
        height: 8px;
        width: 8px;
        background: #FFA000;
        border-radius: 50%;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -4px;
        margin-top: -4px;
        transition: all .2s;
        transform: scale(0);
    }
    .radioed{
        transform: scale(1);
    }
</style>
<script>
    export default{
        props:{
            checkVal:{
               type:Number
            },
            val:{
                type:Number
            }
        },
        computed:{
            isCheck(){
                return (this.val==parseInt(this.checkVal));
            }
        },
        methods:{
            toggle(){
                this.$emit('radioChange',this.val)
            }
        }
    }
</script>
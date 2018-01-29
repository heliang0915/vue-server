<template>
    <div class="x-select-wrap">
        <div class="x-select" :style="{width:width+'px'}" @click="showListFn">
            <input type="text" :style="{width:(width-20)+'px'}" readonly="readonly" :value="selectValue" :placeholder="placeholder">
            <div :class="{'x-select-trigger-wrap':true}">
                <span :class="{'x-select-trigger':true,'active':showList}"></span>
            </div>
        </div>
        <transition tag="div" name="fade">
            <div class="x-list" :style="{width:(width+10)+'px'}" v-show="showList" @click="selectChange($event)">
                <span :key="index" :data-val="item[valFiled]"  :data-label="item[labelFiled]" v-for="(item,index) in list">
                    {{item[labelFiled]}}
                </span>
            </div>
        </transition>
        <em></em>
    </div>
</template>
<style>
    .x-select-wrap{
        position: relative;
        padding-right: 100px;
        margin-left:100px;
        -webkit-user-select:none;
    }
    .x-select{
        border-radius:3px;
        padding: 1px 6px;
        height:30px;
        line-height: 28px;
        width:160px;
        border:1px solid #ccc;
    }
    .x-select input{
        font-size: 14px;
        border: 0;
        -webkit-user-select:none;
    }



    .x-list{
        background: #FFF;
        border: 1px solid #ccc;
        margin-top:4px;
        border-radius:2px;
        height:150px;
        overflow: auto;
        transform-origin:top;
        backface-visibility:hidden;
        transform-style: preserve-3d;
        position: relative;
    }
    .x-select-trigger-wrap{
        display: inline-block;
        /*transition: all .3s;*/
        /*transform-origin:0 0;*/

    }

    /*.x-select-trigger-wrap.active{*/
        /*transform: rotate(180deg);*/
    /*}*/

    /*.x-select-trigger{*/
        /*transition: all .3s;*/
        /*transform-origin:50% 50%;*/
    /*}*/

    .x-select-trigger{
        display: inline-block;
        position:relative;
        top:-2px;
        border:1px solid #999;
        height:5px;
        width: 5px;
        border-right-color:transparent;
        border-top-color:transparent;
        transform: rotate(-45deg);
        transition: all .3s;
        transform-origin:0 100%;
    }

    /*.x-select-trigger.active{*/
        /*transform: rotate(135deg);*/
    /*}*/
    .x-list span{
        line-height: 30px;
        height:30px;
        padding:0 4px;
        display: block;

    }
    .x-list span:hover{
        background: #f5f7fa;
    }
    .fade-enter-active,.fade-leave-active{
        transition: all .3s ease-in-out;
    }
    .fade-enter,.fade-leave-active{
        opacity:0;
        transform:rotateX(90deg);
    }
</style>
<script>
    export default {
        name: "x-select",
        data() {
            return {
                selectValue:'',
                showList:false
            }
        },
        props: {
            width:{
                default:200,
                type:Number
            },
            list:{
                type:Array,
                default:[]
            },
            valFiled:{
                type:String,
                default:""
            },
            labelFiled:{
                type:String,
                default:""
            },
            placeholder:{
                type:String,
                default:""
            }
        },
        methods: {
            showListFn(e){
                e.stopPropagation();
                this.showList=!this.showList
            },
            selectChange(e){
                e.stopPropagation();
                let target=e.target;
                this.selectValue=target.getAttribute('data-val');
                this.showList=false;
                this.$emit('changSelect',this.selectValue)
            },
            initEvent:function () {
                var _this=this;
                document.body.addEventListener('click',()=>{
                    console.log("click~~");
                    _this.showList=false;
                })
            }
        },
        mounted(){
            this.initEvent();
        }
    }
</script>
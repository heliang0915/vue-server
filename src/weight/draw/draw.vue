<template>
    <div>
        <ul class="card-list">
            <li v-for="(item,index) in list" class="card-item" @click="animatePage(index)">
                <div v-if="animateIndex==index" class="card-item-container">
                    <div :class="{'animate':(animateIndex==index),'card':true}">
                        <div class="box front">{{frontTxt}}</div>
                        <div class="box back">{{item[txtFiled]}}</div>
                    </div>
                </div>

                <div v-else class="card-item-container">
                    <div :class="{'animate':animated,'card':true}">
                        <div class="box front">{{frontTxt}}</div>
                        <div class="box back">{{item[txtFiled]}}</div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>
<style>
    /*翻版效果开始*/
    .card-list {
        width: 400px;
    }

    .card-item {
        float: left;
        margin: 10px;
    }
    .card-item-container {
        width: 100px;
        height: 150px;
        line-height: 150px;
        text-align: center;
        position: relative;
        perspective: 800px;
    }

    .card {
        width: 100%;
        height: 100%;
        position: absolute;
        transform-style: preserve-3d;
        transition: transform .5s;
        cursor: pointer;
    }

    .box {
        width: 100%;
        height: 100%;
        position: absolute;
        color: #fff;
        /*隐藏旋转元素的背面不可见*/
        backface-visibility: hidden;
    }

    .card .front {
        background: red;
    }

    .card .back {
        background: blue;
        transform: rotateY(180deg);
    }

    .animate {
        transform: rotateY(180deg);
    }
    /*翻版效果结束*/
</style>
<script>
    export default {
        name: 'x-draw',
        props: {
            list: {
                type: Array,
                default:()=> []
            },
            //翻牌前的信息
            frontTxt: {
                type: String,
                default: ''
            },
            //翻牌后的信息
            txtFiled:{
                type: String,
                default: ''
            },
            //取值字段
            valFiled: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                animateIndex: -1,
                animated:false
            }
        },
        methods: {
            restBtn() {
                this.animateIndex = -1;
                this.animated=false;
            },
            animatePage(ind) {
//                if (this.animateIndex == -1) {
                    this.animateIndex = ind;
                    setTimeout(()=>{
                        this.animated=true;
                    },400)
                    let val=this.list[ind][this.valFiled];
                    this.$emit("getVal",val,ind)
                    console.log(val);
                    setTimeout(()=>{
                        this.restBtn()
                    },5000)
//                }
            }
        }
    }
</script>
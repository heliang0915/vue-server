<template>
    <section>
        about
        <i></i>
        <img src="../../assets/images/banner1.jpg" alt="">
        <div class="scroll">
            <ul v-scroll :style="{marginTop:marginTop+'px'}">
                <li>1111</li>
                <li>333</li>
                <li>333</li>
                <li>33</li>
                <li>4555</li>
                <li>666</li>
                <li>333</li>
                <li>333</li>
            </ul>
        </div>
        <!--<div class="item">-->
            <!--<Radio label="篮球" @radioChange="change" :checkVal=radioVal :val=1></Radio>-->
            <!--<Radio label="足球" @radioChange="change" :checkVal=radioVal :val=2></Radio>-->
            <!--<Radio label="乒乓球" @radioChange="change" :checkVal=radioVal :val=3></Radio>-->
            <!--<Radio label="冰球" @radioChange="change" :checkVal=radioVal :val=4></Radio>-->
        <!--</div>-->

        <!--<div class="item">-->
            <!--<Check label="篮球" @checkChange="changeChk" :checkList="checkList" :val=1></Check>-->
            <!--<Check label="篮球21" @checkChange="changeChk" :checkList=checkList :val=2></Check>-->
            <!--<Check label="篮球3" @checkChange="changeChk" :checkList=checkList :val=3></Check>-->
            <!--<Check label="篮球3" @checkChange="changeChk" :checkList=checkList :val=4></Check>-->
        <!--</div>-->
        <div>
            <x-input v-model="val"></x-input>
            {{val}}
        </div>
        <div>
            <transition name="m">
                <p v-show="isShow">改变~~~~~</p>
            </transition>
            <button @click="changeShow">改变2</button>
        </div>
    </section>
</template>
<style>
    .scroll {
        overflow: hidden;
        height: 200px;
        width: 400px;
        border: 1px solid #ccc;
    }

    .scroll li {
        line-height: 24px;
    }

    .item {
        overflow: hidden;
    }

    i {
        background: url("../../assets/images/banner1.jpg") no-repeat;
        display: block;
    }

    i:after {
        width: 100px;
        height: 100px;
        display: block;
        font-family: 'iconfont';
        content: "\e742";
        font-size: 10px;
    }

    /*.move-enter-active, .move-leave-to {*/
        /*color: red;*/
        /*transform: translateX(100px);*/
    /*}*/

    /*.move{*/
        /*!*transform: translateX(100px);*!*/
    /*}*/
    /*.move-enter-active,.move-leave-to{*/

        /*transition: all 1s;*/
        /*transform: translateX(200px);*/
    /*}*/

    /*.move-enter, .move-leave-to {*/
        /*opacity: 1;*/
        /*color: red;*/
        /*transform: translateX(300px);*/
    /*}*/
    
    @keyframes myAnimate {
        0%{
            transform: scale(0);
            color: red;
        }
        50%{
            transform: scale(2.5);
            color: blue;
        }
       100%{
           transform: scale(1);
           color: yellow;
        }
    }

    .m-enter-active{
        animation:myAnimate 9s ;
    }
    .m-leave-active{
        animation:myAnimate 9s reverse;
    }


</style>
<script>
    import Check from '../weight/form/check/check';
    import Radio from '../weight/form/radio/radio';
    import XInput from '../weight/form/input/Input';
    import xDraw from '../weight/draw/draw';
    export default {
        data() {
            return {
                isShow: false,
                marginTop: 0,
                radioVal: 3,
                checkList: [],
                val: '123',
                animateIndex:-1
            }
        },
        methods: {
            changeShow() {
                this.isShow = !this.isShow;
            },
            restBtn(){
                this.animateIndex=-1;
            },
            animatePage(ind){
                if(this.animateIndex==-1){
                    this.animateIndex=ind;
                    setTimeout(()=>{
                        console.log(this.list[ind].prize);
                    },500)
                }
            },
            change(val) {
                this.radioVal = val;
                console.log(this.radioVal)
            },
            changeChk(val) {
                var index = this.checkList.indexOf(val);
                if (index == -1) {
                    this.checkList.push(val);
                } else {
                    this.checkList.splice(index, 1)
                }
                console.log(this.checkList)
            }
        },

        mounted() {
            console.log(this);
        },
        directives: {
            scroll: {
                bind: function (el, binding, vnode) {
//                    var item = el;
//                    var lis = el.children;
//                    var vm = vnode.context;
//                    setInterval(() => {
//                        vm.marginTop -= 1;
//                    }, 100)
                }
            }
        },
        components: {
            Radio,
            Check,
            XInput
        }
    }
</script>
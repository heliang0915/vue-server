<template>
    <section class="pos">
        about
        <i></i>
        <img src="../../assets/images/banner1.jpg" alt="">
        <div class="scroll">
            <!--<ul v-scroll :style="{marginTop:marginTop+'px'}">-->
                <!--<li>e1111</li>-->
                <!--<li>333</li>-->
                <!--<li>333</li>-->
                <!--<li>33</li>-->
                <!--<li>4555</li>-->
            <!--</ul>-->
        </div>
        <button @click="changeList">button</button>
        <div>

            <transition-group name="list2" tag="div">
                <div v-for="item in list" class="item2" :key="item">
                  {{item}}
                </div>
            </transition-group>
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
                <p v-show="isShow">改变1~~~~~</p>
            </transition>
            <button @click="changeShow">改变q2</button>
        </div>
        <router-link to="/weight">返回</router-link>
        <input type="text" v-focus.a.b.c="isShow">
        <input type="text" data-drink-time="tea" id="abc">
        {{isShow|filterVal}}

        <banner></banner>
    </section>
</template>
<style>
    /*body{*/
        /*background: red;*/
    /*}*/
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

    .list2-move{
        transition: all 1s ease;
    }
    .list2-enter-active, .list2-leave-active {
        transition: all .5s;
    }
    .list2-enter, .list2-leave-to {
        opacity: 0;
        transform: translateY(30px);
    }

    .fadeIn-enter-active,.fadeIn-leave-active {
        transition: all 1s ease;
    }
    .fadeIn-enter-active,.fadeIn-leave{
        opacity: 1;
    }
    .fadeIn-enter,.fadeIn-leave-active {
        opacity: 0;
    }
</style>

<script>
    import Check from '../weight/form/check/check';
    import Radio from '../weight/form/radio/radio';
    import XInput from '../weight/form/input/Input';
    import xDraw from '../weight/draw/draw';
    import banner from '../weight/banner/banner';

    let mixin={
        mounted(){
            console.log("全局的mixin");
        },
        filters:{
            filterVal(val){
                return val+"--过滤--";
            }
        }
    }


    export default {
        mixins:[mixin],
        data() {
            return {
                isShow: false,
                marginTop: 0,
                radioVal: 3,
                checkList: [],
                val: '123',
                animateIndex:-1,
                list:['a','b','c','d']
            }
        },
        methods: {
            changeList(){
              console.log("changeList>>>>");
//              this.list=this.list.reverse();
//              setTimeout(()=>{
                  this.list.push(1);
//              },1000)

            },
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
            console.log("组件的方法");
            let dom=document.querySelector("#abc");
            console.log(dom.dataset.drinkTime);
        },
//        directives: {
//            scroll: {
//                bind: function (el, binding, vnode) {
////                    var item = el;
////                    var lis = el.children;
////                    var vm = vnode.context;
////                    setInterval(() => {
////                        vm.marginTop -= 1;
////                    }, 100)
//                }
//            }
//        },
        components: {
            Radio,
            Check,
            XInput,
            banner
        },

        directives:{
            focus:{
                bind(el,binding){
                    console.log("el......"+el);
                    console.log("binding......"+JSON.stringify(binding));
                    el.focus();
                    el.style.backgroundColor="red";
                }
            }

        }
    }
</script>
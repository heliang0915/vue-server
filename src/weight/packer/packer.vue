<template>
<div>
    <input type="text" @change="change">
    <div class="dp-wrap" :style="{transform: 'translate('+dialogTran+'%)'}" v-cloak>
        <div class="dp-title">
            <span class="dp-btn dp-lf" @touchEnd="cancelHandler">取消</span>
            <span class="dp-btn ok dp-lr" @touchEnd="okHandler">确定</span>
        </div>
        <div class="dp-container">
            <span class="dp-split"></span>
            <ul class="dp-list">
                <li class="dp-item" :class="{'dp-item-active':active}"  @touchmove="touchMoveFn" @touchend="touchEndFn"  @touchstart="touchStartFn" :style="{transform: 'translate3d(0,'+translateY+'px,0)'}" >
                    <div v-for="(col,index) in col1" :class="[dpIndex==index?'dp-active':'']">
                        {{col}}
                    </div>
                </li>
                <li class="dp-item" :class="{'dp-item-active':active}"  @touchmove="touchMoveFn" @touchend="touchEndFn"  @touchstart="touchStartFn" :style="{transform: 'translate3d(0,'+translateY+'px,0)'}" >
                    <div v-for="(col,index) in col2" :class="[dpIndex==index?'dp-active':'']">
                        {{col}}
                    </div>
                </li>

            </ul>
        </div>
    </div>
    <div class="dp-mask" v-show="mask"></div>
</div>
</template>
<style>
    .dp-lf {
        float: left;
    }

    .dp-lr {
        float: right;
    }

    .dp-wrap {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        background: #FFF;
        z-index: 2;
        /*transform: translate(-100%);*/
    }

    .dp-active {
        color: #FF9900;
        opacity: 1;
        font-weight: bold;

    }

    .dp-btn {
        display: inline-block;
        padding: 10px 20px;
    }

    .ok {
        color: #FF9900;
    }

    .dp-title {
        border-bottom: 1px solid #eee;
        border-top: 1px solid #eee;
        overflow: hidden;
    }

    .dp-container {
        /*height: 100px;*/
    }

    .dp-list {
        display: flex;
        overflow: hidden;
        height: 200px;
    }

    .dp-list .dp-item {
        display: inline-block;
        font-size: 1em;
        color: #333;
        text-align: center;
        flex: 1;
        transition: all .3s ease-out;
        opacity: 0.5;
        /*font-weight:bold;*/
    }

    .dp-item::before, .dp-item::after {
        content: "";
        display: inline-block;
        padding: 36px 0;
    }

    /*.dp-item-active::before{*/
    /*padding: 35px 0;*/
    /*}*/

    .dp-list .dp-item div {
        /*padding: 7px 0;*/
        height: 36px;
    }

    .dp-split {
        background-image: linear-gradient(to bottom, #d0d0d0, #d0d0d0, transparent, transparent), linear-gradient(to top, #d0d0d0, #d0d0d0, transparent, transparent);
        width: 100%;
        height: 36px;
        display: inline-block;
        background-position: top, bottom;
        background-size: 100% 1px;
        background-repeat: no-repeat;
        position: absolute;
        left: 0;
        top: 2.4rem;
        z-index: -1;
    }

    .dp-mask{
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background:rgba(0,0,0,.3);
        /*display: none;*/
        z-index: 1;
    }
</style>
<script>
    export default {
        name: 'x-packer',
        data() {
            return {
                col1: ["北京市", "天津市", "河北省", "山西省", "内蒙古", "辽宁省", "吉林省", "黑龙江省", "上海市", "江苏省", "浙江省", "安徽省", "福建省", "江西省", "山东省", "河南省", "湖北省", "湖南省", "广东省", "广西省", "海南省", "重庆市", "四川省", "贵州省", "云南省", "西藏省", "陕西省", "甘肃省", "青海省", "宁夏省", "新疆省", "台湾", "香港特区", "澳门特区"],
                col2: ["北京市2", "天津市2", "河北省2"],
                dialogTran: '-100',
                mask:false,
                translateY: 0,
                startPos:0,
                movePos:0,
                active:false,
                dpIndex:-1
            }
        },
        methods: {
            change: function () {
                if (this.dialogTran == -100) {
                    this.dialogTran = 0;
                    this.mask=true;
                    this.scrollMove(2);
                } else {
                    this.dialogTran = -100;
                    this.mask=false;
                    this.scrollMove(0);
                }
            },
            okHandler(){

                console.log('ok'+this.col1[this.dpIndex]);
            },
            cancelHandler(){
                console.log('cancelHandler');
            },
            touchStartFn: function (e) {
                e.preventDefault();
                e = e.changedTouches[0];
                this.startPos = e.pageY;
            },
            touchMoveFn: function (e) {
                //console.log(e.target);
                e.preventDefault();
                e = e.changedTouches[0];
                var _self = this;
                //上一次滚动的位置
                var oldPos =this.translateY;
                this.movePos=e.pageY;
                var add = (Math.abs(this.movePos) - Math.abs(this.startPos)) * 3 / 20;
                var size = _self.getSize();
                //小幅度滚动时的判断
                if (Math.abs(add) < 2) {
                    add *= 0.01;
                }
                //实时计算当前滚动的位置
                var pos = add + oldPos;
                var len = _self.getListLength(e);
                //最大阀值
                var max = (len - 1) * size;
                //边界判断
                if (Math.abs(pos) >= Math.abs(max)) {
                    pos = -max;
                    console.log(pos);
                } else if (pos > 0) {
                    pos = 0;
                }
                this.translateY=pos;
            },
            getItems: function () {
                var items = document.querySelectorAll(".dp-item");
                return items;
            },
            getSize: function () {
                var dpSplit = document.querySelector(".dp-split");
                var size = parseFloat(window.getComputedStyle(dpSplit).height);
                return size;
            },
            touchEndFn: function (e) {
                var _self = this;
                e.preventDefault();
                _self.selectedItem();
            },
            //滚动动作
            scrollMove: function (index) {
                var _self = this;
                var items = _self.getItems();
                var size = _self.getSize();
                [].slice.apply(items).forEach(function (item, ind) {
                    // item.style.WebkitTransform = "translate3d(0,-" + (ind + 1 + ind * 2) * size + "px,0)";
                    _self.translateY=-index* size;
                    _self.selectedItem();
                })
            },

            //最后选中元素
            selectedItem: function () {
                var size = this.getSize();
                var oldPos =this.translateY;
                //获取整数倍位置防止滑动过头
                oldPos = Math.floor(this.getInteger(oldPos));
                //每一个元素对应的索引以便快速能够找到对应元素
                var index = Math.floor(Math.abs(oldPos / size));
                this.translateY=oldPos;
                this.active=true;
                this.dpIndex=index;

            },
            //获取选中列表长度
            getListLength: function (e) {
                var target=e.target.parentNode;
                var len = target.children.length;
                return len;
            },
            //获取滚动的整数倍位置
            getInteger: function (pos) {
                var size = this.getSize();
                return Math.floor(pos / size) * size;
            }
        }
    }
</script>
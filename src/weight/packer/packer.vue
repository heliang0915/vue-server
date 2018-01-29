<template>
    <div>
        <button @click="changeState">Packer</button>
        <div class="dp-wrap" :style="{transform: 'translate('+dialogTran+'%)'}" v-cloak>
            <div class="dp-title">
                <span class="dp-btn dp-lf" @click="cancelHandler">取消</span>
                <span class="dp-btn ok dp-lr" @click="okHandler">确定</span>
            </div>
            <div class="dp-container">
                <span class="dp-split"></span>
                <ul class="dp-list">
                    <li class="dp-item" :ref="'item_'+key" v-for="(item,key) in packerData" @touchmove="touchMoveFn"
                        @touchend="touchEndFn" @touchstart="touchStartFn">
                        <div :data-val="pk.val" v-for="pk in item">
                            {{pk.label}}
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
    }
    .dp-item::before, .dp-item::after {
        content: "";
        display: inline-block;
        padding: 36px 0;
    }
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
        top: 6.44em;
        z-index: -1;
    }

    .dp-mask {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background: rgba(0, 0, 0, .3);
        z-index: 1;
    }
</style>
<script>
    export default {
        name: 'x-packer',
        props: {
            packerData: {
                type: Object,
                default: []
            },
            callbackField:{
                type:String,
                default:''
            },
            selectVal:{
                type:String,
                default:""
            },
            separator:{
                type:String,
                default:" "
            }
        },
        data() {
            return {
                selectTxt:'',
                dialogTran: '-100',
                mask: false,
                active: false
            }
        },
        methods: {
            changeState: function () {
                if (this.dialogTran == -100) {
                    this.dialogTran = 0;
                    this.mask = true;
                    this.scrollMove(2);
                } else {
                    this.dialogTran = -100;
                    this.mask = false;
                    this.scrollMove(0);
                }
            },
            okHandler: function () {
                var selectTxt=this.getSelectedTxt();
                this.$emit('getSelect',selectTxt)
                this.changeState();
            },
            cancelHandler: function () {
                // console.log('cancelHandler');
                this.changeState()
            },
            touchStartFn: function (e) {
                var dom = e.target.parentNode;
                e.preventDefault();
                e = e.changedTouches[0];
                dom.startPos = e.pageY;
            },
            touchMoveFn: function (e) {
                var dom = e.target.parentNode;
                e.preventDefault();
                e = e.changedTouches[0];
                var _self = this;
                //上一次滚动的位置
                var oldPos = dom.translateY == undefined ? 0 : dom.translateY;
                // this.movePos=e.pageY;
                dom.movePos = e.pageY;
                var add = (Math.abs(dom.movePos) - Math.abs(dom.startPos)) * 3 / 20;
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
                } else if (pos > 0) {
                    pos = 0;
                }
                dom.style.WebkitTransform = "translate3d(0," + pos + "px,0)"
                dom.translateY = pos;
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
                var dom = e.target.parentNode;
                var _self = this;
                e.preventDefault();
                _self.selectedItem(dom);
            },
            //滚动动作
            scrollMove: function (index) {
                var _self = this;
                var items = _self.getItems();
                var size = _self.getSize();




                [].slice.apply(items).forEach(function (item, ind) {

                    item.style.WebkitTransform = "translate3d(0,-" + (ind + 1 + ind * 2) * size + "px,0)";
                    item.translateY = -index * size;
                    _self.selectedItem(item);


                })
            },

            //获取要设置滚动位置的索引
            getSetValIndex(){
                this.selectVal
            },

            //最后选中元素
            selectedItem: function (dom) {
                var size = this.getSize();
                var oldPos = dom.translateY;
                //获取整数倍位置防止滑动过头
                oldPos = Math.floor(this.getInteger(oldPos));
                //每一个元素对应的索引以便快速能够找到对应元素
                var index = Math.floor(Math.abs(oldPos / size));
                dom.translateY = oldPos;
                dom.style.WebkitTransform = "translate3d(0," + oldPos + "px,0)";
                for (var i = 0; i < dom.parentNode.children.length; i++) {
                    dom.parentNode.children[i].className = "dp-item";
                }
                dom.className = "dp-item dp-item-active";
                dom.setAttribute('selectIndex', index);
                for (var i = 0; i < dom.children.length; i++) {
                    dom.children[i].className = "";
                }
                dom.children[index].className = "dp-active";

            },
            //获取选中列表长度
            getListLength: function (e) {
                var target = e.target.parentNode;
                var len = target.children.length;
                return len;
            },
            //获取滚动的整数倍位置
            getInteger: function (pos) {
                var size = this.getSize();
                return Math.floor(pos / size) * size;
            },
            getSelected: function () {
                var _self = this;
                var selectAry = [];
                Object.keys(this.packerData).forEach(function (key, index) {
                    var selectIndex = _self.$refs['item_' + key][0].getAttribute('selectIndex');
                    var selectItemData = _self.packerData[key][selectIndex];
                    selectAry.push(selectItemData);
                })
                return selectAry;
            },
            getSelectedTxt(){
                var selectAry=this.getSelected();
                var txt="";
                var _this=this;
                selectAry.forEach(function(item){
                    txt +=_this.separator+item[_this.callbackField]
                })
                return txt;
            }
        }
    }
</script>
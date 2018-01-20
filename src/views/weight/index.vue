<template>
    <div>
        WellCome to Weight Index!
        <br>
        <br>
        <div class="item">
            <x-draw :list="list"
                    frontTxt="翻翻看"
                    @getVal="drawVal"
                    txtFiled="prize"
                    valFiled="id"
                    ref="draw">
            </x-draw>
        </div>
        <div class="item">
            <Radio @radioChange="radioChange" :checkVal=radioVal :val=1>梦奇</Radio>
            <Radio @radioChange="radioChange" :checkVal=radioVal :val=2>妲己</Radio>
            <Radio @radioChange="radioChange" :checkVal=radioVal :val=3>亚瑟</Radio>
            <Radio @radioChange="radioChange" :checkVal=radioVal :val=4>钟馗</Radio>

            <!--<x-radio  v-model="radioV" :val="1">11</x-radio>-->
            <!--<x-radio  v-model="radioV" :val="2">222</x-radio>-->
            <!--<x-radio  v-model="radioV" :val="3">333</x-radio>-->
            <!--<x-radio  v-model="radioV" :val="4">444</x-radio>-->
        </div>
        <div class="item">
            <Check @checkChange="checkChange" :checkList="checkList" :val=1>梦奇</Check>
            <Check @checkChange="checkChange" :checkList=checkList :val=2>妲己</Check>
            <Check @checkChange="checkChange" :checkList=checkList :val=3>亚瑟</Check>
            <Check @checkChange="checkChange" :checkList=checkList :val=4>钟馗</Check>
        </div>
        <div class="item">
            <x-input placeholder="请输入内容" ref="input" v-model="inputVal" reg="^\d+$" :require="true"></x-input>
            {{inputVal}}
            <button @click="checkValidate">校验状态</button>
        </div>
        <div>
            <x-select v-model="selectV" :list="selectList" @changSelect="changeSelect"></x-select>
            {{selectV}}
        </div>
        <div class="item">
            <x-packer></x-packer>
        </div>
    </div>
</template>
<style>
  .item{
      overflow: hidden;
  }
</style>
<script>
    import Check from '../../weight/form/check/check';
    import Radio from '../../weight/form/radio/radio';
    import XInput from '../../weight/form/input/Input';
    import XSelect from '../../weight/form/select/Select';
    import XDraw from '../../weight/draw/draw';
    import XPacker from '../../weight/packer/packer';
    export default {
        data(){
            return {
                list: [
                    {prize: "11", id: "1111"},
                    {prize: "22", id: "2222"},
                    {prize: "33", id: "3333"},
                    {prize: "44", id: "4444"},
                    {prize: "55", id: "5555"},
                    {prize: "66", id: "6666"}
                ],
                listIndex:-1, //想让选中的数组位置
                clickIndex:-1, //点中数组位置
                selectList:[
                    {txt:'我们',val:'1'},
                    {txt:'我们3',val:'2'}
                ],
                radioVal: 3,
                checkList: [1,2,4],
                inputVal:"1",
                radioV:2,
                selectV:2
            }
        },
        methods:{
            sortList(){
                this.list= this.list.sort(function(){ return 0.5 - Math.random() });
                this.getArrayIndex('2222')
                this.switchPos();
            },
            switchPos(){
                let temp="";
                let ary= this.list;
                let pos1=this.listIndex;
                let pos2=this.clickIndex;
                temp=ary[pos1];
                ary[pos1]=ary[pos2];
                ary[pos2]=temp;
                this.list=ary;
            },
            getArrayIndex(id){
                for(var i=0;i<this.list.length;i++){
                    var item=this.list[i];
                    if(item.id==id){
                        this.listIndex=i;
                        break;
                    }
                }
            },
            drawVal(val,index){
                 this.clickIndex=index;
                 console.log("val>>>"+val);
                 this.sortList();
            },
            radioChange(val) {
                this.radioVal = val;
                console.log(this.radioVal)
            },
            checkChange(val) {
                var index = this.checkList.indexOf(val);
                if (index == -1) {
                    this.checkList.push(val);
                } else {
                    this.checkList.splice(index, 1)
                }
                console.log(this.checkList.join(','))
            },
            checkValidate(){
                   var xinputInstance= this.$refs.input;
                   console.log(xinputInstance.valid)
            },
            changeSelect(val){
                this.selectV=val;
            }
        },
        components:{
            XDraw,
            Check,
            Radio,
            XInput,
            XPacker,
            // XRadio,
            XSelect
        }
    }

</script>
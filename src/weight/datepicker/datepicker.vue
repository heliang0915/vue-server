<template>
    <div>
        <x-packer :id="id"
                  :ref="'packer'+id"
                  :packerData="datePackerData"
                  valueField="val"
                  separator="/"
                  @open="openPacker"
                  @getSelectByScroll="getSelectByScroll"
                  @getSelect="getSelect"
        >
        </x-packer>
    </div>
</template>
<script>
    import XPacker from '../packer/packer'
    export default {
        name: 'x-date-packer',
        props:{
            id:{
                type:String
            }
        },
        data() {
            return {
                datePackerData:{},
                monthsData:[31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
            }
        },
        methods:{
            getSelect(txt){
                // selectAry.forEach(function (item) {
                //     console.log(item.label);
                //     console.log(item.val);
                // })
                console.log(txt);
                // this.packerTxt=txt;
            },
            getSelectByScroll(val,key,ary){
                let year=ary[0].val;
                let month=ary[1].val;
                let yearIndex=ary[0].index;
                let monthIndex=ary[1].index;
                let daysIndex=ary[2].index;
                let packerInstance=this.$refs['packer'+this.id];
                let isLeap=(this.isLeapYear(year)&&month==2);
                let days=this.getCurrentDay(year,month)
                this.initPackerData(year,month);
                if(key=="years"||key=="months"){
                    let newIndex=days-1;
                    if(parseInt(daysIndex)>=newIndex){
                        packerInstance.scrollMove([yearIndex,monthIndex,newIndex]);
                    }
                }
            },

            //检测是否是闰年
            isLeapYear(year){
                return (year%4==0&&(year%100!=0||year%400==0))
            },
            //获取当前月份有多少天
            getCurrentDay(year,month){
                var day=this.monthsData[month-1];
                //二月份特殊判断一下
                if(this.isLeapYear(year)&&month==2){
                    day=day+1;
                }
                return day;
            },
            years() {
                let yearArray = [];
                for (let year = 2016; year <= 2030; year++) {
                    let json={};
                    json.label=year+"年";
                    json.val=year;
                    yearArray.push(json);
                }
                return yearArray;
            },
            months() {
                let monthArray = [];
                for (let month = 1; month <= 12; month++) {
                    let json={};
                    json.label=month+"月";
                    json.val=month;
                    monthArray.push(json);
                }
                return monthArray;
            },
            days(year,month) {
                let dayArray = [];
                for (let day = 1; day <=this.getCurrentDay(year,month); day++) {
                    let json={};
                    json.label=day+"日";
                    json.val=day;
                    dayArray.push(json);
                }
                return dayArray;
            },
            initPackerData(year,month){
                var defaultYear=this.years()[0]['val'];
                var defaultMonth=this.months()[0]['val'];
                year=year==null?defaultYear:year;
                month=month==null?defaultMonth:month;
                let data={};
                data['years']=this.years();
                data['months']=this.months();
                data['days']=this.days(year,month);
                this.datePackerData=data;
            },
            openPacker(){
                let packerInstance=this.$refs['packer'+this.id];
                packerInstance.scrollMove([2,3,4]);
            }
        },
        mounted(){
            this.initPackerData();
        },
        components: {
            XPacker
        }
    }
</script>
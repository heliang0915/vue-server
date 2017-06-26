<!--新书抢先 右侧每一项-->
<template>
    <div class="side-item">
        <div class="side-item-inner">
            <img-comp :pic="item.pic" class="side-item-pic" ></img-comp>
            <div class="side-item-content">
                <h4>{{item.title}}</h4>
                <span>{{item.author}}</span>
                <div>
                    <em class="small-btn" :class="index==1?'btn-red':(index==2?'btn-blue':'')" v-for="(con,index) in item.types">{{con}}</em>
                </div>
                <p>{{item.desc}}</p>
            </div>
        </div>
    </div>
</template>
<script>
    import '../assets/css/rightitem';
    import imgComp from './commons/imgComp';
    export default{
        data(){
          return{
              item:{
                  pic:'../assets/images/hot1.jpg',
                  title:'帝少强娶：甜妻太可口',
                  author:'爱笑的莜莜',
                  types:['古代言情','完结','79.33万'],
                  desc:'他是m国最尊贵危险的男人，冷漠无情，脾气诡异，不近女色，一朝不甚，她强势扑倒睡了他，他却食之上瘾，宠之入味，某'

              }
          }
        },
        components:{
            imgComp
        }
    }
</script>

<template>
    <div class="div-img" :style="{width:w+'px',height:h+'px'}">
        <a :href="link">
            <img :src="pic" alt="图片">
        </a>
    </div>
</template>
<script>
  import '../../assets/css/imgComp'
  export default{
      props:{
          link:{
              type:String,
              default:'#'
          },
          pic:{
              type:String,
              default:''
          },
          w:{
              type:Number,
              default:105
          },
          h:{
              type:Number,
              default:138
          }

      }
  }
</script>
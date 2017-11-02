<template>
    <div class="container new-book">
        <div class="container-inner">
            <h3 class="channelName">{{title}}</h3>
            <div class="content">
                <div class="side-left">
                    <div class="side-left-inner">
                        <ul class="imgs">
                            <li>
                                <a href="##">
                                    <img src="../../assets/images/new1.jpeg" alt="">
                                </a>
                            </li>
                            <li>
                                <a href="##">
                                    <img src="../../assets/images/new2.jpeg" alt="">
                                </a>
                            </li>
                            <li>
                                <a href="##">
                                    <img src="../../assets/images/new1.jpeg" alt="">
                                </a>
                            </li>
                        </ul>
                        <p>豪门闪婚宠妻有毒</p>
                        <div class="desc">
                            <span class="reader">漂亮的海妖</span>
                            <div class="read-classify">
                                <em class="small-btn">古代言情</em>
                                <em class="small-btn btn-red">完结</em>
                                <em class="small-btn btn-blue">79.33万</em>
                            </div>
                            <p>一张神秘藏宝图，牵扯出一段盛世奇恋，一次意外偶遇，陆非夏绯闻缠身，他突然对她说：“和我结</p>
                        </div>
                    </div>
                </div>
                <div class="side-right">
                    <StoryItem v-for="i in 4"></StoryItem>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
   import StoryItem from './StoryItem';
   export default{
        props:{
            title:{
                type:String,
                default:'此处为标题'
            }
        },
        components:{
            StoryItem
        }
   }
</script>
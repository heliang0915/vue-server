<template>
    <div class="container hot">
        <div class="container-inner">
            <h3 class="channelName">热门小说</h3>
            <ul class="hot-list">
                <li v-for="(item,index) in list">
                    <HoverImg  :key="index" :pic="item.pic" :link="item.link"></HoverImg>
                    <p>{{item.desc}}</p>
                </li>
            </ul>
        </div>
    </div>
</template>
<style>
    .hot .container-inner .hot-list li, .recommend .container-inner .hot-list li {
        /*float: left;*/
        width: 105px;
        margin-right: 19px;
    }

    .hot .container-inner .hot-list li:nth-child(1), .recommend .container-inner .hot-list li:nth-child(1) {
        margin-left: 0;
    }

    .hot .container-inner .hot-list li p, .recommend .container-inner .hot-list li p {
        font-size: 12px;
        margin-top: 4px;
    }
    .hot-list{
        display: flex;
    }
</style>
<script>
    import HoverImg from '../components/common/HoverImg';
    export default {
        data(){
            return {
                list: [
                    {
                        pic: "../../../assets/images/hot1.jpg",
                        link: "http://www.baidu.com",
                        desc: "描述1"
                    }, {
                        pic: "../../../assets/images/hot1.jpg",
                        link: "http://www.baidu.com",
                        desc: "描述2"
                    }, {
                        pic: "../../../assets/images/hot1.jpg",
                        link: "http://www.baidu.com",
                        desc: "描述3"
                    }, {
                        pic: "../../../assets/images/hot1.jpg",
                        link: "http://www.baidu.com",
                        desc: "描述1"
                    }, {
                        pic: "../../../assets/images/hot1.jpg",
                        link: "http://www.baidu.com",
                        desc: "描述4"
                    }, {
                        pic: "../../../assets/images/hot1.jpg",
                        link: "http://www.baidu.com",
                        desc: "描述4"
                    }, {
                        pic: "../../../assets/images/hot1.jpg",
                        link: "http://www.baidu.com",
                        desc: "描述4"
                    }, {
                        pic: "../../../assets/images/hot1.jpg",
                        link: "http://www.baidu.com",
                        desc: "描述4"
                    }]

            }
        },
        components: {
            HoverImg
        }
    }
</script>
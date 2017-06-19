<!--榜单每一项 作为一个组件-->
<template>
    <div class="rank-item">
        <h3>{{config.title}}</h3>
        <ul>
            <li class="first">
                <em>1</em>
                <a href="#">首席的独宠新娘</a>
            </li>
            <li class="second">
                <em>2</em>
                <a href="#">绝色狂医：魔神大人，轻点撩</a>
            </li>
            <li class="three">
                <em>3</em>
                <a href="#">绝色狂医：魔神大人，轻点撩</a>
            </li>
            <li>
                <em>4</em>
                <a href="#">绝色狂医：魔神大人，轻点撩</a>
            </li>
            <li>
                <em>5</em>
                <a href="#">绝色狂医：魔神大人，轻点撩</a>
            </li>
            <li>
                <em>6</em>
                <a href="#">绝色狂医：魔神大人，轻点撩</a>
            </li>
            <li>
                <em>7</em>
                <a href="#">绝色狂医：魔神大人，轻点撩</a>
            </li>
            <li>
                <em>8</em>
                <a href="#">绝色狂医：魔神大人，轻点撩</a>
            </li>
            <li>
                <em>9</em>
                <a href="#">绝色狂医：魔神大人，轻点撩</a>
            </li>
            <li>
                <em>10</em>
                <a href="#">绝色狂医：魔神大人，轻点撩</a>
            </li>

        </ul>
    </div>
</template>

<script>
    import '../assets/css/rankitem';

    export default{
         props:['config']
    }
</script>
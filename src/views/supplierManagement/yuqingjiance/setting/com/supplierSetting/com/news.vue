<template>
  <div>
    <span class="title">{{dataObj.title}}</span>
    <div class="title_top">
        <div class="left">
            <span>{{dataObj.releaseDate}}</span>
            <span class="marginleft5">发布于</span>
            <span class="marginleft5">{{dataObj.source}}</span>
        </div>
        <div class="center_title">
            <span>企查查分类：</span>
            <span>{{dataObj.emotionType}}</span>
        </div>
        <div class="right_title">
            <img src="~@/assets/images/icon/eye.png" alt="">
            <span>{{dataObj.viewNum}}</span>
        </div>
    </div>
    <div class="content">
        <div v-html="dataObj.content"></div>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            wrapContent:"打开地精撒库拉进度款萨迪克啥考虑到健身卡了就看到了洒基来了撒娇啥课垃圾都开始垃圾考虑撒进口量记得萨科技开始就爱看到了啥考虑到吉萨拉家带口垃圾啊上课了"
        }
    },
    props:{
        dataObj:{
            type:Object,
            default:{}
        }
    },
    created(){

    },
    methods:{

    }
}
</script>

<style lang="scss" scoped>
.marginleft5{
    margin-left: 5px;
}
.title{
    font-size: 25px;
    line-height: 50px;
}
.title_top{
    display: flex;
    .center_title{
        margin-left: 40px;
    }
    .right_title{
        margin-left: 60px;
        display: flex;
        align-items: center;
        img{
            width:20px;
            margin-right:10px;
        }
    }
}
.content{
    margin-top:20px;
    padding:30px 20px;
    background-color: #F9F9F9;

    ::v-deep img{
        width:100%;
    }
}

</style>
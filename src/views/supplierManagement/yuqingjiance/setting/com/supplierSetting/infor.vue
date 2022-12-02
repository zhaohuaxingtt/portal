<template>
  <iPage>
    <el-col :span="15">
        <iCard>
            <news></news>
        </iCard>
    </el-col>
    <el-col :span="9">
        <div class="right">
            <iCard>
                <div>
                    <span class="title">宁波华德汽车零件厂</span>
                    <iButton :icon="type?'el-icon-star-on':'el-icon-star-off'" @click="follow">关注</iButton>
                </div>
                <ul class="news_wrap">
                    <li v-for="(item,index) in newsList" :key="index" class="li_class">
                        <div class="new_top disf">
                            <span class="flex1 new_top_color" @click="getInfor">{{item.title}}</span>
                            <span class="flexgd">{{item.time}}</span>
                        </div>
                        <div class="new_bottom disf">
                            <span class="flex1">{{item.name}}</span>
                            <span class="flexgd">{{item.type}}</span>
                        </div>
                    </li>
                </ul>
            </iCard>
        </div>
    </el-col>
  </iPage>
</template>

<script>
import { iPage,iCard,iButton } from "rise"
import news from "./com/news"
export default {
    components:{
        iPage,
        iCard,
        news,
        iButton
    },
    data(){
        return{
            type:true,
            newsList:[
                {
                    title:"“旋涡”中的富士康“旋涡”中的富士康“旋涡”中的富士康“旋涡”中的富士康“旋涡”中的富士康“旋涡”中的富士康",
                    name:"陷入员工徒步返乡传闻的超级工厂富士康仍在努力维持运转陷入员工徒步返乡传闻的超级工厂富士康仍在努力维持运转",
                    time:"11-02 13:00",
                    type:"消极"
                },{
                    title:"“旋涡”中的富士康",
                    name:"陷入员工徒步返乡传闻的超级工厂富士康仍在努力维持运转",
                    time:"11-02 13:00",
                    type:"消极"
                },
            ]
        }
    },
    methods:{
        getInfor(){

        },
        follow(){
            this.type = !this.type
        },
    }
}
</script>

<style lang="scss" scoped>
.right{
    width:calc(100% - 20px);
    margin-left:20px;
}
.title{
    font-size: 23px;
    margin-right:20px;
}
.disf{
    display: flex;
    justify-content: space-between;
}
.new_bottom{
    margin-top:10px;
}
.new_top_color{
    color:#1763f7;
    font-size:16px;
    cursor: pointer;
}
.li_class{
    margin-top: 15px;
    border-bottom: 1px solid rgb(199, 199, 199);
    padding-bottom: 15px;
}
.news_wrap{
    margin-top:40px;
}
.flex1{
    flex:1;
}
.flexgd{
    width:120px;
    text-align: end;
}
</style>
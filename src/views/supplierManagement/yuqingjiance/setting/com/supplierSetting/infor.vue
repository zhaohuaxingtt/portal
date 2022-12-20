<template>
  <iPage>
    <el-col :span="15">
        <iCard>
            <news :dataObj="dataObj"></news>
        </iCard>
    </el-col>
    <el-col :span="9">
        <div class="right">
            <iCard>
                <div>
                    <span class="title">{{dataObj.nameEn}}</span>
                    <iButton :loading="loading" :icon="dataObj.follow?'el-icon-star-on':'el-icon-star-off'" @click="follow(dataObj.follow)">关注</iButton>
                </div>
                <ul class="news_wrap">
                    <li v-for="(item,index) in dataObj.otherList" :key="index" class="li_class">
                        <div class="new_top disf">
                            <span class="flex1 new_top_color" @click="getInfor(item.newId)">{{item.title}}</span>
                            <span class="flexgd">{{item.releaseDate}}</span>
                        </div>
                        <div class="new_bottom disf">
                            <span class="flex1">{{item.newsTags}}</span>
                            <span class="flexgd">{{item.emotionType}}</span>
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

import {
    newDetail,
    addFollow,
    cancelSupplier
} from "@/api/supplierManagement/yuqingjiance"

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
            dataObj:{},
            loading:false,
        }
    },
    created(){
        this.getData();
    },
    methods:{
        getInfor(id){
            this.$router.push({
                path:"/supplier/sentimentInfor",
                query:{
                    id:id
                }
            })
        },
        getData(){
            newDetail({
                id:this.$route.query.id
            }).then(res=>{
                if(res.result){
                    this.dataObj = res.data;
                }
            })
        },
        follow(type){
            this.loading = true;
            var list = [this.dataObj.sentimentSupplierId]
            if(type){//取消关注
                cancelSupplier({
                    sentimentSupplierId:list[0]
                }).then(res=>{
                    if(res.result){
                        this.dataObj.follow = !this.dataObj.follow
                        iMessage.success(res.desZh)
                    }else{
                        iMessage.error(res.desZh)
                    }
                    this.loading = false;
                }).catch(e=>{
                    this.loading = false;
                })
            }else{//关注
                addFollow({
                    ids:list
                }).then(res=>{
                    if(res.result){
                        this.dataObj.follow = !this.dataObj.follow
                        iMessage.success(this.$t(res.desZh))
                    }else{
                        iMessage.error(this.$t(res.desZh))
                    }
                    this.loading = false;
                }).catch(e=>{
                    this.loading = false;
                })
            }
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
    width:160px;
    text-align: end;
}
</style>
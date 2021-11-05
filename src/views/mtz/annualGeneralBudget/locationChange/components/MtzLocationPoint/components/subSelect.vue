<!-- 提交选择会议 -->
<template>
    <div style="padding-bottom:30px;">
        <div class="sub_title">
            <span>选择会议类别:</span>
            <div class="sub_img" @click="imgChiose">
                <img class="img_front" v-show="!type" :src="require('@/assets/images/icon/click-gray.png')">
                <img class="img_front" v-show="type" :src="require('@/assets/images/icon/click-green.png')">
            </div>
            <span class="sub_text">Pre</span>
        </div>
        <el-divider class="margin-top20"></el-divider>
        <div class="BtnTitle">
            <span></span>
            <div>
                <iButton @click="choice">{{language('XUANZE', '选择')}}</iButton>
            </div>
        </div>
        <tableList
            class="margin-top20"
            :tableData="tableListData"
            :tableTitle="tableTitle"
            :tableLoading="loading"
            :index="true">
        </tableList>
        <iPagination @size-change="handleSizeChange($event, getTableList)"
                   @current-change="handleCurrentChange($event, getTableList)"
                   :page-sizes="page.pageSizes"
                   :page-size="page.pageSize"
                   :current-page="page.currPage"
                   :total="page.totalCount"
                   :layout="page.layout">
        </iPagination>
    </div>
</template>

<script>
import { iButton,iPagination } from "rise";
import tableList from '@/components/commonTable/index.vue';
import { tableTitleCp } from "./data";
import { pageMixins } from "@/utils/pageMixins"

export default {
    name:"subSelect",
    mixins: [pageMixins],
    components:{
        tableList,
        iButton,
        iPagination
    },
    data(){
        return{
            radio:"",
            type:false,
            tableListData:[],
            tableTitle:tableTitleCp,
            loading:false,
        }
    },
    methods:{
        imgChiose(val){
            this.type = !this.type;
        },
        choice(){

        },
        getTableList(){

        },
    }
}
</script>

<style lang="scss" scoped>
.sub_title{
    display: flex;
    align-items: center;
    font-size: 15px;
}
.img_front{
    width:30px;
}
.sub_img{
    margin:3px 15px 0 20px;
    cursor: pointer;
}
.sub_text{
    font-size: 20px;
}
 .BtnTitle{
  margin-top:30px;
  margin-bottom:30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  >span{
    font-size: 18px;
    font-weight: bold;
  }
}
</style>
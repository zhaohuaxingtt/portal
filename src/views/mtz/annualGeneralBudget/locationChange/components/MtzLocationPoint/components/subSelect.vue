<!-- 提交选择会议 -->
<template>
    <div style="padding-bottom:30px;">
        <div class="sub_title">
            <span>选择会议类别:</span>
            <div class="sub_div" @click="imgChiose(item)" v-for="(item,index) in changeList" :key="item.id">
                <div class="sub_img">
                    <img class="img_front" v-if="indexValue===index?false:true" :src="require('@/assets/images/icon/click-gray.png')">
                    <img class="img_front" v-else :src="require('@/assets/images/icon/click-green.png')">
                </div>
                <span class="sub_text">{{item.name}}</span>
            </div>
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
            @handleSelectionChange="handleSelectionChange"
            :tableData="tableListData"
            :tableTitle="tableTitle"
            :tableLoading="loading"
            ref="moviesTable"
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
import { iButton,iPagination,iMessage } from "rise";
import tableList from '@/components/commonTable/index.vue';
import { tableTitleCp } from "./data";
import { pageMixins } from "@/utils/pageMixins"
import { getMettingList } from "@/api/meeting/home"
import {
  saveMeeting,//提交
  mtzAppNomiSubmit
} from '@/api/mtz/annualGeneralBudget/replenishmentManagement/mtzLocation/details';

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
            tableListData:[],
            tableTitle:tableTitleCp,
            loading:false,
            changeList:[
                {
                    value:"CSC",
                    name:"Csc",
                    id:0
                },{
                    value:"PRECSC",
                    name:"Precsc",
                    id:1
                },{
                    value:"NONE",
                    name:"None",
                    id:2
                }
            ],
            indexValue:0,
            changeValue:"CSC",
            selectData:[],
        }
    },
    computed: {
        mtzObject(){
            return this.$store.state.location.mtzObject;
        },
    },
    watch: {},
    created(){
        this.getTableList();
    },
    methods:{
        imgChiose(val){
            this.indexValue = val.id;
            this.changeValue = val.value
            this.getTableList();
        },
        choice(){
            // console.log(this.selectData)
            if (this.selectData.length > 0) {
                saveMeeting({
                    mtzAppId:this.$route.query.mtzAppId || this.mtzObject.mtzAppId || JSON.parse(sessionStorage.getItem('MtzLIst')).mtzAppId,
                    meetingId:this.selectData[0].id,
                    duration:this.selectData[0].duration,
                    topic:this.selectData[0].name,
                }).then(res=>{
                    if(res.code == 200 && res.result){
                        mtzAppNomiSubmit({
                            mtzAppId:this.mtzObject.mtzAppId || this.$route.query.mtzAppId || JSON.parse(sessionStorage.getItem('MtzLIst')).mtzAppId
                        }).then(res=>{
                            if(res.result && res.code == 200){
                            iMessage.success(this.language(res.desEn,res.desZh))
                            this.$emit("close","refresh")
                            }
                        })
                    }
                    
                })
            }else{
                iMessage.warn("请选择会议")
            }
        },
        handleSelectionChange(val){
            if (val.length > 1) {
                var duoxuans = val.pop();
                this.selectData = val.pop();
                this.$refs.moviesTable.$children[0].$children[0].clearSelection()
                this.$refs.moviesTable.$children[0].$children[0].toggleRowSelection(duoxuans)
            } else {
                this.selectData = val
            }
        },
        getTableList(){
            this.loading = true;
            getMettingList({
                meetingTypeEnum:this.changeValue,
                pageNum: this.page.currPage,
                pageSize: this.page.pageSize,
                states:["02"]
            }).then(res=>{
                this.page.currPage = res.pageNum;
                this.page.pageSize = res.pageSize;
                this.page.totalCount = res.total;
                this.tableListData = res.data;
                this.loading = false;
            })
        },
    }
}
</script>

<style lang="scss" scoped>
.sub_div{
    display: flex;
    align-items: center;
    margin-right:10px;
    cursor: pointer;
}
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
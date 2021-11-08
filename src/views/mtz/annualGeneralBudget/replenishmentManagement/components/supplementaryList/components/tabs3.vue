<template>
<div v-loading="BoxLoading">
    <div class="tabsBoxInfor">
        <div class="inforDiv" v-for="(item,index) in tabsInforList" :key="index">
            <span>{{item.name}}</span>
            <div class="inforText" v-if="item.prop == 'time'">{{inforData['monthFrom']}}~{{inforData['monthTo']}}</div>
            <div class="inforText" v-else-if="item.prop == 'supplierName'">{{inforData['supplierSapNo']}}-{{inforData['supplierName']}}</div>
            <div class="inforText" v-else>{{inforData[item.prop]}}</div>
        </div>
    </div>
    <div class="BtnTitle">
        <span>明细列表</span>
        <div>
            <iButton @click="upload" v-if="dataObject.status == 'EPMS审批通过' || dataObject.status == '已支付' || dataObject.status == '关闭'">{{language('PINGZHENGDAOCHU', '凭证导出')}}</iButton>
        </div>
    </div>
    <tableList
        class="margin-top20"
        :selection="false"
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="loading"
        :index="true">
    </tableList>
    <iPagination
        v-update
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        background
        :current-page="page.currPage"
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :total="page.totalCount"
        >
    </iPagination>
</div>
</template>

<script>
import { iButton,iPagination,iMessageBox,iMessage } from 'rise'
import { tableTitle3,tabs3InforList } from './data'
import tableList from '@/components/commonTable/index.vue'
import {
    compdocMetalDetailExport,
    getDifferenceInfor,
    compdocMetalDetailPage
} from '@/api/mtz/annualGeneralBudget/replenishmentManagement/supplementary/details';
import { getNowFormatDate } from "./util.js";
import NewMessageBox from '@/components/newMessageBox/dialogReset.js'

export default {
    name:"tabs3",
    components:{
        tableList,
        iButton,
        iPagination
    },
    props:["mtzDocId","searchFormList","dataObject"],
    data(){
        return{
            page:{
                currPage:1,
                pageSize:10,
                pageSizes:[10,20,50,100],
                layout:"total, sizes, prev, pager, next, jumper",
                totalCount:0
            },
            loading:false,
            tabsInforList:tabs3InforList,
            tableTitle:tableTitle3,
            tableListData: [],
            inforData:{},
            BoxLoading:true,
        }
    },
    watch:{
        "searchFormList":{
            handler(x, y){
                this.BoxLoading = true;
                this.serchList = x;
                this.page.currPage = 1;
                this.page.pageSize = 10;
                this.getData();
            },
            immediate: true
        }
    },
    created(){
        this.getData();
        getDifferenceInfor(this.mtzDocId).then(res=>{
            this.inforData = res.data;
        })
    },
    methods:{
        getData(){
            compdocMetalDetailPage({
                pageNo:this.page.currPage,
                pageSize:this.page.pageSize,
                mtzDocId:this.mtzDocId,
                ...this.serchList
            }).then(res => {
                this.tableListData = res.data;
                this.page.totalCount = res.total;
            }).then(red => {
                this.BoxLoading = false;
                this.loading = false;
            })
        },
        
        upload(){
            NewMessageBox({
                title:this.language('LK_WENXINTISHI','温馨提示'),
                Tips:this.language('SHIFOUDAOCHU','是否导出？'),
                cancelButtonText:this.language('QUXIAO', '取消'),
                confirmButtonText:this.language('QUEREN', '确认'),
            }).then(() => {
                compdocMetalDetailExport({}).then(res=>{
                    let blob = new Blob([res], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"});
                    let objectUrl = URL.createObjectURL(blob);
                    let link = document.createElement("a");
                    link.href = objectUrl;
                    let fname = "MTZ补差单凭证（贵金属）" + getNowFormatDate() + ".xlsx";
                    link.setAttribute("download", fname);
                    document.body.appendChild(link);
                    link.click();
                    link.parentNode.removeChild(link);
                    this.$message({
                        type: "success",
                        message: "链接成功!"
                    });
                })
            }).catch((err) => {
                console.log(err)
            })
        },
        handleSizeChange(val){//每页 ${val} 条
            this.loading = true;
            this.page.pageSize = val;
            this.page.currPage = 1;
            this.getData();
        },
        handleCurrentChange(val){//当前页: ${val}`
            this.loading = true;
            this.page.currPage = val;
            this.getData();
        },
    }
}
</script>

<style lang="scss" scoped>
$tabsInforHeight:35px;

.BtnTitle{
  margin-top:20px;
  margin-bottom:30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  >span{
    font-size: 18px;
    font-weight: bold;
  }
}
.tabsBoxInfor{
    margin-top:20px;
    margin-bottom:10px;
    display: flex;
    flex-flow: wrap;
    justify-content: space-between;
    .inforDiv{
    width:27%;
    height:$tabsInforHeight;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top:8px;
    margin-bottom:8px;
    span{

    }
    .inforText{
        width:60%;
        background:#F8F8FA;
        text-align: center;
        height:$tabsInforHeight;
        line-height: $tabsInforHeight;
    }
    }
}
.tableTitle {
    display: inline;
    font-weight: bold;
    font-size: 16px;
    color: #000;
    margin: 0 10px;
}
button {
    float: right;
    z-index: 100;
    margin-bottom: 20px;
    margin-left: 10px;
}
</style>
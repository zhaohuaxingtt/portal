<!-- 引用RFQ中事件 -->
<template>
    <div style="padding-bottom:30px;">
        <el-row style="display:flex;justify-content: space-between;">
            <el-col :span="11">
                <div>
                    <span class="font18">RFQ:</span>
                    <iInput style="width:180px;margin-left:20px;" clearable v-model="rfqValue" placeholder="请输入RFQ号" @keyup.enter.native="onSubmit"></iInput>
                </div>
                <tableList
                    @handleCurrentChange="handleCurrentChangeTable"
                    :selection="false"
                    class="margin-top20"
                    :tableData="tableLeftData"
                    :tableTitle="tableLeftTitle"
                    :tableLoading="loadingLeft"
                    :index="true">
                </tableList>
                <iPagination @size-change="handleSizeChange1"
                            @current-change="handleCurrentChange1"
                            :page-sizes="page1.pageSizes"
                            :page-size="page1.pageSize"
                            :current-page="page1.currPage"
                            :total="page1.totalCount"
                            :layout="page1.layout">
                </iPagination>
            </el-col>
            <el-col :span="11">
                <div style="display:flex;align-items: center;width:100%;justify-content: space-between;">
                    <span class="font18">RFQ-{{handleValue}}</span>
                    <IButton>{{language("YINYONG","引用")}}</IButton>
                </div>
                <tableList
                    class="margin-top20"
                    :tableData="tableRightData"
                    :tableTitle="tableRightTitle"
                    :tableLoading="loadingRight"
                    :index="true">
                </tableList>
                <iPagination @size-change="handleSizeChange2"
                            @current-change="handleCurrentChange2"
                            :page-sizes="page2.pageSizes"
                            :page-size="page2.pageSize"
                            :current-page="page2.currPage"
                            :total="page2.totalCount"
                            :layout="page2.layout">
                </iPagination>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { iInput,iPagination,IButton,iMessage } from "rise";
import { tableLeftTitle,tableRightTitle } from "./data";
import tableList from '@/components/commonTable/index.vue';
import {
  getRfqPartList,
  getRfqListsByRfqId
} from '@/api/mtz/annualGeneralBudget/replenishmentManagement/mtzLocation/firstDetails';

export default {
    name:"",
    components:{
        iInput,
        tableList,
        iPagination,
        IButton
    },
    data(){
        return{
            tableLeftData:[],
            tableRightData:[],
            tableLeftTitle:tableLeftTitle,
            tableRightTitle:tableRightTitle,
            loadingLeft:false,
            loadingRight:false,
            rfqValue:"",
            handleData:{},
            handleValue:"",
            page1:{
                totalCount: 0, //总条数
                pageSize: 10, //每页多少条
                pageSizes: [10, 20, 50, 100], //每页条数切换
                currPage: 1, //当前页
                layout: 'total,sizes, prev, pager, next, jumper'
            },
            page2:{
                totalCount: 0, //总条数
                pageSize: 10, //每页多少条
                pageSizes: [10, 20, 50, 100], //每页条数切换
                currPage: 1, //当前页
                layout: 'total,sizes, prev, pager, next, jumper'
            },
        }
    },
    created(){
        this.getRfqListsByRfqId()
    },
    methods:{
        getRfqListsByRfqId(){
            this.loadingLeft = true;
            getRfqListsByRfqId({
                current:this.page1.currPage,
                size:this.page1.pageSize,
                rfqId:this.rfqValue
            }).then(res=>{
                if(res.code == 200){
                    this.tableLeftData = res.data;
                    this.page1.totalCount = res.total;
                    this.page1.currPage = res.pageNum;
                    this.page1.pageSize = res.pageSize;
                    this.loadingLeft = false;
                }else{
                    iMessage.error(res.desZh)
                }
            })
        },
        onSubmit(){
            this.page1.currPage = 1
            this.page1.pageSize = 10
            this.getRfqListsByRfqId();
        },
        handleCurrentChangeTable(val){
            this.handleData = val;
            this.handleValue = val.id;
            this.loadingRight = true;
            this.getRight();
        },
        getRight(){
            getRfqPartList({
                current:this.page2.currPage,
                size:this.page2.pageSize,
                rfqId:this.handleValue
            }).then(res=>{
                this.tableRightData = res.data;
                this.page2.totalCount = res.total;
                this.page2.currPage = res.pageNum;
                this.page2.pageSize = res.pageSize;
                this.loadingRight = false;
            })
        },
        handleSizeChange1(){
            this.page1.currPage = 1;
            this.page1.pageSize = val;
            this.getRfqListsByRfqId();
        },
        handleCurrentChange1(val){
            this.page1.currPage = val;
            this.getRfqListsByRfqId();
        },
        handleSizeChange2(){
            this.page2.currPage = 1;
            this.page2.pageSize = val;
            this.getRight();
        },
        handleCurrentChange2(){
            this.page2.currPage = val;
            this.getRight();
        },
    }
}
</script>

<style lang="scss" scoped>
::v-deep .page-info{
    display:none;
}
::v-deep .el-pagination__total{
    margin-top:2px;
}
</style>
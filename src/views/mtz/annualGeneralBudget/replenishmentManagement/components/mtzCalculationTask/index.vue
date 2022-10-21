<template>
  <div>
    <iSearch @reset="reset"
             @sure="sure">
        <el-form class="margin-top10">
            <el-form-item :label="$t('一次件供应商')">
                <iSelect filterable v-model="selectOptions.sapCode" :placeholder="language('QINGXUANZE','请选择')">
                    <el-option
                        v-for="(item,index) in fsupplierList"
                        :key="index"
                        :label="item.codeMessage"
                        :value="item.code">
                    </el-option>
                </iSelect>
            </el-form-item>
            <el-form-item :label="$t('采购员')">
                <iSelect filterable v-model="selectOptions.operatorId" :placeholder="language('QINGXUANZE','请选择')" @change="buyusChange">
                    <el-option
                        v-for="(item,index) in operatorBuyus"
                        :key="index"
                        :label="item.name"
                        :value="item.id">
                    </el-option>
                </iSelect>
            </el-form-item>
            <el-form-item :label="$t('任务状态')">
                <iSelect filterable v-model="selectOptions.status" :placeholder="language('QINGXUANZE','请选择')">
                    <el-option
                        v-for="(item,index) in taskTypeList"
                        :key="index"
                        :label="$getLabel(item.label,item.labelE)"
                        :value="item.value">
                    </el-option>
                </iSelect>
            </el-form-item>
        </el-form>
    </iSearch>
    <iCard style="margin-top:20px;">
        <div>
            <span class="title-us">{{$t('LK_JINKANZIJI')}}</span>
            <el-switch @change="changeSwitch"
                v-model="value">
            </el-switch>
        </div>
        <tableList
            ref="moviesTable"
            class="margin-top20"
            :tableData="tableListData"
            :tableTitle="tableTitle"
            :tableLoading="tableLoading"
            :index="true"
            border
            @handleSelectionChange="handleSelectionChange"
            >
            <!-- 任务编号 -->
            <template #id="scoped">
                <p :class="scoped.row.taskStatus==2||scoped.row.taskStatus==3?'openPage':''" @click="handleAdd(scoped.row,scoped.row.taskStatus)">{{ scoped.row.id }}</p>
            </template>
            <!-- 一次件供应商 -->
            <template #taskKey="scoped">
                <span>{{scoped.row.firstSupplierName}}</span>
            </template>
            <!-- 采购员 -->
            <template #userId="scoped">
                <span>{{scoped.row.userName}}</span>
            </template>
            <!-- 补差时间段 -->
            <template #balance="scoped">
                <span>{{scoped.row.balanceStartDate}}</span>
                <br/>
                <span>{{scoped.row.balanceEndDate}}</span>
            </template>
            <!-- 任务状态 -->
            <template #taskStatus="scoped">
                <span>{{scoped.row.taskStatus==0?"未开始":scoped.row.taskStatus==1?"进行中":scoped.row.taskStatus==2?"已完成":scoped.row.taskStatus==3?"异常":scoped.row.taskStatus==4?"已关闭":""}}</span>
            </template>
        </tableList>
        <iPagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="page.pageSizes"
            :page-size="page.pageSize"
            :current-page="page.currPage"
            :total="page.totalCount"
            :layout="page.layout"
        >
        </iPagination>
    </iCard>

    <balancePaymentDialog @close="handleClose"
                          v-if="dialogVisible"
                          :dialogVisible="dialogVisible"
                          :dateSearch="date"
                          :selectData="selectData"
                          :materialCodes="materialCodes"
                          :flag="flag"></balancePaymentDialog>
  </div>
</template>

<script>
import { iSearch,iSelect,iCard,iPagination } from 'rise'
import tableList from '@/components/commonTable/index.vue'
import { tableTitle } from "./data";
import { getMtzSupplierList } from '@/api/mtz/annualGeneralBudget/mtzReplenishmentOverview'
import {
    pageMtzCalcuLateTasks,
    getBuyers
} from '@/api/mtz/mtzCalculationTask'

import balancePaymentDialog from '../mtzReplenishmentOverview/components/balancePaymentDialog'

export default {
    components:{
        iSearch,
        iSelect,
        iCard,
        tableList,
        iPagination,
        balancePaymentDialog
    },
    data(){
        return{
            tableTitle,
            tableListData:[],
            tableLoading:false,
            selectOptions:{
                sapCode:"",
                operatorId:"",
                status:"",
            },
            value:true,

            page: {
                totalCount: 0, //总条数
                pageSize: 10, //每页多少条
                pageSizes: [10, 20, 50, 100], //每页条数切换
                currPage: 1, //当前页
                layout: 'sizes, prev, pager, next, jumper'
            },

            fsupplierList:[],
            operatorBuyus:[],
            taskTypeList:[
                {
                    value:0,
                    label:"准备中",
                    labelE:"Preparing"
                },{
                    value:1,
                    label:"计算中",
                    labelE:"In calculation"
                },{
                    value:2,
                    label:"计算完成",
                    labelE:"Calculation completed"
                },{
                    value:3,
                    label:"计算失败",
                    labelE:"Calculation failed"
                },{
                    value:4,
                    label:"已关闭",
                    labelE:"Closed"
                },
            ],

            dialogVisible: false,
            selectData: [],
            flag: false,
            date: "",
            materialCodes: []
        }
    },
    created(){
        this.getData();
    },
    methods:{
        buyusChange(val){
            this.value = false;
        },
        changeSwitch(val){
            this.value = val;
            if(val){
                this.selectOptions.operatorId = "";
                this.page.currPage = 1;
                this.page.pageSize = 10;
                this.pageMtzCalcuLateTasks();
            }else{
                this.page.currPage = 1;
                this.page.pageSize = 10;
                this.pageMtzCalcuLateTasks();
            }
        },
        handleSelectionChange(val) {
            // if (val.length > 1) {
            //     var duoxuans = val.pop()
            //     this.handleSelectArr = val.pop()
            //     //清除所有选中
            //     this.$refs.moviesTable.clearSelection()
            //     //给最后一个加上选中
            //     this.$refs.moviesTable.toggleRowSelection(duoxuans)
            // } else {
            //     this.handleSelectArr = val
            // }
        },
        handleAdd(val,num){
            if(num == 2 || num == 3){
                this.dialogVisible = true
                this.selectData = [val];
                this.flag = true
                this.date = [this.tableListData[0].balanceStartDate,this.tableListData[0].balanceEndDate]
            }
        },
        handleClose(){
            this.dialogVisible = false
        },
        sure(){
            this.pageMtzCalcuLateTasks();
        },
        reset(){
            this.selectOptions = {
                sapCode:"",
                operatorId:"",
                status:"",
            }
            this.value = true;
            this.page.currPage = 1;
            this.page.pageSize = 10;
            this.pageMtzCalcuLateTasks();
        },
        async getData(){
            this.getMtzSupplierList();
            await this.getBuyers();
            this.pageMtzCalcuLateTasks();
        },
        pageMtzCalcuLateTasks(){
            var operatorId;
            if(this.value){
                operatorId = JSON.parse(sessionStorage.getItem('userInfo')).id
            }else{
                operatorId = this.selectOptions.operatorId
            }
            pageMtzCalcuLateTasks({
                sapCode:this.selectOptions.sapCode,
                operatorId:operatorId,
                status:this.selectOptions.status,
                pageNo:this.page.currPage,
                pageSize:this.page.pageSize,
            }).then(res=>{
                if(res?.result){
                    var test = res.data;
                    test.forEach(e => {
                        if(e.params){
                            const obj = JSON.parse(e.params)
                            e.balanceEndDate = obj.balanceEndDate;
                            e.balanceStartDate = obj.balanceStartDate;
                            e.userId = obj.userId;
                            e.firstSupplierName = obj.fSupplierName;
                            e.firstSupplierId = obj.fSupplierId;
                        }
                        const buyusName = this.operatorBuyus.filter(item=>item.id == e.createBy)
                        e.userName = buyusName[0]?.name;

                    });
                    this.tableListData = test;

                    this.page.currPage = res.pageNum;
                    this.page.pageSize = res.pageSize;
                    this.page.totalCount = res.total;
                }
            })
        },
        getBuyers(){
            return new Promise((resole,reject) => {
                getBuyers({}).then(res=>{
                    if (res.code === '200') {
                        this.operatorBuyus = res.data
                        resole();
                    } else {
                        reject();
                        iMessage.error(res.desZh)
                    }
                })
            })
        },
        getMtzSupplierList(){
            getMtzSupplierList({}).then(res => {
                if (res.code === '200') {
                this.fsupplierList = JSON.parse(JSON.stringify(res.data))
                } else {
                    iMessage.error(res.desZh)
                }
            })
        },
        handleSelectionChange(val){

        },
        handleSizeChange(){

        },
        handleCurrentChange(){

        },
    }

}
</script>

<style scoped lang="scss">
.title-us{
    font-size:14px;
    margin-right:5px;
}

.openPage{
    position: relative;
    color: $color-blue;
    font-size: 14px;
    cursor: pointer;
}
</style>
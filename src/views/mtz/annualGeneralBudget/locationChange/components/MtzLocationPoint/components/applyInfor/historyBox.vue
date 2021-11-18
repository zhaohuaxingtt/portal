<!-- 历史 -->
<template>
    <div style="padding-bottom:30px;">
        <div class="searchBox">
            <iSearch @sure="handleSubmitSearch"
                @reset="handleSearchReset">
                <el-form :inline="true" ref="searchForm" :model="searchForm" label-position="top" class="demo-form-inline leftBox">
                    <el-form-item style="marginRight:68px;width:180px" :label="language('LINGJIANHAO', '零件号')" class="formItem">
                        <inputCustom v-model="searchForm.partnum"
                                :editPlaceholder="language('QINGSHURU','请输入')"
                                :placeholder="language('QINGSHURU','请输入')">
                        </inputCustom>
                    </el-form-item>

                    <el-form-item style="marginRight:68px;width:180px" :label="language('LINGJIANMING','零件名')" class="formItem">
                        <inputCustom v-model="searchForm.partName"
                                    :editPlaceholder="language('QINGSHURU','请输入')"
                                    :placeholder="language('QINGSHURU','请输入')">
                        </inputCustom>
                    </el-form-item>

                    <el-form-item style="marginRight:68px;width:180px" :label="language('GONGYINGSHANGSAPHAO','供应商SAP号')" class="formItem">
                        <inputCustom v-model="searchForm.supplierSap"
                                    :editPlaceholder="language('QINGSHURU','请输入')"
                                    :placeholder="language('QINGSHURU','请输入')">
                        </inputCustom>
                    </el-form-item>

                    <el-form-item style="marginRight:68px;width:180px" :label="language('GONGYINGSHANGMINGCHENG','供应商名称')">
                        <inputCustom v-model="searchForm.supplierName"
                                    :editPlaceholder="language('QINGSHURU','请输入')"
                                    :placeholder="language('QINGSHURU','请输入')">
                        </inputCustom>
                    </el-form-item>

                    <el-form-item style="marginRight:68px;width:180px" :label="language('YAUNCAILIAOPAIHAO','原材料牌号')">
                        <inputCustom v-model="searchForm.materialCode"
                                    :editPlaceholder="language('QINGSHURU','请输入')"
                                    :placeholder="language('QINGSHURU','请输入')">
                        </inputCustom>
                    </el-form-item>

                    <el-form-item style="marginRight:68px;width:180px" :label="language('GUIZEBIANHAO','规则编号')" class="formItem">
                        <inputCustom v-model="searchForm.ruleNo"
                                    :editPlaceholder="language('QINGSHURU','请输入')"
                                    :placeholder="language('QINGSHURU','请输入')">
                        </inputCustom>
                    </el-form-item>

                    <el-form-item style="marginRight:68px;width:180px" :label="language('KESHI','科室')" class="formItem">
                        <custom-select v-model="searchForm.buyerDeptId"
                                        :user-options="getLocationA11pplyStatus11"
                                        clearable
                                        :placeholder="language('QINGXUANZE', '请选择')"
                                        display-member="name"
                                        value-member="code"
                                        value-key="code">
                        </custom-select>
                    </el-form-item>

                    <el-form-item style="marginRight:68px;width:180px" :label="language('CAIGOUYUAN','采购员')" class="formItem">
                        <inputCustom v-model="searchForm.buyerName"
                                    :editPlaceholder="language('QINGSHURU','请输入')"
                                    :placeholder="language('QINGSHURU','请输入')">
                        </inputCustom>
                    </el-form-item>
                    
                    <el-form-item style="marginRight:68px;width:180px" :label="language('SHICHANGJIALAIYUAN','市场价来源')" class="formItem">
                        <custom-select v-model="searchForm.marketSource"
                                        :user-options="getLocationA11p222plyStatus11"
                                        clearable
                                        :placeholder="language('QINGXUANZE', '请选择')"
                                        display-member="name"
                                        value-member="code"
                                        value-key="code">
                        </custom-select>
                    </el-form-item>

                    <el-form-item style="marginRight:68px;width:180px" :label="language('YOUXIAOQIQI','有效期起')" class="formItem">
                        <iDatePicker v-model="searchForm.startDate"
                                type="datetime"
                                >
                        </iDatePicker>
                    </el-form-item>

                    <el-form-item style="marginRight:68px;width:180px" :label="language('YOUXIAOQIZHI', '有效期止')" class="formItem">
                        <iDatePicker v-model="searchForm.endDate"
                                type="datetime"
                                >
                        </iDatePicker>
                    </el-form-item>

                    <el-form-item style="marginRight:68px;width:180px" :label="language('BUCHAZHOUQI', '补差周期')" class="formItem">
                        <custom-select v-model="searchForm.compensationPeriod"
                                    :user-options="getSecondSupplierList"
                                    clearable
                                    :placeholder="language('QINGXUANZESHURU', '请选择/输入')"
                                    display-member="message"
                                    value-member="code"
                                    value-key="code">
                        </custom-select>
                    </el-form-item>
                </el-form>
            </iSearch>
        </div>
        <el-divider class="margin-top20"></el-divider>
        <div class="BtnTitle">
            <div style="display:flex;align-items:center;">
                <span style="margin-right:10px;">{{language("ZHIKANZIJI","只看自己")}}</span>
                <el-switch v-model="switchValue"
                     @change="changeSwitch" />
            </div>
            <div>
                <iButton @click="save">{{language('TIANJIA', '添加')}}</iButton>
            </div>
        </div>
        <tableList
            class="margin-top20"
            @handleSelectionChange="handleSelectionChange"
            :tableData="tableData"
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
import { iDatePicker, iMessage,iButton,iPagination,iSearch } from 'rise'
import { pageMixins } from "@/utils/pageMixins"
import { tableTitleHistory } from "./data";
import inputCustom from '@/components/inputCustom'
import tableList from '@/components/commonTable/index.vue';
import {
  pageHistoryPartMasterData,
} from '@/api/mtz/annualGeneralBudget/replenishmentManagement/mtzLocation/details';

export default {
    name:"",
    components:{
        iDatePicker,
        iButton,
        iPagination,
        inputCustom,
        tableList,
        iSearch
    },
    mixins: [pageMixins],
    data(){
        return{
            searchForm:{},
            getLocationA11pplyStatus11:[],
            getLocationA11p222plyStatus11:[],

            tableData:[],
            tableTitle:tableTitleHistory,
            loading:false,
            switchValue:false,
            getSecondSupplierList:[
                {
                    code:"A",
                    message:"年度"
                },{
                    code:"H",
                    message:"半年度"
                },{
                    code:"M",
                    message:"月度"
                },{
                    code:"Q",
                    message:"季度"
                },
            ],
            changeData:[]
        }
    },
    created(){
        this.init();
    },
    mounted(){
        this.$nextTick(() => {
            this.$el.querySelector('.el-icon-arrow-up').click()
        });
    },
    methods:{
        init(){

            this.getTableList();
        },
        handleSubmitSearch(){
            this.getTableList();
        },
        handleSearchReset(){
            this.page.pageSize = 10;
            this.page.currPage = 1;
            this.getTableList();
        },

        getTableList(){
            this.loading = true;
            pageHistoryPartMasterData({
                ...this.searchForm,
                pageSize:this.page.pageSize,
                pageNo:this.page.currPage,
                onlySeeMySelf:this.switchValue,
            }).then(res=>{
                this.tableData = res.data;
                this.page.currPage = res.pageNum
                this.page.pageSize = res.pageSize
                this.page.totalCount = res.total
                this.loading = false;
            })
        },
        changeSwitch(val){
            this.switchValue = val;
            this.getTableList();
        },
        handleSelectionChange(val){
            this.changeData = val;
        },
        save(){
            if(this.changeData.length==0){
                iMessage.error(this.language("QXZYTSJJXGL","请选择一条数据进行关联！"))
                return false;
            }
            this.$emit("historyDialog",this.changeData)
        }
    }
}
</script>

<style lang="scss" scoped>

.searchBox {
  position: relative;
  display:flex;
  justify-content: space-between;
  .searchButton {
    position: absolute;
    right: 0;
    top: 50px;
    z-index: 100;
  }
}
 

 .BtnTitle{
  margin-top:30px;
  margin-bottom:30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  span{
    font-size: 18px;
    font-weight: bold;
  }
}

::v-deep .el-form {
    display: flex;
    flex-wrap: wrap;
}
::v-deep .cardBody{
  margin:0!important;
  padding:0!important;
}
::v-deep .card{
  box-shadow: 0 0 0px rgb(27 29 33 / 0%)
}
</style>
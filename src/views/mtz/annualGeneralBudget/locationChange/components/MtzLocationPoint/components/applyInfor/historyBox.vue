<!-- 历史 -->
<template>
    <div style="padding-bottom:30px;">
        <div class="searchBox">
            <iSearch @sure="handleSubmitSearch"
                @reset="handleSearchReset">
                <el-form :inline="true" ref="searchForm" :model="searchForm" label-position="top" class="demo-form-inline leftBox">
                    <el-form-item style="marginRight:68px;width:180px" :label="language('LINGJIANHAO', '零件号')" class="formItem">
                        <custom-select v-model="searchForm.partnumList"
                                        :user-options="partnumList"
                                        clearable
                                        multiple
                                        :placeholder="language('QINGXUANZE', '请选择')"
                                        display-member="codeMessage"
                                        value-member="code"
                                        value-key="code">
                        </custom-select>
                    </el-form-item>

                    <el-form-item style="marginRight:68px;width:180px" :label="language('GONGYINGSHANGSAPHAO','供应商SAP号')" class="formItem">
                        <custom-select v-model="searchForm.supplierSapList"
                                        :user-options="supplierSapList"
                                        clearable
                                        multiple
                                        :placeholder="language('QINGXUANZE', '请选择')"
                                        display-member="codeMessage"
                                        value-member="code"
                                        value-key="code">
                        </custom-select>
                    </el-form-item>

                    <el-form-item style="marginRight:68px;width:180px" :label="language('YAUNCAILIAOPAIHAO','原材料牌号')">
                        <custom-select v-model="searchForm.materialCodeList"
                                        :user-options="materialCodeList"
                                        clearable
                                        multiple
                                        :placeholder="language('QINGXUANZE', '请选择')"
                                        display-member="codeMessage"
                                        value-member="code"
                                        value-key="code">
                        </custom-select>
                    </el-form-item>

                    <el-form-item style="marginRight:68px;width:180px" :label="language('GUIZEBIANHAO','规则编号')" class="formItem">
                        <custom-select v-model="searchForm.ruleNoList"
                                        :user-options="ruleNoList"
                                        clearable
                                        multiple
                                        :placeholder="language('QINGXUANZE', '请选择')"
                                        display-member="code"
                                        value-member="code"
                                        value-key="code">
                        </custom-select>
                    </el-form-item>

                    <el-form-item style="marginRight:68px;width:180px" :label="language('KESHI','科室')" class="formItem">
                        <custom-select v-model="searchForm.deptIdList"
                                        :user-options="deptIdList"
                                        clearable
                                        multiple
                                        :placeholder="language('QINGXUANZE', '请选择')"
                                        display-member="message"
                                        value-member="code"
                                        value-key="code">
                        </custom-select>
                    </el-form-item>

                    <el-form-item style="marginRight:68px;width:180px" :label="language('CAIGOUYUAN','采购员')" class="formItem">
                        <custom-select v-model="searchForm.buyerIds"
                                        :user-options="buyerIds"
                                        clearable
                                        multiple
                                        :placeholder="language('QINGXUANZE', '请选择')"
                                        display-member="message"
                                        value-member="code"
                                        value-key="code">
                        </custom-select>
                    </el-form-item>
                    
                    <el-form-item style="marginRight:68px;width:180px" :label="language('SHICHANGJIALAIYUAN','市场价来源')" class="formItem">
                        <custom-select v-model="searchForm.marketSource"
                                        :user-options="marketSource"
                                        clearable
                                        multiple
                                        :placeholder="language('QINGXUANZE', '请选择')"
                                        display-member="message"
                                        value-member="code"
                                        value-key="code">
                        </custom-select>
                    </el-form-item>

                    <el-form-item style="marginRight:68px;width:180px" :label="language('YOUXIAOQIQI','有效期起')" class="formItem">
                        <iDatePicker v-model="searchForm.startDate"
                                type="date"
                                value-format="yyyy-MM-dd"
                                >
                        </iDatePicker>
                    </el-form-item>

                    <el-form-item style="marginRight:68px;width:180px" :label="language('YOUXIAOQIZHI', '有效期止')" class="formItem">
                        <iDatePicker v-model="searchForm.endDate"
                                type="date"
                                value-format="yyyy-MM-dd"
                                >
                        </iDatePicker>
                    </el-form-item>

                    <el-form-item style="marginRight:68px;width:180px" :label="language('BUCHAZHOUQI', '补差周期')" class="formItem">
                        <custom-select v-model="searchForm.compensationPeriod"
                                    :user-options="getSecondSupplierList"
                                    clearable
                                    multiple
                                    :placeholder="language('QINGXUANZESHURU', '请选择/输入')"
                                    display-member="message"
                                    value-member="code"
                                    value-key="code">
                        </custom-select>
                    </el-form-item>
                    <el-form-item style="marginRight:68px;width:180px" :label="language('补差方式', '补差方式')" class="formItem">
                        <i-select
                            v-model="searchForm.method"
                            :placeholder="language('QINGSHURU', '请输入')"
                        >
                            <el-option
                            :label="language('全部','ALL')"
                            value="">
                            </el-option>
                            <el-option
                            v-for="item in methodList"
                            :key="item.code"
                            :label="item.message"
                            :value="item.code"
                            >
                            </el-option>
                        </i-select>
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
            <template #method="scope">
              <span>{{ scope.row.method == '1' ? language('一次性补差','一次性补差') : scope.row.method == '2' ? language('变价单补差','变价单补差') : '' }}</span>
            </template>
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
import { iDatePicker, iSelect, iMessage,iButton,iPagination,iSearch } from 'rise'
import { pageMixins } from "@/utils/pageMixins"
import { tableTitleHistory } from "./data";
import inputCustom from '@/components/inputCustom'
import tableList from '@/components/commonTable/index.vue';
import {
  pageHistoryPartMasterData,
  getRawMaterial,//原材料牌号下拉选择
  getMtzMarketSourceList,//获取MTZ市场价来源下拉框
  getDeptLimitLevel,//科室下拉
  getCurrentUser,//采购员
  getSupplierByUser,//获取供应商下拉选择(当前用户权限)
  getMtzRuleCode,//获取MTZ规则编号
  getOneSecondPartNo,//一次、二次零件号下拉选择
} from '@/api/mtz/annualGeneralBudget/replenishmentManagement/mtzLocation/details';
import { methodList } from "./data";

export default {
    name:"",
    components:{
        iDatePicker,
        iSelect,
        iButton,
        iPagination,
        inputCustom,
        tableList,
        iSearch
    },
    mixins: [pageMixins],
    data(){
        return{
            methodList,
            partnumList:[],
            supplierSapList:[],
            materialCodeList:[],
            ruleNoList:[],
            deptIdList:[],
            buyerIds:[],
            marketSource:[],

            searchForm:{
                method:''
            },
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
            getRawMaterial({}).then(res=>{
                this.materialCodeList = res.data;
            })
            getMtzMarketSourceList({}).then(res=>{
                this.marketSource = res.data;
            })
            getDeptLimitLevel({}).then(res=>{
                this.deptIdList = res.data;
            })
            getCurrentUser({}).then(res=>{
                this.buyerIds = res.data;
            })
            getSupplierByUser({}).then(res=>{
                console.log(1111111111)
                this.supplierSapList = res.data;
            })
            getMtzRuleCode({}).then(res=>{
                this.ruleNoList = res.data;
            })
            getOneSecondPartNo({}).then(res=>{
                this.partnumList = res.data;
            })
            this.getTableList();
        },
        handleSubmitSearch(){
            this.getTableList();
        },
        handleSearchReset(){
            this.searchForm = {
                materialCodeList:[],
                marketSource:[],
                deptIdList:[],
                buyerIds:[],
                supplierSapList:[],
                ruleNoList:[],
                partnumList:[],
                startDate:"",
                endDate:"",
                method:''
            }
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
::v-deep .el-input{
    width:100%!important;
}
</style>
<!-- 沿用弹窗 -->
<template>
  <div style="padding-bottom:30px;">
    <div class="searchBox">
        <el-form :inline="true" ref="searchForm" :model="searchForm" label-position="top" class="demo-form-inline leftBox">
            <el-form-item style="marginRight:68px;width:180px" :label="language('GUIZEBIANHAO', '规则编号')" class="formItem">
                <iInput v-model="searchForm.ruleNo"
                            :placeholder="language('QINGSHURU','请输入')">
                </iInput>
            </el-form-item>

            <el-form-item style="marginRight:68px;width:180px" :label="language('YUANCAILIAO','原材料')" class="formItem">
                <iInput v-model="searchForm.materialName"
                                :placeholder="language('QINGSHURU','请输入')">
                </iInput>
            </el-form-item>

            <el-form-item style="marginRight:68px;width:180px" :label="language('YUANCAILIAOPAIHAO','原材料牌号')" class="formItem">
                <iInput v-model="searchForm.materialCode"
                                :placeholder="language('QINGSHURU','请输入')">
                </iInput>
            </el-form-item>

            <el-form-item style="marginRight:68px;width:180px" :label="language('GONGYINGSHANGSAPHAO','供应商SAP号')" class="formItem">
                <iInput v-model="searchForm.sapCode"
                                :placeholder="language('QINGSHURU','请输入')">
                </iInput>
            </el-form-item>

            <el-form-item style="marginRight:68px;width:180px" :label="language('GONGYINGSHANGMINGCHENG','供应商名称')" class="formItem">
                <iInput v-model="searchForm.supplierName"
                                :placeholder="language('QINGSHURU','请输入')">
                </iInput>
            </el-form-item>

            <el-form-item style="marginRight:68px;width:180px" :label="language('CAIGOUYUAN','采购员')" class="formItem">
                <iInput v-model="searchForm.buyer"
                                :placeholder="language('QINGSHURU','请输入')">
                </iInput>
            </el-form-item>

            <el-form-item style="marginRight:68px" :label="language('KESHI','科室')">
                <!-- multiple -->
                <custom-select v-model="searchForm.buyerDeptId"
                                :user-options="linieDeptId"
                                clearable
                                :placeholder="language('QINGXUANZE', '请选择')"
                                display-member="existShareNum"
                                value-member="existShareId"
                                value-key="existShareId">
                </custom-select>
            </el-form-item>

            <el-form-item style="marginRight:68px" :label="language('SHICHANGJIALAIYUAN','市场价来源')">
                <custom-select v-model="searchForm.source"
                                :user-options="sourceList"
                                clearable
                                :placeholder="language('QINGXUANZE', '请选择')"
                                display-member="message"
                                value-member="code"
                                value-key="code">
                </custom-select>
            </el-form-item>

            <el-form-item style="marginRight:68px" :label="language('BUCHAZHOUQI','补差周期')">
                <custom-select v-model="searchForm.compensationPeriod"
                                :user-options="getLocationApplyStatus"
                                clearable
                                :placeholder="language('QINGXUANZE', '请选择')"
                                display-member="message"
                                value-member="code"
                                value-key="code">
                </custom-select>
            </el-form-item>

        </el-form>
        <div class="searchButton">
            <iButton @click="handleSubmitSearch">{{language('CX', '查询')}}</iButton>
            <iButton @click="handleSearchReset('searchForm')">{{language('CZ', '重置')}}</iButton>
        </div>
    </div>
    <el-divider class="margin-top20"></el-divider>
    <div class="BtnTitle">
        <span>{{language("GUIZEXIANGQING","规则详情")}}</span>
        <div>
            <iButton @click="save">{{language('YANYONG', '沿用')}}</iButton>
        </div>
    </div>
    <tableList
        class="margin-top20"
        :tableData="tableData"
        :tableTitle="tableTitle"
        :tableLoading="loading"
        @handleSelectionChange="handleSelectionChange"
        :index="true">
        <template slot="effectFlag" slot-scope="scope">
          <span>{{scope.row.effectFlag==0?"无效":scope.row.effectFlag==1?"有效":""}}</span>
        </template>
        <template slot="thresholdCompensationLogic" slot-scope="scope">
          <span>{{scope.row.thresholdCompensationLogic=="A"?"全额补差":scope.row.thresholdCompensationLogic=="B"?"超额补差":""}}</span>
        </template>
        <!-- <template slot="thresholdCompensationLogic" slot-scope="scope">
          <span>{{scope.row.thresholdCompensationLogic=="A"?"全额补差":scope.row.thresholdCompensationLogic=="B"?"超额补差":""}}</span>
        </template> -->
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
import { iInput,iCard, iSelect, iDatePicker, iMessage,iDialog,iButton,iTabs,iTabsList,iPagination } from 'rise'
import { pageMixins } from "@/utils/pageMixins"
import { continueBox } from "./data.js";
import inputCustom from '@/components/inputCustom'
import tableList from '@/components/commonTable/index.vue';
import {
  pageAppRuleHistory,
  getMtzMarketSourceList
} from '@/api/mtz/annualGeneralBudget/replenishmentManagement/mtzLocation/details';
import { getDeptData } from '@/api/kpiChart/index'

export default {
  components: {
    iCard,
    iSelect,
    iDatePicker,
    iDialog,
    iButton,
    iTabs,
    iTabsList,
    inputCustom,
    iInput,
    iPagination,
    tableList
  },
  props: ["detailObj"],
  mixins: [pageMixins],
  data () {
    return {
        loading:false,
        tableTitle:continueBox,
        tableData:[],
        searchForm: {},
        sourceList:[],
        getLocationApplyStatus:[
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
        linieDeptId:[]
    }
  },
  created() {
    this.init()
  },
  methods: {
    init(){
        getDeptData().then(res=>{
          this.linieDeptId = res.data;
        })
        getMtzMarketSourceList({}).then(res=>{
          this.sourceList = res.data;
        })

        this.getTableList();
    },
    getTableList(){
      this.loading = true;
      pageAppRuleHistory({
          ...this.searchForm,
          pageNo:this.page.currPage,
          pageSize:this.page.pageSize
      }).then(res=>{
        if(res.code == 200){
          this.tableData = res.data;
          this.page.currPage = res.pageNum
          this.page.pageSize = res.pageSize
          this.page.totalCount = res.total;
          this.loading = false;
        }else{
          iMessage.error(res.desZh)
        }
      })
    },
    // 重置
    handleSearchReset(form) {
      this.page.currPage = 1;
      this.page.pageSize = 10;
      this.searchForm = {};
      this.getTableList();
    },
    // 确定
    handleSubmitSearch () {
      this.getTableList();
    },
    handleSelectionChange(val){
      this.changeData = val;
    },
    save(){
      this.$emit("addDialogData",this.changeData)
    },
  }
}
</script>

<style lang='scss' scoped>

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

.leftBox{
  margin-right: 200px;
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

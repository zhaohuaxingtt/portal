<!-- 沿用弹窗 -->
<template>
  <div style="padding-bottom:30px;">
    <div class="searchBox">
      <iSearch @sure="handleSubmitSearch"
                @reset="handleSearchReset">
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
                <custom-select v-model="searchForm.buyer"
                                :user-options="buyer"
                                clearable
                                :placeholder="language('QINGXUANZE', '请选择')"
                                display-member="message"
                                value-member="code"
                                value-key="code">
                </custom-select>
            </el-form-item>

            <el-form-item style="marginRight:68px;width:180px" :label="language('KESHI','科室')">
                <!-- multiple -->
                <custom-select v-model="searchForm.buyerDeptId"
                                :user-options="linieDeptId"
                                clearable
                                :placeholder="language('QINGXUANZE', '请选择')"
                                display-member="message"
                                value-member="code"
                                value-key="code">
                </custom-select>
            </el-form-item>

            <el-form-item style="marginRight:68px;width:180px" :label="language('SHICHANGJIALAIYUAN','市场价来源')">
                <custom-select v-model="searchForm.source"
                                :user-options="sourceList"
                                clearable
                                :placeholder="language('QINGXUANZE', '请选择')"
                                display-member="message"
                                value-member="code"
                                value-key="code">
                </custom-select>
            </el-form-item>

            <el-form-item style="marginRight:68px;width:180px" :label="language('BUCHAZHOUQI','补差周期')">
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
      </iSearch>
    </div>
    <el-divider class="margin-top20"></el-divider>
    <div class="BtnTitle">
        <span>{{language("GUIZEXIANGQING","规则详情")}}</span>
        <div>
            <iButton v-if="mtzAddShowNum=='0'" @click="save">{{language('YANYONG', '沿用')}}</iButton>
            <iButton v-if="mtzAddShowNum=='1'" @click="save">{{'选择'}}</iButton>
        </div>
    </div>
    <tableList
        class="margin-top20"
        :tableData="tableData"
        :tableTitle="tableTitle"
        :tableLoading="loading"
        border
        @handleSelectionChange="handleSelectionChange"
        :index="true">
        <template slot="effectFlag" slot-scope="scope">
          <span>{{scope.row.effectFlag==0?"无效":scope.row.effectFlag==1?"有效":""}}</span>
        </template>
        <template slot="thresholdCompensationLogic" slot-scope="scope">
          <span>{{scope.row.thresholdCompensationLogic=="A"?"全额补差":scope.row.thresholdCompensationLogic=="B"?"超额补差":""}}</span>
        </template>
        <template slot="compensationPeriod" slot-scope="scope">
          <span>{{scope.row.compensationPeriod == "A"?"年度":scope.row.compensationPeriod == "H"?"半年度":scope.row.compensationPeriod == "Q"?"季度":scope.row.compensationPeriod == "M"?"月度":""}}</span>
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
import { iInput,iCard,iSearch, iSelect, iDatePicker, iMessage,iDialog,iButton,iTabs,iTabsList,iPagination } from 'rise'
import { pageMixins } from "@/utils/pageMixins"
import { continueBox } from "./data.js";
import inputCustom from '@/components/inputCustom'
import tableList from '@/components/commonTable/index.vue';
import {
  pageAppRuleHistory,
  getMtzMarketSourceList,
  getMtzNomiRuleBuyer,
  getDeptLimitLevel
} from '@/api/mtz/annualGeneralBudget/replenishmentManagement/mtzLocation/details';
// import { getDeptData } from '@/api/kpiChart/index'

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
    tableList,
    iSearch
  },
  props: ["detailObj","mtzAddShowNum"],
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
        linieDeptId:[],
        buyer:[],
    }
  },
  created() {
    this.init()
  },
  mounted(){
    this.$nextTick(() => {
        this.$el.querySelector('.el-icon-arrow-up').click()
    });
  },
  methods: {
    init(){
        getDeptLimitLevel({}).then(res=>{
          this.linieDeptId = res.data;
        })
        getMtzMarketSourceList({}).then(res=>{
          this.sourceList = res.data;
        })
        getMtzNomiRuleBuyer({}).then(res=>{
          this.buyer = res.data;
        })

        this.getTableList();
    },
    getTableList(){
      this.loading = true;
      pageAppRuleHistory({
          ...this.searchForm,
          pageNo:this.page.currPage,
          pageSize:this.page.pageSize,
          mtzAppId:this.$route.query.mtzAppId || JSON.parse(sessionStorage.getItem('MtzLIst')).mtzAppId,
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
      if(this.changeData.length==0){
          iMessage.error(this.language("QXZYTSJJXGL","请选择一条数据进行关联！"))
          return false;
      }
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

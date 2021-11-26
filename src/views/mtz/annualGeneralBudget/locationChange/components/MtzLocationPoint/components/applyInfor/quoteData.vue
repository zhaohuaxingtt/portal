<!-- 引用定点申请单零件弹窗 -->
<template>
  <div style="padding-bottom:30px;">
    <div class="searchBox">
      <iSearch @sure="handleSubmitSearch"
             @reset="handleSearchReset">
        <el-form :inline="true" ref="searchForm" :model="searchForm" label-position="top" class="demo-form-inline leftBox">
            <el-form-item style="marginRight:68px;width:180px" :label="language('LINGJIANHAO', '零件号')" class="formItem">
                <iInput
                        v-model="searchForm.partNum"
                        :editPlaceholder="language('QINGSHURU','请输入')"
                        :placeholder="language('QINGSHURU','请输入')">
                </iInput>
            </el-form-item>

            <el-form-item style="marginRight:68px;width:180px" :label="language('SHENQINGDANHAO','申请单号')" class="formItem">
              <iInput v-model="searchForm.nominateId"
                          type="number"
                          :editPlaceholder="language('QINGSHURU','请输入')"
                          :placeholder="language('QINGSHURU','请输入')">
              </iInput>
            </el-form-item>

            <el-form-item style="marginRight:68px;width:180px" :label="language('RFQBIANHAO','RFQ编号')" class="formItem">
              <iInput v-model="searchForm.rfqId"
                          :editPlaceholder="language('QINGSHURU','请输入')"
                          :placeholder="language('QINGSHURU','请输入')">
              </iInput>
            </el-form-item>

            <el-form-item style="marginRight:68px;width:180px" :label="language('LIUCHENGLEIXING','流程类型')">
              <custom-select v-model="searchForm.nominateProcessType"
                              :user-options="getFlowTypeList"
                              clearable
                              :placeholder="language('QINGXUANZE', '请选择')"
                              display-member="desc"
                              value-member="code"
                              value-key="code">
              </custom-select>
            </el-form-item>

            <el-form-item style="marginRight:68px;width:180px" :label="language('SHENQINGZHUANGTAI','申请状态')">
              <iSelect v-model="searchForm.applicationStatus"
                         :placeholder="language('QINGXUANZE', '请选择')"
                        >
                    <el-option
                        v-for="item in getLocationApplyStatus"
                        :key="item.code"
                        :label="item.message"
                        :value="item.code">
                    </el-option>
              </iSelect>
            </el-form-item>

            <el-form-item style="marginRight:68px;width:180px" :label="language('FSNR/GSNR','FSNR/GSNR')" class="formItem">
              <iInput v-model="searchForm.fsnrGsnrNum"
                          :editPlaceholder="language('QINGSHURU','请输入')"
                          :placeholder="language('QINGSHURU','请输入')">
              </iInput>
            </el-form-item>

            <el-form-item style="marginRight:68px;width:180px" :label="language('LINGJIANMING','零件名')" class="formItem">
              <iInput v-model="searchForm.partNameCn"
                          :editPlaceholder="language('QINGSHURU','请输入')"
                          :placeholder="language('QINGSHURU','请输入')">
              </iInput>
            </el-form-item>

            <el-form-item style="marginRight:68px;width:180px" :label="language('XUNJIACAIGOUYUAN','询价采购员')" class="formItem">
              <iInput v-model="searchForm.buyerName"
                          :disabled="true"
                          :editPlaceholder="language('QINGSHURU','请输入')"
                          :placeholder="language('QINGSHURU','请输入')">
              </iInput>
            </el-form-item>
            
            <el-form-item style="marginRight:68px;width:180px" :label="language('LINIE','LINIE')" class="formItem">
              <iInput v-model="searchForm.linieName"
                          :editPlaceholder="language('QINGSHURU','请输入')"
                          :placeholder="language('QINGSHURU','请输入')">
              </iInput>
            </el-form-item>

            <el-form-item style="marginRight:68px;width:180px" :label="language('CHEXINGXIANGMU','车型项目')" class="formItem">
              <custom-select v-model="searchForm.carTypeProj"
                              :user-options="getLocationApplyStatus11"
                              clearable
                              :placeholder="language('QINGXUANZE', '请选择')"
                              display-member="name"
                              value-member="code"
                              value-key="code">
              </custom-select>
            </el-form-item>

            <el-form-item style="marginRight:68px;width:180px" :label="language('BAOJIAYIZHIXINGJIAOYAN', '报价一致性校验')" class="formItem">
                <custom-select v-model="searchForm.isPriceConsistent"
                              :user-options="getSecondPartList"
                              clearable
                              :placeholder="language('QINGXUANZESHURU', '请选择/输入')"
                              display-member="message"
                              value-member="code"
                              value-key="code">
                </custom-select>
            </el-form-item>

            <el-form-item style="marginRight:68px;width:180px" :label="language('SHIFOUDANYIGONGYINGSHANG', '是否单一供应商')" class="formItem">
                <custom-select v-model="searchForm.singleSourcing"
                              :user-options="getSecondSupplierList"
                              clearable
                              :placeholder="language('QINGXUANZESHURU', '请选择/输入')"
                              display-member="message"
                              value-member="code"
                              value-key="code">
                </custom-select>
            </el-form-item>

            <el-form-item style="marginRight:68px;width:180px" :label="language('XIANSHIZIJI', '显示自己')" class="formItem">
                <custom-select v-model="searchForm.showMe"
                              :user-options="zhongleiList"
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
    <tableList
        class="margin-top20"
        :selection="false"
        @handleCurrentChange="handleCurrentChangeTable"
        :tableData="tableDataInfor"
        :tableTitle="tableTitleInfor"
        :tableLoading="loadingInfor"
        :index="true">
    </tableList>
    <iPagination @size-change="handleSizeChangeTop"
                  @current-change="handleCurrentChangeTop"
                  :page-sizes="page1.pageSizes"
                  :page-size="page1.pageSize"
                  :current-page="page1.currPage"
                  :total="page1.totalCount"
                  :layout="page1.layout">
    </iPagination>
    <el-divider class="margin-top20"></el-divider>
    <div class="BtnTitle">
        <div>
          <span>{{language("SHENQINGDANHAO","申请单号")}}</span>
          <span v-if="sNumber !== ''">-{{sNumber}}</span>
        </div>
        <div>
            <iButton @click="save">{{language('YINYONG', '引用')}}</iButton>
        </div>
    </div>
    <tableList
        class="margin-top20"
        :tableData="tableData"
        :tableTitle="tableTitle"
        :tableLoading="loading"
        @handleSelectionChange="handleSelectionChange"
        :index="true">
    </tableList>
    <iPagination @size-change="handleSizeChange($event, getBottomData)"
                   @current-change="handleCurrentChange($event, getBottomData)"
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
import { tableTitleContinueBox,tableTitleInfor } from "./data.js";
import inputCustom from '@/components/inputCustom'
import tableList from '@/components/commonTable/index.vue';
import {
  getFlowTypeList,
  getLocationApplyStatus,
  getCurrentUser
} from '@/api/mtz/annualGeneralBudget/replenishmentManagement/mtzLocation/details';
import {
  page,
  selectDictByKeys,
  getNomiAppPageList,
  getApplicationPartPagedList,
  getNominateProcessType,
} from '@/api/mtz/annualGeneralBudget/replenishmentManagement/mtzLocation/firstDetails';

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
    iSearch,
    tableList
  },
  props: ["detailObj"],
  mixins: [pageMixins],
  data () {
    return {
      sNumber:"",
      tableDataInfor:[],
      tableTitleInfor:tableTitleInfor,
      loadingInfor:false,
      loading:false,
      tableTitle:tableTitleContinueBox,
      tableData:[],
      typesJS:[
          {
          code:"Y",
          message:"是"
          },{
          code:"N",
          message:"否"
          }
      ],
      searchForm: {
        applicationStatus:"NOMINATE",
        linieName:"",
      },
      linieDeptId:[],
      page1:{
        totalCount: 0, //总条数
        pageSize: 5, //每页多少条
        pageSizes: [5, 10, 20, 50 ,100], //每页条数切换
        currPage: 1, //当前页
        layout: 'sizes, prev, pager, next, jumper'
      },
      getFlowTypeList:[],
      getLocationApplyStatus:[
        // {
        //   code:"NEW",
        //   message: "草稿"
        // },
        {
          code:"NOMINATE",
          message: "定点"
        },
        // {
        //   code:"NOTPASS",
        //   message: "未通过"
        // },
      ],
      getLocationApplyStatus11:[],
      getSecondPartList:[
        {
          code:0,
          message:"未通过"
        },{
          code:1,
          message:"通过"
        }
      ],
      getSecondSupplierList:[
        {
          code:true,
          message:"是"
        },
        {
          code:false,
          message:"否"
        }
      ],
      zhongleiList:[
        {
          code:true,
          message:"是"
        },
        {
          code:false,
          message:"否"
        },
      ],
      changeData:[],
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
      getNominateProcessType({}).then(res=>{
        this.getFlowTypeList = res.data;
      })
      // getLocationApplyStatus({}).then(res=>{
      //   this.getLocationApplyStatus = res.data;
      // })

      selectDictByKeys({
        keys:"CAR_TYPE_PRO"
      }).then(res=>{
        this.getLocationApplyStatus11 = res.data.CAR_TYPE_PRO;
      })

      // getCurrentUser({}).then(res=>{
        this.searchForm.buyerName = JSON.parse(sessionStorage.getItem('userInfo')).nameZh;
        this.getTableList();
      // })
    },
    getTableList(){
      this.loadingInfor = true;
      page({
        current: this.page1.currPage,
        size: this.page1.pageSize,
        ...this.searchForm
      }).then(res=>{
        this.tableDataInfor = res.data.records;
        this.page1.currPage = res.data.current
        this.page1.pageSize = res.data.size
        this.page1.totalCount = res.data.total;
        this.loadingInfor = false;
      })
    },
    handleSizeChangeTop(val){
      this.page1.pageSize = val;
      this.page1.currPage = 1;
      this.getTableList();
    },
    handleCurrentChangeTop(val){
      this.page1.currPage = val;
      this.getTableList();
    },
    handleCurrentChangeTable(val){
      this.sNumber = val.id;
      this.getBottomData();
    },
    getBottomData(){
      this.loading = true;
      getApplicationPartPagedList({
        appId:this.sNumber,
        current: this.page.currPage,
        size: this.page.pageSize,
      }).then(res=>{
        this.tableData = res.data;
        this.page.currPage = res.pageNum
        this.page.pageSize = res.pageSize
        this.page.totalCount = res.total;
        this.loading = false;
      })
    },
    // 重置
    handleSearchReset(form) {
      this.searchForm = {
        applicationStatus:"NOMINATE",
        buyerName : JSON.parse(sessionStorage.getItem('userInfo')).nameZh
      };
      this.page.currPage = 1;
      this.page.pageSize = 10;
      this.getTableList();
    },
    // 确定
    handleSubmitSearch () {
      // console.log(this.searchForm)
      this.getTableList();
    },
    closeDiolog(){

    },
    save(){
      if(this.changeData.length==0){
        iMessage.error(this.language("QXZYTSJJXGL","请选择一条数据进行关联！"))
        return false;
      }
      this.$emit("quoteDialog",this.changeData)
    },
    handleSelectionChange(val){
      this.changeData = val;
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
  span{
    font-size: 18px;
    font-weight: bold;
  }
}
::v-deep .cardBody{
  margin:0!important;
  padding:0!important;
}
::v-deep .card{
  box-shadow: 0 0 0px rgb(27 29 33 / 0%)
}

:v-deep .el-form{
  display: flex;
  flex-wrap: wrap;
}
</style>

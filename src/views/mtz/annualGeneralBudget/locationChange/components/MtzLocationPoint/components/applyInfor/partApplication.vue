<!-- 关联零件定点申请弹窗 -->
<template>
  <div style="padding-bottom:30px;">
    <div class="searchBox">
      <iSearch @sure="handleSubmitSearch"
             @reset="handleSearchReset">
        <el-form :inline="true" ref="searchForm" :model="searchForm" label-position="top" class="demo-form-inline leftBox">
            <el-form-item style="marginRight:68px;width:180px" :label="language('LINGJIANHAO', '零件号')" class="formItem">
                <iInput v-model="searchForm.partNum"
                        :placeholder="language('QINGSHURU','请输入')">
                </iInput>
            </el-form-item>

            <el-form-item style="marginRight:68px;width:180px" :label="language('SHENQINGDANHAO','申请单号')" class="formItem">
              <iInput v-model="searchForm.nominateId"
                          type="number"
                          :placeholder="language('QINGSHURU','请输入')">
              </iInput>
            </el-form-item>

            <el-form-item style="marginRight:68px;width:180px" :label="language('RFQBIANHAO','RFQ编号')" class="formItem">
              <iInput v-model="searchForm.rfqId"
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

            <el-form-item style="marginRight:68px;width:180px;" :label="language('SHENQINGZHUANGTAI','申请状态')">
                              <!-- multiple -->
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
                          :placeholder="language('QINGSHURU','请输入')">
              </iInput>
            </el-form-item>

            <el-form-item style="marginRight:68px;width:180px" :label="language('LINGJIANMING','零件名')" class="formItem">
              <iInput v-model="searchForm.partNameCn"
                          :placeholder="language('QINGSHURU','请输入')">
              </iInput>
            </el-form-item>

            <el-form-item style="marginRight:68px;width:180px" :label="language('XUNJIACAIGOUYUAN','询价采购员')" class="formItem">
              <iInput v-model="searchForm.buyerName"
                          :placeholder="language('QINGSHURU','请输入')">
              </iInput>
            </el-form-item>
            
            <!-- :editPlaceholder="language('QINGSHURU','请输入')" -->
            <el-form-item style="marginRight:68px;width:180px" :label="language('LINIE','LINIE')" class="formItem">
              <iInput v-model="searchForm.linieName"
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
    <el-divider class="margin-top20"></el-divider>
    <div class="BtnTitle">
        <span>{{language("DDSQZHGL","定点申请综合管理")}}</span>
        <div>
            <iButton @click="save">{{language('QUERENGUANLIAN', '确认关联')}}</iButton>
        </div>
    </div>
    <tableList
        @handleSelectionChange="handleSelectionChange"
        class="margin-top20"
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
import { iCard, iSelect, iDatePicker, iMessage,iDialog,iButton,iTabs,iTabsList,iPagination,iInput,iSearch } from 'rise'
import { pageMixins } from "@/utils/pageMixins"
import { tableTitle } from "./data.js";
import inputCustom from '@/components/inputCustom'
import tableList from '@/components/commonTable/index.vue';
import {
  getFlowTypeList,
  getLocationApplyStatus,
  relation,
} from '@/api/mtz/annualGeneralBudget/replenishmentManagement/mtzLocation/details';
import {
  page,
  selectDictByKeys,
  getNominateProcessType
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
    iInput,
    inputCustom,
    iPagination,
    tableList,
    iSearch
  },
  props: ["detailObj","numIsNomi"],
  mixins: [pageMixins],
  data () {
    return {
        loading:false,
        tableTitle:tableTitle,
        tableListData:[],
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
          applicationStatus:"NEW"
        },
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
        getLocationApplyStatus:[
          {
            code:"NEW",
            message: "草稿"
          },
          // {
          //   code:"SUBMIT",
          //   message: "已提交"
          // },
          {
            code:"NOTPASS",
            message: "未通过"
          },
        ],
        getLocationApplyStatus11:[],
        getFlowTypeList:[],
        handleSelectArr:[],
    }
  },
  computed:{
      mtzObject(){
        return this.$store.state.location.mtzObject;
      }
  },
  watch: {
    mtzObject(newVlue,oldValue){
      // console.log(newVlue)
    }
  },
  mounted(){
    this.$nextTick(() => {
      this.$el.querySelector('.el-icon-arrow-up').click()
    });
  },
  created() {
    this.init()
  },
  methods: {
    init(){

      getNominateProcessType().then(res=>{
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
      this.getTableList();
    },
    getTableList(val){
      this.loading = true;
      page({
        current: this.page.currPage,
        size: this.page.pageSize,
        ...this.searchForm
      }).then(res=>{
        this.tableListData = res.data.records;
        this.page.currPage = res.data.current
        this.page.pageSize = res.data.size
        this.page.totalCount = res.data.total;
        this.loading = false;
      })
    },
    // 重置
    handleSearchReset(form) {
      this.searchForm = {
        applicationStatus:"NEW"
      };
      this.page.currPage = 1;
      this.page.pageSize = 10;
      this.getTableList();
    },
    // 确定
    handleSubmitSearch () {
      this.page.currPage = 1;
      this.page.pageSize = 10;
      this.getTableList();
    },
    handleSelectionChange(val){
      console.log(val)
      if (val.length > 1) {
        var duoxuans = val.pop();
        this.handleSelectArr = val.pop();
        //清除所有选中
        // this.$refs.moviesTable.clearSelection();
        this.$refs.moviesTable.$children[0].$children[0].clearSelection()
        //给最后一个加上选中
        // this.$refs.moviesTable.toggleRowSelection(duoxuans);
        this.$refs.moviesTable.$children[0].$children[0].toggleRowSelection(duoxuans)
      } else {
        this.handleSelectArr = val
      }
    },
    save(){
      if(this.handleSelectArr.length==0){
        iMessage.error(this.language("QXZYTSJJXGL","请选择一条数据进行关联！"))
        return false;
      }
      if(this.numIsNomi!==0 && this.handleSelectArr[0].nominateProcessType !== "MEETING"){
          return iMessage.error(this.language('WHMTZYCLGZCZXGZGLSQDWFXZLZBALX', '维护MTZ原材料规则存在新规则，关联申请单无法选择流转/备案类型'))
      }else{
        relation({
          mtzAppId:this.$route.query.mtzAppId || JSON.parse(sessionStorage.getItem('MtzLIst')).mtzAppId,
          ttNominateAppId:this.handleSelectArr[0].id,
          flowType:this.handleSelectArr[0].nominateProcessType,
          appStatus:this.handleSelectArr[0].applicationStatus,
        }).then(res=>{
          if(res.code == 200){
            iMessage.success(res.desZh)
            this.$emit("close",this.handleSelectArr[0].id)
          }else{
            iMessage.error(res.desZh)
          }
        })
      }
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

::v-deep .cardBody{
  margin:0!important;
  padding:0!important;
}
::v-deep .card{
  box-shadow: 0 0 0px rgb(27 29 33 / 0%)
}
</style>

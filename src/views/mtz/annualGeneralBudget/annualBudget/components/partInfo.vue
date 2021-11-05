<!--
 * @Author: youyuan
 * @Date: 2021-08-30 15:30:15
 * @LastEditTime: 2021-10-26 18:17:27
 * @LastEditors: Please set LastEditors
 * @Description: 零件信息
 * @FilePath: \重庆软维科技\front-portal\src\views\mtz\annualGeneralBudget\annualBudget\components\partInfo.vue
-->
<template>
  <div>
    <div class="searchBox">
      <el-form :inline="true" :model="searchForm" label-position="top" class="demo-form-inline">
        <el-form-item style="marginRight:68px; width: 200px;" :label="language('MTZCAILIAOZU', 'MTZ材料组')">
          <!-- <iInput v-model="searchForm['mtzMaterialNumber']" :placeholder="language('QINGSHURU','请输入')"></iInput> -->
          <!-- <iSelect 
          v-model="searchForm['mtzMaterialList']" 
          filterable
          multiple
          collapse-tags
          :placeholder="language('QINGXUANZE', '请选择')">
            <el-option v-for="(item, index) in  rawMaterialCodeList" :key="index" :value="item.materialGroupCode" :label="item.materialGroupNameZh"></el-option>
          </iSelect> -->
          <custom-select 
          filterable
          multiple
          collapse-tags
          v-model="searchForm['mtzMaterialList']"
          :user-options="rawMaterialCodeList"
          :placeholder="language('QINGXUANZE', '请选择')"
          display-member="materialGroupNameZh"
          value-member="materialGroupCode"
          value-key="materialGroupCode" />
        </el-form-item>
        <el-form-item style="marginRight:68px" :label="language('LINGJIANHAO', '零件号')">
          <iInput v-model="searchForm['partNumber']" :placeholder="language('QINGSHURU','请输入')"></iInput>
        </el-form-item>
        <el-form-item style="marginRight:68px;width: 200px;" :label="language('CAIGOUYUAN', '采购员')">
          <!-- <iSelect 
          v-model="searchForm['buyerIds']" 
          filterable
          multiple
          collapse-tags
          :placeholder="language('QINGXUANZE', '请选择')">
            <el-option v-for="(item, index) in  userData" :key="index" :value="item.id" :label="item.nameZh"></el-option>
          </iSelect> -->
          <custom-select 
          filterable
          multiple
          collapse-tags
          v-model="searchForm['buyerIds']"
          :user-options="userData"
          :placeholder="language('QINGXUANZE', '请选择')"
          display-member="nameZh"
          value-member="id"
          value-key="id" />
        </el-form-item>
        <el-form-item class="searchButton">
          <iButton @click="handleSubmitSearch">{{language('CX', '查询')}}</iButton>
          <iButton @click="handleSearchReset">{{language('CZ', '重置')}}</iButton>
        </el-form-item>
      </el-form>
      <el-divider class="margin-top20"></el-divider>
      <div class="contentBox">
        <div class="tableOptionBox">
          <p class="tableTitle">{{language('CSYSZJEBWMH', '初始预算总金额（百万元）：')}} {{money(params.initPrice)}} </p>
          <p class="tableTitle">{{language('XISHUMAOHAO', '系数：')}} {{ratio(money(params.initPrice), money(params.totalPrice))}} </p>
          <p class="tableTitle">{{language('ZZYSZJEBWMH', '最终预算总金额（百万元）：')}} {{money(params.totalPrice)}} </p>
          <span class="buttonBox">
            <iButton @click="handleExportAll">{{language('DAOCHUQUANBU', '导出全部')}}</iButton>
          </span>
        </div>
        <tableList
        class="margin-top20"
        :tableData="tableListData"
        :tableTitle="userRoles.indexOf(buyUser) > -1 ? partTableTitle1 : partTableTitle2"
        :tableLoading="loading"
        :index="true"
        :selection="false"
        openPageProps="partNumber"
        @openPage="handleClickPart">
        <template #initPrTotal="scope">
          <el-tooltip :content="moneyInfo(scope.row['initPrTotal'])" placement="top" effect="light">
            <p>{{money(scope.row['initPrTotal'])}}</p>
          </el-tooltip>
        </template>
        <template #prTotal="scope">
          <el-tooltip :content="moneyInfo(scope.row['prTotal'])" placement="top" effect="light">
            <p>{{money(scope.row['prTotal'])}}</p>
          </el-tooltip>
        </template>
      </tableList>
      <iPagination
        v-update
        @size-change="handleSizeChange($event, getTableData)"
        @current-change="handleCurrentChange($event, getTableData)"
        background
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :current-page='page.currPage'
        :total="page.totalCount"/>
      </div>
    </div>
  </div>
</template>

<script>
import { iButton, iInput, iPagination, iSelect, iMessage } from 'rise'
import { pageMixins } from '@/utils/pageMixins';
import tableList from '@/components/commonTable/index.vue'
import { partTableTitle1, partTableTitle2 } from './data'
import { fetchPartData, fetchPartExport, fetchUserInfos } from '@/api/mtz/annualGeneralBudget/annualBudget.js'
import { getMoney, getMoneyInfo, getRatio } from '@/views/mtz/moneyComputation'
import { fetchRemoteMtzMaterial } from '@/api/mtz/annualGeneralBudget/annualBudgetEdit.js'
export default {
  mixins: [pageMixins],
  components: {
    iButton,
    iInput,
    iPagination,
    tableList,
    iSelect
  },
  props: {
    forecastId: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      searchForm: {},
      partTableTitle1,
      partTableTitle2,
      loading: false,
      tableListData: [],
      loginUserInfo: null,
      userRoles: [],
      buyUser: 'GZ',
      params: {},
      rawMaterialCodeList: [],
      userData: [],
    }
  },
  created() {
    this.loginUserInfo = this.$store.state.permission.userInfo
    this.loginUserInfo.positionList.map(item => {
      item.roleDTOList.map(roleItem => this.userRoles.push(roleItem.code))
    })
    this.getMtzMaterial()
    this.getTableData()
    this.getUserInfos()
  },
  computed: {
    money() {
      return function(val) {
        let res = ''
        if(val) {
          // res = Number(val/1000000).toFixed(2)
          res = getMoney(val)
        }
        return res
      }
    },
    moneyInfo() {
      return function(val) {
        let res = ''
        if(val) {
          res = getMoneyInfo(val)
        }
        return res
      }
    },
    ratio() {
      return function(initPrice, totalPrice) {
        let res = ''
        if(initPrice && Number(initPrice)) {
          res = getRatio(initPrice, totalPrice)
        }
        return res
      }
    }
  },
  methods: {
    // 获取数据
    getTableData() {
      return new Promise(resolve => {
        const params = {
          pageNo: this.page.currPage,
          pageSize: this.page.pageSize,
          forecastId: this.forecastId,
          ...this.searchForm
        }
        fetchPartData(params).then(res => {
          if(res && res.code == 200) {
            this.params = {
              ...res.data
            }
            this.tableListData = res.data.forecastDataPageVOIPage.records
            this.page.totalCount = res.data.forecastDataPageVOIPage.total
            resolve(res)
          } else iMessage.error(res.desZh)
        })
      })
    },
    // 获取材料数据
    getMtzMaterial() {
      fetchRemoteMtzMaterial().then(res => {
        if(res && res.code == 200) {
          this.rawMaterialCodeList = res.data
        } else iMessage.error(res.desZh)
      })
    },
    // 获取采购员数据
    getUserInfos() {
      fetchUserInfos({}).then(res => {
        if(res && res.code == 200) {
          this.userData = res.data
        } else iMessage.error(res.desZh)
      })
    },
    // 点击零件
    handleClickPart(val) {
      console.log('val', val);
      this.$router.push({
        path: '/mtz/dataBase',
        query: {
          partnum: val
        }
      })
    },
    // 点击确定查询
    handleSubmitSearch(val) {
      this.page.currPage = 1
      this.page.pageSize = 10
      this.getTableData().then(res => {
        if (!res.data || res.data.length == 0) {
          iMessage.error(this.language('BQWFCXDJGSRCWHBCZQQRHCXSR', '抱歉，无法查询到结果（输入错误或不存在），请确认后重新输入'));
        }
      })
    },
    // 点击重置查询
    handleSearchReset() {
      this.page.currPage = 1
      this.page.pageSize = 10
      for(const key in this.searchForm) {
        this.searchForm[key] = null
      }
      this.getTableData()
    },
    // 导出全部
    handleExportAll() {
      fetchPartExport({
        forecastId: this.forecastId,
        ...this.searchForm
      }).then(res => {
        if(res && res.code != 200) {
          iMessage.error(res.desZh)
        }
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.searchBox {
  .searchButton {
    margin-top: 50px;
    float: right;
    z-index: 100;
  }
}
.contentBox {
  margin-top: 48px;
  padding-bottom: 30px;
  .tableOptionBox {
    .tableTitle {
      margin: 0 10px;
      display: inline-block;
      font-weight: bold;
      font-family: Arial;
      color: #000000;
      opacity: 1;
      font-size: 18px;
    }
    button {
      float: right;
      z-index: 100;
      margin-bottom: 20px;
    }
  }
}
 
</style>

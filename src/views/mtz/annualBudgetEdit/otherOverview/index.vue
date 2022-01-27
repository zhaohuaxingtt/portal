<!--
 * @Author: youyuan
 * @Date: 2021-09-03 16:33:28
 * @LastEditTime: 2021-10-29 16:49:46
 * @LastEditors: Please set LastEditors
 * @Description: 年度预算编辑-编辑其他
 * @FilePath: \重庆软维科技\front-portal\src\views\mtz\annualBudgetEdit\buyerOverview\index.vue
-->
<template>
  <iCard>
    <div class="contentBox">
      <div class="tableOptionBox">
        <p class="tableTitle">{{language('ZONGYUSUANJINEMAOHAO', '总预算金额：')}} {{money(params.totalBudget)}} </p>
        <p class="headInfo">{{language('DANWEIBAIWANRENMINBI', '（单位：百万人民币）')}}</p>
        <iButton v-if="!editMode" @click="handleAdd">{{language('XINZENG', '新增')}}</iButton>
        <iButton v-if="!editMode" @click="handleDel">{{language('SHANCHU', '删除')}}</iButton>
        <iButton v-if="!editMode" @click="handleEdit">{{language('BIANJI', '编辑')}}</iButton>
        <iButton v-if="editMode" @click="handleSave">{{language('BAOCUN', '保存')}}</iButton>
        <iButton v-if="editMode" @click="handleCancel">{{language('QUXIAO', '取消')}}</iButton>
      </div>
      <tableList
        class="margin-top20"
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="loading"
        :index="true"
        @handleSelectionChange="handleSelectionChange">
        <!-- 采购员 -->
        <template #linieName="scope">
          <div v-if="editMode">
            <iSelect
            :value="scope.row.linieName"
            filterable
            remote
            :placeholder="language('QINGXUANZE','请选择')"
            :remote-method="(query) => remoteGetLinieList(query, scope.row)"
            :loading="linieLoading"
            @change="changeLinie($event, scope.row)"
            value-key="linieId">
              <el-option :value="{linieId: null, linieName: null, departId: null, departName: null}" :label="language('KONG', '空')" ></el-option>
              <el-option v-for="(item, index) in linieList" :key="item.linieId" :value="{linieId: item.linieId, linieName: item.linieName, departId: item.departId, departName: item.departName, departNameEn: item.departNameEn}" :label="item.linieName"></el-option>
            </iSelect>
          </div>
          <div v-if="!editMode">{{scope.row.linieName}}</div>
        </template>
        <!-- 材料中类 -->
        <template #materialMinorName="scope">
          <div v-if="editMode">
            <iSelect
            :value="scope.row.materialMinorName"
            filterable
            remote
            :placeholder="language('QINGXUANZE','请选择')"
            :remote-method="remoteGetMaterialMinorList"
            :loading="materialLoading"
            @focus="() => remoteGetMaterialMinorList(null)"
            @change="changeMaterial($event, scope.row)">
              <el-option v-for="(item, index) in materialList" :key="index" :value="item.materialCategoryCode" :label="item.materialNameZh"></el-option>
            </iSelect>
          </div>
          <div v-if="!editMode">{{scope.row.materialMinorName}}</div>
        </template>
        <!-- 预算金额 -->
        <template #budget="scope">
          <div v-if="editMode">
            <iInput v-float.expression="2" v-model="scope.row.budget" :placeholder="language('QINGSHURU','请输入')"></iInput>
          </div>
          <div v-if="!editMode">
            <el-tooltip :content="moneyInfo(scope.row['budget'])" placement="top" effect="light">
              <p>{{money(scope.row['budget'])}}</p>
            </el-tooltip>
          </div>
        </template>
        <!-- MTZ材料组 -->
        <template #mtzCategoryName="scope">
          <div v-if="editMode">
            <iSelect
            :value="scope.row.mtzCategoryName"
            filterable
            remote
            :placeholder="language('QINGXUANZE','请选择')"
            :remote-method="remoteGetMtzCategory"
            :loading="mtzCategoryLoading"
            @change="changeMtzMaterial($event, scope.row)">
              <el-option v-for="(item, index) in mtzCategoryList" :key="index" :value="item.materialGroupCode" :label="item.materialGroupNameZh"></el-option>
            </iSelect>
          </div>
          <div v-if="!editMode">{{scope.row.mtzCategoryName}}</div>
        </template>
        <!-- 科室 -->
        <template #sectionName="scope">
          <div v-if="editMode">
            <!-- v-if="scope.row.linieId && scope.row.linieName" -->
            <iSelect 
            v-if="scope.row.linieId && scope.row.linieName"
            :value="scope.row.sectionName" 
            @change="changeDept($event, scope.row)">
              <el-option :value="scope.row.sectionCode" :label="scope.row.sectionName"></el-option>
            </iSelect>
            <iSelect
            v-else
            :value="scope.row.sectionName"
            filterable
            remote
            :placeholder="language('QINGXUANZE','请选择')"
            :remote-method="remoteGetSection"
            :loading="sectionLoading"
            @focus="() => remoteGetSection(null)"
            @change="changeDept($event, scope.row)">
              <el-option v-for="(item, index) in sectionList" :key="index" :value="item.departId" :label="item.departNameEn"></el-option>
            </iSelect>
          </div>
          <div v-if="!editMode">{{scope.row.sectionName}}</div>
        </template>
        <!-- 品牌 -->
        <template #brandName="scope">
          <div v-if="editMode">
            <iSelect
            :value="scope.row.brandName"
            filterable
            remote
            :placeholder="language('QINGXUANZE','请选择')"
            :remote-method="remoteGetBrand"
            :loading="brandLoading"
            @focus="() => remoteGetBrand(null)"
            @change="changeBrand($event, scope.row)">
              <el-option v-for="(item, index) in brandList" :key="index" :value="item.brandCode" :label="item.brandName"></el-option>
            </iSelect>
          </div>
          <div v-if="!editMode">{{scope.row.brandName}}</div>
        </template>
        <!-- 备注 -->
        <template #mark="scope">
          <div v-if="editMode">
            <iInput v-model="scope.row.mark" :placeholder="language('QINGSHURU','请输入')"></iInput>
          </div>
          <div v-if="!editMode">
            <el-tooltip :content="scope.row['mark']" placement="top" effect="light">
              <p>{{scope.row['mark']}}</p>
            </el-tooltip>
          </div>
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
    <addDialog :value="dialogParams.visible" :key="dialogParams.key" @handleCloseDialog="handleCloseDialog" @handleSubmitAdd="handleSubmitAdd"/>
    <uploadInfoDialog v-model="uploadDialogParams.visible" :index="false" :key="uploadDialogParams.key" :data="uploadDialogParams.data" :tableTitle="uploadInfoTableTitle" @handleCloseDialog="handleCloseDialog"/>
  </iCard>
</template>

<script>
import { iCard, iInput, iButton, iPagination, iSelect, iMessage } from 'rise'
import { pageMixins } from '@/utils/pageMixins';
import { tableTitle, uploadInfoTableTitle } from './components/data'
import tableList from '@/components/commonTable/index.vue'
import { fetchOtherDataPage, fetchSaveOther, fetchRemoteBrand, fetchRemoteMaterialMedium, fetchRemoteMtzMaterial, fetchRemoteUser, fetchDelOther, fetchRemoteDept,getDeptSection } from '@/api/mtz/annualGeneralBudget/annualBudgetEdit'
import { getDeptData } from '@/api/kpiChart/index'
import { getMoney, getMoneyInfo } from '@/views/mtz/moneyComputation'
import { debounce } from '@/views/mtz/debounce.js'
import addDialog from './components/addDialog';
import uploadInfoDialog from '@/views/mtz/dataBase/marketPriceEnquiry/components/uploadInfoDialog'
export default {
  mixins: [pageMixins],
  components: {
    iCard,
    iInput,
    iButton,
    iPagination,
    iSelect,
    tableList,
    addDialog,
    uploadInfoDialog
  },
  data () {
    return {
      tableTitle,
      tableListData: [],
      loading: false,
      editMode: false,
      backupData: [],
      params: {},
      forecastId: this.$route.query.forecastId,
      forecastTime: this.$route.query.forecastTime,
      dialogParams: {
        key: 0,  
        visible: false
      },
      selection: [],

      linieLoading: false,
      linieList: [],
      materialLoading: false,
      materialList: [],
      mtzCategoryLoading: false,
      mtzCategoryList: [],
      sectionLoading: false,
      sectionList: [],
      brandLoading: false,
      brandList: [],
      uploadDialogParams: {
        key: 0,
        visible: false,
        data: []
      },
      uploadInfoTableTitle
    }
  },
  computed: {
    money() {
      return function(val) {
        let res = ''
        if(val) {
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
    }
  },
  created() {
    this.getTableData()
  },
  methods: {
    // 获取数据
    getTableData() {
      this.loading = true
      const params = {
        pageNo: this.page.currPage,
        pageSize: this.page.pageSize,
        forecastId: this.forecastId
      }
      fetchOtherDataPage(params).then(res => {
        this.loading = false
        if(res && res.code == 200) {
          this.params = {
            ...res.data
          }
          this.tableListData = res.data.pageVO.records
          this.page.totalCount = res.data.pageVO.total
        } else iMessage.error(res.desZh) 
      })
    },
    // 选中项改变
    handleSelectionChange(val) {
      this.selection = val
    },
    // 新增
    handleAdd() {
      this.dialogParams = {
        ...this.dialogParams,
        key: Math.random(),
        visible: true
      }
    },
    // 关闭新增弹窗
    handleCloseDialog() {
      this.uploadDialogParams = {
        visible: false
      }
      this.dialogParams = {
        ...this.dialogParams,
        visible: false,
      }
    },
    // 删除
    handleDel() {
      if(this.selection && this.selection.length == 0) {
        return iMessage.warn(this.language('QZSXZYTSJ', '请至少选中一条数据'))
      }
      fetchDelOther({
        otherIdList: this.selection.map(item => item.id)
      }).then(res => {
        if(res && res.code == 200) {
          iMessage.success(res.desZh)
          this.getTableData()
        } else iMessage.error(res.desZh)
      })
    },
    // 编辑
    handleEdit() {
      this.backupData = window._.cloneDeep(this.tableListData)
      this.editMode = true
    },
    // 取消
    handleCancel() {
      this.tableListData = window._.cloneDeep(this.backupData)
      this.editMode = false
    },
    // 保存
    handleSave() {
      const params = {
        otherList: this.tableListData
      }
      fetchSaveOther(params).then(res => {
        if(res && res.code == 200) {
          if(res.data && res.data.length > 0) {
            this.uploadDialogParams = {
              ...this.uploadDialogParams,
              key: Math.random(),
              visible: true,
              data: res.data
            }
          } else {
            this.editMode = false
            iMessage.success(res.desZh)
            this.getTableData()
          } 
        } else iMessage.error(res.desZh)
      })
    },
    // 新增
    handleSubmitAdd(data) {
      data['forecastId'] = this.forecastId
      const params = {
        otherList: [data]
      }
      fetchSaveOther(params).then(res => {
        if(res && res.code == 200) {
          this.dialogParams = {
            ...this.dialogParams,
            visible: false
          }
          iMessage.success(res.desZh)
          this.getTableData()
        } else iMessage.error(res.desZh)
      })
    },
    // 远程搜索采购员数据
    remoteGetLinieList(query, row) {
      this.linieLoading = true
      const params = {
        departId: row.sectionCode || '',
        keyWord: query
      }
      debounce(fetchRemoteUser(params).then(res => {
        this.linieLoading = false
        this.linieList = res.data
      }))
      
    },
    // 改变选中采购员数据
    changeLinie({linieId, linieName, departId, departName, departNameEn}, row) {
      
      this.tableListData.map(item => {
        if(item == row) {
          item.linieId = linieId
          item.linieName = linieName
        }

        getDeptSection(linieId).then(res=>{
          if(!res.result){
            this.sectionList = [];
            item.sectionCode = "";
            item.sectionName = "";
            return false
          };
          if(res.data.length>0){
            this.sectionList = res.data;
            item.sectionCode = res.data[0].departId;
            item.sectionName = res.data[0].departNameEn
          }else{
            this.sectionList = [];
            item.sectionCode = "";
            item.sectionName = "";
          }
        })
      })
    },
    // 远程搜索材料中类数据
    remoteGetMaterialMinorList(query) {
      this.materialLoading = true
      debounce(fetchRemoteMaterialMedium({keyWord: query}).then(res => {
        this.materialLoading = false
        if(res && res.code == 200) {
          this.materialList = res.data
        } else iMessage.error(res.desZh)
      }))
    },
    // 选中材料中类改变
    changeMaterial(e, row) {
      const target = this.materialList.find(item => item.materialCategoryCode == e)
      this.tableListData.map(item => {
        if(item == row) {
          item.materialMinorCode = target.materialCategoryCode
          item.materialMinorName = target.materialNameZh
        }
      })
    },
    // 远程搜索MTZ材料组数据
    remoteGetMtzCategory(query) {
      this.mtzCategoryLoading = true
      debounce(fetchRemoteMtzMaterial({keyWord: query}).then(res => {
        this.mtzCategoryLoading = false
        if(res && res.code == 200) {
          this.mtzCategoryList = res.data
        } else iMessage.error(res.desZh)
      }))
    },
    // 选中MTZ材料中类改变
    changeMtzMaterial(e, row) {
      const target = this.mtzCategoryList.find(item => item.materialGroupCode == e)
      this.tableListData.map(item => {
        if(item == row) {
          item.mtzCategoryCode = target.materialGroupCode
          item.mtzCategoryName = target.materialGroupNameZh
        }
      })
    },
    // 远程搜索科室数据
    remoteGetSection(query) {
      this.sectionLoading = true
      debounce(fetchRemoteDept(query ? {keyWord: query} : {}).then(res => {
        this.sectionLoading = false
        if(res && res.code == 200) {
          this.sectionList = res.data
        } else iMessage.error(res.desZh)
      }))
    },
    // 选中科室改变
    changeDept(e, row) {
      const target = this.sectionList.find(item => item.departId == e)
      this.tableListData.map(item => {
        if(item == row) {
          item.sectionCode = target.departId
          item.sectionName = target.departNameEn
        }
      })
    },
    // 远程搜索品牌数据
    remoteGetBrand(query) {
      debounce(fetchRemoteBrand({keyWord: query}).then(res => {
        this.brandLoading = true
        if(res && res.code == 200) {
          this.brandLoading = false
          this.brandList = res.data
        } else iMessage.error(res.desZh)
      }))
    },
    // 改变品牌
    changeBrand(e, row ) {
      const target = this.brandList.find(item => item.brandCode == e)
      this.tableListData.map(item => {
        if(item == row) {
          item.brandCode = target.brandCode
          item.brandName = target.brandName
        }
      })
    },

  }
}
</script>

<style lang='scss' scoped>
.contentBox {
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
    .headInfo {
      display: inline-block;
      font-family: Arial;
      color: #727272;
      opacity: 1;
      font-size: 16px;
    }
    button {
      float: right;
      z-index: 100;
      margin-left: 10px;
      margin-bottom: 20px;
    }
  }
}
::v-deep .el-table .el-table__row .el-input .el-input__inner {
  text-align: center !important;
}
::v-deep .el-table .el-table__row .el-input {
    width: 100% !important;
}
 
</style>


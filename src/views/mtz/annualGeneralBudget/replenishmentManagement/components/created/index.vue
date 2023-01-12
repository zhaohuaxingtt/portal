<!--
 * @Author: YoHo
 * @Date: 2023-01-11 17:42:03
 * @LastEditors: YoHo && 917955345@qq.com
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\replenishmentManagement\components\created\index.vue
-->
<template>
  <iPage>
    <div class="header">
      <h1>一次件供应商芯片补差计算（草稿）</h1>
      <iButton>计算</iButton>
    </div>
    <iCard>
      <p class="title">基本信息</p>
      <iFormGroup :inline="true" :row="5" :model="searchForm">
        <iFormItem
          style="marginright: 68px"
          :label="language('YICIJIANGONGYINGSHANG', '一次件供应商')"
          required
        >
          <el-select
            v-model="firstSuppliers"
            multiple
            clearable
            collapse-tags
            @change="handleChangeFsupplier"
            :placeholder="language('QINGXUANZE', '请选择')"
          >
            <el-option
              v-for="item in fsupplierList"
              :key="item.code"
              :label="item.message"
              :value="item.code"
            >
            </el-option>
          </el-select>
        </iFormItem>
        <iFormItem
          style="marginright: 68px"
          :label="language('BUCHASHIJIANDUAN', '补差时间段')"
          :required='true'
        >
          <iDatePicker
            v-model="value1"
            type="daterange"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            @change="handleChange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </iDatePicker>
        </iFormItem>
        <iFormItem
          style="marginright: 68px"
          :label="language('ZHUANGTAI', '状态')"
        >
          <iInput v-model="status" disabled> </iInput>
        </iFormItem>
      </iFormGroup>
      <el-divider></el-divider>
      <div class="header">
        <p class="title">补差规则</p>
        <div>
          <iButton>导出</iButton>
          <iButton @click="openDialog">选择规则</iButton>
        </div>
      </div>
      <iTableCustom
        ref="chipCreated"
        :loading="tableLoading"
        :data="tableData"
        :columns="tableTitle"
      />
      <iPagination
        @size-change="handleSizeChange($event, getTableList)"
        @current-change="handleCurrentChange($event, getTableList)"
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :current-page="page.currPage"
        :total="page.totalCount"
        :layout="page.layout"
      >
      </iPagination>
    </iCard>
    <iDialog
      :title="language('选择芯片补差规则', '选择芯片补差规则')"
      :visible.sync="openDialogVisible"
      v-if="openDialogVisible"
      width="90%"
      @close="closeDiolog"
    >
      <continueBox @addDialogData="addDialogDataList"></continueBox>
    </iDialog>
  </iPage>
</template>

<script>
import {
  iPage,
  iButton,
  iInput,
  iDatePicker,
  iSearch,
  iCard,
  iFormGroup,
  iFormItem,
  iTableCustom,
  iDialog
} from 'rise'
import { pageMixins } from '@/utils/pageMixins'
import { tableTitle } from './components/data'
import continueBox from "./components/continueBox";
import { getMtzSupplierList } from '@/api/mtz/annualGeneralBudget/mtzReplenishmentOverview'
export default {
  mixins: [pageMixins],
  components: {
    iPage,
    iButton,
    iInput,
    iDatePicker,
    iSearch,
    iCard,
    iFormGroup,
    iFormItem,
    iTableCustom,
    iDialog,
    continueBox
  },
  data() {
    return {
      fsupplierList:[],
      firstSuppliers: '',
      status: '草稿',
      tableLoading: false,
      tableTitle,
      tableData: [],
      openDialogVisible:false,
      value1: '',
      value2: '',
      value3: ''
    }
  },
  created(){
    this.getMtzSupplierList()
  },
  methods:{
    openDialog(){
      this.openDialogVisible = true
    },
    closeDiolog() {
      this.openDialogVisible = false
    },
    addDialogDataList(val) {
      this.newDataList = val.map((item) => {
        this.$set(item, 'supplier', item.sapCode + '-' + item.supplierName)
        return item
      })
      this.closeDiolog()
      this.tableData.unshift(...this.newDataList)
      this.editType = true
      this.$refs.moviesTable.clearSelection()
      this.editId = this.newDataList.map((item) => {
        this.$refs.moviesTable.toggleRowSelection(item, true)
        return item.id
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
    getTableList(){
      getData().then(res=>{

      })
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 20px;
}
</style>
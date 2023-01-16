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
      <h1>{{ type }}供应商芯片补差计算（草稿）</h1>
      <iButton @click="computedData">计算</iButton>
    </div>
    <iCard>
      <p class="title">基本信息</p>
      <iFormGroup :inline="true">
        <iFormItem style="marginright: 68px" required>
          <iLabel
            class="label"
            required
            :label="type + language('GONGYINGSHANG', '供应商')"
            slot="label"
          ></iLabel>
          <mySelect
            style="width: 240px"
            :data="fsupplierList"
            @change="handleChangeFsupplier"
            :searchValue="searchForm.sapCode"
            :placeholder="language('QINGXUANZE', '请选择')"
            :loading="loading"
            clearable
            propLabel="codeMessage"
            propValue="code"
          />
        </iFormItem>
        <iFormItem style="marginright: 68px">
          <iLabel
            class="label"
            required
            :label="language('BUCHASHIJIANDUAN', '补差时间段')"
            slot="label"
          ></iLabel>
          <iDatePicker
            v-model="searchForm.dateRange"
            clearable
            type="daterange"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd HH:mm:ss"
            @change="handleChangeDate"
            :range-separator="$t('至')"
            :start-placeholder="$t('开始日期')"
            :end-placeholder="$t('结束日期')"
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
          <iButton @click="exportExcel">导出</iButton>
          <iButton :disabled="disabled" @click="openDialog">选择规则</iButton>
        </div>
      </div>
      <iTableCustom
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
      <continueBox
        @addDialogData="addDialogDataList"
        :sapCode="searchForm.sapCode"
        :supplierName="searchForm.supplierName"
        :dateRange="searchForm.dateRange"
      ></continueBox>
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
  iLabel,
  iTableCustom,
  iDialog
} from 'rise'
import { pageMixins } from '@/utils/pageMixins'
import { tableTitle } from './components/data'
import continueBox from './components/continueBox'
import mySelect from './components/mySelect'
import {
  getSupplierByuser,
  calculate,
  saveBalance
} from '@/api/mtz/annualGeneralBudget/chipReplenishment'
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
    iLabel,
    iDialog,
    continueBox,
    mySelect
  },
  data() {
    return {
      fsupplierList: [],
      searchForm: {
        sapCode: '',
        supplierName: '',
        dateRange: []
      },
      status: '草稿',
      tableLoading: false,
      tableTitle,
      tableData: [],
      openDialogVisible: false
    }
  },
  computed: {
    disabled() {
      return !(
        this.searchForm.sapCode && (this.searchForm.dateRange || []).length
      )
    }
  },
  created() {
    this.type = this.$route.query.type == 1 ? '一次件' : '散件'
    this.getSupplierByuser()
  },
  methods: {
    handleChangeFsupplier(val, item) {
      this.searchForm.sapCode = val
      this.searchForm.supplierName = item ? item.message : ''
      this.tableData = []
    },
    handleChangeDate() {
      this.tableData = []
    },
    openDialog() {
      this.openDialogVisible = true
    },
    closeDiolog() {
      this.openDialogVisible = false
    },
    // 添加规则数据
    addDialogDataList(val) {
      this.newDataList = val.map((item) => {
        this.$set(item, 'supplier', item.sapCode + '-' + item.supplierName)
        return item
      })
      this.closeDiolog()
      this.tableData.unshift(...this.newDataList)
    },
    // 查询一次件供应商
    getSupplierByuser() {
      getSupplierByuser({}).then((res) => {
        if (res.code === '200') {
          this.fsupplierList = JSON.parse(JSON.stringify(res.data))
          console.log(this.fsupplierList)
        } else {
          iMessage.error(res.desZh)
        }
      })
    },
    // 计算,先保存再计算
    computedData() {
      let params = {
        attachmentList: [],
        balanceBase: {
          supplierSapCode:this.searchForm.sapCode,
          buyerId:this.$store.state.permission.userInfo.id,
          balanceType: this.$route.query.type,
          startFrom: window
            .moment(this.searchForm.dateRange[0])
            .format('YYYY-MM-DD 00:00:00'),
          endTo: (this.searchForm.endDate = window
            .moment(this.searchForm.dateRange[1])
            .format('YYYY-MM-DD 23:59:59'))
        },
        balanceItemList: [],
        balanceRuleList: this.tableData
      }
      saveBalance(params).then((res) => {
        if (res?.code == '200') {
          calculate({ balanceId: res.data }).then((res) => {
            console.log(res);
            // window.close()
          })
        }
      })
    },
    // 导出
    exportExcel() {
      console.log('exportExcel=>导出')
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
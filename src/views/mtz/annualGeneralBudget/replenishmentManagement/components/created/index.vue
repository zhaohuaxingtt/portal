<!--
 * @Author: YoHo
 * @Date: 2023-01-11 17:42:03
 * @LastEditors: YoHo && 917955345@qq.com
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\replenishmentManagement\components\created\index.vue
-->
<template>
  <iPage v-permission="PORTAL_CHIP_FAQIBUCHA">
    <div class="header">
      <h1>{{ supplierType }}供应商芯片补差计算（{{statusName}}）</h1>
      <template v-if="showContent">
        <iButton @click="computedData" :loading="btnLoading">计算</iButton>
      </template>
    </div>
    <iCard>
      <p class="title">基本信息</p>
      <iFormGroup :inline="true">
        <iFormItem style="marginright: 68px" required>
          <iLabel
            class="label"
            required
            :label="supplierType + language('GONGYINGSHANG', '供应商')"
            slot="label"
          ></iLabel>
          <mySelect
            style="width: 240px"
            :data="supplierList"
            @change="handleChangeFsupplier"
            :searchValue="searchForm.sapCode"
            :placeholder="language('QINGXUANZE', '请选择')"
            :loading="loading"
            clearable
            propLabel="codeMessage"
            propValue="code"
            v-if="showContent"
          />
          <i-input v-else disabled v-model="supplier"></i-input>
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
            :disabled="!showContent"
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
          <iInput v-model="statusName" disabled> </iInput>
        </iFormItem>
      </iFormGroup>
      <el-divider></el-divider>
      <div class="header">
        <p class="title">补差规则</p>
        <div>
          <iButton @click="exportBalanceRuleList">导出</iButton>
          <iButton :disabled="disabled"  v-if="showContent" @click="openDialog">选择规则</iButton>
        </div>
      </div>
      <iTableCustom
        :loading="tableLoading"
        :data="tableData"
        :columns="tableTitle"
        @gotoSource="gotoSource"
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
  iDialog,
  iMessage
} from 'rise'
import { pageMixins } from '@/utils/pageMixins'
import { tableTitle } from './components/data'
import continueBox from './components/continueBox'
import mySelect from './components/mySelect'
import {
  getSupplierByUser,
  calculate,
  saveBalance,
  findBalanceById,
  exportBalanceRuleList,
} from '@/api/mtz/annualGeneralBudget/chipReplenishment'
import {
  exportAppRecordByCondition
} from '@/api/mtz/annualGeneralBudget/replenishmentManagement/chipLocation/details'

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
      supplierList: [],
      searchForm: {
        sapCode: '',
        supplierName: '',
        dateRange: []
      },
      supplierType:'一次件',
      statusName: '-',
      tableLoading: false,
      btnLoading: false,
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
    },
    showContent(){
      return !this.balanceId // 有id就意味不能再修改 
    }
  },
  created() {
    this.balanceId = this.$route.query.balanceId
    this.supplierType = this.$route.query.type == 1 ? '一次件' : '散件'
    if(this.balanceId){
      this.findBalanceById()
    }else{  // 新建
      this.getSupplierByuser()
    }
  },
  methods: {
    findBalanceById(){
      findBalanceById({balanceId:this.balanceId}).then(res=>{
        console.log(res);
        if(res?.code=='200'){
          this.statusName = res.data.balanceTaskBase.taskStatusName
          this.supplier = res.data.balanceBase.supplierSapCode+'-'+res.data.balanceBase.supplierName
          this.searchForm.sapCode = res.data.balanceBase.supplierSapCode
          this.searchForm.supplierName = res.data.balanceBase.supplierName
          this.searchForm.dateRange = [res.data.balanceBase.startFrom,res.data.balanceBase.endTo]
          this.tableData = res.data.balanceRuleList
        }
      })
    },
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
      let ruleNoList = this.tableData.map(item=>item.ruleNo)
      this.newDataList = []
      val.map((item) => {
        const el = JSON.parse(JSON.stringify(item))
        if(!ruleNoList.includes(el.ruleNo)){
          this.$set(el, 'supplier', el.sapCode + '-' + el.supplierName)
          this.newDataList.push(el)
        }
      })
      this.closeDiolog()
      this.tableData.unshift(...this.newDataList)
    },
    // 查询一次件供应商
    getSupplierByuser() {
      getSupplierByUser({}).then((res) => {
        if (res.code === '200') {
          this.supplierList = JSON.parse(JSON.stringify(res.data))
        } else {
          iMessage.error(res.desZh)
        }
      })
    },
    // 跳转补差来源
    gotoSource(row){
      window.open(`${window.location.origin}/portal/#/mtz/annualGeneralBudget/locationChange/chipLocationPoint/overflow/decisionMaterial?appId=${row.sourceId}`)
    },
    // 计算,先保存再计算
    computedData() {
      if(this.searchForm.sapCode&&this.$route.query.type&&this.searchForm.dateRange.length&&this.tableData.length){
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
        this.btnLoading = true
        saveBalance(params).then((res) => {
          if (res?.code == '200') {
            calculate({ balanceId: res.data }).then((res) => {
              if(res?.code==200){
                iMessage.success('提交计算成功')
                this.$router.replace({
                  path:'/mtz/annualGeneralBudget/replenishmentManagement/chipCalculationTask'
                })
              }else{
                this.btnLoading = false
              }
            })
          }
        }).catch(()=>{
          this.btnLoading = false
        })
      }else{
        iMessage.warn('请填写必要信息')
      }
    },
    // 导出
    exportBalanceRuleList() {
      if(!this.balanceId) return iMessage.warn('请先保存信息')
      exportBalanceRuleList({ balanceId: this.balanceId }).then(res=>{
        console.log(res);
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
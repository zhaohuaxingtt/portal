<!--
 * @Author: your name
 * @Date: 2021-10-18 18:52:11
 * @LastEditTime: 2023-02-15 15:36:23
 * @LastEditors: YoHo && 917955345@qq.com
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\replenishmentManagement\components\chipSupplementaryList\components\theTable.vue
-->
<template>
  <iCard>
    <div slot="header" class="flex-between-center" style="width: 100%">
        <div class="showMe">
          <span>{{ language('只看自己 ') }}</span>
          <el-switch
            v-model="isOnlyMyself"
            class="margin-right10"
            @change="getmakeUpPageList"
            active-color="#1660F1"
            inactive-color="#cccccc"
          >
          </el-switch>
          <el-radio-group v-model="supplierType" @change="getmakeUpPageList">
            <template v-for="item in typeList">
              <el-radio-button :label="item.label" :key="item.key">{{ $t(item.key) }}</el-radio-button>
            </template>
          </el-radio-group>
        </div>
      <div class="opration">
        <iButton
          @click="deleteBalance"
          >{{ language('SHANCHU', '删除') }}</iButton
        >
        <iButton
          @click="sendSupplier"
          v-permission="PROTAL_MTZ_BUCHAGUANLI_BUCHALIEBIAO_FAQIGONGINGSHANG"
          >{{ language('FASONGGONGYINGSHANG', '发送供应商') }}</iButton
        >
        <iButton
          @click="handleClickEdit"
          v-permission="PROTAL_MTZ_BUCHAGUANLI_BUCHALIEBIAO_EDIT"
          >{{ language('BIANJI', '编辑') }}</iButton
        >
        <iButton
          @click="submit"
          v-permission="PROTAL_MTZ_BUCHAGUANLI_BUCHALIEBIAO_SUBMIT"
          >{{ language('TIJIAO', '提交') }}</iButton
        >
        <iButton
          @click="recall"
          v-permission="PROTAL_MTZ_BUCHAGUANLI_BUCHALIEBIAO_CHEHUI"
          >{{ language('CHEHUI ', '撤回') }}</iButton
        >
        <iButton
          @click="exportFile"
          v-permission="PROTAL_MTZ_BUCHAGUANLI_BUCHALIEBIAO_DAOCHU"
          >{{ language('DAOCHU ', '导出') }}</iButton
        >
      </div>
    </div>
    <iTableCustom
        :loading="loading"
        :data="tableData"
        :columns="tableTitle"
		    @handle-selection-change="handleSelectionChange"
        @openPage="openPage"
      />
    <iPagination
      v-update
      @size-change="handleSizeChange($event, getmakeUpPageList)"
      @current-change="handleCurrentChange($event, getmakeUpPageList)"
      background
      :page-sizes="page.pageSizes"
      :page-size="page.pageSize"
      :layout="page.layout"
      :current-page="page.currPage"
      :total="page.totalCount"
    />
    <search
      :detailObj="detailObj"
      v-if="dialogShow"
      v-on:dialogShowFun="dialogShowFun"
    />
  </iCard>
</template>

<script>
import {
  findBalanceByPage,
  sendSupplierConfirm,
  exportBalanceList,
  recallBalance,
  deleteBalance,
  submitBalance,
} from '@/api/mtz/annualGeneralBudget/chipReplenishment'
import { iCard, iButton, iPagination, iMessage, iTableCustom } from 'rise'
import { pageMixins } from '@/utils/pageMixins'
import processVertical from './processVertical'
import search from './search'
import { tableTitle } from "./data"
export default {
  components: {
    iCard,
    iButton,
    iPagination,
    search,
    processVertical,
    iTableCustom
  },
  mixins: [pageMixins],
  data() {
    return {
      tableTitle,
      totalPrice: [],
      searchForm: {},
      tableData: [],
      muiltSelectList: [],
      loading: false,
      detailObj:{},
      dialogShow:false,
      supplierType: '一次件供应商',
      typeList:[
        {
          label:'一次件供应商',
          key:'一次件补差单',
        },{
          label:'散件供应商',
          key:'散件补差单',
        },
      ],
      isOnlyMyself:false,
    }
  },
  created() {
    this.getmakeUpPageList()
  },
  methods: {
    getmakeUpPageList() {
      this.loading = true
      let search = []
      search = this.$parent.$children.filter((item) => {
        return item.$options._componentTag === 'theSearch'
      })
      this.searchForm = search[0].searchForm
      const req = {
        currentPage: this.page.currPage,
        pageSize: this.page.pageSize,
        isOnlyMyself:this.isOnlyMyself,
        isPrimary:this.supplierType == '一次件供应商' ? true : false, //是否一次性补差
        primarySupplier:'',
        secondSupplier:'',
        ...this.searchForm
      }
      findBalanceByPage(req).then((res) => {
        if (res.code === '200') {
          this.tableData = res.data.records
          this.page.totalCount = res.data.total || 0
          this.loading = false
        }
      })
      this.loading = false
    },
    openPage(val) {
      this.detailObj = val
      this.$nextTick(()=>{
        this.dialogShow = true
      })
    },
    dialogShowFun(){
        this.dialogShow = false
    },
    deleteBalance(){
      if (this.muiltSelectList.length === 0) {
        iMessage.error('请选择数据')
      }
      if (
        this.muiltSelectList[0].statusName === '草稿' ||
        this.muiltSelectList[0].statusName === '撤回'
      ) {
        deleteBalance(this.muiltSelectList.map(item=>item.id)).then((res) => {
          if (res.code === '200') {
            this.getmakeUpPageList()
            iMessage.success(res.desZh)
          } else {
            iMessage.error(res.desZh)
          }
        })
      } else {
        iMessage.error("'草稿和撤回状态下才可以删除")
      }

    },
    sendSupplier() {
      if (this.muiltSelectList.length === 0) {
        iMessage.error('请选择数据')
      }
      if (
        this.muiltSelectList[0].statusName === '草稿' ||
        this.muiltSelectList[0].statusName === '供应商拒绝' ||
        this.muiltSelectList[0].statusName === '审批不通过'
      ) {
        sendSupplierConfirm(this.muiltSelectList.map(item=>item.id)).then((res) => {
          if (res.code === '200') {
            this.getmakeUpPageList()
            iMessage.success(res.desZh)
          } else {
            iMessage.error(res.desZh)
          }
        })
      } else {
        iMessage.error("'草稿、供应商拒绝、审批不通过状态可以提交")
      }
    },
    handleClickEdit() {
      if (this.muiltSelectList.length != 1) {
        return iMessage.warn(this.language('QINGXUANZEYITIAOSHUJU', '请选择一条数据'))
      }
      if (
        this.muiltSelectList[0].statusName === '草稿' ||
        this.muiltSelectList[0].statusName === '供应商拒绝' ||
        this.muiltSelectList[0].statusName == '审批不通过' ||
        this.muiltSelectList[0].statusName == '审批退回' ||
        this.muiltSelectList[0].statusName == 'RISE审批通过' ||
        this.muiltSelectList[0].statusName == '供应商确认'
      ) {
        // 一次件
        let balanceId = this.muiltSelectList[0].id || ''
        
        // 一次件
        if (this.supplierType == '一次件供应商') {
          window.open(`/portal/#/chipComputed?type=1&balanceId=${balanceId}`)
        }
        // 二次件/散件
        if (this.supplierType == '散件供应商') {
          window.open(`/portal/#/chipComputed?type=2&balanceId=${balanceId}`)
        }
      } else {
        iMessage.error(
          "'草稿、供应商已拒绝、审批不通过、审批退回、RISE审批通过、供应商确认状态可以编辑"
        )
      }
    },
    submit() {
      if (this.muiltSelectList.length === 0) {
        iMessage.error('请选择数据')
      }
      if (
        this.muiltSelectList[0].statusName === '供应商确认' ||
        this.muiltSelectList[0].statusName === '审批退回' ||
        this.muiltSelectList[0].statusName === 'RISE审批通过'
      ) {
        let params = []
        this.muiltSelectList.forEach((item) => {
          params.push(item.id)
        })
        submitBalance(params).then((res) => {
          if (res.code === '200') {
            this.getmakeUpPageList()
            iMessage.success(res.desZh)
          } else {
            iMessage.error(res.desZh)
          }
        })
      } else {
        iMessage.error("'供应商确认、审批退回、RiSE审批通过状态可以提交")
      }
    },
    recall() {
      if (this.muiltSelectList.length === 0) {
        iMessage.error('请选择数据')
      }
      if (
        this.muiltSelectList[0].statusName === '草稿' ||
        this.muiltSelectList[0].statusName === '供应商确认中' ||
        this.muiltSelectList[0].statusName === '供应商拒绝' ||
        this.muiltSelectList[0].statusName === '审批不通过'
      ) {
        let params = []
        this.muiltSelectList.forEach((item) => {
          params.push(item.id)
        })
        recallBalance(params).then((res) => {
          if (res.code === '200') {
            this.getmakeUpPageList()
            iMessage.success(res.desZh)
          } else {
            iMessage.error(res.desZh)
          }
        })
      } else {
        iMessage.error(
          "'草稿、供应商确认中、供应商拒绝、审批不通过状态可以撤回"
        )
      }
    },
    handleSelectionChange(val) {
        this.muiltSelectList = val
    },
    exportFile() {
      let search = []
      search = this.$parent.$children.filter((item) => {
        return item.$options._componentTag === 'theSearch'
      })
      this.searchForm = search[0].searchForm
      const req = {
        currentPage: this.page.currPage,
        pageSize: this.page.pageSize,
        isOnlyMyself:this.isOnlyMyself,
        isPrimary:true, //是否一次性补差
        primarySupplier:'',
        secondSupplier:'',
        ...this.searchForm
      }
      exportBalanceList(req).then((res) => {
        if (res?.code === '200') {
          iMessage.success(res.desZh)
        } else {
          iMessage.error(res.desZh)
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.openPage {
  position: relative;
  color: $color-blue;
  font-size: 14px;
  cursor: pointer;
  width: 90%;
}
</style>
<style lang="scss">
.el-table__fixed-header-wrapper,
.el-table__fixed-body-wrapper {
  background-color: #fff;
}
</style>

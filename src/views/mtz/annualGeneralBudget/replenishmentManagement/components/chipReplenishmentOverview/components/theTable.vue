<!--
 * @Author: your name
 * @Date: 2021-10-08 14:25:34
 * @LastEditTime: 2023-02-09 11:16:53
 * @LastEditors: YoHo && 917955345@qq.com
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\replenishmentManagement\components\chipReplenishmentOverview\components\theTable.vue
-->
<template>
  <div>
    <iCard>
      <template v-slot:header>
        <div class="showMe">
          <span>{{ language('只看自己 ') }}</span>
          <el-switch
            v-model="onlySeeMySelf"
            class="margin-right10"
            @change="showOnlyMyselfData($event)"
            active-color="#1660F1"
            inactive-color="#cccccc"
          >
          </el-switch>
          <el-radio-group v-model="supplierType" @change="getTableList">
            <template v-for="item in typeList">
              <el-radio-button :label="item.label" :key="item.key">{{ $t(item.key) }}</el-radio-button>
            </template>
          </el-radio-group>
        </div>
        <el-dropdown
          class="btndropdown margin-left10 margin-right10"
          size="mini"
          @command="handleCommand"
        >
          <iButton v-permission="PORTAL_MTZ_FAQIBUCHA"
            >{{ $t('FAQIBUCHA')
            }}<i class="el-icon-arrow-down el-icon--right"></i>
          </iButton>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="Tier-1">{{
              $t('一次件供应商')
            }}</el-dropdown-item>
            <el-dropdown-item command="Tier-2">{{
              $t('散件供应商')
            }}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </template>

      <iTableCustom
        :loading="loading"
        :data="tableData"
        :columns="tableTitle"
        @handleClickFsupplierName="handleClickFsupplierName"
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
    <detailDialog
      v-model="detailParams.visible"
      v-if="detailParams.visible"
      :key="detailParams.key"
      :params="detailParams.data"
      :supplierType="supplierType"
      @handleCloseDialog="handleCloseDialog"
      @handleRedeploy="handleRedeploy"
    />
    <redeployDialog
      v-model="redeployParams.visible"
      :key="redeployParams.key"
      @handleReturnDetail="handleReturnDetail"
      @handleSubmitAssign="handleSubmitAssign"
    />
  </div>
</template>

<script>
import { iCard, iButton, iPagination, icon, iTableCustom, iMessage } from 'rise'
import { pageMixins } from '@/utils/pageMixins'
import detailDialog from './detailDialog'
import redeployDialog from './redeployDialog'
import {
  findBalanceSummaryByPage
} from '@/api/mtz/annualGeneralBudget/chipReplenishment'
import { fetchAssign } from '@/api/mtz/annualGeneralBudget/replenishmentManagement/mtzReplenishmentOverview/detail'
import { tableTitle1, tableTitle2 } from './data'
export default {
  name: 'Search',
  componentName: 'theTable',
  components: {
    iCard,
    iButton,
    iPagination,
    icon,
    iTableCustom,
    detailDialog,
    redeployDialog
  },
  watch: {},
  mixins: [pageMixins],
  data() {
    return {
      supplierType: '一次件供应商',
      typeList:[
        {
          label:'一次件供应商',
          key:'一次件补差',
        },{
          label:'散件供应商',
          key:'散件补差',
        },
      ],
      detailParams: {
        key: 0,
        visible: false,
        data: {}
      },
      redeployParams: {
        key: 0,
        visible: false
      },
      handleSelectArr: [],
      detailIdList: [],
      tableData: [],
      loading: false,
      onlySeeMySelf:true
    }
  },
  computed: {
    tableTitle() {
      return this.supplierType == '一次件供应商' ? tableTitle1 : tableTitle2
    }
  },
  created() {
    this.getTableList()
  },
  methods: {
    //仅看自己
    showOnlyMyselfData(val) {
      this.onlySeeMySelf = val
      this.getTableList()
    },
    // 参照
    handleCommand(command) {
      // 一次件
      if (command == 'Tier-1') {
        window.open('/portal/#/chipCeated?type=1')
      }
      // 二次件/散件
      if (command == 'Tier-2') {
        window.open('/portal/#/chipCeated?type=2')
      }
    },
    formatterNumber(row, column, cellValue, index) {
      return VueUtil.formatNumber(cellValue)
    },
    add() {
      let params = {
        dialogVisible: true,
        selectData: this.handleSelectArr,
        flag: true,
        date: this.$parent.$refs.searchBox.value1
      }
      this.$emit('dialog', params)
    },
    getTableList() {
      this.loading = true
      let search = []
      search = this.$parent.$refs.searchBox.searchForm
      const params = {
        currentPage: this.page.currPage,
        pageSize: this.page.pageSize,
        isPrimary: this.supplierType == '一次件供应商' ? true : false,
        onlySeeMySelf:this.onlySeeMySelf,
        ...search
      }
      delete params.compDate
      findBalanceSummaryByPage(params).then((res) => {
        if (res?.code == '200') {
          this.tableData = res.data.records || []
          this.page.totalCount = res.data?.total || 0
          this.loading = false
        } else {
          this.loading = false
        }
      })
    },
    // 点击名称，打开弹窗
    handleClickFsupplierName(val) {
      console.log(val)
      this.$nextTick((_) => {
        this.detailParams = {
          ...this.detailParams,
          key: Math.random(),
          visible: true,
          data: {
            firstSupplierId: val.firstSupplierId,
            name: val.firstSupplierName,
            time: this.$parent.$refs.searchBox.value1
          }
        }
      })
    },
    // 关闭弹窗
    handleCloseDialog() {
      this.detailParams.visible = false
      this.redeployParams.visible = false
    },
    // 跳转转派弹窗
    handleRedeploy(idList) {
      this.detailIdList = idList
      // this.$set(this.detailParams, 'visible', false)
      this.$set(this.redeployParams, 'key', Math.random())
      this.$nextTick((_) => {
        this.$set(this.redeployParams, 'visible', true)
      })
    },
    // 返回详情
    handleReturnDetail() {
      // this.$set(this.redeployParams, 'visible', false)
      // this.$set(this.detailParams, 'key', Math.random())
      // this.$nextTick(_ => {
      //   this.$set(this.detailParams, 'visible', true)
      // })
    },
    // 转派
    handleSubmitAssign(list) {
      var data = list
      let linieName = data.message.split('-')[1]
      let linieId = data.code
      fetchAssign({
        keyList: this.detailIdList,
        linieName,
        linieId
      }).then((res) => {
        if (res && res.code == 200) {
          iMessage.success(res.desZh)
          this.$set(this.redeployParams, 'visible', false)
        } else iMessage.error(res.desZh)
      })
      this.$set(this.detailParams, 'key', Math.random())
    },
    handleSelectionChange(val) {
      console.log(val)
      if (val.length > 1) {
        var duoxuans = val.pop()
        this.handleSelectArr = val.pop()
        //清除所有选中
        this.$refs.moviesTable.clearSelection()
        //给最后一个加上选中
        this.$refs.moviesTable.toggleRowSelection(duoxuans)
      } else {
        this.handleSelectArr = val
      }
    }
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
::v-deep .el-table__fixed-header-wrapper,
.el-table__fixed-body-wrapper {
  background-color: #fff;
  z-index: 1000;
}
</style>
<style lang="scss">
.el-table__fixed,
.el-table__fixed-right {
  background: #fff;
}
</style>

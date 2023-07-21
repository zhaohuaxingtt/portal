<!--
 * @Author: your name
 * @Date: 2021-10-08 14:25:34
 * @LastEditTime: 2023-03-17 16:57:05
 * @LastEditors: YoHo && 917955345@qq.com
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\replenishmentManagement\components\chipReplenishmentOverview\components\theTable.vue
-->
<template>
    <iCard class="table-card">
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
          <iButton v-permission="PORTAL_CHIP_FAQIBUCHA"
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
        class="table-box"
        height="100%"
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
      <detailDialog
        :visible.sync="visible"
        v-if="visible"
        :params="row"
        :supplierType="supplierType"
      />
    </iCard>
</template>

<script>
import { iCard, iButton, iPagination, icon, iTableCustom, iMessage } from 'rise'
import { pageMixins } from '@/utils/pageMixins'
import detailDialog from './detailDialog'
import {
  findBalanceSummaryByPage
} from '@/api/mtz/annualGeneralBudget/chipReplenishment'
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
  },
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
      row: {},
      visible: false,
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
    handleClickFsupplierName(row) {
      this.row = row
      this.$nextTick(()=>{
        this.visible = true
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

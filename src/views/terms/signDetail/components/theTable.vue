<template>
  <div>
    <iCard class="margin-top20">
      <div class="margin-bottom20 clearFloat">
        <div class="floatright">
          <div class="">
            <iButton @click="handleExportAll">{{
              $t('DAOCHU')
            }}</iButton>
            <button-table-setting @click="$refs.termsTable.openSetting()" />
          </div>
        </div>
      </div>

      <iTableCustom
        ref="termsTable"
        :loading="tableLoading"
        :data="tableListData"
        :columns="tableColumns"
        :tree-expand="exData"
        permissionKey="ADMIN_TERMS"
        :extraData="extraData"
        @handle-selection-change="handleSelectionChange"
        @go-detail="handleGoDetail"
      />
      <iPagination
        v-update
        @current-change="handleCurrentChange($event)"
        @size-change="handleSizeChange($event)"
        background
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :prev-text="$t('TM_SHANGYIYE')"
        :next-text="$t('TM_XIAYIYE')"
        :layout="page.layout"
        :current-page="page.currPage"
        :total="page.total"
      />
    </iCard>
  </div>
</template>

<script>
import iTableCustom from '@/components/iTableCustom'
import { iCard, iButton, iPagination } from 'rise'
import { excelExport } from '@/utils/filedowLoad'
import { getDictByCode } from '@/api/dictionary/index'
import {
  tableTitle,
  isPersonalTermsObj,
  stateObj,
  supplierRangeObj,
  supplierContactsObj,
  supplierIdentityObj
} from './data'

export default {
  components: {
    iCard,
    iButton,
    iPagination,
    iTableCustom
  },
  props: {
    tableListData: {
      type: Array,
      default: () => {
        return []
      }
    },
    typeObject: {
      type: Object,
      default: () => {
        return {}
      }
    },
    page: {
      type: Object,
      default: () => {
        return {}
      }
    },
    tableLoading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      tableTitle,// 导出表格
      isPersonalTermsObj,
      stateObj,
      supplierRangeObj,
      supplierContactsObj,
      supplierIdentityObj,
      selectedTableData: [],
      selectState: [],
      signNodeList: [],
      signNodeListObj: {},
      openSignDetailDialog: false,
      id: -1,
      termsCode: -1,
      state: '',
      approvalProcess: [],
      signTitle: {},
      extraData: { signNodeListObj: {} },
      tableColumns: [
        {
          type: 'selection'
        },
        {
          type: 'index',
          label: '序号',
          i18n: 'TM_XUHAO'
        },
        {
          i18n: 'TM_TIAOKUANBIANMA',
          prop: 'termsCode',
          sortable: true,
          minWidth: 100
        },
        {
          i18n: '条款名称/版本',
          prop: 'name',
          emit: 'go-detail',
          sortable: true,
          minWidth: 200,
          customRender: (h, scope) => {
            return <span class="link-text">{scope.row.name}/{scope.row.termsVersion}</span>
          }
        },
        {
          i18n: '供应商名称',
          prop: 'supplierName',
          minWidth: 140,
          sortable: true
        },
        {
          i18n: '业务编码',
          prop: 'publishDate',
          minWidth: 120,
          sortable: true
        },
        {
          i18n: '临时号',
          prop: 'signNode',
          sortable: true,
          minWidth: 120,
          customRender: (h, scope, column, extraData) => {
            return extraData.signNodeListObj[scope.row.signNode]
          }
        },
        {
          i18n: 'SVW号',
          prop: 'signResult',
          sortable: true,
          minWidth: 100,
        },
        {
          i18n: 'SAP号',
          prop: 'isPersonalTerms',
          sortable: true,
          minWidth: 120,
        },
        {
          i18n: '供应商类型',
          prop: 'supplierRange',
          sortable: true,
          minWidth: 140,
          tooltip: true,
          customRender: (h, scope) => {
            const map = {
              PP: 'TM_SHENGCHANGONGYINGSHANG',
              GP: 'TM_YIBANGONGYINGSHANG',
              NT: 'N-Tier',
              CM: 'TM_ZIDINGYI'
            }

            const res =
              scope.row.supplierRange?.split(',').map((e) => this.$t(map[e])) ||
              []
            return res.join(',')
          }
        },
        {
          i18n: '签署状态',
          prop: 'supplierIdentity',
          sortable: true,
          minWidth: 140,
          customRender: (h, scope) => {
            const map = {
              0: 'TM_LINSHI',
              1: 'TM_ZHENGSHI',
              2: 'TM_CHUXUCHI'
            }

            const res =
              scope.row.supplierIdentity
                ?.split(',')
                .map((e) => this.$t(map[e])) || []
            return res.join(',')
          }
        },
        {
          i18n: '签署人',
          prop: 'supplierContacts',
          sortable: true,
          minWidth: 120,
          customRender: (h, scope) => {
            const map = {
              '01': 'TM_QUANBU',
              '02': 'TM_ZHULIANXIREN'
            }
            return this.$t(map[scope.row.supplierContacts])
          }
        },
        {
          i18n: '签署时间',
          prop: 'chargeName',
          minWidth: 120,
          sortable: true
        },
        {
          i18n: '操作',
          prop: 'CAOZUO',
          minWidth: 120,
          customRender: (h, scope) => {
            if(scope.$index%2){
              return <span class="link-text" onclick={() => this.handleGoDetail(scope.row)}>查看</span>
            }else{
              return <span class="link-text">下载非标条款</span>
            }
          }
        }
      ]
    }
  },
  watch: {
    selectedTableData: {
      immediate: true,
      handler(val) {
        this.selectState = val.map((item) => {
          return item.state
        })
      }
    }
  },
  mounted() {
    getDictByCode('SIGN_NODE').then((res) => {
      if (res && res.data !== null && res.data.length > 0) {
        this.signNodeList = res.data[0].subDictResultVo
        const signNodeListObj = {}
        this.signNodeList.map((item) => {
          signNodeListObj[item.name] = item.describe
        })
        this.extraData.signNodeListObj = signNodeListObj
      }
    })
    // this.signNodeListObj = {
    //   "01": "注册",
    //   "02": "询价",
    //   "03": "定点",
    // };
  },
  filters: {
    supplierRangeFilter: function (value) {
      let supplierRangeList = []
      value?.split(',').map((i) => {
        i == 'PP'
          ? (supplierRangeList += this.$t('TM_SHENGCHANGONGYINGSHANG'))
          : i == 'GP'
          ? (supplierRangeList += this.$t('TM_YIBANGONGYINGSHANG'))
          : i == 'NT'
          ? (supplierRangeList += 'N-Tier，')
          : i == 'CM'
          ? (supplierRangeList += this.$t('TM_ZIDINGYI'))
          : (supplierRangeList += '')
      })
      supplierRangeList.length == 0
        ? (supplierRangeList = '')
        : (supplierRangeList = supplierRangeList.slice(
            0,
            supplierRangeList.length - 1
          ))
      return supplierRangeList
    },
    supplierIdentityFilter: function (value) {
      let supplierIdentityList = []
      value?.split(',').map((i) => {
        i == '0'
          ? (supplierIdentityList += this.$t('TM_LINSHI'))
          : i == '1'
          ? (supplierIdentityList += this.$t('TM_ZHENGSHI'))
          : i == '2'
          ? (supplierIdentityList += this.$t('TM_CHUXUCHI'))
          : (supplierIdentityList += '')
      })
      supplierIdentityList.length == 0
        ? (supplierIdentityList = '')
        : (supplierIdentityList = supplierIdentityList.slice(
            0,
            supplierIdentityList.length - 1
          ))
      return supplierIdentityList
    }
  },
  methods: {
    // 导出当前
    handleExport() {
      const tableArr = window._.cloneDeep(this.tableListData)
      tableArr.map((item) => {
        item.signNode = this.signNodeListObj[item.signNode]
        item.isPersonalTerms = this.isPersonalTermsObj[item.isPersonalTerms]
        item.state = this.stateObj[item.state]
        item.supplierContacts = this.supplierContactsObj[item.supplierContacts]
        // item.supplierRange = this.supplierRangeObj[item.supplierRange];
        // item.supplierIdentity = this.supplierIdentityObj[item.supplierIdentity];
        let supplierRangeList = []
        item.supplierRange?.split(',').map((i) => {
          i == 'PP'
            ? (supplierRangeList += this.$t('TM_SHENGCHANGONGYINGSHANG'))
            : i == 'GP'
            ? (supplierRangeList += this.$t('TM_YIBANGONGYINGSHANG'))
            : i == 'NT'
            ? (supplierRangeList += 'N-Tier，')
            : i == 'CM'
            ? (supplierRangeList += this.$t('TM_ZIDINGYI'))
            : (supplierRangeList += '')
        })
        supplierRangeList = supplierRangeList.slice(
          0,
          supplierRangeList.length - 1
        )
        item.supplierRange = supplierRangeList
        let supplierIdentityList = []
        item.supplierIdentity?.split(',').map((i) => {
          i == '0'
            ? (supplierIdentityList += this.$t('TM_LINSHI'))
            : i == '1'
            ? (supplierIdentityList += this.$t('TM_ZHENGSHI'))
            : i == '2'
            ? (supplierIdentityList += this.$t('TM_CHUXUCHI'))
            : (supplierIdentityList += '')
        })
        supplierIdentityList = supplierIdentityList.slice(
          0,
          supplierIdentityList.length - 1
        )
        item.supplierIdentity = supplierIdentityList
      })
      // const titleArr = window._.cloneDeep(this.tableTitle)
      // const index = titleArr.findIndex(item => item.props == 'option')
      // titleArr.splice(index, index + 1)
      excelExport(tableArr, this.tableTitle, this.$t('TM_TIAOKUANGUANLI'))
    },
    // 导出全部
    handleExportAll() {
      this.$emit('handleExportAll')
    },
    handleCurrentChange(e) {
      this.$emit('handleChangePage', e)
    },
    handleSizeChange(e) {
      this.$emit('handleSizeChange', e)
    },
    flushTable() {
      this.$emit('refTabList')
    },
    // 表格选中值集
    handleSelectionChange(val) {
      this.selectedTableData = val
    },
    handleGoDetail(e,a) {
      console.log(e);
      console.log(a);
      if (e.state == '01' || e.state == '02') {
        this.$router.push({
          path: '/terms/management/addClause',
          query: {
            id: e.id
          }
        })
      } else {
        this.$router.push({
          path: '/terms/management/clauseDetail',
          query: {
            id: e.id
          }
        })
      }
    },
    closeSignDetailDialog(bol) {
      this.openSignDetailDialog = bol
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .customer-table th {
  border: none;
}
::v-deep .customer-table td,
.customer-table th.is-leaf {
  border: none;
}
::v-deep .el-table--border,
.el-table--group {
  border: none;
}
::v-deep .customer-table thead tr th.is-leaf {
  border: 1px solid #ebeef5;
  border-right: none;
}
::v-deep .customer-table thead tr th:nth-last-of-type(2) {
  border-right: 1px solid #ebeef5;
}
::v-deep .el-table--border::after,
.el-table--group::after {
  width: 0;
}
::v-deep .customer-table::before {
  width: 0;
}
::v-deep .customer-table .el-table__fixed-right::before,
.el-table__fixed::before {
  width: 0;
}
::v-deep .el-table--border th.gutter:last-of-type {
  border: 1px solid #ebeef5;
  border-left: none;
}
</style>

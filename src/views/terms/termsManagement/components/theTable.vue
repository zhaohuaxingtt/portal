<template>
  <div>
    <iCard class="margin-top20">
      <div class="margin-bottom20 clearFloat">
        <div class="floatright">
          <div class="">
            <!-- 新建 -->
            <iButton @click="handleAdd">新建</iButton>
            <!-- <iButton @click="handleExport">导出当前</iButton> -->
            <iButton @click="handleExportAll">导出全部</iButton>

            <button-table-setting @click="$refs.termsTable.openSetting()" />
            <!-- 失效 -->
            <!-- <iButton
              @click="handleFailure"
              :disabled="
                this.selectedTableData.length === 0 ||
                this.selectState.includes('01') ||
                this.selectState.includes('02') ||
                this.selectState.includes('04')
              "
              >{{ $t("TERMS_SHIXIAO") }}</iButton
            > -->
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
        @sign-detail="handleSignDetail"
      />
      <iPagination
        v-update
        @current-change="handleCurrentChange($event)"
        @size-change="handleSizeChange($event)"
        background
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        prev-text="上一页"
        next-text="下一页"
        :layout="page.layout"
        :current-page="page.currPage"
        :total="page.total"
      />
    </iCard>
    <signDetailDialog
      v-if="openSignDetailDialog"
      :openDialog="openSignDetailDialog"
      :id="id"
      @flushTable="flushTable"
      @closeDialog="closeSignDetailDialog"
      :approvalProcess="approvalProcess"
      :signTitle="signTitle"
    />
  </div>
</template>

<script>
import iTableCustom from '@/components/iTableCustom'
import { iCard, iButton, iPagination } from 'rise'
import { excelExport } from '@/utils/filedowLoad'
import { getDictByCode } from '@/api/dictionary/index'
import signDetailDialog from './signDetailDialog.vue'
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
    signDetailDialog,
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
    const _self = this
    return {
      tableTitle,
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
          i18n: '序号'
        },
        {
          i18n: '条款编码',
          prop: 'termsCode',
          sortable: true,
          minWidth: 100
        },
        {
          i18n: '条款名称',
          prop: 'name',
          emit: 'go-detail',
          sortable: true,
          minWidth: 400,
          customRender: (h, scope) => {
            return <span class="link-text">{scope.row.name}</span>
          }
        },
        {
          i18n: '版本号',
          prop: 'termsVersion',
          sortable: true,
          minWidth: 80
        },
        {
          i18n: '条款状态',
          prop: 'state',
          sortable: true,
          minWidth: 100,
          customRender: (h, scope) => {
            const states = {
              '01': '草稿',
              '02': '待生效',
              '03': '生效',
              '04': '失效'
            }
            return states[scope.row.state]
          }
        },
        {
          i18n: '条款生效时间',
          prop: 'inDate',
          minWidth: 140,
          sortable: true
        },
        {
          i18n: '发布日期',
          prop: 'publishDate',
          minWidth: 140,
          sortable: true
        },
        {
          i18n: '签署节点',
          prop: 'signNode',
          sortable: true,
          minWidth: 120,
          customRender: (h, scope, column, extraData) => {
            return extraData.signNodeListObj[scope.row.signNode]
          }
        },
        {
          i18n: '签署情况',
          prop: 'signResult',
          sortable: true,
          emit: 'sign-detail',
          minWidth: 120,
          customRender: (h, scope) => {
            const { signResult, state } = scope.row
            if (['03', '04'].includes(state)) {
              return <span class="link-text">{signResult}</span>
            }
            return signResult
          }
        },
        {
          i18n: '是否个人条款',
          prop: 'isPersonalTerms',
          sortable: true,
          minWidth: 120,
          customRender: (h, scope) => {
            const { isPersonalTerms } = scope.row
            return isPersonalTerms ? '是' : isPersonalTerms == false ? '否' : ''
          }
        },
        {
          i18n: '供应商范围',
          prop: 'supplierRange',
          sortable: true,
          minWidth: 140,
          tooltip: true,
          customRender: (h, scope) => {
            const map = {
              PP: '生产供应商',
              GP: '一般供应商',
              NT: 'N-Tier',
              CM: '自定义'
            }

            const res =
              scope.row.supplierRange?.split(',').map((e) => map[e]) || []
            return res.join(',')
          }
        },
        {
          i18n: '供应商身份',
          prop: 'supplierIdentity',
          sortable: true,
          minWidth: 140,
          customRender: (h, scope) => {
            const map = {
              0: '临时',
              1: '正式',
              2: '储蓄池'
            }

            const res =
              scope.row.supplierIdentity?.split(',').map((e) => map[e]) || []
            return res.join(',')
          }
        },
        {
          i18n: '供应商用户',
          prop: 'supplierContacts',
          sortable: true,
          minWidth: 120,
          customRender: (h, scope) => {
            const map = {
              '01': '全部',
              '02': '主联系人'
            }
            return map[scope.row.supplierContacts]
          }
        },
        {
          i18n: '条款负责人',
          prop: 'chargeName',
          minWidth: 120,
          sortable: true
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
          ? (supplierRangeList += '生产供应商，')
          : i == 'GP'
          ? (supplierRangeList += '一般供应商，')
          : i == 'NT'
          ? (supplierRangeList += 'N-Tier，')
          : i == 'CM'
          ? (supplierRangeList += '自定义，')
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
          ? (supplierIdentityList += '临时，')
          : i == '1'
          ? (supplierIdentityList += '正式，')
          : i == '2'
          ? (supplierIdentityList += '储蓄池，')
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
            ? (supplierRangeList += '生产供应商，')
            : i == 'GP'
            ? (supplierRangeList += '一般供应商，')
            : i == 'NT'
            ? (supplierRangeList += 'N-Tier，')
            : i == 'CM'
            ? (supplierRangeList += '自定义，')
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
            ? (supplierIdentityList += '临时，')
            : i == '1'
            ? (supplierIdentityList += '正式，')
            : i == '2'
            ? (supplierIdentityList += '储蓄池，')
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
      excelExport(tableArr, this.tableTitle, '条款管理')
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
    // 失效
    // handleFailure() {
    //   const ids = [];
    //   this.selectedTableData.forEach((e) => ids.push(e.id));
    //   this.$confirm("是否将选择的条款设为失效？", "提示", {
    //     confirmButtonText: "是",
    //     cancelButtonText: "否",
    //     type: "warning",
    //   }).then(() => {
    //     invalidateTerms({ ids: ids.join(",") })
    //       .then(() => {
    //         this.$message.success("设置成功！");
    //         this.$emit("refTabList");
    //       })
    //       .catch((err) => {
    //         // this.$message.error("删除失败!");
    //       });
    //   });
    // },
    handleAdd() {
      // let routeUrl = this.$router.resolve({
      //   path: "/terms/management/addClause",
      // });
      // window.open(routeUrl.href, "_blank");
      this.$router.push({
        path: '/terms/management/addClause'
      })
    },
    // handleEdit() {
    //   this.editOrAdd = "edit";
    //   this.openAddClauseDialog = true;
    // },

    // handleDelete() {
    //   if (this.selectedTableData.length === 0) {
    //     iMessage.error("请选择条款模板数据！");
    //     return;
    //   }
    //   this.$confirm("是否将该条款设为失效？", "提示", {
    //     confirmButtonText: "是",
    //     cancelButtonText: "否",
    //     type: "warning",
    //   }).then(
    //     () => {
    //       // 删除
    //       //  let ids= this.selectedTableData.map((e) => {
    //       //     return e.id
    //       //   })
    //       //   let param = {ids:ids};
    //       let param = { id: this.selectedTableData[0].id };
    //       deleteClauseById(param).then((res) => {
    //         iMessage.success("更新成功");
    //         this.flushTable();
    //       });
    //     },
    //     (err) => {
    //       iMessage.error(err);
    //     }
    //   );
    // },
    // 表格选中值集
    handleSelectionChange(val) {
      this.selectedTableData = val
    },
    handleGoDetail(e) {
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
    handleSignDetail(e) {
      if (['03', '04'].includes(e.state)) {
        this.signTitle = {
          name: e.name,
          termsVersion: e.termsVersion,
          state: e.state
        }
        this.id = e.id
        this.openSignDetailDialog = true
      }
    },
    // closeDetailDialog(bol) {
    //   this.openDetailDialog = bol;
    // },
    closeSignDetailDialog(bol) {
      this.openSignDetailDialog = bol
    }
    // closeAddClauseDialog(bol) {
    //   this.openAddClauseDialog = bol;
    // },
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

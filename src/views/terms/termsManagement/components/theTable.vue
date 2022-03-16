<template>
  <div>
    <iCard class="margin-top20">
      <div class="margin-bottom20 clearFloat">
        <div class="floatright">
          <div class="">
            <!-- 新建 -->
            <iButton @click="handleAdd">{{ $t('TM_XINJIAN') }}</iButton>
            <!-- <iButton @click="handleExport">导出当前</iButton> -->
            <iButton @click="handleExportAll">{{
              $t('TM_DAOCHUQUANBU')
            }}</iButton>

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
        :prev-text="$t('TM_SHANGYIYE')"
        :next-text="$t('TM_XIAYIYE')"
        :layout="page.layout"
        :current-page="page.currPage"
        :total="page.total"
      />
    </iCard>
    <signDetailDialog
      v-if="openSignDetailDialog"
      :openDialog="openSignDetailDialog"
      :id="id"
      :termsCode="termsCode"
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
          i18n: 'TM_TIAOKUANMINGCHENG',
          prop: 'name',
          emit: 'go-detail',
          sortable: true,
          minWidth: 400,
          customRender: (h, scope) => {
            return <span class="link-text">{scope.row.name}</span>
          }
        },
        {
          i18n: 'TM_BANBENHAO',
          prop: 'termsVersion',
          sortable: true,
          minWidth: 80
        },
        {
          i18n: 'TM_TIAOKUANZHUANGTAI',
          prop: 'state',
          sortable: true,
          minWidth: 100,
          customRender: (h, scope) => {
            const states = {
              '01': 'TM_CAOGAO',
              '02': 'TM_DAISHENGXIAO',
              '03': 'TM_SHENGXIAO',
              '04': 'TM_SHIXIAO'
            }
            return this.$t(states[scope.row.state])
          }
        },
        {
          i18n: 'TM_TIAOKUAISHENGXIAOSHIJIAN',
          prop: 'inDate',
          minWidth: 140,
          sortable: true
        },
        {
          i18n: 'TM_FABURIQI',
          prop: 'publishDate',
          minWidth: 140,
          sortable: true
        },
        {
          i18n: 'TM_QIANSHUJIEDIAN',
          prop: 'signNode',
          sortable: true,
          minWidth: 120,
          customRender: (h, scope, column, extraData) => {
            return extraData.signNodeListObj[scope.row.signNode]
          }
        },
        {
          i18n: 'TM_QIANSHUQINGKUANG',
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
          i18n: 'TM_SHIFOUGERENTIAOKUAN',
          prop: 'isPersonalTerms',
          sortable: true,
          minWidth: 120,
          customRender: (h, scope) => {
            const { isPersonalTerms } = scope.row
            return isPersonalTerms
              ? this.$t('TM_SHI')
              : isPersonalTerms == false
              ? this.$t('TM_FOU')
              : ''
          }
        },
        {
          i18n: 'TM_GONGYINGSHANGFANWEI',
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
          i18n: 'TM_GONGYINGSHANGSHENFEN',
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
          i18n: 'TM_GONGYINGSHANGYONGHU',
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
          i18n: 'TM_TIAOKUANFUZEREN',
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
        this.termsCode = e.termsCode
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

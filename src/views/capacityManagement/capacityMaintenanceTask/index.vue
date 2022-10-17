<template>
  <div v-loading="loading">
    <iSearch @sure="search" @reset="reset">
      <iFormGroup :inline="true" :row="5" :model="form">
        <iFormItem
          v-for="item in searchForm"
          :key="item.prop"
          :label="language(item.key, item.label)"
        >
          <i-input
            v-if="item.type == 'input'"
            v-model="form[item.prop]"
          ></i-input>
          <i-select
            v-if="item.type == 'select'"
            v-model="form[item.prop]"
            clearable
            :multiple="item.multiple"
            collapse-tags
          >
            <el-option
              v-if="item.showAll"
              :label="language('All', '全部')"
              value=""
            ></el-option>
            <el-option
              :key="index"
              v-for="(child, index) in selectOptions[item.optionName] || []"
              :label="$i18n.locale == 'zh' ? child.name : child.nameEn"
              :value="child.code"
            ></el-option>
          </i-select>
        </iFormItem>
      </iFormGroup>
    </iSearch>
    <el-row class="margin-top20 flexBox" :gutter="40">
      <el-col :span="9">
        <i-card
          :title="
            language('供应商未完成任务数-统计', '供应商未完成任务数-统计')
          "
          class="table-card"
        >
          <template slot="body">
            <table-list
              ref="supplierTable"
              height="100%"
              :tableData="tableDataLeft"
              :tableTitle="tableTitleLeft"
              :selection="false"
              highlight-current-row
              class="table"
              @row-click="rowClick"
            >
              <template #supplierShortNameZh="scope">
                <span class="link cursor" @click="gotoSupplier(scope.row)">{{
                  $i18n.locale == 'zh'
                    ? scope.row.supplierShortNameZh
                    : scope.row.supplierShortNameEn
                }}</span>
              </template>
            </table-list>
          </template>
        </i-card>
      </el-col>
      <el-col :span="15">
        <i-card
          :title="language('未完成任务明细', '未完成任务明细')"
          class="table-card"
        >
          <template slot="header-control">
            <i-button @click="exportTaskList">{{
              language('批量导出', '批量导出')
            }}</i-button>
            <buttonTableSetting @click="edittableHeader" />
          </template>
          <template slot="body">
            <table-list
              ref="tableList"
              height="100%"
              :selectConfig="{ width: 42 }"
              :tableData="tableDataRight"
              :tableTitle="tableTitleRight"
              index
              class="table-right"
            >
              <template #supplierShortNameZh="scope">
                <span class="link cursor" @click="gotoSupplier(scope.row)">{{
                  $i18n.locale == 'zh'
                    ? scope.row.supplierShortNameZh
                    : scope.row.supplierShortNameEn
                }}</span>
              </template>
              <template #bkaName="scope">
                <template v-if="scope.row.sourceType == '1'">
                  <span>{{ scope.row.sourceItem || '' }}</span>
                </template>
                <template v-else>
                  <span class="link cursor" @click="gotoBKA(scope.row)">{{
                    scope.row.bkaName
                  }}</span>
                </template>
              </template>
              <template #sourceType="scope">
                <span>{{ getSourceType(scope.row.sourceType) }}</span>
              </template>
              <template #taskEndDate="scope">
                <template v-if="scope.row.overdueDate">
                  <span style="color: red"
                    >{{ scope.row.taskEndDate
                    }}{{ ` 已超期${scope.row.overdueDate}天` }}</span
                  >
                </template>
                <span v-else>{{ scope.row.taskEndDate }}</span>
              </template>
              <template #status="scope">
                <span>{{ getStatus(scope.row.status) }}</span>
              </template>
            </table-list>
            <iPagination
              v-update
              @size-change="
                handleSizeChange($event, getUnfinishTaskListBySupplier)
              "
              @current-change="
                handleCurrentChange($event, getUnfinishTaskListBySupplier)
              "
              background
              :current-page="page.currPage"
              :page-sizes="page.pageSizes"
              :page-size="page.pageSize"
              :layout="page.layout"
              :total="page.totalCount"
            />
          </template>
        </i-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  iSearch,
  iCard,
  iInput,
  iSelect,
  iFormGroup,
  iFormItem,
  iButton,
  icon,
  iPagination,
  iMessage
} from 'rise'
import {
  searchForm,
  tableTitleLeft,
  tableTitleRight,
  taskStatusList,
  sourceTypeList,
  result
} from './data'
import { pageMixins } from '@/utils/pageMixins'
import tableList from 'rise/web/components/iTableSort'
import buttonTableSetting from '@/components/buttonTableSetting'
import { tableSortMixins } from 'rise/web/components/iTableSort/tableSortMixins'
import {
  getUnfinishTaskList,
  getUnfinishTaskListBySupplier,
  getTaskDepartmentList,
  exportTaskList,
  encodeBkaId
} from '@/api/capacityManagement/index.js'
import { getDepartmentPullDown } from '@/api/partLifeCycle/partLifeCycleStar.js'
import { Loading } from 'element-ui'
import { getToken } from '@/utils'
export default {
  components: {
    iSearch,
    iCard,
    iInput,
    iSelect,
    iFormGroup,
    iFormItem,
    iButton,
    icon,
    tableList,
    iPagination,
    buttonTableSetting
  },
  mixins: [pageMixins, tableSortMixins],
  data() {
    return {
      searchForm,
      loading: false,
      form: {
        department: '',
        supplier: '',
        sourceType: '',
        taskStatus: ''
      },
      supplierInfo: {},
      selectOptions: {
        deptList: [],
        taskStatusList,
        sourceTypeList
      },
      loadingInstance: null,
      tableTitleLeft,
      tableTitleRight,
      tableDataLeft: [],
      tableDataRight: []
    }
  },
  created() {
    this.getDept()
    // this.getUnfinishTaskList()
    // this.getUnfinishTaskListBySupplier()
  },
  mounted() {
    this.search()
  },
  methods: {
    getDept() {
      getDepartmentPullDown().then((res) => {
        if (res?.code == '200') {
          // this.selectOptions.deptList = res.data.map((item) => {
          //   return {
          //     code: item.departmentCode,
          //     name: item.departmentName,
          //     nameEn: item.departmentName
          //   }
          // })
          this.selectOptions.deptList = res.data.map((item) => {
            return {
              code: item.commodity,
              name: item.commodity
            }
          })
        }
      })
    },

    // 供应商跳转BKA
    gotoSupplier(row) {
      let url =
        process.env.VUE_APP_HOST +
        `/bkm/sso.do?supplierId=${row.tmSupplierId}&sapCode=${
          row.supplierSapCode
        }&supplierName=${row.supplierShortNameZh}&token=${getToken()}`
      window.open(url)
    },
    // 跳转BKA详情
    gotoBKA(row) {
      encodeBkaId({ bkaNo: row.bkaId }).then((res) => {
        if (res?.code == '200') {
          let url =
            process.env.VUE_APP_HOST +
            `/bkm/bkaView/bkaView.do?bkaNo=${res.data}`
          window.open(url)
        } else {
          iMessage.error(this.$i18n.locale == 'zh' ? res.desZh : res.desEn)
        }
      })
    },
    search() {
      this.getUnfinishTaskList()
    },
    reset() {
      this.form = {
        department: '',
        supplier: '',
        sourceType: '',
        taskStatus: ''
      }
      this.search()
    },
    getUnfinishTaskList() {
      this.loading = true
      // this.loadingInstance = Loading.service({
      //   lock: true,
      //   text: 'Loading',
      //   spinner: 'el-icon-loading'
      // })
      // 接口太慢，先用假数据
      // this.tableDataLeft = result
      // this.$nextTick(() => {
      //   this.$refs.supplierTable?.$refs?.moviesTable?.setCurrentRow(
      //     this.tableDataLeft[0]
      //   )
      // })
      const params = JSON.parse(JSON.stringify(this.form))
      params.department = Array.isArray(params.department)
        ? params.department.join(',')
        : ''
      getUnfinishTaskList(params).then((res) => {
        if (res?.code == '200') {
          this.tableDataLeft = res.data || result
          this.$nextTick(() => {
            this.rowClick(this.tableDataLeft[0])
          })
        } else {
          this.loading = false
        }
      })
    },
    rowClick(row) {
      if (row) {
        if (row.tmSupplierId == this.supplierInfo?.tmSupplierId) {
          this.$refs.supplierTable.$refs.moviesTable.setCurrentRow()
          this.supplierInfo = {}
        } else {
          this.$refs.supplierTable.$refs.moviesTable.setCurrentRow(row)
          this.supplierInfo = JSON.parse(JSON.stringify(row))
        }
      } else {
        this.supplierInfo = {}
      }
      this.page.currPage = 1
      this.getUnfinishTaskListBySupplier()
    },
    getUnfinishTaskListBySupplier() {
      this.tableDataRight = []
      const params = {
        ...this.form,
        department: Array.isArray(this.form.department)
          ? this.form.department.join(',')
          : '',
        currentPage: this.page.currPage,
        pageSize: this.page.pageSize,
        supplier: this.supplierInfo?.tmSupplierId || ''
      }
      getUnfinishTaskListBySupplier(params)
        .then((res) => {
          if (res?.code == '200') {
            this.tableDataRight = res.data.records.map((item) => {
              return {
                ...item,
                taskEndDate: moment(new Date(item.taskEndDate)).format(
                  'YYYY-MM-DD'
                )
              }
            })
            this.page.totalCount = res.data.total
          }
        })
        .finally(() => {
          this.loading = false
          // this.loadingInstance.close()
        })
    },
    exportTaskList() {
      exportTaskList({
        ...this.form,
        currentPage: this.page.currPage,
        pageSize: this.page.pageSize,
        supplier: this.supplierInfo?.tmSupplierId,
        department: this.form.department.join(',')
      }).then((res) => {
        let url = window.URL.createObjectURL(res)
        let link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute(
          'download',
          this.language('未完成任务明细', '未完成任务明细')
        )
        document.body.appendChild(link)
        link.click()
      })
    },
    getSourceType(code) {
      return this.selectOptions.sourceTypeList.find((item) => item.code == code)
        ?.name
    },
    getStatus(code) {
      return this.selectOptions.taskStatusList.find((item) => item.code == code)
        ?.name
    }
  }
}
</script>

<style lang="scss" scoped>
.flexBox {
  display: flex;
  flex-wrap: wrap;
  .table-card {
    height: calc(100vh - 335px);
    min-height: 300px;
    overflow: auto;
    ::v-deep .cardHeader {
      padding-bottom: 10px;
    }
    ::v-deep .bodyShow {
      height: calc(100% - 86px);
      .table {
        height: 100%;
      }
      .table-right {
        height: calc(100% - 50px);
      }
      .current-row {
        & > td {
          background: #a3c1f7;
        }
      }
    }
  }
}
</style>
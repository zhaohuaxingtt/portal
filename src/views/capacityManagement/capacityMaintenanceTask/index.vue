<template>
  <div>
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
          <i-select v-if="item.type == 'select'" v-model="form[item.prop]">
            <el-option
              v-if="item.showAll"
              :label="language('All', '全部')"
              value=""
            ></el-option>
            <el-option
              :key="index"
              v-for="(child, index) in selectOptions[item.optionName] || []"
              :label="$i18n.locale == 'zh' ? child.name : child.nameEn"
              :value="item.value"
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
              @current-change="handleCurrentChange"
            >
              <template #supplierShortNameZh="scope">
                <span class="link cursor" @click="gotoBKA(scope.row)">{{
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
            <i-button>{{ language('批量导出', '批量导出') }}</i-button>
            <icon name="iconSetting" class="margin-left10" symbol />
          </template>
          <template slot="body">
            <table-list
              height="100%"
              :tableData="tableDataRight"
              :tableTitle="tableTitleRight"
              index
              class="table-right"
            >
              <template #col1="scope" @click="gotoBKA(scope.row)">
                <span class="link cursor">{{ scope.row.col1 }}</span>
              </template>
              <template #col2="scope">
                <template
                  v-if="scope.row.status == '1'"
                  @click="gotoBKA(scope.row)"
                >
                  <span class="link cursor">{{ scope.row.col1 }}</span>
                </template>
                <template v-if="scope.row.status == '2'">
                  <span class="link cursor">{{
                    scope.row.partNum + '-' + scope.row.partName
                  }}</span>
                </template>
              </template>
              <template #col4="scope">
                <template v-if="scope.row.out">
                  <span style="color: red"
                    >{{ scope.row.col4 }}{{ `已超期${scope.row.out}天` }}</span
                  >
                </template>
                <span v-else>{{ scope.row.col4 }}</span>
              </template>
              <template #col6="scope">
                <span>{{ getStatus(scope.row.col6) }}</span>
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
  iPagination
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
import {
  getUnfinishTaskList,
  getUnfinishTaskListBySupplier
} from '@/api/capacityManagement/index.js'
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
    iPagination
  },
  mixins: [pageMixins],
  data() {
    return {
      searchForm,
      form: {
        department: '',
        supplier: '',
        sourceType: '',
        taskStatus: ''
      },
      supplier: '',
      selectOptions: {
        taskStatusList,
        sourceTypeList
      },
      tableTitleLeft,
      tableTitleRight,
      tableDataLeft: [],
      tableDataRight: []
    }
  },
  created() {
    // this.getUnfinishTaskList()
    // this.getUnfinishTaskListBySupplier()
  },
  mounted() {
    this.search()
  },
  methods: {
    gotoBKA(row) {
      let url =
        process.env.VUE_APP_HOST + '/bkm/login.do' + '?userno=' + getToken()
      window.open(url)
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
    },
    getUnfinishTaskList() {
      getUnfinishTaskList(this.form).then((res) => {
        if (res?.code == '200') {
          this.tableDataLeft = res.data || result
          this.$nextTick(() => {
            this.$refs.supplierTable?.$refs?.moviesTable?.setCurrentRow(
              this.tableDataLeft[0]
            )
          })
        }
      })
    },
    handleCurrentChange(row) {
      this.supplier = row.supplierShortNameZh
      this.getUnfinishTaskListBySupplier()
    },
    getUnfinishTaskListBySupplier() {
      getUnfinishTaskListBySupplier({
        ...this.form,
        currentPage: this.page.currPage,
        pageSize: this.page.pageSize,
        supplier: this.supplier || this.form.department
      }).then((res) => {
        console.log(res)
        if (res?.code == '200') {
          this.tableDataRight = res.data.records
          this.page.total = res.data.total
        }
      })
    },
    getStatus(status) {
      return this.selectOptions.taskStatusList.find(
        (item) => item.status == status
      ).name
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
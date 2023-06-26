<template>
  <div>
    <!--转派-->
    <iDialog
      :title="$t('转派任务至')"
      :visible.sync="visible"
      append-to-body="true"
      width="500"
      top="5vh"
      @close="clearDiolog"
      :close-on-click-modal="false"
    >
      <el-table :data="tableData">
        <el-table-column
          type="index"
          label="#"
          align="center"
          width="60"
        ></el-table-column>
        <el-table-column
          prop="taskId"
          label="任务id"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="email"
          label="原负责人"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="nameZh"
          label="转派至"
          align="center"
        ></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <span class="link" @click="changeUser(scope.row, scope.$index)">选择用户</span>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer margin-top10">
        <iButton @click="handleConfirmTransfer">{{ $t('LK_QUEREN') }}</iButton>
        <iButton @click="clearDiolog">{{ $t('LK_QUXIAO') }}</iButton>
      </span>
    </iDialog>
    <!-- 选择采购员 -->
    <iDialog
      :visible.sync="staffDialogVisible"
      width="90%"
      append-to-body
    >
      <Staff v-if="staffDialogVisible" @confirm="confirm" />
    </iDialog>
  </div>
</template>

<script>
import { iButton, iDialog, iInput, iPagination } from 'rise'
import { findRoundTerms, excludeBatch } from '@/api/terms/terms'
import { pageMixins } from '@/utils/pageMixins'
import iTableML from '@/components/iTableML'
import Staff from './staff.vue'
export default {
  mixins: [pageMixins],
  components: {
    iDialog,
    iInput,
    iPagination,
    iButton,
    iTableML,
    Staff
  },
  props: {
    visible: { type: Boolean, default: false },
    selected: { type: Object, default: () => ({}) }
  },
  data() {
    return {
      tableData: [],
      index:'',
      row: {},
      tableListData: [],
      tableLoading: false,
      staffDialogVisible: false,
      typeObject: {},
      selectedTableData: [],
      tags: [],
      shortNameZh: ''
    }
  },
  watch: {
    visible(val) {
      if (val) {
        this.tableData = [{}] || JSON.parse(JSON.stringify(this.selected))
        console.log('val=>', val)
      }
    }
  },
  methods: {
    changeUser(row, index) {
      this.row = JSON.parse(JSON.stringify(row))
      this.index = index
      this.staffDialogVisible = true
    },
    // 选择用户后回调
    confirm(userInfo){
      console.log(userInfo);
      this.row = {...this.row,...userInfo}
      this.staffDialogVisible = false
      // this.tableData[this.index] = this.row
      this.$set(this.tableData,[this.index],this.row)

    },
    // 确认转派
    handleConfirmTransfer(){
      this.clearDiolog()
      this.$emit('getData')
    },
    toggleSelection(rows) {
      if (rows) {
        this.$refs.multipleTable.$children[0].clearSelection()
        this.$nextTick(() => {
          this.tableListData.forEach((item, index) => {
            rows.forEach((row) => {
              if (
                (row.userId ? row.userId : row.supplierId) ==
                (item.userId ? item.userId : item.supplierId)
              ) {
                this.$refs.multipleTable.$children[0].toggleRowSelection(
                  this.tableListData[index],
                  true
                )
              }
            })
          })
        })
      } else {
        this.$refs.multipleTable.$children[0].clearSelection()
      }
    },
    handleDelAll() {
      this.tags = []
      this.toggleSelection()
    },
    getTableList() {
      this.page.currPage = 1
      this.page.pageSize = 10
      let param = {
        termsId: this.id,
        shortNameZh: this.shortNameZh,
        pageNum: 1,
        pageSize: 10
      }
      this.query(param)
    },
    clearDiolog() {
      this.$emit('update:visible', false)
    },
    handleChangePage(e) {
      this.page.currPage = e
      let param = {
        termsId: this.id,
        shortNameZh: this.shortNameZh,
        pageNum: this.page.currPage,
        pageSize: this.page.pageSize
      }
      this.query(param)
    },
    handleChangeSize(e) {
      this.page.currPage = 1
      this.page.pageSize = e
      let param = {
        termsId: this.id,
        shortNameZh: this.shortNameZh,
        pageNum: this.page.currPage,
        pageSize: this.page.pageSize
      }
      this.query(param)
    },
    query(e) {
      this.tableLoading = true
      findRoundTerms(e).then((res) => {
        this.tableListData = res.data
        this.page.total = res.total
        this.toggleSelection(this.tags)
        this.tableLoading = false
      })
      // .catch(() => {
      //   this.tableLoading = false
      // })
    },
    // 表格选中值集
    handleSelectionChange(val) {
      this.selectedTableData = val
    },
    handleSelectTable(selection, row) {
      if (selection.includes(row)) {
        this.tags.push(row)
      } else {
        this.tags.forEach((o, index) => {
          if (
            (o.userId ? o.userId : o.supplierId) ==
            (row.userId ? row.userId : row.supplierId)
          ) {
            this.tags.splice(index, 1)
          }
        })
      }
    },
    handleSelectAll(val) {
      let indexs = this.tableListData.map((e) => {
        return e.userId ? e.userId : e.supplierId
      })
      this.tags = this.tags.filter((e) => {
        return !indexs.includes(e.userId ? e.userId : e.supplierId)
      })
      if (val.length > 0) {
        this.tags = this.tags.concat(val)
      }
    },
    handleChecked() {
      if (this.tags.length > 0) {
        this.$confirm(
          this.$t('TM_SHIFOUQUERENBIAOJILIWAI'),
          this.$t('TM_TISHI'),
          {
            confirmButtonText: this.$t('TM_SHI'),
            cancelButtonText: this.$t('TM_FOU'),
            type: 'warning'
          }
        ).then(() => {
          let list = this.tags.map((item) => {
            return { supplierId: item.supplierId, userId: item.userId }
          })
          excludeBatch({ termsId: this.id, list })
            .then((res) => {
              if (res.code == 200) {
                this.$message.success(this.$t('TM_CAOZUOCHENGGONG'))
                this.$emit('closeDialog', false)
                this.$emit('getTableList', { termsId: this.id })
              }
            })
            .catch(() => {
              // this.$message.error("删除失败!");
            })
        })
      } else {
        this.$message.error(
          this.$t('TM_QINGXUANZEXUYAOJINXINGLIWAIBIAOJIDESHUJU')
        )
      }
    },
    handleDel(id) {
      this.tags.forEach((e, index) => {
        if ((e.userId ? e.userId : e.supplierId) == id) {
          this.tags.splice(index, 1)
        }
      })
      this.toggleSelection(this.tags)
    }
  }
}
</script>

<style scoped lang="scss">
.card {
  padding-bottom: 20px;
  color: $color-black;
  .card__body {
    margin-top: 10px;
    height: auto;
    overflow: hidden;
    min-height: 672px;

    .the_font {
      font-size: 20px;
      font-family: Arial;
      font-weight: 400;
      color: #4b4b4c;
      opacity: 1;
    }

    .search-input ::v-deep {
      display: flex;
      flex-direction: row;
      margin: 10px 0 30px 0;
      .el-input {
        width: 420px;
      }
      .el-button {
        margin-left: 20px;
      }
    }

    .tag-box {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-bottom: 30px;

      .tag-button {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        border-color: transparent;
        position: relative;
        border-radius: 0.25rem;
        border: 1px solid #e0e6ed;
        margin-right: 20px;
        height: 35px;
        // overflow-y: auto;
        overflow: hidden;
        // text-overflow: ellipsis;
        .el-icon-close {
          position: absolute;
          right: 10px;
          top: 0.5rem;
          color: #ffffff;
          background: #cbcbcb;
          border-radius: 50%;
          cursor: pointer;
        }
        .tag-item ::v-deep {
          padding-right: 23px;
          position: relative;
          background-color: #f7faff;
          color: #abd0ff;
          border-color: #f7faff;
          border-radius: 2px;
          margin: 0.1% 0.5rem 0.1% 0.1%;
          .el-icon-close {
            position: absolute;
            right: 4px;
            top: 7px;
            color: #abd0ff;
          }
        }
      }
    }
  }
}

// ::v-deep .has-gutter tr {
//   background-color: #eaf1fd;
// }

// ::v-deep .el-table th {
//   background-color: #eaf1fd;
// }

// ::v-deep td {
//   min-width: 0;

//   .cell {
//     overflow: hidden;
//     text-overflow: ellipsis;
//     white-space: nowrap;
//   }
// }
</style>

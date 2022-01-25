<template>
  <!--转派-->
  <iDialog
    :title="'例外标记'"
    :visible.sync="openDialog"
    append-to-body="true"
    width="95%"
    top="5vh"
    @close="clearDiolog"
    :close-on-click-modal="false"
  >
    <div class="card">
      <div class="card__body">
        <div class="search-input">
          <div class="the_font">搜索：</div>
          <iInput v-model="shortNameZh"></iInput>
          <iButton @click="getTableList">{{ '查询' }}</iButton>
        </div>

        <div class="tag-box">
          <div class="the_font">例外：</div>
          <div class="tag-button">
            <el-tag
              size="medium"
              class="tag-item"
              v-for="o in tags"
              :key="o.userId ? o.userId : o.supplierId"
              closable
              :disable-transitions="true"
              @close="handleDel(o.userId ? o.userId : o.supplierId)"
            >
              {{ o.shortNameZh }}
            </el-tag>
            <div class="el-icon-close" @click="handleDelAll"></div>
          </div>
          <div>
            <iButton @click="handleChecked">{{ '确认例外' }}</iButton>
            <iButton @click="clearDiolog">{{ '取消' }}</iButton>
          </div>
        </div>
        <iTableML
          style="height: 30rem; overflow-y: scroll"
          tooltip-effect="light"
          ref="multipleTable"
          :data="tableListData"
          :tableLoading="tableLoading"
          @selectionChange="handleSelectionChange"
          @handle-select="handleSelectTable"
          @handle-select-all="handleSelectAll"
        >
          <el-table-column
            type="selection"
            width="50"
            align="center"
          ></el-table-column>
          <el-table-column
            label="#"
            type="index"
            width="80"
            align="center"
          ></el-table-column>
          <el-table-column align="center" label="供应商中文名"
            ><template slot-scope="scope">
              <span>{{ scope.row['shortNameZh'] }}</span>
            </template></el-table-column
          >
          <el-table-column align="center" label="供应商英文名"
            ><template slot-scope="scope">
              <span>{{ scope.row['shortNameEn'] }}</span>
            </template></el-table-column
          >
          <el-table-column align="center" label="临时号">
            <template slot-scope="scope">
              <span>{{ scope.row['svwTempCode'] }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="SVW号"
            ><template slot-scope="scope">
              <span>{{ scope.row['svwCode'] }}</span>
            </template></el-table-column
          >
          <el-table-column align="center" label="SAP号"
            ><template slot-scope="scope">
              <span>{{ scope.row['sapCode'] }}</span>
            </template></el-table-column
          >
          <el-table-column align="center" label="供应商用户"
            ><template slot-scope="scope">
              <span>{{ scope.row['nameZh'] }}</span>
            </template></el-table-column
          >
        </iTableML>
        <iPagination
          v-update
          @current-change="handleChangePage($event)"
          @size-change="handleChangeSize"
          background
          :page-sizes="page.pageSizes"
          :page-size="page.pageSize"
          prev-text="上一页"
          next-text="下一页"
          :layout="page.layout"
          :current-page="page.currPage"
          :total="page.total"
        />
      </div>
    </div>
  </iDialog>
</template>

<script>
import { iButton, iDialog, iInput, iPagination } from 'rise'
import { findRoundTerms, excludeBatch } from '@/api/terms/terms'
import { pageMixins } from '@/utils/pageMixins'
import iTableML from '@/components/iTableML'
export default {
  mixins: [pageMixins],
  components: {
    iDialog,
    iInput,
    iPagination,
    iButton,
    iTableML
  },
  props: {
    openDialog: { type: Boolean, default: false },
    id: { type: Number, default: -1 }
    // category: { type: Number },
    // newsCheckList: {
    //   type: Array,
    //   default: () => {
    //     return []
    //   }
    // }
  },
  data() {
    return {
      tableListData: [],
      tableLoading: false,
      typeObject: {},
      selectedTableData: [],
      tags: [],
      shortNameZh: ''
    }
  },
  computed: {},
  mounted() {
    this.getTableList()
  },
  methods: {
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
      this.$emit('closeDialog', false)
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
        this.$confirm('是否确认标记例外？', '提示', {
          confirmButtonText: '是',
          cancelButtonText: '否',
          type: 'warning'
        }).then(() => {
          let list = this.tags.map((item) => {
            return { supplierId: item.supplierId, userId: item.userId }
          })
          excludeBatch({ termsId: this.id, list })
            .then((res) => {
              if (res.code == 200) {
                this.$message.success('操作成功')
                this.$emit('closeDialog', false)
                this.$emit('getTableList', { termsId: this.id })
              }
            })
            .catch(() => {
              // this.$message.error("删除失败!");
            })
        })
      } else {
        this.$message.error('请选择需要进行例外标记的数据')
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
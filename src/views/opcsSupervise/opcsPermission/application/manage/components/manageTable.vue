<!--
 * @Date: 2021-11-29 14:47:24
 * @LastEditors: caopeng
 * @LastEditTime: 2021-12-07 15:05:02
 * @FilePath: \front-portal-new\src\views\opcsSupervise\opcsPermission\application\manage\components\manageTable.vue
-->
<template>
  <iCard tabCard
         class="box"
         collapse>
    <div class="margin-bottom20 clearFloat">
      <span class="font18 font-weight">{{
        language('JICHUXINXI', '基础信息')
      }}</span>
      <div class="floatright">
        <i-button v-if="edit"
                  @click="add">{{ language('XINZENG', '新增') }}
        </i-button>
        <i-button v-if="edit"
                  @click="remove">{{ language('SHANCHU', '删除') }}
        </i-button>
        <i-button v-if="edit"
                  @click="cancelBtn">{{ language('QUXIAO', '取消') }}
        </i-button>
        <i-button v-if="edit"
                  @click="save">{{ language('BAOCUN', '保存') }}
        </i-button>
        <i-button v-if="!edit"
                  @click="editBtn">{{ language('BIANJI', '编辑') }}
        </i-button>
      </div>
    </div>
    <table-list :tableData="tableListData"
                :tableTitle="tableTitle"
                :tableLoading="tableLoading"
                @handleSelectionChange="handleSelectionChange"
                :input-props="inputProps"
                :index="true"
                ref="commonTable">
      <template #position="scope">
        <iInput v-if="!scope.row.id"
                v-model="scope.row.position"
                :placeholder="language('QINGSHURU', '请输入')" />
        <p v-if="scope.row.id">{{ scope.row.position }}</p>
      </template>
    </table-list>
    <iPagination style="margin-top: 20px"
                 v-update
                 @size-change="handleSizeChange($event, getTableData)"
                 @current-change="handleCurrentChange($event, getTableData)"
                 background
                 :page-sizes="page.pageSizes"
                 :page-size="page.pageSize"
                 :layout="page.layout"
                 :current-page="page.currPage"
                 :total="page.totalCount" />
  </iCard>
</template>

<script>
import tableList from '@/components/commonTable'
import { tableTitle } from './data'
import { pageMixins } from '@/utils/pageMixins'
import {
  pageQueryDetails,
  addDetails,
  deleteDetails
} from '@/api/opcs/solPermission'
import {
  iCard,
  iButton,
  iSelect,
  iInput,
  iPagination,
  iMessage,
  iMessageBox
} from 'rise'
export default {
  mixins: [pageMixins],
  components: {
    iCard,
    iButton,
    iInput,
    tableList,
    iPagination
  },
  data() {
    return {
      inputProps: [],
      edit: false,
      tableLoading: false,
      selectTableData: [],
      tableTitle: tableTitle,
      tableListData: []
    }
  },
  created() {
    this.getTableData()
  },
  methods: {
    editBtn() {
      this.inputProps = ['nameZh', 'nameEn', 'ldapSchema']
      this.edit = true
    },
    cancelBtn() {
      this.inputProps = []
      this.tableListData = []
      this.getTableData()
      this.$refs.commonTable.$refs.commonTableForm.clearValidate()
      this.edit = false
    },
    save() {
      this.$refs.commonTable.$refs.commonTableForm.validate((valid) => {
        if (valid) {
          let req = {
            opcsAppsList: this.tableListData,
            opcsSupplierKeyId: this.$route.query.opcsSupplierId
          }
          addDetails(req).then((res) => {
            if (res && res.data == 200) {
              this.getTableData()
              this.editMode = false
              iMessage.success(res.desZh)
            }
          })
        }
      })
    },
    add() {
      const newItemList = this.tableTitle.map((item) => {
        return item.props
      })
      const newItem = {}
      newItemList.map((item) => {
        newItem[item] = ''
      })
      this.tableListData.push({
        ...newItem
      })
    },
    //获取列表接口
    getTableData() {
      this.tableLoading = true
      const params = {
        opcsSupplierId: this.$route.query.opcsSupplierId,
        pageNo: this.page.currPage,
        pageSize: this.page.pageSize,
        ...this.form
      }
      pageQueryDetails(params).then((res) => {
        this.tableLoading = false
        if (res && res.code == 200) {
          this.tableListData = res.data
          this.page.totalCount = res.total
        } else iMessage.error(res.desZh)
      })
    },
    remove() {
      if (this.selectTableData.length == 0) {
        iMessage.warn(this.$t('SUPPLIER_ZHISHAOXUANZHEYITIAOJILU'))
        return false
      }
      iMessageBox(
        this.language('QUERENSHANCHUGAIYINGYONG', '确认删除该应用？'),
        this.language('SHANCHU', '删除'),
        {
          confirmButtonText: this.language('SHI', '是'),
          cancelButtonText: this.language('FOU', '否')
        }
      ).then(async () => {
        this.tableListData.forEach((v) => {
          this.selectTableData.forEach((j, i) => {
            if (v === j) {
              this.tableListData.splice(i, 1)
            }
          })
        })
      })
    },
    //修改表格改动列
    handleSelectionChange(val) {
      this.selectTableData = val
    }
  }
}
</script>

<style  lang="scss" scope>
.box {
  .el-table .el-table__row .el-input {
    width: 100% !important;
  }
}
</style>

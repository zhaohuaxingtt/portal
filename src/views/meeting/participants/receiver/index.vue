<template>
  <div>
    <actionButtons @add="addReceiver" />
    <i-table-custom
      @editReceiver="editReceiver"
      :loading="tableLoading"
      :data="tableData"
      :columns="tableColumns"
    />
    <iPagination
      v-update
      @size-change="handleSizeChange($event, query)"
      @current-change="handleCurrentChange($event, query)"
      :current-page="page.currPage"
      :page-size="page.pageSize"
      :layout="page.layout"
      :total="page.totalCount"
      background
      :prev-text="$t('上一页')"
      :next-text="$t('下一页')"
    />
    <addOrEditReceiverDialog
      :openDialog="openDialog"
      @closeDialog="closeDialog"
      :editOrAdd="editOrAdd"
      v-if="openDialog"
      :clickScope="clickScope"
      @flushTable="flushTable"
      @addReceiverData="addReceiverData"
      :selectedTableData="selectedTableData"
    />
    <chooseReceiverDialog
      :openReceiverDialog="openReceiverDialog"
      v-if="openReceiverDialog"
      @closeChooseDialog="closeChooseDialog"
      @handleChooseReceiver="handleChooseReceiver"
    />
    <editReceiverDialog
      :openEditDialog="openEditDialog"
      @closeEditDialog="closeEditDialog"
      v-if="openEditDialog"
      :clickScope="clickScope"
      @flushTable="flushTable"
      @addReceiverData="addReceiverData"
      :selectedTableData="selectedTableData"
    />
  </div>
</template>

<script>
import { iPagination } from 'rise'
import {
  actionButtons,
  addOrEditReceiverDialog,
  chooseReceiverDialog,
  editReceiverDialog
} from './components'
import { getReceiver, deleteReceiver } from '@/api/meeting/type'
import { pageMixins } from '@/utils/pageMixins'
import iTableCustom from '@/components/iTableCustom'

export default {
  mixins: [pageMixins],
  components: {
    iPagination,
    actionButtons,
    iTableCustom,
    addOrEditReceiverDialog,
    chooseReceiverDialog,
    editReceiverDialog
  },
  data() {
    return {
      tableLoading: false,
      tableColumns: [
        {
          type: 'index',
          label: '序号',
          i18n: '序号',
          width: 68,
          tooltip: false
        },
        {
          // prop: "meetingTypeName",
          label: '会议类型',
          i18n: '会议类型',
          width: 240,
          align: 'left',
          tooltip: true,
          customRender: (h, scope) => {
            return h(
              'div',
              {
                style: {
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap'
                }
              },
              scope.row.meetingTypeName ? scope.row.meetingTypeName : ''
            )
          }
        },
        {
          // prop: "groupName",
          label: '组名',
          i18n: '组名',
          width: 240,
          align: 'left',
          tooltip: true,
          customRender: (h, scope) => {
            return h(
              'div',
              {
                style: {
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap'
                }
              },
              scope.row.groupName ? scope.row.groupName : ''
            )
          }
        },

        {
          // prop: "employeeDTOS",
          label: '参与人员姓名',
          i18n: '参与人员姓名',
          // width: 240,

          align: 'left',
          tooltip: true,
          customRender: (h, scope) => {
            return h(
              'div',
              {
                style: {
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap'
                }
              },
              scope.row.employeeDTOS
                ? scope.row.employeeDTOS.map((item) => item.name).join(',')
                : ''
            )
          }
        },
        {
          label: '操作',
          width: 100,
          customRender: (h, scope) => {
            return h('span', [
              h(
                'a',
                {
                  style: {
                    marginRight: '5px',
                    cursor: 'pointer',
                    color: '#1660f1'
                  },
                  class: 'open-link-text',
                  on: {
                    click: () => {
                      this.editReceiver(scope.row)
                    }
                  }
                },
                '修改'
              ),
              h(
                'a',
                {
                  style: {
                    marginRight: '5px',
                    cursor: 'pointer'
                  },
                  class: 'open-link-text'
                },
                '|'
              ),
              h(
                'a',
                {
                  style: {
                    cursor: 'pointer',
                    color: '#1660f1'
                  },
                  class: 'open-link-text',
                  on: {
                    click: () => {
                      this.deleteReceiver(scope.row)
                    }
                  }
                },
                '删除'
              )
            ])
          }
        }
      ],
      tableData: [],
      // 创建弹框
      openDialog: false,
      // 编辑弹框
      openEditDialog: false,
      // 选择收件人弹框
      openReceiverDialog: false,
      editOrAdd: 'add',
      clickScope: [],
      // getUsersList: [],
      selectedTableData: []
    }
  },
  created() {
    this.query()
  },
  methods: {
    handleChooseReceiver(selectedTableData) {
      this.selectedTableData = selectedTableData
      this.closeChooseDialog()
    },
    addReceiverData() {
      this.openReceiverDialog = true
    },
    deleteReceiver(e) {
      this.$confirm('请确认是否要删除该群组?', '提示', {
        confirmButtonText: '是',
        cancelButtonText: '否',
        type: 'warning'
      }).then(() => {
        deleteReceiver({ id: e.id }).then((res) => {
          if (res.code === 200) {
            this.$message.success('删除成功!')
            this.query()
          }
        })
        // .catch((err) => {
        //   this.$message.error('删除失败!')
        // })
      })
    },
    editReceiver(scope) {
      this.clickScope = scope
      this.openEditDialog = true
    },
    flushTable() {
      this.query()
    },
    query() {
      const data = {
        pageNum: this.page.currPage,
        pageSize: this.page.pageSize
      }
      this.tableLoading = true
      getReceiver(data)
        .then((res) => {
          this.tableLoading = false
          const { data, pageNum, pageSize, total, pages } = res
          this.page.currPage = pageNum
          this.page.pageSize = pageSize
          this.page.totalCount = total
          this.page.pages = pages
          this.tableData = data
          console.log(data)
        })
        .catch(() => {
          this.tableLoading = false
        })
    },
    addReceiver() {
      this.openDialog = true
      this.editOrAdd = 'add'
    },
    closeDialog(bol) {
      this.selectedTableData = []
      this.openDialog = bol
    },
    closeChooseDialog(bol) {
      this.openReceiverDialog = bol
    },
    closeEditDialog(bol) {
      this.openEditDialog = bol
      this.selectedTableData = []
    }
  }
}
</script>

<style lang="scss" scoped></style>

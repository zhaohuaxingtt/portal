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
      :prev-text="$t('MT_SHANGYIYE')"
      :next-text="$t('MT_XIAYIYE')"
    />
    <addReceiverDialog
      :openDialog="openDialog"
      @closeDialog="closeDialog"
      :editOrAdd="editOrAdd"
      v-if="openDialog"
      :clickScope="clickScope"
      @flushTable="flushTable"
      @addReceiverData="addReceiverData"
      :selectedTableData="selectedTableData"
      @addOrganizeData="addOrganizeData"
    />
    <chooseReceiverDialog
      :openReceiverDialog="openReceiverDialog"
      v-if="openReceiverDialog"
      @closeChooseDialog="closeChooseDialog"
      @handleChoose="handleChoose"
      :status="status"
    />
    <chooseOrganizeDialog
      :openOrganizeDialog="openOrganizeDialog"
      v-if="openOrganizeDialog"
      @closeChooseDialog="closeChooseDialog"
      @handleChoose="handleChoose"
      :status="status"
    />
    <editReceiverDialog
      :openEditDialog="openEditDialog"
      @closeEditDialog="closeEditDialog"
      v-if="openEditDialog"
      :clickScope="clickScope"
      @flushTable="flushTable"
      @addReceiverData="addReceiverData"
      :selectedTableData="editSelectTableData"
      @addOrganizeData="addOrganizeData"
    />
  </div>
</template>

<script>
import { iPagination } from 'rise'
import {
  actionButtons,
  addReceiverDialog,
  chooseReceiverDialog,
  editReceiverDialog,
  chooseOrganizeDialog
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
    addReceiverDialog,
    chooseReceiverDialog,
    editReceiverDialog,
    chooseOrganizeDialog
  },
  data() {
    return {
      openOrganizeDialog: false,
      tableLoading: false,
      tableColumns: [
        {
          type: 'index',
          label: '#',
          i18n: '#',
          width: 68,
          tooltip: false
        },
        {
          // prop: "meetingTypeName",
          label: '会议类型',
          i18n: 'MT_HUIYILEIXING',
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
          i18n: 'MT_ZUMING',
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
          i18n: 'MT_CANYURENYUANXINGMING',
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
          i18n: 'MT_CAOZUO2',
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
                this.$t('MT_XIUGAI')
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
                this.$t('MT_SHANCHU')
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
      selectedTableData: [],
      editSelectTableData: [],
      status: 'add'
    }
  },
  created() {
    this.query()
  },
  methods: {
    handleChoose(selectedTableData, status) {
      // console.log('selectedTableData', selectedTableData)
      if (status === 'edit') {
        this.editSelectTableData = [
          ...this.editSelectTableData,
          ...selectedTableData
        ]
      }
      this.status = status
      this.selectedTableData = selectedTableData
      this.closeChooseDialog(false, status)
    },
    addReceiverData(status) {
      this.status = status
      this.openReceiverDialog = true
      this.openEditDialog = false
    },
    addOrganizeData(status) {
      console.log('status', status)
      this.status = status
      this.openOrganizeDialog = true
      this.openEditDialog = false
    },
    deleteReceiver(e) {
      this.$confirm(this.$t('MT_QINGQUERENSHIFOUYAOSHANCHUGAIQUNZU'), this.$t('MT_TISHI'), {
        confirmButtonText: this.$t('MT_SHI'),
        cancelButtonText: this.$t('MT_FOU'),
        type: 'warning'
      }).then(() => {
        deleteReceiver({ id: e.id }).then((res) => {
          if (res.code === 200) {
            this.$message.success(this.$t('MT_SHANCHUCHENGGONG'))
            this.query()
          }
        })
        // .catch((err) => {
        //   this.$message.error('删除失败!')
        // })
      })
    },
    editReceiver(scope) {
      this.status = 'edit'
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
      // this.editOrAdd = 'add'
      this.status = 'add'
    },
    closeDialog(bol) {
      this.selectedTableData = []
      this.openDialog = bol
    },
    closeChooseDialog(bol, status) {
      this.status = status
      this.openReceiverDialog = false
      this.openOrganizeDialog = false
      if (status === 'edit') {
        this.openEditDialog = true
        return
      }
      this.openDialog = true
    },
    closeEditDialog(bol) {
      this.openEditDialog = bol
      this.selectedTableData = []
    }
  }
}
</script>

<style lang="scss" scoped></style>

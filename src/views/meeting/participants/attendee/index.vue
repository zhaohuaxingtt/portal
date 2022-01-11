<template>
  <div>
    <actionButtons @add="addAttendee" />
    <i-table-custom
      @editAttendee="editAttendee"
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
    <addOrEditGroupDialog
      :openDialog="openDialog"
      @closeDialog="closeDialog"
      :editOrAdd="editOrAdd"
      v-if="openDialog"
      :clickScope="clickScope"
      @flushTable="flushTable"
    />
  </div>
</template>

<script>
import { iPagination } from 'rise'
import { actionButtons, addOrEditGroupDialog } from './component'
import { getAttendee, deleteGroup } from '@/api/meeting/type'
import { pageMixins } from '@/utils/pageMixins'
import iTableCustom from '@/components/iTableCustom'

export default {
  mixins: [pageMixins],
  components: {
    iPagination,
    actionButtons,
    addOrEditGroupDialog,
    iTableCustom
  },
  data() {
    return {
      tableLoading: false,
      tableData: [],
      tableColumns: [
        {
          type: 'index',
          label: '序号',
          i18n: 'MT_XUHAO3',
          width: 68,
          tooltip: false
        },
        /*  {
          width: 50,
        }, */
        {
          // prop: "meetingTypeName",
          label: '会议类型',
          i18n: 'MT_HUIYILEIXING',
          align: 'left',
          width: 240,
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
          align: 'left',
          width: 240,
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
        /* {
          width: 50,
        }, */
        {
          // prop: "attendeeName",
          label: '与会人',
          i18n: 'MT_YUHUIREN',
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
              scope.row.attendeeName ? scope.row.attendeeName : ''
            )
          }
        },

        /* {
          width: 50,
        }, */
        {
          width: 100,
          label: '操作',
          i18n:"MT_CAOZUO2",
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
                      this.editAttendee(scope.row)
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
                    cursor: 'pointer',
                    color: '#1660f1'
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
                      this.deleteGroup(scope.row)
                    }
                  }
                },
                this.$t('MT_SHANCHU')
              )
            ])
          }
        }
      ],
      // tableColumns,
      openDialog: false,
      editOrAdd: 'add',
      clickScope: []
    }
  },
  created() {
    this.query()
  },
  methods: {
    deleteGroup(e) {
      this.$confirm(this.$t('MT_QINGQUERENSHIFOUYAOSHANCHUGAIQUNZU'), this.$t('MT_TISHI'), {
        confirmButtonText: this.$t('MT_SHI'),
        cancelButtonText: this.$t('MT_FOU'),
        type: 'warning'
      }).then(() => {
        deleteGroup({ id: e.id })
          .then(() => {
            this.$message.success(this.$t('MT_SHANCHUCHENGGONG'))
            this.query()
          })
          .catch(() => {
            this.$message.error(this.$t('MT_SHANCHUSHIBAI'))
          })
      })
    },
    editAttendee(scope) {
      this.clickScope = scope
      this.openDialog = true
      this.editOrAdd = 'edit'
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
      getAttendee(data)
        .then((res) => {
          this.tableLoading = false
          const { data, pageNum, pageSize, total, pages } = res
          this.page.currPage = pageNum
          this.page.pageSize = pageSize
          this.page.totalCount = total
          this.page.pages = pages
          this.tableData = data
        })
        .catch(() => {
          this.tableLoading = false
        })
    },
    addAttendee() {
      this.openDialog = true
      this.editOrAdd = 'add'
    },
    closeDialog(bol) {
      this.openDialog = bol
    }
  }
}
</script>

<style lang="scss" scoped></style>

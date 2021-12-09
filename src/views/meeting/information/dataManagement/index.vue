<template>
  <div class="container">
    <actionButtons @add="add" />
    <i-table-custom
      :data="tableData"
      :columns="tableColumns"
      @editMeetingData="editMeetingData"
    />
    <addOrEditDataDialog
      :openDialog="openDialog"
      @closeDialog="closeDialog"
      :editOrAdd="editOrAdd"
      v-if="openDialog"
      :dataType="dataType"
      :dataTypeAll="dataTypeAll"
      :clickScope="clickScope"
      @flushTable="flushTable"
    ></addOrEditDataDialog>
    <iPagination
      v-update
      @size-change="handleSizeChange($event, query)"
      @current-change="handleCurrentChange($event, query)"
      background
      :current-page="page.currPage"
      :page-size="page.pageSize"
      layout="prev, pager, next, jumper"
      :prev-text="$t('上一页')"
      :next-text="$t('下一页')"
      :total="page.totalCount"
    />
  </div>
</template>

<script>
import iTableCustom from '@/components/iTableCustom'
import { iPagination, iMessage } from 'rise'
import { actionButtons, addOrEditDataDialog } from './components'
import {
  getDocumentServiceByPage,
  deleteDocument
} from '@/api/meeting/information'
import {
  getDocumentTypeServiceByPage,
  updateDocument
} from '@/api/meeting/information'
import { getFileByIds } from '@/api/file/filedownload'
import { pageMixins } from '@/utils/pageMixins'
import { download } from '@/utils/downloadUtil'
export default {
  mixins: [pageMixins],
  components: { iTableCustom, actionButtons, addOrEditDataDialog, iPagination },
  data() {
    return {
      tableColumns: [
        {
          type: 'index',
          i18n: '序号',
          width: 69,
          align: 'center',
          tooltip: false
        },
        {
          // prop: "name",
          label: '资料名称',
          i18n: '资料名称',
          // width: 400,
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
              scope.row.name ? scope.row.name : ''
            )
          }
        },
        {
          // prop: "documentType",
          label: '类型',
          i18n: '类型',
          align: 'center',
          width: 400,
          tooltip: true,
          // customRender: (h, scope) => {
          //   return scope.row.documentType && scope.row.documentType.name;
          // },
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
              scope.row.documentType ? scope.row.documentType.name : ''
            )
          }
        },
        {
          // prop: "publisherName",
          label: '发布者',
          i18n: '发布者',
          align: 'center',
          width: 140,
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
              scope.row.publisherName ? scope.row.publisherName : ''
            )
          }
        },
        {
          // prop: "publishDate",
          label: '发布日期',
          i18n: '发布日期',
          align: 'center',
          width: 160,
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
              scope.row.publishDate ? scope.row.publishDate : ''
            )
          }
        },
        {
          prop: 'state',
          label: '状态',
          i18n: '状态',
          width: 140,
          align: 'center',
          tooltip: false,
          customRender: (h, scope) => {
            return h('div', [
              h('el-switch', {
                attrs: {
                  activeText: '上架',
                  inactiveText: '下架'
                },
                props: {
                  value: scope.row.state === 1 ? true : false
                },
                on: {
                  change: (val) => {
                    scope.row.state = val
                    this.switch(scope.row)
                  }
                }
              })
            ])
          }
        },
        {
          label: '操作',
          width: 160,
          customRender: (h, scope) => {
            if (scope.row.state !== 1) {
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
                        this.editMeetingData(scope.row)
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
                      marginRight: '5px',
                      cursor: 'pointer',
                      color: '#1660f1'
                    },
                    class: 'open-link-text',
                    on: {
                      click: () => {
                        this.deleteDocument(scope.row)
                      }
                    }
                  },
                  '删除'
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
                        this.downLoadFileInfo(scope.row)
                      }
                    }
                  },
                  '下载'
                )
              ])
            } else {
              return h('span', [
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
                        this.downLoadFileInfo(scope.row)
                      }
                    }
                  },
                  '下载'
                )
              ])
            }
          }
        }
      ],
      openDialog: false,
      editOrAdd: 'add',
      tableLoading: false,
      tableData: [],
      dataType: '',
      dataTypeAll: '',
      clickScope: []
    }
  },
  mounted() {
    this.query()
    getDocumentTypeServiceByPage({
      pageNum: 1,
      pageSize: 100
    }).then((res) => {
      this.dataTypeAll = res.data
      this.dataType = res.data.map((item) => {
        return item.name
      })
    })
  },
  methods: {
    switch(val) {
      if (val.state == false) {
        val.state = 2
      } else {
        val.state = 1
      }
      updateDocument(val)
        .then((data) => {
          if (data) {
            // this.close();
            if (data.state == 2) {
              this.$message.success('下架成功！')
            } else {
              this.$message.success('上架成功！')
            }

            this.flushTable()
          }
        })
        .catch((err) => {
          console.log(err)
          this.query()
        })
      // console.log("val", val);
      // console.log("this.scope.state", val.state);
    },
    // 附件下载
    downLoadFileInfo(row) {
      getFileByIds([row.attachmentId]).then((data) => {
        const { id, name } = data[0]
        download({
          // url: MOCK_FILE_URL + id,
          // filename: name,
          fileIds: id,
          filename: name,
          callback: (e) => {
            if (!e) {
              iMessage.error('下载失败66')
            }
          }
        })
      })
    },
    createAnchorLink(href, filename = '') {
      const a = document.createElement('a')
      a.download = filename
      a.setAttribute('crossOrigin', 'anonymous')
      a.href = href
      document.body.appendChild(a)
      a.click()
      a.remove()
    },
    deleteDocument(e) {
      // console.log(e);
      this.$confirm('是否删除该会议资料？', '提示', {
        confirmButtonText: '是',
        cancelButtonText: '否',
        type: 'warning'
      }).then(() => {
        deleteDocument({ id: e.id })
          .then((res) => {
            if (res.code === 200) {
              this.$message.success('删除成功!')
            }
            this.query()
          })
          .catch(() => {
            this.$message.error('删除失败!')
          })
      })
    },
    editMeetingData(scope) {
      console.log('scope', scope)
      this.clickScope = scope
      this.openDialog = true
      this.editOrAdd = 'edit'
      // console.log("12121212", scope);
    },
    query() {
      const data = {
        pageNum: this.page.currPage,
        pageSize: this.page.pageSize
      }
      getDocumentServiceByPage(data)
        .then((res) => {
          // console.log("DocumentService", res);
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
    add() {
      this.openDialog = true
      this.editOrAdd = 'add'
    },
    closeDialog(bol) {
      this.openDialog = bol
    },
    flushTable() {
      this.query()
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  width: 1660px;
}
::v-deep .el-switch__label {
  position: absolute;
  display: none;
  color: #fff;
  width: 80px;
}
/*打开时文字位置设置*/
::v-deep .el-switch__label--right {
  z-index: 1;
  // left: 15px;
  right: 5px;
}
/*关闭时文字位置设置*/
::v-deep .el-switch__label--left {
  z-index: 1;
  // left: 5px;
}
/*显示文字*/
::v-deep .el-switch__label.is-active {
  display: block;
}
::v-deep .el-switch .el-switch__core,
.el-switch .el-switch__label {
  width: 80px !important;
  height: 20px;
}
</style>

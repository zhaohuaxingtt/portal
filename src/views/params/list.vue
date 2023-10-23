<template>
  <iPage>
    <div class="params-list-page">
      <div class="title margin-bottom20">参数管理</div>
      <div class="content flex-between-center">
        <iCard class="left">
          <div class="search-wrapper flex-between-center-center">
            <list-search
              ref="contractSearch"
              custom-selection
              @handle-search="handleSearch"
              type="list"
            />
          </div>
          <div class="btn-wrapper">
            <iButton @click="handleAdd">新建</iButton>
          </div>
          <div class="table-wrapper">
            <iTableCustom
              :ref="'paramsTable'"
              :loading="tableLoading"
              :data="tableData"
              :columns="tableSetting"
              highlight-current-row
              @handle-current-change="handleTableCurrentChange"
            >
            </iTableCustom>
            <iPagination
              v-update
              @size-change="handleSizeChange($event, getDictList)"
              @current-change="handleCurrentChange($event, getDictList)"
              background
              :current-page="page.currPage"
              :page-sizes="page.pageSizes"
              :page-size="page.pageSize"
              :pager-count="3"
              :layout="page.layout"
              :total="page.totalCount"
            />
          </div>
        </iCard>
        <iCard class="right">
          <div class="table-wrapper">
            <iTableCustom
              :ref="'paramsChildTable'"
              :loading="tableChildLoading"
              :data="tableChildData"
              :columns="tableChildSetting"
            >
            </iTableCustom>
          </div>
        </iCard>
      </div>
    </div>
    <operateDictDialog
      :title="title"
      :show.sync="dialogOperateVisiable"
      :type="type"
      :data="dataSelected"
      @callback="handleCallback"
    />
  </iPage>
</template>

<script>
import {
  iPage,
  iCard,
  iInput,
  icon,
  iButton,
  iPagination,
  iMessage
} from 'rise'
import {
  queryDictPaged,
  deleteDict,
  getDictList,
  updateDict
} from '@/api/params'
import iTableCustom from '@/components/iTableCustom'
import operateDictDialog from './components/operateDictDialog'
import listSearch from './components/listSearch'
import { pageMixins } from '@/utils/pageMixins'
export default {
  components: {
    iPage,
    iCard,
    iInput,
    icon,
    iButton,
    iTableCustom,
    operateDictDialog,
    listSearch,
    iPagination
  },
  mixins: [pageMixins],
  data() {
    const _self = this
    return {
      index: 0,
      dataSelected: null,
      title: '',
      query: {
        keyword: '',
        current: 1,
        size: 10
      },
      type: 'add',
      dialogOperateVisiable: false,
      tableLoading: false,
      tableData: [],
      tableSetting: [
        {
          type: 'index',
          label: '序号',
          width: 80
        },
        {
          prop: 'code',
          label: '编码',
          tooltip: false,
          align: 'center'
        },
        {
          prop: 'name',
          label: '名称',
          align: 'center',
          tooltip: false
        },
        {
          prop: 'describe',
          label: '描述',
          align: 'center',
          tooltip: false
        },
        {
          align: 'center',
          width: 50,
          label: '操作',
          tooltip: false,
          customRender: (h, scope) => {
            return h('div', [
              h('i', {
                class: 'el-icon-edit margin-right10',
                style: 'color:#5C6371;',
                on: {
                  click: () => {
                    _self.dialogOperateVisiable = true
                    _self.type = 'edit'
                    _self.title = '编辑参数'
                    _self.dataSelected = scope.row
                  }
                }
              }),
              h('i', {
                class: 'el-icon-delete',
                style: 'color:#5C6371;',
                on: {
                  click: () => {
                    _self
                      .$alert('是否删除该参数', {
                        showCancelButton: true,
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        beforeClose: async (action, instance, done) => {
                          if (action === 'confirm') {
                            const result = await deleteDict({
                              id: scope.row.id,
                              deleteBy: _self.userInfo.id
                            })
                            if (result.code === '200') {
                              this.page.currPage = 1
                              this.getDictList()
                            }
                            done()
                          } else {
                            done()
                          }
                        }
                      })
                      .then(action => {})
                      .catch(err => {
                        console.log(err)
                      })
                  }
                }
              })
            ])
          }
        }
      ],
      tableChildData: [],
      tableChildLoading: false,
      tableChildSetting: [
        {
          type: 'index',
          width: 30
        },
        {
          prop: 'code',
          label: '编码',
          tooltip: false,
          align: 'center'
        },
        {
          prop: 'name',
          label: '中文名',
          align: 'center',
          tooltip: false
        },
        {
          prop: 'nameEn',
          label: '英文名',
          align: 'center',
          tooltip: false
        },
        {
          prop: 'describe',
          label: '描述',
          align: 'center',
          tooltip: false
        },
        {
          label: '操作',
          tooltip: false,
          align: 'center',
          customRender: (h, scope) => {
            const _self = this
            return h('div', [
              h('el-switch', {
                on: {
                  change: async value => {
                    scope.row.state = value ? 1 : 0
                    _self.subData.subDictDto = _self.subData.subDictResultVo
                    _self.subData.state = parseInt(value)
                    const result = await updateDict(_self.subData)
                    if (result.code === '200') {
                      iMessage.success('更新成功')
                    }
                  }
                },
                props: {
                  value: !!scope.row.state,
                  activeColor: '#67C23A'
                }
              })
            ])
          }
        }
      ]
    }
  },

  mounted() {
    this.page.currPage = 1
    this.getDictList()
  },
  watch: {
    query: {
      deep: true,
      handler: function(newVal, oldVal) {
        this.index = 0
      }
    }
  },
  computed: {
    // eslint-disable-next-line no-undef
    ...Vuex.mapState({
      userInfo: state => state.permission.userInfo
    })
  },
  methods: {
    handleSearch(val) {
      this.page.currPage = 1
      this.query.keyword = val
      this.getDictList()
    },
    handleCallback() {
      this.page.currPage = 1
      this.getDictList()
    },
    handleAdd() {
      this.title = '新建参数'
      this.type = 'add'
      this.dialogOperateVisiable = true
    },
    async handleTableCurrentChange(val) {
      this.index = _.findIndex(this.tableData, function(o) {
        return o.id == val.id
      })
      this.tableChildLoading = true
      const subResult = await getDictList({
        code: this.tableData[this.index].code
      })
      this.tableChildLoading = false
      if (subResult.code === '200' && subResult.data) {
        this.subData = subResult.data[0]
        this.tableChildData = subResult.data[0].subDictResultVo
      }
      this.$forceUpdate()
    },
    async getDictList() {
      this.tableLoading = true
      this.tableChildLoading = true
      this.query.current = this.page.currPage
      const result = await queryDictPaged(this.query)
      this.tableLoading = false
      this.tableChildLoading = false
      if (result.code === '200' && result.data) {
        this.tableData = _.cloneDeep(result.data)
        this.page.totalCount = result.total
        this.page.pageSize = result.pageSize
        this.$nextTick(async () => {
          result.data && result.data.length
            ? this.$refs.paramsTable.$refs.theCustomTable.setCurrentRow(
                this.tableData[this.index]
              )
            : ''
          const subResult = await getDictList({
            code: this.tableData[this.index].code
          })
          if (subResult.code === '200' && subResult.data) {
            this.tableChildData = subResult.data[0].subDictResultVo
          }
          this.$forceUpdate()
        })
      }
    }
  }
}
</script>

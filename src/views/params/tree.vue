<template>
  <iPage>
    <div class="params-tree-container">
      <div class="search-wrapper flex-between-center-center">
        <list-search
          ref="contractSearch"
          custom-selection
          @handle-search="handleSearch"
          type="list"
        />
      </div>
      <div class="btn-wrapper margin-bottom20">
        <iButton @click="handleAddRoot">新建根节点</iButton>
      </div>
      <!-- <el-tree
        :render-content="renderContent"
        node-key="id"
        :props="props"
        :load="loadNode"
        lazy
        :data="data"
        ref="tree"
      >
      </el-tree> -->
      <el-tree
        :render-content="renderContent"
        node-key="id"
        :props="props"
        :data="data"
        ref="tree"
      >
      </el-tree>
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
    <operateDialog
      :show.sync="dialogAddVisiable"
      :parent="parentNode"
      :title="title"
      :data="itemSelected"
      :disabled="disabled"
      @callback="handleCallback"
    />
  </iPage>
</template>

<script>
import operateDialog from './components/operateDialog'
import {
  iPage,
  iCard,
  iInput,
  icon,
  iButton,
  iPagination,
  iMessage
} from 'rise'
import { pageMixins } from '@/utils/pageMixins'
import listSearch from './components/listSearch'
import {
  queryDictPaged,
  deleteDict,
  getDictList,
  updateDict
} from '@/api/params'
export default {
  mixins: [pageMixins],
  components: {
    iPage,
    iCard,
    iInput,
    operateDialog,
    icon,
    iButton,
    iPagination,
    listSearch
  },
  data() {
    return {
      disabled: false,
      dialogAddVisiable: false,
      title: '',
      type: 'add',
      data: [],
      parentNode: {},
      itemSelected: {},
      props: {
        label: 'name',
        children: 'subDictResultVo',
        isLeaf: 'isLeaf'
      },
      loading: false,
      query: {
        keyword: '',
        current: 1,
        size: 10
      }
    }
  },
  mounted() {
    this.getDictList()
  },
  computed: {
    // eslint-disable-next-line no-undef
    ...Vuex.mapState({
      userInfo: state => state.permission.userInfo
    })
  },
  methods: {
    handleAddRoot() {
      this.parent = {}
      this.parentNode = {}
      this.itemSelected = {}
      this.handleAdd()
    },
    handleSearch(val) {
      this.page.currPage = 1
      this.query.keyword = val
      this.getDictList()
    },
    checkLeaf(data) {
      for (let i = 0; i < data.length; i++) {
        data[i].isLeaf = !(
          data[i].subDictResultVo && data[i].subDictResultVo.length
        )
        if (data[i].subDictResultVo && data[i].subDictResultVo.length) {
          this.checkLeaf(data[i].subDictResultVo)
        }
      }
      return data
    },
    async getDictList() {
      this.loading = true
      this.query.current = this.page.currPage
      const result = await queryDictPaged(this.query)
      this.loading = false
      if (result.code === '200' && result.data) {
        const data = this.checkLeaf(result.data)
        this.data = _.cloneDeep(data)
        this.page.totalCount = result.total
        this.page.pageSize = result.pageSize
      }
    },
    handleAdd() {
      this.title = '新增参数'
      this.disabled = false
      this.dialogAddVisiable = true
    },
    handleEdit() {
      this.title = '编辑参数'
      this.disabled = false
      this.dialogAddVisiable = true
    },
    handleView() {
      this.title = '查看参数'
      this.disabled = true
      this.dialogAddVisiable = true
    },
    async loadNode(node, resolve) {
      if (node.level === 0) {
      }

      if (node.level === 1) {
        const subResult = await getDictList({
          code: node.data.code
        })
        if (subResult.code === '200' && subResult.data) {
          this.$set(
            node.data,
            'subDictResultVo',
            subResult.data[0].subDictResultVo
          )
          return resolve(subResult.data[0].subDictResultVo || [])
        }
      }
      if (node.level > 1) {
        return resolve(node.data.subDictResultVo || [])
      }
    },
    append(node, data, e) {
      e.stopPropagation()
      this.parent = node.parent
      this.parentNode = data
      this.itemSelected = {}
      this.handleAdd()
    },
    view(node, data, e) {
      e.stopPropagation()
      this.parent = node.data.parentId === -1 ? {} : node.parent
      this.parentNode = node.data.parentId === -1 ? {} : node.parent.data
      this.itemSelected = data
      this.handleView()
    },
    edit(node, data, e) {
      e.stopPropagation()
      this.parent = node.data.parentId === -1 ? {} : node.parent
      this.parentNode = node.data.parentId === -1 ? {} : node.parent.data
      this.itemSelected = data
      this.handleEdit()
    },
    remove(node, data, e) {
      e.stopPropagation()
      this.$alert('是否删除该参数', {
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: async (action, instance, done) => {
          if (action === 'confirm') {
            const result = await deleteDict({
              id: data.id
              //   deleteBy: this.userInfo.id
            })
            if (result.code === '200') {
              iMessage.success('删除参数成功')
              const parent = node.parent
              const childNodes = parent.childNodes
              const children = parent.data.subDictResultVo
              const index = childNodes.findIndex(d => d.data.id === data.id)
              childNodes.splice(index, 1)
              children.splice(index, 1)
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
    },
    async switch(node, data, e) {
      e.stopPropagation()
      const state = !data.state ? 1 : 0
      data.subDictDto = data.subDictResultVo
      data.state = parseInt(state)
      console.log('data', data)
      const result = await updateDict(data)
      if (result.code === '200') {
        iMessage.success('更新成功')
      }
    },
    async handleCallback(val) {
      if (val.type === 'root') {
        this.getDictList()
        this.$forceUpdate()
      } else if (val.type === 'add') {
        const newChild = val.data
        const obj =
          this.parentNode.subDictResultVo?.find(li => {
            return li.id === newChild.id
          }) || null
        if (obj) {
          this.$refs['tree'].remove(newChild)
        } else {
          if (!this.parentNode.subDictResultVo) {
            this.$set(this.parentNode, 'subDictResultVo', [])
          }
        }
        this.parentNode.subDictResultVo.push(newChild)
      } else {
        const node = val.data
        const index = this.parentNode.subDictResultVo.findIndex(
          d => d.id === node.id
        )
        this.$refs['tree'].remove(node)
        this.$set(this.parentNode.subDictResultVo, index, node)
      }
    },
    renderContent(h, { node, data, store }) {
      return (
        <div class="custom-tree-node flex-between-center-center">
          <div>{node.label}</div>
          <div>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.switch(node, data, event)}
            >
              <i
                class={['el-icon-switch-button', data.state ? 'active' : '']}
              ></i>
            </el-button>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.view(node, data, event)}
            >
              <i class="el-icon-view"></i>
            </el-button>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.append(node, data, event)}
            >
              <i class="el-icon-circle-plus-outline"></i>
            </el-button>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.edit(node, data, event)}
            >
              <i class="el-icon-edit"></i>
            </el-button>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.remove(node, data, event)}
            >
              <i class="el-icon-delete"></i>
            </el-button>
          </div>
        </div>
      )
    }
  }
}
</script>
<style lang="scss" scoped>
.params-tree-container {
  .btn-wrapper {
    text-align: right;
  }
}
</style>
<style lang="scss">
.params-tree-container {
  .custom-tree-node {
    width: 100%;
    > div:last-child {
      margin-right: 10px;
    }
  }
  .data-permission-menu-search-bar {
    background: #fff;
  }
  .el-tree-node__content {
    height: 50px;
  }
  .el-tree-node {
    &:nth-child(odd) {
      background: rgba(22, 99, 246, 0.07);
    }
  }
}
.el-button--text {
  i {
    font-size: 14px;
    &.el-icon-switch-button {
      color: rgba(0, 0, 0, 0.4);
      &.active {
        color: #1763f7;
      }
    }
  }
}
</style>

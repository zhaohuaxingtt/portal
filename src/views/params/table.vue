<template>
  <iPage>
    <div class="search-wrapper flex-between-center-center">
      <list-search
        ref="contractSearch"
        custom-selection
        @handle-search="handleSearch"
        type="list"
      />
    </div>
    <iCard class="table-content">
      <div class="btnList">
        <iButton
          @click="searchDetail"
          :disabled="this.selectedItems.length != 1"
          >{{language('查看')}}</iButton
        >
        <iButton @click="newAdd" :disabled="this.selectedItems.length != 1"
          >{{language('新增')}}</iButton
        >
        <iButton @click="edit" :disabled="this.selectedItems.length != 1"
          >{{language('编辑')}}</iButton
        >
        <iButton @click="del" :disabled="this.selectedItems.length != 1"
          >{{language('删除')}}</iButton
        >
        <iButton @click="handleAddRoot">{{language('新建根节点')}}</iButton>
      </div>
      <div class="tableList">
        <iTableCustom
          :loading="loading"
          :data="data"
          :columns="tableColumns"
          :tree-expand="exData"
          @goDetail="goDetail"
          @handle-selection-change="handleSelectionChange"
        ></iTableCustom>
        <iPagination
          v-update
          @size-change="handleSizeChange($event, getDictList)"
          @current-change="handleCurrentChange($event, getDictList)"
          background
          :current-page="page.currPage"
          :page-sizes="page.pageSizes"
          :page-size="page.pageSize"
          :layout="page.layout"
          :total="page.totalCount"
        ></iPagination>
      </div>
    </iCard>
    <operateDialog
      :show.sync="dialogAddVisiable"
      :parent="parentNode"
      :title="title"
      :data="itemSelected"
      :disabled="disabled"
      @callback="handleCallback"
    ></operateDialog>
  </iPage>
</template>

<script>
import { iPage, iCard, iButton, iPagination } from 'rise'
import {
  queryDictPaged,
  deleteDict,
  getDictList,
  updateDict
} from '@/api/params'
import iTableCustom from '@/components/iTableCustom'
import operateDialog from './components/operateDialog'
import listSearch from './components/listSearch'
import { PARAMS_TABLE_LIST } from './data.js'
import { pageMixins } from '@/utils/pageMixins'
export default {
  components: {
    iPage,
    iCard,
    iButton,
    iTableCustom,
    operateDialog,
    listSearch,
    iPagination
  },
  mixins: [pageMixins],
  computed: {},
  data() {
    return {
      loading: false,
      tableColumns: PARAMS_TABLE_LIST,
      dialogAddVisiable: false,
      selectedItems: [],
      title: '',
      data: [],
      itemSelected: {},
      exData: { expandKey: 'name', childrenKey: 'subDictResultVo' },
      parentNode: {},
      keyword:'',
    }
  },
  methods: {
    handleCallback() {
      this.getDictList()
    },
    del() {
      this.$confirm('是否删除该参数', '删除', {
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      }).then(() => {
        deleteDict({ id: this.selectedItems[0].id }).then(val => {
          if (val.code == 200) {
            this.$message.success('删除成功')
            this.getDictList()
          }
        })
      })
    },
    handleSearch(val) {
      this.page.currPage = 1
      this.keyword = val
      this.getDictList(val)
    },
    handleAddRoot() {
      this.parentNode = {}
      this.itemSelected = {}
      this.title = '新增根节点'
      this.disabled = false
      this.dialogAddVisiable = true
    },
    newAdd() {
      this.title = '新增参数'
      this.itemSelected = {}
      this.parentNode =
        this.selectedItems[0].parentId === -1 ? {} : this.selectedItems[0]
      this.disabled = false
      this.dialogAddVisiable = true
    },
    searchParentId(tableList){
        tableList.forEach((item)=>{
            // console.log(item,'=====');
            if(item.id == this.selectedItems[0].parentId ){
                this.parentNode = item
            }else if(item.subDictResultVo){
                this.searchParentId(item.subDictResultVo)
            }
       })
    },
    edit() {
      this.title = '编辑参数'
      this.itemSelected = this.selectedItems[0]
      if(this.selectedItems[0].parentId == -1){
          this.parentNode = {}
      }else{
        this.searchParentId(this.data)
      }
      this.disabled = false
      this.dialogAddVisiable = true
    },
    searchDetail() {
      this.title = '查看参数'
      if(this.selectedItems[0].parentId == -1){
          this.parentNode = {}
      }else{
        this.searchParentId(this.data)
      }
      this.itemSelected = this.selectedItems[0]
      this.disabled = true
      this.dialogAddVisiable = true
    },
    handleSelectionChange(val) {
      this.selectedItems = val
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
      // console.log(keyword,'keyword');
      this.loading = true
      // let query = {}
      // if (this.keyword) {
      //   query = {
      //     keyword: this.keyword,
      //     current: this.page.currPage,
      //     size: this.page.pageSize
      //   }
      // } else {
       let query = {
          keyword: this.keyword,
          current: this.page.currPage,
          size: this.page.pageSize
        }
      // }

      const result = await queryDictPaged(query)
      this.loading = false
      if (result.code === '200' && result.data) {
        // const data = this.checkLeaf(result.data)
        let data = _.cloneDeep(result.data)
        // this.data = this.checkLeaf(data)
        this.data = data
        this.page.totalCount = result.total
        this.page.pageSize = result.pageSize
      }
    }
  },
  mounted() {
    this.getDictList()
  }
}
</script>

<style lang="scss" scoped>
.btnList {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
.table-content,
.tableList {
  margin-top: 20px;
}

.search-wrapper {
  ::v-deep .data-permission-menu-search-bar {
    background-color: white;
  }
}
</style>

<template>
  <el-card class="mt20">
    <div class="flex flex-row justify-end mt20 mb20">
      <iButton @click="addHandler">{{ language('新建标签') }}</iButton>
      <iButton @click="delHandler" :disabled='selectedItems.length == 0'>{{ language('删除') }}</iButton>
    </div>
    <iTableCustom
      ref="testTable"
      :loading="tableLoading"
      :data="tableListData"
      :columns="tableSetting"
      @handle-selection-change="handleSelectionChange"
    />
    <iPagination
      v-update
      @size-change="handleSizeChange($event, getTableList)"
      @current-change="handleCurrentChange($event, getTableList)"
      background
      :current-page="page.currPage"
      :page-sizes="page.pageSizes"
      :page-size="page.pageSize"
      :layout="page.layout"
      :total="page.totalCount"
    />
    <addLabelDialog  v-if="showDialog" :show.sync="showDialog" @refresh='getTableList' :type='type'/>
  </el-card>
</template>

<script>
import {iButton,iPagination,iTableCustom} from 'rise';
import {tableColumn} from './tableColumn';
import { pageMixins } from '@/utils/pageMixins'
import AddLabelDialog from './addLabelDialog';
import { removeLabel } from '@/api/assistant'
export default {
  components: {
    iButton,
    iPagination,
    iTableCustom,
    AddLabelDialog,
  },
  mixins: [pageMixins],
  props:{
    type:{
      type:Number,
      default:1
    }
  },
  data () {
    return {
      tableLoading: false,
      exportLoading: false,
      tableListData: [
        {
          id: 1,
          userNum:1234,
        },
        {
          id: 1,
          userNum:'sadf',
        },
        {
          id: 1,
          userNum:'asdfsdf',
        },
        {
          id: 1,
          userNum:'ojmkokok',
        },
      ],
      tableSetting:tableColumn(this),
      showDialog: false,
      selectedItems:[],
      searchContent:{}
    }
  },
  methods: {
    handleSelectionChange(val) {
      this.selectedItems = val
    },
    addHandler() {
      this.showDialog = true;
    },
    delHandler() {
      this.$confirm('是否删除已选中选项','提示',{
        confirmButtonText:'确认',
        cancelButtonText:"取消",
        type:'warning'
      }).then(()=>{
        if(this.type ==1){
          console.log('del--1');
          // removeLabel()
        }else{
          console.log('del--2');
        }
      }).catch(()=>{
        this.$refs.testTable.clearSelection()
      })
    },
    getTableList(){
      const data = {
        ...this.searchContent,
        current:this.page.currPage,
        size: this.page.pageSize
      }
      if(this.type == 1){
        console.log('111');
      }else{
        console.log('222');
      }
    },
    search(val){
      this.page.currPage = 1
      this.page.totalCount = 0
      this.searchContent = val
    }
  },
}
</script>

<style lang="scss" scoped>
@import '../../../comon.scss';
</style>
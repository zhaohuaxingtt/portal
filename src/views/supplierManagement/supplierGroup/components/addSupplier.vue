<template>
  <iDialog :title="'添加供应商'" :visible.sync="visible" width="80%" @close="onClose" :close-on-click-modal="false">
    <iSearch @sure="sure" @reset="reset" class="margin-bottom10">
        <el-form class="search">
          <template v-for="item in addSearchList">
            <el-form-item :label="item.label" :prop="item.props" :key="item.props">
              <iInput v-if="item.type=='input'" v-model="search[item.props]" :placeholder="language('请输入')"></iInput>
              <iSelect v-if="item.type=='select'" v-model="search[item.props]" :placeholder="language('请选择')" :multiple="item.multiple" :collapse-tags="item.collapse" :clearable="item.clearable" >
                <el-option
                  :value="child.value"
                  :label="child.label"
                  v-for="child in selectOptions[item.selectOption] || []"
                  :key="child.value"
                ></el-option>
              </iSelect>
            </el-form-item>
          </template>
        </el-form>
    </iSearch>
    <div class="margin-bottom10 f-right">
      <iButton @click="add">添加</iButton>
    </div>
      <tableList :tableData="tableData" :tableTitle="addTableTitle" index :indexLabel="'序号'" height="330" @handleSelectionChange="handleSelectionChange"></tableList>
      <iPagination class="padding-bottom20"
        v-update
        @size-change="handleSizeChange($event, getTableList)"
        @current-change="handleCurrentChange($event, getTableList)"
        background
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :current-page="page.currPage"
        :total="page.totalCount" />
  </iDialog>
</template>

<script>
import {iDialog, iSearch, iButton, iSelect, iInput, iPagination, iCard} from "rise";
import { pageMixins } from '@/utils/pageMixins'
import { addTableTitle, addSearchList } from '../data.js'
import tableList from '@/components/commonTable'
export default {
  mixins: [pageMixins],
  components:{
    iDialog, iSearch, iButton, iSelect, iInput, iPagination, iCard, tableList
  },
  props:{
    visible: {
      type: Boolean,
      default: false
    },
  },
  data(){
    return {
      search:{},
      selectOptions:{
        supplierType:[
          {
            label:'一般供应商',
            value:'GP'
          },
          {
          label:'生产供应商',
          value:'PP'
          },
          {
          label:'共用供应商',
          value:'PD'
          },
        ]
      },
      addSearchList,
      addTableTitle,
      tableData:[
        {zhong:'1'},
        {zhong:'2'},
        {zhong:'3'},
        {zhong:'4'},
        {zhong:'5'},
        {zhong:'6'},
        {zhong:'7'},
        {zhong:'8'},
        {zhong:'9'},
        {zhong:'10'},
      ],
      multipleSelection:[]
    }
  },
  methods:{
    onClose(){
      this.$emit('onClose')
    },
    sure(){
      this.page.currPage = 1
      this.page.pageSize = 10
      this.getTableList()
    },
    reset(){
      Object.keys(this.search).forEach(key=>{
        this.search[key] = ''
      })
    },
    handleSelectionChange(val){
      this.multipleSelection = val
    },
    add(){
      console.log('add');
      this.$emit('addSupplier',this.multipleSelection)
    },
    
    getTableList(){
      let data = [
        {zhong:'1'},
        {zhong:'2'},
        {zhong:'3'},
        {zhong:'4'},
        {zhong:'5'},
        {zhong:'6'},
        {zhong:'7'},
        {zhong:'8'},
        {zhong:'9'},
        {zhong:'10'},
      ]
      this.page.totalCount = 32
      this.tableData = data
    },
  }
}
</script>

<style lang="scss" scope>
.f-right{
  text-align: right;
}
</style>
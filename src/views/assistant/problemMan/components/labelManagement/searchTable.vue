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
    <addLabelDialog :moduleList="moduleList" v-if="showDialog" :show.sync="showDialog" @refresh='getTableList' :type='type'/>
  </el-card>
</template>

<script>
import {iButton,iPagination,iTableCustom} from 'rise';
import {tableColumn} from './tableColumn';
import { pageMixins } from '@/utils/pageMixins'
import AddLabelDialog from './addLabelDialog';
import { removeLabel, queryLabelByPage,queryProCsUserList } from '@/api/assistant'
import assistant_mixin from "./../../../mixins"

export default {
  components: {
    iButton,
    iPagination,
    iTableCustom,
    AddLabelDialog,
  },
  mixins: [pageMixins,assistant_mixin],
  props:{
    type:{
      type:Number,
      default:1
    },
    moduleList:{
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      tableLoading: false,
      exportLoading: false,
      tableListData: [],
      tableSetting:[],
      showDialog: false,
      selectedItems:[],
      searchContent:{}
    }
  },
  async created() {
    this.getTableList()
    this.tableSetting = tableColumn(this.moduleListKV)
    // let csList = await queryProCsUserList()
  },
  computed: {
    moduleListKV(){
      let m = {}
      this.moduleList.forEach(e => {
        m[e.menuId] = e
      })
      return m;
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
      }).then(async ()=>{
        if(this.type ==1){
          let ids = this.selectedItems.map(e => e.id)
          await removeLabel(ids)
          this.getTableList()
        }else{
          console.log('del--2');
        }
      }).catch(()=>{
        this.$refs.testTable.clearSelection()
      })
    },
    async getTableList(){
      this.tableLoading = true
      try {
        let data = {
          ...this.searchContent,
          pageNum:this.page.currPage,
          pageSize: this.page.pageSize,
          source:this.getUserType()
        }
        let res = await queryLabelByPage(data)
        if(res.code == 200){
          this.tableListData = res.data.records || []
          this.page.totalCount = res.data.total
        }
      } finally {
        this.tableLoading = false
      }
    },
    search(val){
      this.page.currPage = 1
      this.page.totalCount = 0
      this.searchContent = val
      this.getTableList()
    }
  },
}
</script>

<style lang="scss" scoped>
@import '../../../comon.scss';
</style>
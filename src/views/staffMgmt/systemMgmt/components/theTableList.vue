<template>
  <iCard class="card">
      <div class="btn">
          <i-button @click="createNew">{{language("新建系统")}}</i-button>
          <i-button @click="edit" :disabled='selectedItems.length != 1'>{{language("编辑")}}</i-button>
          <i-button @click="del" :disabled='selectedItems.length == 0'>{{language("删除")}}</i-button>
          <i-button @click="exportXls" >{{language("导出")}}</i-button>
      </div>
      <div class="table">
          <iTableCustom 
            :loading="loading"
            :data="tableListData"
            :columns="tableColumns"
            @open-dialog='openDialog'
            @handle-selection-change="handleSelectionChange"
          />
          <iPagination 
            v-update
            @size-change="handleSizeChange($event, getPage)"
            @current-change="handleCurrentChange($event, getPage)"
            background
            :current-page="page.currPage"
            :page-sizes="page.pageSizes"
            :page-size="page.pageSize"
            :layout="page.layout"
            :total="page.totalCount"
          />
      </div>
      <systemDetailDialog  :show.sync='show' :detailMessage='detailMessage' v-if="show"/>
  </iCard>
</template>

<script>

import{
    iCard,
    iButton,
    iPagination
} from 'rise'
import iTableCustom from '@/components/iTableCustom'
import {pageMixins} from '@/utils/pageMixins'
import {SYSTEM_TABLE_COLUMNS} from './index.js'
import systemDetailDialog from './systemDialog.vue'
export default {
    name:'SystemManagementTableList',
    components:{
        iCard,
        iButton,
        iTableCustom,
        iPagination,
        systemDetailDialog
    },
    mixins:[pageMixins],
    data(){
        return {
            loading:false,
            show:false,
            detailMessage:{

            },
            tableColumns:SYSTEM_TABLE_COLUMNS,
            selectedItems:[],
            tableListData:[
                {
                    nameZh:'我说'
                },
                {
                    nameZh:'ta说'
                },
            ],
            searchForm:{}
        }
    },
    created(){
        this.getPage()
    },
    methods:{
        handleSelectionChange(val){
            this.selectedItems = val
        },
        del(){
            this.$confirm('请确认是否删除','删除',{
                cancelButtonText:'返回',
                confirmButtonText:'确定',
            }).then(()=>{

            })
        },
        exportXls(){

        },
        createNew(){
            this.show = true
            this.detailMessage = {}
        },
        edit(){
            this.detailMessage = this.selectedItems[0]
            this.show = true
        },
        openDialog(val){
            this.detailMessage = val
            this.show = true
        },
        search(val){
            this.page.currPage = 1
            this.page.totalCount = 0
            this.searchForm = {
                ...val
            }
            this.getPage
        },
        getPage(){
            const data = {
                ...this.searchForm,
                size:this.page.pageSize,
                current:this.page.currPage
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.card,
.table,
.btn{
    margin-top: 20px;
}
.btn{
    display: flex;
    justify-content: flex-end;
}
</style>

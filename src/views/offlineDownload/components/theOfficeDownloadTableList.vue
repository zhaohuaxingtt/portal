<template>
  <i-card class="table">
    <div class="btn">
        <i-button @click="download">{{language('下载')}}</i-button>
    </div>
    <div class="tableList">
        <iTableCustom 
            :loading="loading"
            :data="tableListData"
            :columns="tableColumns"
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
  </i-card>
</template>

<script>
import {
    iCard,
    iButton,
    iPagination
} from 'rise'
import iTableCustom from '@/components/iTableCustom'
import {pageMixins} from '@/utils/pageMixins'
import {TABLE_COLUMNS} from './index.js'
export default {
    name:'OfflineDownloadTableList',
    components:{
        iCard,
        iButton,
        iTableCustom,
        iPagination
    },
    mixins:[pageMixins],
    data(){
        return{
            tableColumns:TABLE_COLUMNS,
            searchForm:{}
        }
    },
    methods:{
        download(){

        },
        search(val){
            this.page.currPage = 1
            this.page.totalCount = 0
            this.searchForm = {
                ...val
            }
            this.getPage()
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
.table,
.btn,
.tableList{
    margin-top: 20px;
}
.btn{
    display: flex;
    justify-content: flex-end;
}

</style>
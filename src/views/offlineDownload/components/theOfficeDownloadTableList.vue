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
import {getOfflineDownloadList,downLoadXls} from '@/api/offlineDownload'
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
            loading:false,
            tableColumns:TABLE_COLUMNS,
            searchForm:{
                taskCode:'',
                taskName:'',
                userName:'',
                status:'',
                startTime:'',
                endTime:''
            }
        }
    },
    created(){
        this.getPage()
    },
    methods:{
        download(){
            const data = this.searchForm
            downLoadXls(data)
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
            this.loading = true
            const data = {
                ...this.searchForm,
                size:this.page.pageSize,
                current:this.page.currPage
            }
            getOfflineDownloadList(data).then((res)=>{
                if(res.code == 200){
                    const tableData = res.data.records
                    this.tableListData = tableData
                    this.page.totalCount = res.data.total
                }else{
                    this.$message.error(res.desZh || '获取数据失败')
                }
            }).finally(()=>{
                this.loading = false
            })
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
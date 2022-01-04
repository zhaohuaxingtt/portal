<template>
    <iDialog
        :visible.sync="show"
        title="关联日志报文详情"
        @close="closeDialog"
        width="80%"
        top="40px"
        class="dialog"
    >
        <div class="content">
            <i-table-custom
            :loading="loading"
            :data="list"
            :columns="tableColumns"
            />

            <iPagination
            v-update
            @size-change="handleSizeChange($event, query)"
            @current-change="handleCurrentChange($event, query)"
            background
            :current-page="page.currPage"
            :page-sizes="page.pageSizes"
            :page-size="page.pageSize"
            :layout="page.layout"
            :total="page.totalCount"
            />
        </div>
    </iDialog>
</template>
<script>
import {iDialog} from 'rise';
import {iPagination} from 'rise';
import { pageMixins } from '@/utils/pageMixins'
import iTableCustom from '@/components/iTableCustom'
import {TABLE_DETAIL} from './table';
import {findRecordLogs} from '@/api/biz/log';

export default {
    components: {
        iDialog,
        iPagination,
        iTableCustom
    },
    mixins: [pageMixins],
    props:{
        show:{
            type:Boolean,
            default:false
        },
        params:{
            type:Object,
            default:() => {}
        }
    },
    data() {
        return {
            loading:false,
            list:[{},{}],
            tableColumns:TABLE_DETAIL
        }
    },
    methods: {
        async query(){
             try {
                let data = {
                    current: this.page.currPage - 1,
                    size: this.page.pageSize,
                    extendFields: this.params
                }
                this.loading = true
                let res = await findRecordLogs(data)
                this.list = res.data?.content || []
                this.page.totalCount = res.data.total
            } finally {
                this.loading = false
            }
        },
        closeDialog(){
            this.$emit("update:show",false)
        }
    },
}
</script>

<style lang="scss" scoped>

.dialog{
  ::v-deep .el-dialog{
    max-height: 90%;
    min-height: 400px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    .el-dialog__body{
      flex: 1;
      height: 100%;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }
  }
  .content{
    flex: 1;
    padding: 10px 10px 20px;
    overflow-y: auto;
    overflow-x: hidden;
  }
}
</style>
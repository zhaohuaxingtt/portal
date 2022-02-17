<template>
    <div>
        <i-table-custom
        :loading="loading"
        :data="list"
        :columns="tableColumns"
        :extraData="extraData"
        @handle-selection-change="handleSelectionChange"
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
</template>

<script>
import {iPagination} from 'rise';
import { pageMixins } from '@/utils/pageMixins'
import iTableCustom from '@/components/iTableCustom'
import {findRecordLogs,findInterLogs} from '@/api/biz/log';
export default {
    components: {
        iPagination,
        iTableCustom
    },
    mixins:[pageMixins],
    props:{
        tableColumns:{
            type: Array,
            default: () => []
        },
        extraData:{
            type:Object,
            default: () => {}
        },
        params:{
            type:Object,
            default: () => {}
        }
    },
    data() {
        return {
            loading:false,
            list:[]
        }
    },
    methods: {
        async query(t){
            if(t){
                this.page.currPage = 1
            }
            try {
                this.params.startDate = this.params.startDate ? `${this.params.startDate.split(" ")[0]} 00:00:00` : ""
                this.params.endDate = this.params.endDate ? `${this.params.endDate.split(" ")[0]} 23:59:59` : ""
                // let data = {
                //     current: this.page.currPage - 1,
                //     size: this.page.pageSize,
                //     ...this.params
                // }
                this.loading = true
                let res = {}
                if(this.params.category == 2){
                    let data = {
                        current: this.page.currPage - 1,
                        size: this.page.pageSize,
                        ...this.params
                    }
                    delete data.category
                    // 接口日志
                    res = await findInterLogs(data)
                }else{
                    // 操作、系统日志
                    let data = {
                        current: this.page.currPage - 1,
                        size: this.page.pageSize,
                        extendFields: {
                            menuId: this.params.menuId,
                            type: this.params.type,
                            category: this.params.category,
                            triggerType: this.params.triggerType,
                            interfaceSystemCode: this.params.interfaceSystemCode,
                            bizId_like: this.params.bizId,
                            content_like: this.params.content,
                            userPosition_like: this.params.userPosition,
                            interfaceCode: this.params.interfaceCode,
                            creator_like: this.params.creator,
                            interfaceSerial_like: this.params.interfaceSerial,
                            createDate_gt:this.params.startDate,
                            createDate_le: this.params.endDate,
                            success: this.params.success,
                            id_like: this.params.id,
                            isSee: this.params.isSee ? 1 : 0
                        }
                    }
                    res = await findRecordLogs(data)
                }
                this.list = res.data?.content || []
                this.page.totalCount = res.data.total
            } finally {
                this.loading = false
            }
        }
    },
}
</script>

<style lang="scss" scoped>

</style>
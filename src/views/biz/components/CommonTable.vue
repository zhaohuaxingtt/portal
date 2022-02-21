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
        },
        fromAdminLog: {
            type: Boolean,
            default: false
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
                let params = JSON.parse(JSON.stringify(this.params))
                params.startDate = params.startDate ? `${params.startDate.split(" ")[0]} 00:00:00` : ""
                params.endDate = params.endDate ? `${params.endDate.split(" ")[0]} 23:59:59` : ""
                // let data = {
                //     current: this.page.currPage - 1,
                //     size: this.page.pageSize,
                //     ...params
                // }
                // 0220 新增 是否成功 改为成功失败 应后端 success传参改变 true => false; false => 就不要success这个字段
                if (this.fromAdminLog) {
                    if (params.success) {
                        params.success = false
                    } else {
                        delete params.success
                    }
                }
                this.loading = true
                let res = {}
                if(params.category == 2){
                    let data = {
                        current: this.page.currPage - 1,
                        size: this.page.pageSize,
                        ...params
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
                            menuId: params.menuId,
                            type: params.type,
                            category: params.category,
                            triggerType: params.triggerType,
                            interfaceSystemCode: params.interfaceSystemCode,
                            bizId_like: params.bizId,
                            content_like: params.content,
                            userPosition_like: params.userPosition,
                            interfaceCode: params.interfaceCode,
                            creator_like: params.creator,
                            interfaceSerial_like: params.interfaceSerial,
                            createDate_gt:params.startDate,
                            createDate_le: params.endDate,
                            success: params.success,
                            id_like: params.id,
                            isSee: params.isSee ? 1 : 0
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
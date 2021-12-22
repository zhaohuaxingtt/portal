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
import {findRecordLogs} from '@/api/biz/log';
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
        }
    },
}
</script>

<style lang="scss" scoped>

</style>
<template>
    <div>
        <iTableCustom
            :loading="tableLoading"
            :data="tableListData"
            :columns="tableSetting"
            :extraData="extraData"
            />

        <iPagination
            v-if="showPage"
            v-update
            @size-change="handleSizeChange($event, queryList)"
            @current-change="handleCurrentChange($event, queryList)"
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
import {iPagination, iTableCustom} from 'rise';
import { pageMixins } from '@/utils/pageMixins'

export default {
    components:{
        iPagination,
        iTableCustom
    },
    mixins:[pageMixins],
    props:{
        tableSetting:{
            type: Array,
            default:()=>[]
        },
        extraData:{
            type: Object,
            default:()=>{}
        },
        showPage:{
            type: Boolean,
            default: true
        },
        query:{
            type: Function,
            default:()=>{}
        }
    },
    data() {
        return {
            tableLoading:false,
            tableListData:[{}]
        }
    },
    methods: {
        async queryList(){
            try {
                this.tableLoading = true
                let res = await this.query(this.page)
                this.tableListData = res?.list || []
                this.page.totalCount = res?.total || 0
            } finally {
                this.tableLoading = false
            }
        }
    },
}
</script>

<style lang="scss" scoped>

</style>
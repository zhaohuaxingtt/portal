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
        queryMethod:{
            type: Function,
            default:()=>{}
        },
    },
    data() {
        return {
            tableLoading:false,
            tableListData:[{}]
        }
    },
    methods: {
        async query(type){
            if(type == "rest"){
                this.page.currPage = 1
            }
            try {
                this.tableLoading = true
                let res = await this.queryMethod(this.page)
                this.tableListData = res?.content || []
                this.page.totalCount = res?.totalElements || 0
            } finally {
                this.tableLoading = false
            }
        }
    },
}
</script>

<style lang="scss" scoped>

</style>
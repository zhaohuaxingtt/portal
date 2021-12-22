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
        }
    },
    data() {
        return {
            tableLoading:false,
            tableListData:[{}]
        }
    },
    methods: {
        query(){
            this.tableLoading = true
            setTimeout(() => {
                this.tableLoading = false
            }, 1000);
        }
    },
}
</script>

<style lang="scss" scoped>

</style>
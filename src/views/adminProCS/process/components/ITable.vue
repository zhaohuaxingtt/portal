<template>
    <div>
        <iTableCustom
            :loading="tableLoading"
            :data="tableListData"
            :columns="tableSetting"
            @handle-selection-change="handleSelectionChange"
            />

        <iPagination
        v-update
        @size-change="handleSizeChange($event, getTableList)"
        @current-change="handleCurrentChange($event, getTableList)"
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
import {iPagination, iTableCustom, iButton} from 'rise';
export default {
    props:{
        tableSetting:{
            
        }
    },
    data() {
        return {
            tableLoading:false
        }
    },
}
</script>

<style lang="scss" scoped>

</style>
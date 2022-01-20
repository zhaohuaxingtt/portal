<template>
    <div>
        <iTableCustom
            class="mt20"
            ref="testTable"
            :loading="tableLoading"
            :data="tableListData"
            :columns="tableSetting"
            :extraData="extraData"
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
        <ModifyDialog
            ref="modifyType"
            v-show="modifyDialogFlag"
            :show.sync="modifyDialogFlag"
            @refresh='getTableList'
        />
    </div>
</template>

<script>
import { iPagination, iTableCustom } from 'rise';
import { pageMixins } from '@/utils/pageMixins';
import { typeColumn } from './data.js' 
import { queryKnowledgeTypeList } from '@/api/adminProCS';
import ModifyDialog from './modifyDialog'
export default {
    components: {
        iPagination,
        iTableCustom,
        ModifyDialog
    },
    mixins: [pageMixins],
    data() {
        return {
            tableLoading: false,
            tableListData: [],
            tableSetting: typeColumn,
            extraData: {
				modify: this.modify
			},
            modifyDialogFlag: false
        }
    },
    async mounted() {
        await this.getTableList()
    },
    methods: {
        async getTableList() {
            let params = {
				page: this.page.currPage - 1,
				size: this.page.pageSize
			}
            this.tableLoading = true
            await queryKnowledgeTypeList(params).then(res => {
                if (res) {
                    this.tableListData = res.content || []
                    this.page.totalCount = res.totalElements
                    this.tableLoading = false
                }
            })
        },
        modify(row) {
            this.modifyDialogFlag = true
            this.$refs.modifyType.initDialog(row)
        }
    }
}
</script>

<style lang="scss" scoped>
.mt20 {
    margin-top: 20px;
} 
</style>
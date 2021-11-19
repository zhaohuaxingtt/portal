<template>
    <iCard>
        <div class="margin-bottom20 clearFloat">
            <div class="floatright">
                <!--返回上级-->
                <iButton @click="goBack" v-if="isAuth(whiteBtnList,'OUTPUT_MANAGEMENT_PAGE_RETURNSTEP')">{{ $t('EKL_YJGL_FHSJ') }}</iButton>
                <!--下载模板-->
                <iButton @click="downFile" v-if="isAuth(whiteBtnList,'OUTPUT_MANAGEMENT_PAGE_DOWNLOAD')" >{{ $t('EKL_YJGL_XZMB') }}</iButton>
                <!--上传产量-->
                <iButton @click="uploadFile" v-if="isAuth(whiteBtnList,'OUTPUT_MANAGEMENT_PAGE_UPLOAD')">{{ $t('EKL_YJGL_SCCL') }}</iButton>
                <!--删除-->
                <iButton @click="delData" v-if="isAuth(whiteBtnList,'OUTPUT_MANAGEMENT_PAGE_DELETE')">{{ $t('delete') }}</iButton>
            </div>
        </div>
        <tableList
                height="610px"
                :tableData="tableListData"
                :tableTitle="tableTitle"
                :tableLoading="tableLoading"
                :index="false"
                :openPageProps="['name']"
                :openPageGetRowData="true"
                @openPage="openPage"
                @handleSelectionChange="handleSelectionChange"
        >
            <template #header='scope'>
                {{ scope.row.year }}
            </template>
        </tableList>
        <iPagination
                v-update
                @size-change="handleSizeChange($event, getTableList)"
                @current-change="handleCurrentChange($event, getTableList)"
                background
                :page-sizes="page.pageSizes"
                :page-size="page.pageSize"
                :layout="page.layout"
                :current-page='page.currPage'
                :total="page.totalCount">
        </iPagination>
        <!--上传产量-->
        <uploadDialog
                :yearList="yearList"
                v-model="uploadDialog"
                v-if="uploadDialog"
                @handleSubmit="handleSubmit">
        </uploadDialog>
    </iCard>
</template>

<script>
    import {iCard, iButton, iPagination, iMessage} from 'rise';
    import tableList from './table';
    import {pageMixins} from '@/utils/pageMixins';
    import resultMessageMixin from '@/mixins/resultMessageMixin';
    import {tableTitle} from '../data';
    import uploadDialog from './uploadDialog';
    import isAuth from '@/utils/isAuth';
    import {
        cartypeOutputList,    // list 列表
        downloadExampleExcel, // 下载模板
        download,
        cartypeDelete,          // 删除
        getYear,               // 年份
    } from '@/api/achievement';

    export default {
        mixins: [pageMixins, resultMessageMixin],
        components: {
            iCard,
            iButton,
            tableList,
            iPagination,
            uploadDialog,
            iMessage,
        },
        data() {
            return {
                tableListData: [],
                tableTitle,
                tableLoading: false,
                selectTableData: [],
                uploadDialog: false,
                yearList: [],
                isAuth,
                whiteBtnList: this.$store.state.permission.whiteBtnList,
            };
        },
        created() {
            this.getTableList();
            this.getYearList();
        },
        methods: {
            openPage(val) {
                const {id,name} = val
                download(id,name).then(res => {
                    console.log(res,99999)
                })
            },
            handleSelectionChange(val) {
                this.selectTableData = val;
            },
            handleSearch() {
                this.page.currPage = 1
                this.getTableList()
            },
            async getTableList() {
                this.tableLoading = true;
                try {
                    const req = {
                        currentPage: this.page.currPage,
                        pageSize: this.page.pageSize,
                    };
                    const res = await cartypeOutputList(req);
                    if (res.result) {
                        this.tableListData = res.data.records;
                        this.page.currPage = res.data.current;
                        this.page.pageSize = res.data.size;
                        this.page.totalCount = res.data.total || 0;
                    } else {
                        this.resultMessage(res);
                        this.tableListData = [];
                    }
                    this.tableLoading = false;
                } catch {
                    this.tableListData = [];
                    this.tableLoading = false;
                }
            },
            // 返回上级
            goBack() {
                this.$router.push('/achievement/baseData/list')
            },
            // 下载模板
            downFile() {
                this.tableLoading = true
                downloadExampleExcel().then(res => {
                    this.tableLoading = false
                }).catch((err) => {
                    this.tableLoading = false
                })
            },
            // 上传产量
            uploadFile() {
                this.uploadDialog = true
            },
            // 删除
            delData() {
                if (!this.selectTableData.length) {
                    return iMessage.error(this.$t('SPR_FRM_XGYSPJ_QXZYTSJTJ'))
                } else if (this.selectTableData.length == 1) {
                    let id = this.selectTableData[0].id
                    this.tableLoading = true
                    cartypeDelete({id}).then(res => {
                        if (res.result) {
                            iMessage.success(`${ this.$i18n.locale === 'zh' ? res.desZh : res.desEn }`)
                            this.tableLoading = false
                            this.getTableList()
                        }
                    }).catch((err) => {
                        this.tableLoading = false
                    })
                }
            },
            // 确定回调
            handleSubmit(val) {
                this.uploadDialog = false
                this.getTableList()
            },
            // getYear
            getYearList() {
                getYear().then(res => {
                    if (res.result) {
                        this.yearList = res.data
                    }
                })
            },
            handleSizeChange(e,) {
                this.page.pageSize = e
                this.getTableList()
            },
            handleCurrentChange(e) {
                this.page.currPage = e
                this.getTableList()

            },
        },
    };
</script>

<style scoped lang="scss">
    ::v-deep .el-form-item {
        margin-top: 0;
        margin-bottom: 0;
    }
</style>

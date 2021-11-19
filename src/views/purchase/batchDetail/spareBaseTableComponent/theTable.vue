<template>
    <iCard>
        <div class="margin-bottom20 clearFloat">
            <div class="floatright">
                <!--转派-->
                <iButton @click="taskTransfer" v-if="isAuth(whiteBtnList,'ACHIEVEMENTMGT_SPARE_BASETABLE_TRANSFER')&&!isForward">{{ $t('APPROVAL.TASK_TRANSFER') }}</iButton>
                <!--确认-->
                <iButton @click="confirm" v-if="isAuth(whiteBtnList,'ACHIEVEMENTMGT_SPARE_BASETABLE_CONFIRM')&&!isForward">{{ $t('rfq.RFQINQUIRE') }}</iButton>
                <!--导出-->
                <iButton @click="download" v-if="isAuth(whiteBtnList,'ACHIEVEMENTMGT_SPARE_BASETABLE_DOWN')">{{ $t('APPROVAL.EXPORT')}}</iButton>
            </div>
        </div>
        <tableList
                class="basetable"
                :state="state"
                :tableData="tableListData"
                :tableTitle="tableTitle"
                :tableLoading="tableLoading"
                :openPageGetRowData="true"
                @handleSelectionChange="handleSelectionChange"
        >
        </tableList>
        <div class="company">货币：人民币 | 单位：元</div>
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
        <!--转派-->
        <taskTransferDialog
                :listId="listId"
                :isForward="isForward"
                v-if="taskTransferDialog"
                v-model="taskTransferDialog"
                @handleSubmit="taskTransferCB">
        </taskTransferDialog>
    </iCard>
</template>

<script>
    import {iCard, iButton, iPagination, iMessage} from 'rise';
    import tableList from './table';
    import {pageMixins} from '@/utils/pageMixins';
    import resultMessageMixin from '@/mixins/resultMessageMixin';
    import {tableTitle, getRequest} from './data';
    import taskTransferDialog from './taskTransferDialog';
    import {toThousands,delcommafy,unique} from '@/utils'
    import isAuth from '@/utils/isAuth';
    import {
        querySpbaseDetail,          // 明细list
        getSupplier,                // 获取供应商select数据
        affirmSpbaseDetail,     // 发起确认
        exportSpbaseDetail,     // 导出功能
    } from '@/api/achievement';

    export default {
        mixins: [pageMixins, resultMessageMixin],
        components: {
            iCard,
            iButton,
            tableList,
            iPagination,
            taskTransferDialog,
            iMessage,

        },
        data() {
            return {
                tableListData: [],
                tableTitle,
                tableLoading: false,
                selectTableData: [],
                taskTransferDialog: false, // 转派
                baseId: '',
                listId:[],
                isForward: false,
                isAuth,
                whiteBtnList: this.$store.state.permission.whiteBtnList,

            };
        },
        props: ['formData','title'],
        created() {
            let obj = getRequest()
            if(obj.status == 99) {
//                this.isForward = true
            }
            this.baseId = obj.id
        },
        computed: {
            state() {
                return this.$store.state.permission.userInfo.roleList.some(item => item.code == 'BZZL' || item.fullNameZh == '部长助理')
            }
        },
        methods: {
            // 点击搜索组件按钮callback
            handleSearch(data) {
                this.page.currPage = 1
                this.getTableList()
            },
            handleSelectionChange(val) {
                this.listId = []
                this.selectTableData = val;
                if(this.selectTableData.length) {
                    this.selectTableData.forEach(item=> {
                        this.listId.push(item.id)
                    })
                }
            },
            handleSizeChange(e,) {
                this.page.pageSize = e
                this.getTableList();
            },
            handleCurrentChange(e) {
                this.page.currPage = e
                this.getTableList();
            },
            async getTableList() {
                this.tableLoading = true;
                const searchItem = this.$parent.$children.filter(item => {
                    return item.$attrs.name === 'theSearch'
                })
                let searchForm = JSON.parse(JSON.stringify(searchItem[0].form))
                searchForm.baseId = this.baseId
                try {
                    const req = {
                        currentPage: this.page.currPage,
                        pageSize: this.page.pageSize,
                        baseId: this.baseId,
                        ...searchForm,
                    };
                    const res = await querySpbaseDetail(req);
                    if (res.result) {
                        this.tableListData = res.data.records
                        this.tableListData.map((item) => {
                            if(item.partProperty==1) {
                                this.$set(item,'_partProperty','配件')
                            }else {
                                this.$set(item,'_partProperty','附件')
                            }
                            if(item.supplierCode && item.supplierName) {
                                this.$set(item,'_supplierName',item.supplierCode+'-'+item.supplierName)
                            }
                            if(item.supplierPercent) {
                                this.$set(item,'_supplierPercent',item.supplierPercent+'%')
                            }
                            if(item.preYearPrice) {
                                item.preYearPrice = toThousands(item.preYearPrice)
                            }
                            if(item.yearAmount) {
                                item.yearAmount = toThousands(item.yearAmount)
                            }
                        })
                        this.page = {
                            ...this.page,
                            currPage: res.data.current,
                            pageSize: res.data.size,
                            totalCount: res.data.total
                        }
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
            // 转派
            taskTransfer() {
                if (this.listId.length) {
                    this.taskTransferDialog = true
                } else {
                    return iMessage.error(`${ this.$i18n.locale === 'zh' ? '请选择数据' : 'please select data' }`)
                }
            },
            // 转派回调
            taskTransferCB() {
                this.taskTransferDialog = false
                this.listId = []
                this.getTableList()
            },
            // 确认
            confirm() {
                let obj = {
                    "seriesbaseDetailId":[],
                    "yearId":this.baseId
                }
                let idList = []
                if (this.selectTableData && this.selectTableData.length >= 1) {
                    this.selectTableData.forEach(item => {
                        obj.seriesbaseDetailId.push(item.id)
                    })
                    this.tableLoading = true
                    affirmSpbaseDetail(obj).then(res => {
                        if (res.result) {
                            this.tableLoading = false
                            this.$emit('getHaedData')
                            iMessage.success(`${ this.$i18n.locale === 'zh' ? res.desZh : res.desEn }`)
                        }
                    }).catch((err) => {
                        this.tableLoading = false
                    })
                } else {
                    this.$alert('请注意！此操作将确认全部数据，且确认后将无法修改，是否继续?', '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                            if (action == 'confirm') {
                                this.tableLoading = true
                                let obj = {
                                    "seriesbaseDetailId":[],
                                    "yearId":this.baseId
                                }
                                affirmSpbaseDetail(obj).then(res => {
                                    if (res.result) {
                                        this.$emit('getHaedData')
                                        this.tableLoading = false
                                    }
                                }).catch((err) => {
                                    this.tableLoading = false
                                })
                            }
                        }
                    });
                }
            },
            // 导出
            download() {
                this.formData.baseId = this.baseId
                this.formData.currentPage = 1
                this.formData.downName = this.title
                this.tableLoading = true
                exportSpbaseDetail(this.formData).then(res => {
                    this.tableLoading = false
                }).catch((err) => {
                    this.tableLoading = false
                })
            },

        },
    };
</script>

<style scoped lang="scss">
    ::v-deep .el-form-item {
        margin-top: 0;
        margin-bottom: 0;
    }
    .company{
        text-align: right;color: #999;padding-top: 10px;
    }
</style>

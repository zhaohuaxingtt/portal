<template>
    <iCard>
        <div class="margin-bottom20 clearFloat">
            <div class="floatright">
                <div v-if="!editStatus">
                    <!--编辑-->
                    <iButton @click="edit" v-permission="ACHIEVEMENT_TRACK_PAGE_EDIT">{{ $t('APPROVAL.EDIT') }}
                    </iButton>
                    <!--导出-->
                    <iButton @click="download" v-permission="ACHIEVEMENT_TRACK_PAGE_EXPORT">
                        {{ $t('APPROVAL.EXPORT')}}
                    </iButton>
                </div>
                <div v-else>
                    <!--退出编辑-->
                    <iButton @click="exitEdit">{{ $t('APPROVAL.EXIT_EDIT') }}</iButton>
                    <!--保存-->
                    <iButton @click="save" v-permission="ACHIEVEMENT_TRACK_PAGE_SAVE">{{ $t('APPROVAL.SAVE') }}
                    </iButton>
                </div>
            </div>
        </div>
        <tableList
                class="basetable"
                :header="true"
                :state="state"
                :config="true"
                :monthTitle="monthTitle"
                label="跟踪进度"
                :tableData="tableListData"
                :tableTitle="tableTitle"
                :tableLoading="tableLoading"
                :openPageGetRowData="true"
                :inputProps="inputProps"
                :customSelectValueKey="'supplierName'"
                @handleSelectionChange="handleSelectionChange"
        >
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
    </iCard>
</template>

<script>
    import {iCard, iButton, iPagination, iMessage} from 'rise';
    import tableList from './table';
    import {pageMixins} from '@/utils/pageMixins';
    import resultMessageMixin from '@/mixins/resultMessageMixin';
    import {tableTitle, monthTitle, getRequest} from './data';
    import {toThousands,delcommafy} from '@/utils'

    import {
        queryMonthPartlistDetail, // 月度明细list
        updateMonthPartlistDetail, // 单个编辑 批量
        getTrackingType,           // 获取零件类型
        exportMonthPartlistDetail,     // 导出功能
    } from '@/api/achievement';

    export default {
        mixins: [pageMixins, resultMessageMixin],
        components: {
            iCard,
            iButton,
            tableList,
            iPagination,
            iMessage,
        },
        data() {
            return {
                tableListData: [],
                tableTitle,
                monthTitle,
                tableLoading: false,
                selectTableData: [],
                bulkEditDialog: false,
                bulkEditData: {},
                taskTransferDialog: false,
                editStatus: false,
                show: false,
                inputProps: [],
                selectProps: [],
                supplierSelectList: [],
                baseId: '',
                listId: [],
                trackTypeList:[],
                selectData: JSON.parse(localStorage.getItem('allSelectObject')),

            };
        },
        props: ['formData','title'],
        created() {
            let obj = getRequest()
            this.baseId = obj.id
            this.getTableList()
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
                if (this.selectTableData.length) {
                    this.selectTableData.forEach(item => {
                        this.listId.push(item.id)
                    })
                }
            },
            async getTableList() {
                this.tableLoading = true;
                const searchItem = this.$parent.$children.filter(item => {
                    return item.$attrs.name === 'theSearch'
                })
                let searchForm = JSON.parse(JSON.stringify(searchItem[0].form))
                searchForm.baseId = this.baseId
                searchForm.isConfirm = searchForm.isConfirm === '0' ? false : searchForm.isConfirm === '1' ? true : searchForm.isConfirm === '' ? '' : ''
                try {
                    const req = {
                        currentPage: this.page.currPage,
                        pageSize: this.page.pageSize,
                        baseId: this.baseId,
                        ...searchForm,
                    };
                    const res = await queryMonthPartlistDetail(req);
                    if (res.result) {
                        this.tableListData = res.data.records
                        this.tableListData.map((item) => {
                            if (!item.partType) {
                                item.partType = 'P'
                            }
                            this.$set(item, 'originPrice', toThousands(item.priceConfirm))
                            this.$set(item, 'price', toThousands(item.price))
                            this.$set(item, 'priceConfirm', toThousands(item.priceConfirm))
                            this.$set(item, 'carconfigSixcodeVolumn', toThousands(item.carconfigSixcodeVolumn))
                            this.$set(item, 'confirmQuantity', toThousands(item.confirmQuantity))
                            this.$set(item, 'procAmount', toThousands(item.procAmount))
                            this.$set(item, 'janPrice', toThousands(item.janPrice))
                            this.$set(item, 'febPrice', toThousands(item.febPrice))
                            this.$set(item, 'marPrice', toThousands(item.marPrice))
                            this.$set(item, 'aprPrice', toThousands(item.aprPrice))
                            this.$set(item, 'augPrice', toThousands(item.augPrice))
                            this.$set(item, 'junPrice', toThousands(item.junPrice))
                            this.$set(item, 'julPrice', toThousands(item.julPrice))
                            this.$set(item, 'augPrice', toThousands(item.augPrice))
                            this.$set(item, 'sepPrice', toThousands(item.sepPrice))
                            this.$set(item, 'octPrice', toThousands(item.octPrice))
                            this.$set(item, 'novPrice', toThousands(item.novPrice))
                            this.$set(item, 'decPrice', toThousands(item.decPrice))
                            this.$set(item, 'lasting', toThousands(item.lasting))
                            this.$set(item, 'average', toThousands(item.average))
                            if (item.csGroup && item.csGroupdesc) {
                                this.$set(item, 'csGroupName', item.csGroup + '-' + item.csGroupdesc)
                            } else {
                                this.$set(item, 'csGroupName', item.csGroupdesc)
                            }
                            this.$set(item, 'supplierName', item.supplierCode + '-' + item.supplierName)
                            if (item.isConfirm == 0) {
                                this.$set(item, '_isConfirm', '待确认')
                            } else {
                                this.$set(item, '_isConfirm', '已确认')
                            }
                            this.selectData.purchaseFactoryVo.map((items) => {
                                if (item.factoryCode == items.procureFactory) { // 采购工厂
                                    this.$set(item, 'factoryName', items.factoryName)
                                }
                            })
                        })
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
            // 编辑
            edit() {
                this.editStatus = true
                this.inputProps = ['confirmPrice']
            },
            // 退出编辑
            exitEdit() {
                this.editStatus = false
                this.inputProps = []
                let status = this.tableListData.some(item => {
                    return item.editStatus == true
                })
                if (status) this.getTableList()
            },
            // 保存
            save() {
                let data = []
                let list = this.tableListData.filter(item => {
                    return item.editStatus == true
                })
                if (!list.length) {
                    return iMessage.error(`${ this.$i18n.locale === 'zh' ? '请编辑数据' : 'please edit data' }`)
                }
                let state = list.some(item=> {
                    if(item.confirmPrice.indexOf('.')==-1) return true
                    let str = item.confirmPrice.substring(item.confirmPrice.indexOf('.')+1)
                    return str.length > 2 ? false : true
                })
                if(!state) {
                    return iMessage.error(`${ this.$i18n.locale === 'zh' ? '价格最多两位小数，请重新编辑' : 'The price can be up to two decimal places. Please edit again'}`)
                }
                list.forEach(item => {
                    data.push({
                        id: item.id,
                        confirmPrice: delcommafy(item.confirmPrice),
                    })
                })
                if (data.length) {
                    this.tableLoading = true
                    updateMonthPartlistDetail(data).then(res => {
                        if (res.result) {
                            this.tableLoading = false
                            this.getTableList()
                            iMessage.success(`${ this.$i18n.locale === 'zh' ? res.desZh : res.desEn }`)
                        }
                    }).catch(() => {
                        this.tableLoading = false
                    })
                }
            },

            // 导出
            download() {
                this.formData.baseId = this.baseId
                this.formData.currentPage = 1
                this.formData.downName = this.title
                this.tableLoading = true
                exportMonthPartlistDetail(this.formData).then(res => {
                    this.tableLoading = false
                }).catch(() => {
                    this.tableLoading = false
//                    iMessage.success(this.$t('APPROVAL.OPERATION_FAILED'))
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
</style>

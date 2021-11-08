import {iMessage, iMessageBox} from "rise";
import {excelExport} from "@/utils/filedowLoad";

export const generalPageMixins = {
    data() {
        return {
            nextStep: false
        }
    },
    computed: {
        supplierType() {
            //1 注册供应商 2 一般供应商 3 bkra  4 供应商、管理员等查看（待梳理权限)
            const supplierType = this.$route.query.supplierType
            return supplierType ? Number(supplierType) : 1
        },
        showExportsButton() {
            const supplierType = this.$route.query.supplierType
            return supplierType > 3
        },
        isSupplierDetail() {
            return this.$route.path.indexOf('detail-suppliers') > -1
        },
        isSupplierViewDetail() {
            return this.$route.path.indexOf('view-suppliers') > -1
        },
        // 判断数据属于哪个表
        infoVo(){
            if(this.$store.state.baseInfo.baseMsg.supplierDTO.supplierType=='GP'){
                return 'gpSupplierDTO'
            }else{
                return 'ppSupplierDTO'
            }    
        }
    },
    methods: {
        resultMessage(res, successCallback, errorCallback) {
            const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
            const moduleName = res.moduleName ? res.moduleName + ':' : ''
            if (res.result) {
                iMessage.success(moduleName + result)
                if (successCallback) {
                    successCallback()
                }
            } else {
                iMessage.error(moduleName + result)
                if (errorCallback) {
                    errorCallback()
                }
            }
        },
        exportsTable() {
            if (this.selectTableData.length === 0)
                return iMessage.warn(this.$t('LK_QINGXUANZHEXUYAODAOCHUSHUJU'))
            excelExport(this.selectTableData, this.tableTitle)
        },
        //修改表格改动列
        handleSelectionChange(val) {
            this.selectTableData = val;
        },
        //表格必填校验
        checkTableRequiredProps(tableListData, tableTitle) {
            let flag = true
            const requiredList = []
            tableTitle.map(item => {
                if (item.required) {
                    requiredList.push(item.props)
                }
            })
            try {
                tableListData.map(item => {
                    Object.keys(item).map(item2 => {
                        if (requiredList.includes(item2)) {
                            if (item[item2] === '') {
                                iMessage.warn(this.$t("LK_BITIANXIANGBUNENGWEIKONG"))
                                flag = false
                                throw new Error("LoopTerminates");
                            }
                        }
                    })
                })
                return flag
            } catch {
                return flag
            }
        },
        //新增表格项
        addTableItem(otherObj = {}) {
            const time = new Date().getTime();
            const newItemList = this.tableTitle.map(item => {
                return item.props
            })
            const newItem = {}
            newItemList.map(item => {
                newItem[item] = ''
            })
            this.tableListData.push({
                ...newItem,
                ...otherObj,
                time
            })
        },
        //删除表格项
        deleteItem(idName, fun) {
            if (this.selectTableData.length === 0) {
                return iMessage.warn(this.$t("LK_NINDANGQIANHAIWEIXUANZE"));
            }
            iMessageBox(
                this.$t('LK_SHIFOUQUERENSHANCHU'),
                this.$t('LK_WENXINTISHI'),
                {confirmButtonText: this.$t('LK_QUEDING'), cancelButtonText: this.$t('LK_QUXIAO')}
            ).then(async () => {
                this.tableLoading = true
                try {
                    let ids = [], times = [], indexList = []
                    this.selectTableData.map(item => {
                        if (item.id) {
                            ids.push(item.id)
                        }
                        if (item.time) {
                            times.push(item.time)
                        }
                        if (item.id === null || item.id === undefined) {
                            indexList.push(item.index)
                        }
                    })
                    if (indexList.length !== 0) {
                        this.tableListData = this.tableListData.filter(item => {
                            return !indexList.includes(item.index)
                        })
                    }
                    if (times.length !== 0) {
                        this.tableListData = this.tableListData.filter(item => {
                            return !times.includes(item.time)
                        })
                    }
                    if (ids.length !== 0) {
                        const req = {
                            [idName]: ids,
                            step: 'register'
                        }
                        if (this.supplierType > 3) {
                            req.step = 'submit'
                        }
                        const res = await fun(req, this.supplierType)
                        this.resultMessage(res, () => {
                            this.tableListData = this.tableListData.filter(item => {
                                return !ids.includes(item.id)
                            })
                        })
                    }
                    try {
                        await this.saveInfos()
                        this.tableLoading = false
                    } catch {
                        this.tableLoading = false
                    }
                } catch {
                    this.tableLoading = false
                }
            })
        }
    }
}
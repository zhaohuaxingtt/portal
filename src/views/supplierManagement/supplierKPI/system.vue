<template>
    <div>
        <div style="margin-top: 40px" class="boxBtn">
            <iButton @click="add" v-permission="SUPPLIER_WORKBENCH_SUPPLIERBERSION_SYSTEM_ADD">添加</iButton>
            <iButton @click="edit" v-permission="SUPPLIER_WORKBENCH_SUPPLIERBERSION_SYSTEM_EDIT">修改</iButton>
            <iButton @click="del" v-permission="SUPPLIER_WORKBENCH_SUPPLIERBERSION_SYSTEM_DEL">删除</iButton>
        </div>
        <el-tabs class="tabsHeader" type="card" v-model="tabVal" @tab-click="changeTab">
            <el-tab-pane name="DEPT" :label="language('评分科室设置', '评分科室设置')">
                <tableList v-if="tabVal == 'DEPT'" v-update :tableLoading="tableLoading1" ref="table"
                    @handleSelectionChange="handleSelectionChange" style="margin: 20px 0" border :tableData="tableListData1"
                    :tableTitle="tableTitle1"> </tableList>
            </el-tab-pane>
            <el-tab-pane name="MODEL" :label="language('绩效模型编辑权限设置', '绩效模型编辑权限设置')">
                <tableList v-if="tabVal == 'MODEL'" v-update :tableLoading="tableLoading2" ref="table"
                    @handleSelectionChange="handleSelectionChange" style="margin: 20px 0" border :tableData="tableListData2"
                    :tableTitle="tableTitle2"> </tableList>
            </el-tab-pane>
        </el-tabs>
        <iDialog append-to-body :title="tabVal == 'MODEL' ? $t('添加编辑权限') : $t('添加评分部门/科室')" :visible.sync="addDialog"
            width="40%" @close="clearDiolog">
            <el-form :label-position="'left'" label-width="160px" :model="form" :rules="rules" ref="ruleForm">
                <el-form-item :label="$t('l1类型')" prop="nameZh">
                    <iSelect clearable style="width: 200px" :placeholder="$t('partsprocure.PLEENTER')"
                        v-model="form.modelInfoId">
                        <el-option v-for="(item, index) in levelList" :key="item.id" :value="item.id" :label="item.title">
                        </el-option>
                    </iSelect>
                </el-form-item>
                <el-form-item v-if="tabVal == 'MODEL'" :label="$t('编辑者')" prop="nameEn">
                    <iSelect clearable style="width: 200px" :placeholder="$t('partsprocure.PLEENTER')"
                        v-model="form.userId">
                        <el-option v-for="(item, index) in userList" :key="index" :value="item.id"
                            :label="item.userNum + '-' + item.nameZh + '-' + item.deptDTO.deptNum">
                        </el-option>
                    </iSelect>
                </el-form-item>
                <el-form-item v-if="tabVal == 'DEPT'" :label="$t('部门/科室')" prop="deptCode">
                    <iSelect clearable style="width: 200px" :placeholder="$t('partsprocure.PLEENTER')"
                        v-model="form.deptCode">
                        <el-option v-for="(item, index) in deptList" :key="index" :value="item.deptNum"
                            :label="item.deptNum">
                        </el-option>
                    </iSelect>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <iButton @click="save">{{ $t('LK_QUEREN') }}</iButton>
                <iButton @click="clearDiolog">{{ $t('LK_QUXIAO') }}</iButton>
            </span>
        </iDialog>

    </div>
</template>
  
<script>
import { tableTitleDept, tableTitleModel } from './data'
import tableList from '@/components/commonTable'
import {
    getModelAlignmentByDeptCode,
    getModelPermissionsAdmin,
    addModelScorePermission,
    getModelPermissionsLevel,
    addModelEditPermission,
    delModelEditPermission,
    delModelScorePermission,
    getIndicatorR2AndR1Dept,
    getModelEditPermission,
    getModelScorePermission,
    updateModelScorePermission,
    updateModelEditPermission
} from '@/api/supplierManagement/supplierIndexManage/system'
import {
    getIndicatorR2Dept,
    modelList
} from '@/api/supplierManagement/supplierIndexManage/index'
import { iMessage, iMessageBox, iPagination, iCard, iSearch, iButton, iInput, iSelect, iDatePicker, iDialog, iMultiLineInput } from 'rise'
export default {
    components: {
        iDialog,
        iCard,
        iPagination,
        iSearch,
        iButton,
        iInput,
        iSelect,
        iDatePicker,
        iMultiLineInput,
        tableList,
    },
    data() {
        return {
            selectTableData: [],
            tableTitle1: tableTitleDept,
            tableTitle2: tableTitleModel,
            tableListData1: [],
            tableListData2: [],
            tableLoading1: false,
            tableLoading2: false,
            tabVal: 'DEPT',
            form: {},
            addDialog: false,
            levelList: [],
            deptList: [],
            modelId: '',
            userList: []
        }
    },
    created() {
        this.init()
        this.getTableList()
    },
    methods: {
        async init() {
            const res = await getIndicatorR2Dept()
            this.deptList = res.data
            modelList(true).then(async (res) => {
                this.modelId = res.data[0].modelId
                const res1 = await getModelPermissionsLevel(this.modelId)
                this.levelList = res1.data
            })
            const res2 = await getModelPermissionsAdmin()
            this.userList = res2.data

        },
        getTableList() {
            if (this.tabVal == 'DEPT') {
                getModelScorePermission({ modelId: this.modelId }).then(res => {
                    this.tableListData1 = res.data
                })
            } else {
                getModelEditPermission({ modelId: this.modelId }).then(res => {
                    this.tableListData2 = res.data
                })
            }


        },
        handleSelectionChange(val) {
            this.selectTableData = val
            console.log(this.selectTableData)
        },
        changeTab(val) {
            this.getTableList()
        },
        add() {
            this.addDialog = true

        },
        del() {
            if (this.tabVal == 'DEPT') {
                const ids = this.selectTableData.map(val => val.id)
                delModelScorePermission({ id: ids }).then(res => {
                    if (res.code == '200') {
                        this.getTableList()
                        this.clearDiolog()
                        iMessage.success('删除成功')
                    } else iMessage.error(res.desZh)
                })
            } else {
                const ids = this.selectTableData.map(val => val.id)
                delModelEditPermission({ id: ids }).then(res => {
                    if (res.code == '200') {
                        this.getTableList()
                        this.clearDiolog()
                        iMessage.success('删除成功')
                    } else iMessage.error(res.desZh)
                })
            }
        },
        edit() {
            if (this.selectTableData.length == 0) return iMessage.warn('未选择')
            if (this.selectTableData.length > 1) return iMessage.warn('只能选择一条数据')
            this.addDialog = true
            this.form = this.selectTableData[0]

        },
        save() {
            this.form.modelInfoName = this.levelList.find(val => val.id == this.form.modelInfoId).title
            if (this.tabVal == 'DEPT') {
                if (this.form.id) {
                    updateModelScorePermission(this.form).then(res => {
                        if (res.code == '200') {
                            this.clearDiolog()
                            iMessage.success('修改成功')
                        } else iMessage.error(res.desZh)
                    })
                } else {
                    this.form.deptId = this.deptList.find(val => val.deptNum == this.form.deptCode).id
                    this.form.modelId = this.modelId
                    addModelScorePermission({ modelId: this.modelId, permissionsDTOS: [{ ...this.form }] }).then(res => {
                        if (res.code == '200') {
                            this.clearDiolog()
                            iMessage.success('保存成功')
                        } else iMessage.error(res.desZh)
                    })
                }

            } else {
                this.form.userName = this.userList.find(val => val.id == this.form.userId).nameZh
                if (this.form.id) {
                    updateModelEditPermission(this.form).then(res => {
                        if (res.code == '200') {
                            this.clearDiolog()
                            iMessage.success('修改成功')
                        } else iMessage.error(res.desZh)
                    })
                } else {
                    addModelEditPermission({ deptPermissionDTOS: [{ ...this.form }] }).then(res => {
                        if (res.code == '200') {
                            this.clearDiolog()
                            iMessage.success('保存成功')
                        } else iMessage.error(res.desZh)
                    })
                }

            }
        },
        clearDiolog() {
            console.log(111111)
            this.getTableList()
            this.addDialog = false
            this.form = {
                deptCode:'',
                userId:'',
                modelInfoId:''
            }
        },
    },
}
</script>
<style lang="scss" scoped>
.boxBtn {
    // display: flex;
    text-align: right;
}

.tabsHeader {

    margin-left: 0 !important;

    ::v-deep .el-tabs__item.is-active {
        font-weight: bold;
        background: #ffffff;
        opacity: 1;
    }

    ::v-deep .el-tabs__item {
        border: none;
        font-weight: 500;
        background: #f5f6f7;
        border-radius: 0px 10px 10px 0px;
        box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.08);
        font-size: 16px;
        min-width: 120px;
        height: 35px;
        line-height: 35px;
    }

    ::v-deep .el-tabs__nav {
        background: transparent;
        border: none;
        padding: 10px 0;
    }

    ::v-deep .el-tabs__item:focus.is-active.is-focus:not(:active) {
        -webkit-box-shadow: none;
        box-shadow: none;
    }

    ::v-deep .el-tabs__header {
        border: none;
    }

    ::v-deep .el-tabs__item:first-child {
        border-radius: 10px 0px 0px 10px;
    }
}
</style>

  
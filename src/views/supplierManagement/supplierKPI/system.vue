<template>
    <div>
        <div style="margin-top: 40px" class="boxBtn">
            <iButton @click="add">添加</iButton>
            <iButton @click="edit">修改</iButton>
            <iButton @click="del">删除</iButton>
        </div>
        <el-tabs class="tabsHeader" type="card" v-model="tabVal" @tab-click="changeTab">
            <el-tab-pane name="DEPT" :label="language('评分科室设置', '评分科室设置')">
                <tableList v-update :tableLoading="tableLoading1" ref="table" @handleSelectionChange="handleSelectionChange"
                    style="margin: 20px 0" border :tableData="tableListData1" :tableTitle="tableTitle1"> </tableList>
            </el-tab-pane>
            <el-tab-pane name="MODEL" :label="language('绩效模型编辑权限设置', '绩效模型编辑权限设置')">
                <tableList v-update :tableLoading="tableLoading2" ref="table" @handleSelectionChange="handleSelectionChange"
                    style="margin: 20px 0" border :tableData="tableListData2" :tableTitle="tableTitle2"> </tableList>
            </el-tab-pane>
        </el-tabs>
        <iDialog append-to-body :title="tabVal == 'MODEL' ? $t('添加编辑权限') : $t('添加评分部门/科室')" :visible.sync="addDialog"
            width="40%" @close="clearDiolog">
            <el-form :label-position="'left'" label-width="160px" :model="form" :rules="rules" ref="ruleForm">
                <el-form-item :label="$t('l1类型')" prop="nameZh">
                    <i-input style="width: 200px" :placeholder="$t('partsprocure.PLEENTER')" v-model="form.nameZh">
                    </i-input>
                </el-form-item>
                <el-form-item v-if="tabVal == 'MODEL'" :label="$t('编辑者')" prop="nameEn">
                    <i-input style="width: 200px" :placeholder="$t('partsprocure.PLEENTER')" v-model="form.nameEn">
                    </i-input>
                </el-form-item>
                <el-form-item v-if="tabVal == 'DEPT'" :label="$t('部门/科室')" prop="deptCode">
                    <iSelect filterable clearable multiple style="width: 200px" :placeholder="$t('partsprocure.PLEENTER')"
                        v-model="form.deptCode">
                        <el-option v-for="(item, index) in deptList" :key="index" :value="item.deptNum"
                            :label="item.deptNum">
                        </el-option>
                    </iSelect>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <iButton @click="submit">{{ $t('LK_QUEREN') }}</iButton>
                <iButton @click="canel">{{ $t('LK_QUXIAO') }}</iButton>
            </span>
        </iDialog>

    </div>
</template>
  
<script>
import { tableTitleDept, tableTitleModel } from './data'
import tableList from '@/components/commonTable'
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
            tableTitle1: tableTitleDept,
            tableTitle2: tableTitleModel,
            tableListData1: [],
            tableListData2: [],
            tableLoading1: false,
            tableLoading2: false,
            tabVal: 'DEPT',
            form: {},
            addDialog: false,
        }
    },
    created() {

    },
    methods: {
        changeTab(val) {
            console.log(this.tabVal)
        },
        add() {
            this.addDialog = true
        },
        del() {

        },
        edit() {

        },
        clearDiolog() {
            this.addDialog = false
            this.form = {}
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

  
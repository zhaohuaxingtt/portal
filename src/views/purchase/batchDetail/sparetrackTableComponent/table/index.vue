<!--
 * @Author: moxuan
 * @Date: 2021-04-13 17:30:36
 * @LastEditTime: 2021-07-13 16:37:55
 * @LastEditors: 舒杰
 * @Description: 通用表格
-->
<template>

    <el-form :model="{tableData}" status-icon :rules="rules" ref="commonTableForm">
        <el-table :height="height"
                  ref="table"
                  :span-method="handleMerge"
                  tooltip-effect='light'
                  :data='tableData'
                  :empty-text="$i18n.locale === 'zh'?'暂无数据':'No Data'"
                  v-loading='tableLoading'
                  @selection-change="handleSelectionChange"
                  :row-class-name="handleTableRow">
            <el-table-column v-if="selection" type='selection' width="50" align='center'
                             :fixed="fixed"></el-table-column>
            <el-table-column v-if='index' type='index' width='50' align='center' :label="'#'+ index "></el-table-column>
            <template v-for="(items,index) in tableTitle">
                <el-table-column :width="items.width" :show-overflow-tooltip='items.tooltip' :key="items.name"
                                 align='center'
                                 :label="items.key ? $t(items.key) : items.name"
                                 :prop="items.props" :fixed="items.fixed" :render-header="renderHeader">
                    <template slot-scope="scope">
                        <div v-if="items.props=='partName'">
                            <div> {{ scope.row.partName}}</div>
                            <div> {{ scope.row.partNameDe}}</div>
                        </div>
                        <div v-else-if="items.props=='spMaterialGroup'">
                            <div> {{ scope.row.spMaterialGroup}}</div>
                            <div> {{ scope.row.spMaterialGroupDe}}</div>
                        </div>
                        <div v-else>{{ scope.row[items.props]}}</div>
                    </template>
                </el-table-column>
            </template>
        </el-table>
    </el-form>

</template>
<script>
    import {iInput, iSelect, icon} from 'rise';
    import {delcommafy} from '@/utils'

    export default {
        props: {
            label: {type: String},
            tableData: {type: Array},
            tableTitle: {type: Array},
            monthTitle: {type: Array},
            tableLoading: {type: Boolean, default: false},
            state: {type: Boolean, default: false},
            selection: {type: Boolean, default: true},
            index: {type: Boolean, default: false},
            header: {type: Boolean, default: false},
            height: {type: Number || String},
            openPageProps: {type: String, default: []},
            inputProps: {
                type: Array, default: () => {
                    return [];
                },
            },
            selectProps: {
                type: Array, default: () => {
                    return [];
                },
            },
            selectPropsOptionsObject: {
                type: Object, default: () => {
                    return {};
                },
            },
            customSelectValueKey: {type: String, default: ''},
            customOpenPageWord: {type: String, default: ''},
            openPageGetRowData: {type: Boolean, default: false},
            inputType: {type: String, default: ''},
            fileSizeProps: {type: String, default: 'fileSize'},
            mergeValue: {type: String, default: ''},
            fixed: {type: Boolean, default: false}
        },
        components: {
            iInput,
            iSelect,
            icon,
        },
        data() {
            return {
                rules: [],
                show: false,
            };
        },
        created() {
            this.show = localStorage.getItem('status') == 'true' ? true : false
        },
        methods: {
            changeValue(name, index, data, key) {
                if (data && data.length) {
                    data.map((item) => {
                        if (name == item.shortNameZh && item.supplierId) {
                            this.tableData[index].supplierCode = item.code
                            this.tableData[index].supplierId = item.supplierId
                            this.tableData[index].supplierName = item.shortNameZh
                            this.$set(this.tableData[index], 'editStatus', true)
                        }
                        if (name == item.name && key == 'partType') {
                            this.tableData[index].partType = item.name
                            this.$set(this.tableData[index], 'editStatus', true)
                        }
                    })
                }
            },
            onFocus(val, index, key) {
                this.tableData[index][key] = delcommafy(val) // 转字符串数字
            },
            onBlur(val, index, key) {
                if (!isNaN(val)) { // 非数字
                    this.tableData[index][key] = val.replace(/\B(?=(\d{3})+\b)/g, ',') // 转千分
                }
            },
            changeInput(value, index, key) {
                if (key) {
                    this.tableData[index][key] = value.replace(/\B(?=(\d{3})+\b)/g, ',') // 转千分
                    this.$set(this.tableData[index], 'editStatus', true)
                }
            },
            handleMerge({row, column, rowIndex, columnIndex}) {
                // 判断需不需要合并
                if (this.mergeValue === 'pkpiTable1') {
                    if ((columnIndex === 1 || columnIndex === 3 || columnIndex === 4 || columnIndex === 5 || columnIndex === 6) &&
                        rowIndex === 14) {
                        return {
                            rowspan: 2,
                            colspan: 1,
                        };
                    }
                }
                if (this.mergeValue === 'furtherRatingCard') {
                    if (columnIndex === 1) {
                        return [1, 3];
                    }
                }
            },
            handleSelectionChange(val) {
                this.$emit('handleSelectionChange', val);
            },

            handleTableRow({row}) {
                if (row.rowType == 2) {
                    return 'row-grey'
                }
            },
            renderHeader(h, {column, $index}) {
                // h 是一个渲染函数       column 是一个对象表示当前列      $index 第几列
                if (column.label == this.label) {
                    return this.fn(column, h, $index)
                } else if (column.label == '备注' && this.tableTitle.length > 16) {
                    return this.cb(column, h, $index)
                } else {
                    return h("span", column.label + "  ", {  //这是左边的
                        align: "left"
                    })
                }
            },
            cb(column, h, $index) {
                let vm = this
                let style = 'color:#1663f6;font-size:24px;cursor: pointer;position: relative; top:2px;left:-70px'
                if (vm.show) {
                    return h('div', null, [
                        h("span", column.label + "  ", {  //这是左边的
                            align: "center"
                        }),
                        h('span', null, [  //这个是渲染出来的icon
                            h('i', {
                                class: 'iconfont iconliebiaoshouqilishishuju',  //组件库的icon，可根据需要修改
                                style: style,
                                on: {
                                    click: function () {
                                        vm.show = false
                                        localStorage.setItem('status', false)
                                        vm.tableTitle.splice($index - 13, 12)
                                    }
                                }
                            }, '')
                        ]),
                    ])
                } else {
                    return h("span", column.label + "  ", {  //这是左边的
                        align: "left"
                    })
                }
            },

            fn(column, h, $index) {
                let index = $index
                let vm = this
                if (vm.tableTitle.length == 16 || !vm.show) {
                    return h('div', null, [
                        h("span", column.label + "  ", {  //这是左边的
                            align: "left"
                        }),
                        h('span', null, [  //这个是渲染出来的icon
                            h('i', {
                                class: 'iconfont iconliebiaozhankailishishuju',  //组件库的icon，可根据需要修改
                                style: 'color:#1663f6;font-size:24px;cursor: pointer;position: relative;top:2px',
                                on: {
                                    click: function () {
                                        for (let i = vm.monthTitle.length - 1; i >= 0; i--) {
                                            vm.tableTitle.splice(index, 0, vm.monthTitle[i])
                                        }
                                        vm.show = true
                                        localStorage.setItem('status', true)
                                    }
                                }
                            }, '')
                        ]),
                    ])
                } else {
                    return h("span", column.label + "  ", {  //这是左边的
                        align: "left"
                    })
                }
            },
        },
    };
</script>
<style lang='scss' scoped>
    .openLinkText {
        color: $color-blue;
    }

    .linkEllipsis {
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .el-select {
        margin: 2px 0;
    }

    ::v-deep .el-table__row .el-input {
        height: 35px !important;

        .el-input__inner {
            height: 35px !important;
        }
    }

    .icon {
        color: $color-blue;
    }

    .required {
        font-size: 14px;
        color: red;
    }

    .el-form-item {
        margin-top: 1.375rem;
    }

    .text {
        text-decoration: underline;
    }

    .basetable ::v-deep .el-table .el-table__header {
        height: 60px;
    }

    ::v-deep .tablelist .el-table .el-table__header {
        height: 39px;
    }

    ::v-deep .el-input__inner {
        width: 100px;
        height: 35px;
    }

    ::v-deep .el-table__body td:first-child {
        font-weight: bold;
    }

    ::v-deep .el-table .el-table__header tr:nth-child(even) th { //偶数行
        font-weight: 500 !important;
    }

    ::v-deep .el-table .row-grey {
        background-color: #eee !important;
    }

</style>

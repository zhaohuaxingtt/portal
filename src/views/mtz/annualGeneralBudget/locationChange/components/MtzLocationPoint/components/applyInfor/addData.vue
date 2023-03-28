<!-- 维护MTZ零件主数据新增弹窗 -->
<template>
    <div style="padding-bottom:30px;">
        <div class="form-wrapper">
            <iFormGroup :row="4" :model="contractForm" :rules="rules" ref="contractForm">
                <iFormItem prop="assemblyPartnum">
                    <iLabel :label="language('LINGJIANHAO', '零件号')" slot="label" :required="true"></iLabel>
                    <iInput v-model="contractForm.assemblyPartnum" type="text" :placeholder="language('QINGXUANZE', '请选择')"
                        :disabled="disabled">
                    </iInput>
                    <i class="el-icon-search search_btn_lj" @click="partChange"></i>
                </iFormItem>
                <iFormItem prop="priceUnit">
                    <iLabel :label="language('MEI', '每')" slot="label" :required="true"></iLabel>
                    <iInput v-model="contractForm.priceUnit" type="number" :placeholder="language('QINGSHURU', '请输入')"
                        :disabled="disabled" />
                </iFormItem>
                <iFormItem prop="partUnit">
                    <iLabel :label="language('LINGJIANSHULIANGDANWEI', '零件数量单位')" slot="label"></iLabel>
                    <iInput v-model="contractForm.partUnit" type="text" :placeholder="language('QINGSHURU', '请输入')"
                        :disabled="true" />
                </iFormItem>
                <iFormItem prop="dosage">
                    <iLabel :label="language('YONGLIANG', '用量')" slot="label" :required="true"></iLabel>
                    <iInput v-model="contractForm.dosage" type="number" :placeholder="language('QINGSHURU', '请输入')"
                        :disabled="disabled" />
                </iFormItem>
                <iFormItem prop="dosageMeasureUnit">
                    <iLabel :label="language('YONGLIANGJILIANGDANEWI', '用量计量单位')" slot="label" :required="true"></iLabel>
                    <iSelect v-model="contractForm.dosageMeasureUnit" clearable filterable value-key="code"
                        :disabled="companyType" :placeholder="language('QINGXUANZE', '请选择')">
                        <el-option v-for="item in dosageMeasureUnit" :key="item.code" :value="item.code"
                            :label="item.code"></el-option>
                    </iSelect>
                </iFormItem>
                <!-- <iFormItem prop="materialDoseSource">
                    <iLabel :label="language('原材料用量来源', '原材料用量来源')" slot="label" :required="true"></iLabel>
                    <iSelect v-model="contractForm.materialDoseSource" clearable filterable
                        :placeholder="language('QINGXUANZE', '请选择')">
                        <el-option v-for="item in materialDoseSourceList" :key="item.code" :label="item.name"
                            :value="item.code">
                        </el-option>
                    </iSelect>
                </iFormItem> -->
                <iFormItem prop="startDate">
                    <iLabel :label="language('YOUXIAOQIQI', '有效期起')" slot="label"></iLabel>
                    <iDatePicker value-format="yyyy-MM-dd" :picker-options="pickerOptionsStar" v-model="contractForm.startDate" type="datetime">
                    </iDatePicker>
                </iFormItem>
                <iFormItem prop="endDate">
                    <iLabel :label="language('YOUXIAOQIZHI', '有效期止')" slot="label"></iLabel>
                    <iDatePicker value-format="yyyy-MM-dd" :picker-options="pickerOptionsEnd" v-model="contractForm.endDate" type="datetime">
                    </iDatePicker>
                </iFormItem>
                <iFormItem prop="ruleNo">
                    <iLabel :label="language('GUIZEBIANHAO', '规则编号')" slot="label" :required="true"></iLabel>
                    <iSelect v-model="contractForm.ruleNo" clearable value-key="code" @change="choiseGZ"
                        :placeholder="language('QINGXUANZE', '请选择')">
                        <el-option v-for="item in ruleNo" :key="item.id" :value="item.id" :label="item.ruleNo"></el-option>
                    </iSelect>
                </iFormItem>
                <iFormItem prop="mark">
                    <iLabel :label="language('BEIZHU', '备注')" slot="label"></iLabel>
                    <iInput v-model="contractForm.mark" type="text" :placeholder="language('QINGSHURU', '请输入')"
                        :disabled="disabled" />
                </iFormItem>

                <span class="tip">*以下为规则字段</span>
                <div class="box">
                    <iFormItem prop="sapCode">
                        <iLabel :label="language('GONGYINGSHANGBIANHAOMINGCHENG', '供应商编号/名称')" slot="label"></iLabel>
                        <iSelect v-model="contractForm.sapCode" clearable filterable :disabled="true"
                            :placeholder="language('QINGSHURU', '请输入')">
                            <el-option v-for="item in supplierList" :key="item.code" :label="item.codeMessage"
                                :value="item.code">
                            </el-option>
                        </iSelect>
                    </iFormItem>

                    <iFormItem prop="materialCode">
                        <iLabel :label="language('YUANCAILIAOPAIHAO', '原材料牌号')" slot="label"></iLabel>
                        <iSelect v-model="contractForm.materialCode" clearable value-key="code" :disabled="true"
                            :placeholder="language('QINGXUANZE', '请选择')">
                            <el-option v-for="item in materialCode" :key="item.code" :value="item.code"
                                :label="item.code"></el-option>
                        </iSelect>
                    </iFormItem>
                    <iFormItem prop="materialName">
                        <iLabel :label="language('YUANCAILIAO', '原材料')" slot="label"></iLabel>
                        <iInput v-model="contractForm.materialName" :disabled="true" type="text"
                            :placeholder="language('QINGSHURU', '请输入')" />
                    </iFormItem>
                    <iFormItem prop="startDate">
                        <iLabel :label="language('YOUXIAOQIQI', '有效期起')" slot="label"></iLabel>
                        <iDatePicker v-model="contractForm.startDate" type="datetime" :disabled="true">
                        </iDatePicker>
                    </iFormItem>
                    <iFormItem prop="endDate">
                        <iLabel :label="language('YOUXIAOQIZHI', '有效期止')" slot="label"></iLabel>
                        <iDatePicker v-model="contractForm.endDate" type="datetime" :disabled="true">
                        </iDatePicker>
                    </iFormItem>
                    <iFormItem prop="partBalanceCountType">
                        <iLabel :label="language('结算数据来源', '结算数据来源')" slot="label" :required="true"></iLabel>
                        <i-select :disabled="true" v-model="contractForm.partBalanceCountType" >
                        <el-option v-for="item in partBalanceCountTypeList" :key="item.code" :label="item.name" :value="item.code">
                            </el-option>
                        </i-select>

                    </iFormItem>
                    <iFormItem prop="priceSource">
                        <iLabel :label="language('SHICHANGJIALAIYUAN', '市场价来源')" slot="label"></iLabel>
                        <iInput v-model="contractForm.priceSource" type="text" :placeholder="language('QINGSHURU', '请输入')"
                            :disabled="true" />
                    </iFormItem>
                    <iFormItem prop="avgPeriod">
                        <iLabel :label="language('均值计算周期', '均值计算周期')" slot="label" :required="true"></iLabel>
                        <i-select :disabled="true" v-model="contractForm.avgPeriod" clearable filterable
                            :placeholder="language('QINGXUANZE', '请选择')">
                            <el-option v-for="item in avgPeriodList" :key="item.code" :label="item.name" :value="item.code">
                            </el-option>
                        </i-select>
                    </iFormItem>
                    <iFormItem prop="offsetMonth">
                        <iLabel :label="language('均值偏移量', '均值偏移量')" slot="label" :required="true"></iLabel>
                        <i-select :disabled="true" v-model="contractForm.offsetMonth" clearable filterable
                            :placeholder="language('QINGXUANZE', '请选择')">
                            <el-option v-for="item in offsetList" :key="item.code" :label="item.name" :value="item.code">
                            </el-option>
                        </i-select>
                    </iFormItem>
                    <iFormItem prop="price">
                        <iLabel :label="language('JIJIA', '基价')" slot="label"></iLabel>
                        <iInput v-model="contractForm.price" type="text" :placeholder="language('QINGSHURU', '请输入')"
                            :disabled="true" />
                    </iFormItem>

                    <iFormItem prop="priceMeasureUnit">
                        <iLabel :label="language('JIJIAJILIANGDANWEI', '基价计量单位')" slot="label"></iLabel>
                        <iInput v-model="contractForm.priceMeasureUnit" type="text"
                            :placeholder="language('QINGSHURU', '请输入')" :disabled="true" />
                    </iFormItem>

                    <iFormItem prop="tcCurrence">
                        <iLabel :label="language('HUOBI', '货币')" slot="label"></iLabel>
                        <iInput v-model="contractForm.tcCurrence" type="text" :placeholder="language('QINGSHURU', '请输入')"
                            :disabled="true" />
                    </iFormItem>
                    <iFormItem prop="tcExchangeRate">
                        <iLabel :label="language('HUILV', '汇率')" slot="label"></iLabel>
                        <iInput v-model="contractForm.tcExchangeRate" type="text"
                            :placeholder="language('QINGSHURU', '请输入')" :disabled="true" />
                    </iFormItem>
                    <iFormItem prop="threshold">
                        <iLabel :label="language('YUZHI', '阈值')" slot="label"></iLabel>
                        <iInput v-model="contractForm.threshold" type="text" :placeholder="language('QINGSHURU', '请输入')"
                            :disabled="true" />
                    </iFormItem>
                    <iFormItem prop="thresholdCompensationLogic">
                        <iLabel :label="language('YUZHIXISHU', '阈值系数')" slot="label"></iLabel>
                        <iSelect v-model="contractForm.thresholdCompensationLogic" clearable value-key="code"
                            :disabled="true" :placeholder="language('QINGXUANZE', '请选择')">
                            <el-option v-for="item in thresholdCompensationLogic" :key="item.code" :value="item.code"
                                :label="item.message"></el-option>
                        </iSelect>
                    </iFormItem>
                    <iFormItem prop="compensationRatio">
                        <iLabel :label="language('BUCHABAIFENBI', '补差%')" slot="label"></iLabel>
                        <iInput v-model="contractForm.compensationRatio" type="text"
                            :placeholder="language('QINGSHURU', '请输入')" :disabled="true" />
                    </iFormItem>
                <!-- <iFormItem prop="compensationPeriod">
                        <iLabel :label="language('BUCHAZHOUQI', '补差周期')" slot="label"></iLabel>
                        <i-select v-model="contractForm.compensationPeriod" clearable
                            :placeholder="language('QINGXUANZE', '请选择')" :disabled="true">
                            <el-option v-for="item in compensationPeriod" :key="item.code" :label="item.message"
                                :value="item.code">
                            </el-option>
                        </i-select>
                        </iFormItem> -->
                    <span class="tip">*以下为贵金属原材料必填字段</span>
                    <div>

                        <iFormItem prop="platinumPrice">
                            <iLabel :label="language('BOJIJIA', '铂基价')" slot="label"></iLabel>
                            <iInput v-model="contractForm.platinumPrice" type="text"
                                :placeholder="language('QINGSHURU', '请输入')" :disabled="true" />
                        </iFormItem>
                        <iFormItem prop="platinumDosage">
                            <iLabel :label="language('BOYONGLIANG', '铂用量')" slot="label"></iLabel>
                            <iInput v-model="contractForm.platinumDosage" type="text"
                                :placeholder="language('QINGSHURU', '请输入')" :disabled="true" />
                        </iFormItem>
                        <iFormItem prop="palladiumPrice">
                            <iLabel :label="language('BAJIJIA', '钯基价')" slot="label"></iLabel>
                            <iInput v-model="contractForm.palladiumPrice" type="text"
                                :placeholder="language('QINGSHURU', '请输入')" :disabled="true" />
                        </iFormItem>
                        <iFormItem prop="palladiumDosage">
                            <iLabel :label="language('BAYONGLIANG', '钯用量')" slot="label"></iLabel>
                            <iInput v-model="contractForm.palladiumDosage" type="text"
                                :placeholder="language('QINGSHURU', '请输入')" :disabled="true" />
                        </iFormItem>
                        <iFormItem prop="rhodiumPrice">
                            <iLabel :label="language('LAOJIJIA', '铑基价')" slot="label"></iLabel>
                            <iInput v-model="contractForm.rhodiumPrice" type="text"
                                :placeholder="language('QINGSHURU', '请输入')" :disabled="true" />
                        </iFormItem>
                        <iFormItem prop="preciousMetalDosageUnit">
                            <iLabel :label="language('GUIJINSHUYONGLIANGJIJIADANWEI', '贵金属用量&基价单位')" slot="label"></iLabel>
                            <iInput v-model="contractForm.preciousMetalDosageUnit" type="text"
                                :placeholder="language('QINGSHURU', '请输入')" :disabled="true" />
                        </iFormItem>

                        <!-- 载体费用 -->
                        <iFormItem prop="substrateExw">
                            <iLabel :label="$t('载体费用')" slot="label"></iLabel>
                            <iInput v-model="contractForm.substrateExw" type="number" placeholder="请输入载体费用"
                                :disabled="true" />
                        </iFormItem>
                        <!-- 载体税率 -->
                        <iFormItem prop="substrateImpDuty">
                            <iLabel :label="$t('载体税率(%)')" slot="label"></iLabel>
                            <iInput v-model="contractForm.substrateImpDuty" type="number" placeholder="请输入载体税率(%)"
                                :disabled="true" />
                        </iFormItem>
                        <!-- 载体管理费率 -->
                        <iFormItem prop="substrateHandling">
                            <iLabel :label="$t('载体管理费率(%)')" slot="label"></iLabel>
                            <iInput v-model="contractForm.substrateHandling" type="number" placeholder="请输入载体管理费率(%)"
                                :disabled="true" />
                        </iFormItem>
                        <!-- 贵金属管理费率 -->
                        <iFormItem prop="pgmHandling">
                            <iLabel :label="$t('贵金属管理费率(%)')" slot="label"></iLabel>
                            <iInput v-model="contractForm.pgmHandling" type="number" placeholder="请输入贵金属管理费率(%)"
                                :disabled="true" />
                        </iFormItem>
                        <!-- 制造费用 -->
                        <iFormItem prop="manufacture">
                            <iLabel :label="$t('制造费用')" slot="label"></iLabel>
                            <iInput v-model="contractForm.manufacture" type="number" placeholder="请输入制造费用"
                                :disabled="true" />
                        </iFormItem>
                        <!-- 运输费用 -->
                        <iFormItem prop="transport">
                            <iLabel :label="$t('运输费用')" slot="label"></iLabel>
                            <iInput v-model="contractForm.transport" type="number" placeholder="请输入运输费用" :disabled="true" />
                        </iFormItem>
                    </div>
                </div>
            </iFormGroup>

        </div>
        <span slot="footer" class="dialog-footer">
            <i-button @click="handleSave" :disabled="saveLoading">保存</i-button>
            <i-button @click="handleReset">重置</i-button>
            <i-button @click="handleCancel">取消</i-button>
        </span>


        <iDialog :title="language('XUANZELINGJIANHAO', '选择零件号')" :visible.sync="partType" append-to-body v-if="partType"
            width="85%" @close='closeDiolog'>
            <partNumber @close="saveClose"></partNumber>
        </iDialog>
    </div>
</template>

<script>
import { tipList,offsetList,avgPeriodList,materialDoseSourceList,partBalanceCountTypeList} from './data'
import partNumber from "./partNumber";
import { getRawMaterialNos } from '@/api/mtz/annualGeneralBudget/replenishmentManagement/supplementary/details';
import {
    getMtzSupplierList,//获取原材料牌号
} from '@/api/mtz/annualGeneralBudget/mtzReplenishmentOverview';
import {
    timeTransformation,
} from './util'
import {
    addPartMasterData,//维护MTZ零件主数据-新增
    pageAppRule,
    getDosageUnitList
} from '@/api/mtz/annualGeneralBudget/replenishmentManagement/mtzLocation/details';
import {
    queryPartsByCondition,
} from '@/api/mtz/annualGeneralBudget/replenishmentManagement/mtzLocation/firstDetails';
import {
    iButton,
    iMessage,
    iInput,
    iFormGroup,
    iText,
    iFormItem,
    iLabel,
    iSelect,
    iDatePicker,
    iDialog,
} from 'rise'
import { methodList } from "./data";

import inputCustom from '@/components/inputCustom'
export default {
    components: {
        iButton,
        iMessage,
        iInput,
        iFormGroup,
        iText,
        iFormItem,
        iLabel,
        iSelect,
        inputCustom,
        iDatePicker,
        iDialog,
        partNumber
    },
    props: {
        show: {
            type: Boolean
        },
        parent: {
            type: Object,
            default: () => {
                return {}
            }
        },
        listData: {//主数据中现有零件号数组
            type: Array,
        }
    },
    data() {
        var validator1 = (rule, value, callback) => {
            queryPartsByCondition({
                partNum: value
            }).then(res => {
                if (res.code == 200 && res.result) {
                    if (res.data == null) {
                        callback(new Error(this.language("LINGJIANHAOBUCUNZAI", '零件号不存在！')));
                    } else {
                        // iMessage.success(this.language("YANZHENGTONGGUO","验证通过！"))
                        callback();
                    }
                } else {
                    callback(new Error(this.language("QINGQIUCUOWU", '请求错误！')));
                }
            })
        };
        var validatePass4 = (rule, value, callback) => {
            if (
                timeTransformation(this.contractForm.startDate) >=
                timeTransformation(this.contractForm.endDate)
            ) {
                callback(new Error('有效期起不能大于等于有效期止'))
            } else {
                callback()
            }
        }
        return {
            avgPeriodList,
      offsetList,
      partBalanceCountTypeList,
      materialDoseSourceList,
            companyType: false,
            supplierList: [],//供应商编号
            contractForm: {
                assemblyPartnum: "",
                partUnit: "PC",
                priceUnit: 1,
                ruleVersion: '1',
                dosageMeasureUnit: 'KG'
            },
            dosageMeasureUnit: [],
            rules: {
                assemblyPartnum: [
                    { required: true, message: '请输入/选择', trigger: 'blur' },
                    { validator: validator1, trigger: 'blur' }
                ],
                ruleNo: [{ required: true, message: '请选择', trigger: 'blur' }],
                priceUnit: [{ required: true, message: '请输入', trigger: 'blur' }],
                // partUnit:[{ required: true, message: '请输入', trigger: 'blur' }],
                dosage: [{ required: true, message: '请输入', trigger: 'blur' }],
                dosageMeasureUnit: [{ required: true, message: '请输入', trigger: 'blur' }],
                // mark:[{ required: true, message: '请输入', trigger: 'blur' }],
                startDate: [
                    { required: true, message: '请选择', trigger: 'blur' },
                    { validator: validatePass4, trigger: 'blur' }
                ],
                endDate: [
                    { required: true, message: '请选择', trigger: 'blur' },
                    { validator: validatePass4, trigger: 'blur' }
                ]
            },
            materialDoseSourceList,
            compensationPeriod: [
                { code: 'A', message: '年度' },
                { code: 'H', message: '半年度' },
                { code: 'Q', message: '季度' },
                { code: 'M', message: '月度' },
            ],
            ruleNo: [],
            thresholdCompensationLogic: [
                {
                    code: "A",
                    message: "全额补差"
                }, {
                    code: "B",
                    message: "超额补差"
                }
            ],
            materialCode: [],
            partType: false,
            saveLoading: false,
            startDate:"",
            endDate:"",
            pickerOptionsStar: {
                disabledDate: time => {
                let starDateVal = this.startDate;
                if (starDateVal) {
                    return time.getTime() < new Date(starDateVal).getTime() - 86400000;
                }
                }
            },
            pickerOptionsEnd: {
                disabledDate: time => {
                let endDateVal = this.endDate;
                if (endDateVal) {
                    return time.getTime() > new Date(endDateVal).getTime();
                }
                }
            }
        }
    },
    created() {
        getRawMaterialNos({}).then(res => {
            this.materialCode = res.data;
        })
        getDosageUnitList({}).then(res => {
            this.dosageMeasureUnit = res.data;
        })
        pageAppRule({
            pageNo: 1,
            pageSize: 99999,
            mtzAppId: this.$route.query.mtzAppId || JSON.parse(sessionStorage.getItem('MtzLIst')).mtzAppId,
        }).then(res => {
            this.ruleNo = res.data;
        })
        getMtzSupplierList({}).then(res => {
            this.supplierList = res.data;
        })
    },
    computed: {
        mtzObject() {
            return this.$store.state.location.mtzObject;
        }
    },
    watch: {
        mtzObject(newVlue, oldValue) {
            // console.log(newVlue)
        }
    },
    methods: {
        partChange() {
            this.partType = true;
        },
        saveClose(val) {
            this.closeDiolog();
            if (val) {
                this.contractForm.assemblyPartnum = val.partNum;
                this.contractForm.partName = val.partNameZh;
            }
        },
        closeDiolog() {
            this.partType = false;
        },
        choiseGZ(val) {
            try {
                this.ruleNo.forEach(e => {
                    if (e.id == val) {
                        e.id = "";
                        this.contractForm.supplierId = e.supplierId.toString();
                        this.contractForm.sapCode = e.sapCode.toString();
                        this.contractForm.priceSource = e.source;
           
                        this.contractForm = Object.assign({ ...this.contractForm }, e);
                        if (e.priceMeasureUnit == "PC") {
                            this.contractForm.dosageMeasureUnit = "PC";
                            this.companyType = true;
                        } else {
                            this.contractForm.dosageMeasureUnit = "KG";
                            this.companyType = false;
                        }
                        this.contractForm.avgPeriod=e.avgPeriod?e.avgPeriod.toString():'';
                        this.contractForm.offsetMonth=e.offsetMonth?e.offsetMonth.toString():'';
                        console.log(this.contractForm)
                        this.startDate=this.contractForm.startDate
                        this.endDate=this.contractForm.endDate
                        throw new Error("EndIterative");
                    }
                });
            } catch (e) {
                if (e.message != "EndIterative") throw e;
            }
        },
        handleSave() {
            this.saveLoading = true;
            this.$refs['contractForm'].validate(async valid => {
                if (valid) {
                    addPartMasterData({
                        ...this.contractForm,
                        ttMtzAppId: this.$route.query.mtzAppId || JSON.parse(sessionStorage.getItem('MtzLIst')).mtzAppId
                    }).then(res => {
                        console.log(res);
                        if (res.code == 200) {
                            iMessage.success(this.language(res.desEn, res.desZh))
                            this.saveLoading = false;
                            this.$emit("close", "fresh")
                        } else {
                            this.saveLoading = false;
                            iMessage.error(this.language(res.desEn, res.desZh))
                        }
                    })
                    console.log("验证成功")
                } else {
                    this.saveLoading = false;
                    return false
                }
            })
        },
        handleReset() {
            this.contractForm = {
                assemblyPartnum: "",
                partUnit: "PC",
                priceUnit: 1,
                dosageMeasureUnit: 'KG'
            }
        },
        handleCancel() {
            this.$emit("close", "")
        }
    }

}
</script>

<style style="scss" scoped>

::v-deep.row4{
    margin-bottom:0!important;
}
::v-deep .dialog-footer {
    display: flex;
    justify-content: flex-end;
}

.row4 {
    display: inline-block !important;
    float: none;
}

.tip {
    display: block;
    margin: 10px 0;
    color: red;
    font-size: 14px;
}

.vue-select {
    width: 100%;
}

::v-deep .el-date-editor {
    width: 100%;
}

.search_btn_lj {
    position: absolute;
    right: 10px;
    top: 12px;
    font-size: 18px;
    cursor: pointer;
}

::v-deep .el-form-item__label {
    width: 13.5rem !important;
}
</style>
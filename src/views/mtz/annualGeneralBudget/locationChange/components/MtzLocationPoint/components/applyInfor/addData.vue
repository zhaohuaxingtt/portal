<!-- 维护MTZ零件主数据新增弹窗 -->
<template>
    <div style="padding-bottom:30px;">
         <div class="form-wrapper">
            <iFormGroup
            :row="2"
            :model="contractForm"
            :rules="rules"
            ref="contractForm"
            >
            <iFormItem prop="assemblyPartnum">
                <iLabel :label="language('LINGJIANHAO','零件号')" slot="label"></iLabel>
                <iInput
                v-model="contractForm.assemblyPartnum"
                type="text"
                placeholder="请输入规则编号"
                :disabled="disabled"
                />
            </iFormItem>
            <iFormItem prop="sapCode">
                <iLabel :label="language('GONGYINGSHANGBIANHAOMINGCHENG','供应商编号/名称')" :required="true" slot="label"></iLabel>
                <iInput
                v-model="contractForm.sapCode"
                type="text"
                placeholder="请输入规则编号"
                :disabled="disabled"
                />
            </iFormItem>
            <iFormItem prop="ruleNo">
                <iLabel :label="language('GUIZEBIANHAO','规则编号')" :required="true" slot="label"></iLabel>
                <iInput
                v-model="contractForm.ruleNo"
                type="text"
                placeholder="请输入规则编号"
                :disabled="disabled"
                />
            </iFormItem>
            <iFormItem prop="priceUnit">
                <iLabel :label="language('MEI','每')" :required="true" slot="label"></iLabel>
                <iInput
                v-model="contractForm.priceUnit"
                type="number"
                placeholder="请输入车型"
                :disabled="disabled"
                />
            </iFormItem>
            <iFormItem prop="partUnit">
                <iLabel :label="language('LINGJIANSHULIANGDANWEI','零件数量单位')" :required="true" slot="label"></iLabel>
                <iInput
                v-model="contractForm.partUnit"
                type="text"
                placeholder="请输入供应商编号"
                :disabled="disabled"
                />
            </iFormItem>
            <iFormItem prop="dosage">
                <iLabel :label="language('YONGLIANG','用量')" slot="label"></iLabel>
                <iInput
                v-model="contractForm.dosage"
                type="text"
                placeholder="请输入供应商名称"
                :disabled="disabled"
                />
            </iFormItem>
            <iFormItem prop="dosageMeasureUnit">
                <iLabel :label="language('YONGLIANGJILIANGDANEWI','用量计量单位')" slot="label"></iLabel>
                <iInput
                v-model="contractForm.dosageMeasureUnit"
                type="text"
                placeholder="请输入供应商名称"
                :disabled="disabled"
                />
            </iFormItem>
            <iFormItem prop="startDate">
                <iLabel :label="language('YOUXIAOQIQI','有效期起')" slot="label"></iLabel>
                <iDatePicker v-model="contractForm.startDate"
                            type="datetime"
                            >
                </iDatePicker>
            </iFormItem>
            <iFormItem prop="endDate">
                <iLabel :label="language('YOUXIAOQIZHI','有效期止')" slot="label"></iLabel>
                <iDatePicker v-model="contractForm.endDate"
                            type="datetime"
                            >
                </iDatePicker>
            </iFormItem>
            <iFormItem prop="mark">
                <iLabel :label="language('BEIZHU','备注')" slot="label"></iLabel>
                <iInput
                v-model="contractForm.mark"
                type="text"
                placeholder="请输入基价计量单位"
                :disabled="disabled"
                />
            </iFormItem>
            <iFormItem prop="materialCode">
                <iLabel :label="language('YUANCAILIAOPAIHAO','原材料牌号')" slot="label"></iLabel>
                <custom-select v-model="contractForm.materialCode"
                         :user-options="materialCode"
                         @change="materialBrand"
                         clearable
                         :placeholder="language('QINGXUANZE', '请选择')"
                         display-member="message"
                         value-member="code"
                         value-key="code">
                </custom-select>
            </iFormItem>
            <iFormItem prop="materialName">
                <iLabel :label="language('YUANCAILIAO','原材料')" slot="label"></iLabel>
                <iInput
                v-model="contractForm.materialName"
                :disabled="true"
                type="text"
                placeholder="请输入基价计量单位"
                />
            </iFormItem>

            <iFormItem prop="price">
                <iLabel :label="language('JIJIA','基价')" slot="label"></iLabel>
                <iInput
                v-model="contractForm.price"
                type="text"
                placeholder="请输入基价计量单位"
                :disabled="disabled"
                />
            </iFormItem>

            <iFormItem prop="priceMeasureUnit">
                <iLabel :label="language('JIJIAJILIANGDANWEI','基价计量单位')" slot="label"></iLabel>
                <iInput
                v-model="contractForm.priceMeasureUnit"
                type="text"
                placeholder="请输入基价计量单位"
                :disabled="disabled"
                />
            </iFormItem>

            <iFormItem prop="platinumPrice">
                <iLabel :label="language('BOJIJIA','铂基价')" slot="label"></iLabel>
                <iInput
                v-model="contractForm.platinumPrice"
                type="text"
                placeholder="请输入铂基价"
                :disabled="disabled"
                />
            </iFormItem>
            <iFormItem prop="platinumDosage">
                <iLabel :label="language('BOYONGLIANG','铂用量')" slot="label"></iLabel>
                <iInput
                v-model="contractForm.platinumDosage"
                type="text"
                placeholder="请输入铂用量"
                :disabled="disabled"
                />
            </iFormItem>
            <iFormItem prop="palladiumPrice">
                <iLabel :label="language('BAJIJIA','钯基价')" slot="label"></iLabel>
                <iInput
                v-model="contractForm.palladiumPrice"
                type="text"
                placeholder="请输入钯基价"
                :disabled="disabled"
                />
            </iFormItem>
            <iFormItem prop="palladiumDosage">
                <iLabel :label="language('BAYONGLIANG','钯用量')" slot="label"></iLabel>
                <iInput
                v-model="contractForm.palladiumDosage"
                type="text"
                placeholder="请输入钯用量"
                :disabled="disabled"
                />
            </iFormItem>
            <iFormItem prop="rhodiumPrice">
                <iLabel :label="language('LAOJIJIA','铑基价')" slot="label"></iLabel>
                <iInput
                v-model="contractForm.rhodiumPrice"
                type="text"
                placeholder="请输入铑基价"
                :disabled="disabled"
                />
            </iFormItem>
            <iFormItem prop="tcCurrence">
                <iLabel :label="language('HUOBI','货币')" slot="label"></iLabel>
                <iInput
                v-model="contractForm.tcCurrence"
                type="text"
                placeholder="请输入货币"
                :disabled="disabled"
                />
            </iFormItem>
            <iFormItem prop="tcExchangeRate">
                <iLabel :label="language('HUILV','汇率')" slot="label"></iLabel>
                <iInput
                v-model="contractForm.tcExchangeRate"
                type="text"
                placeholder="请输入汇率"
                :disabled="disabled"
                />
            </iFormItem>
            <iFormItem prop="priceSource">
                <iLabel :label="language('SHICHANGJIALAIYUAN','市场价来源')" slot="label"></iLabel>
                <iInput
                v-model="contractForm.priceSource"
                type="text"
                placeholder="请输入市场价来源"
                :disabled="disabled"
                />
            </iFormItem>
            <iFormItem prop="compensationRatio">
                <iLabel :label="language('BUCHAXISHU','补差系数')" slot="label"></iLabel>
                <iInput
                v-model="contractForm.compensationRatio"
                type="text"
                placeholder="请输入补差系数"
                :disabled="disabled"
                />
            </iFormItem>
            <iFormItem prop="compensationPeriod">
                <iLabel :label="language('BUCHAZHOUQI','补差周期')" slot="label"></iLabel>
                <iInput
                v-model="contractForm.compensationPeriod"
                type="text"
                placeholder="请输入补差周期"
                :disabled="disabled"
                />
            </iFormItem>
            <iFormItem prop="threshold">
                <iLabel :label="language('YUZHI','阈值')" slot="label"></iLabel>
                <iInput
                v-model="contractForm.threshold"
                type="text"
                placeholder="请输入阈值"
                :disabled="disabled"
                />
            </iFormItem>
            <iFormItem prop="thresholdCompensationLogic">
                <iLabel :label="language('YUZHIBUCHALUOJI','阈值补差逻辑')" slot="label"></iLabel>
                <custom-select v-model="contractForm.thresholdCompensationLogic"
                         :user-options="thresholdCompensationLogic"
                         clearable
                         :placeholder="language('QINGXUANZE', '请选择')"
                         display-member="message"
                         value-member="code"
                         value-key="code">
                </custom-select>
            </iFormItem>
            </iFormGroup>
        </div>
        <span slot="footer" class="dialog-footer">
            <i-button @click="handleSave">保存</i-button>
            <i-button @click="handleReset">重置</i-button>
            <i-button @click="handleCancel">取消</i-button>
        </span>
    </div>
</template>

<script>
import { getRawMaterialNos } from '@/api/mtz/annualGeneralBudget/replenishmentManagement/supplementary/details';
import {
  addPartMasterData,//维护MTZ零件主数据-新增
} from '@/api/mtz/annualGeneralBudget/replenishmentManagement/mtzLocation/details';
import {
  iButton,
  iMessage,
  iInput,
  iFormGroup,
  iText,
  iFormItem,
  iLabel,
  iSelect,
  iDatePicker
} from 'rise'
import inputCustom from '@/components/inputCustom'
export default {components: {
    iButton,
    iMessage,
    iInput,
    iFormGroup,
    iText,
    iFormItem,
    iLabel,
    iSelect,
    inputCustom,
    iDatePicker
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
    }
  },
  data() {
    return {
        contractForm: {},
        rules: {
            // name: [{ required: true, message: '请输入中文名', trigger: 'blur' }],
            // nameEn: [{ required: true, message: '请输入英文名', trigger: 'blur' }],
            // orderNum: [{ required: true, message: '请输入排序', trigger: 'blur' }],
            // describe: [{ required: true, message: '请输入描述', trigger: 'blur' }]
        },
        thresholdCompensationLogic:[
            {
                code:"A",
                message:"全额补差"
            },{
                code:"B",
                message:"超额补差"
            }
        ],
        materialCode:[],
    }
  },
  created(){
    getRawMaterialNos({}).then(res=>{
        this.materialCode = res.data;
    })
  },
  computed:{
      mtzObject(){
        return this.$store.state.location.mtzObject;
      }
  },
  watch: {
    mtzObject(newVlue,oldValue){
      // console.log(newVlue)
    }
  },
  methods: {
    materialBrand(val){
        console.log(val)
    },
    handleSave() {
        addPartMasterData({
            ...this.contractForm,
            ttMtzAppId:this.mtzObject.mtzAppId || this.$route.query.mtzAppId
        }).then(res=>{
            console.log(res);
            this.$emit("close","fresh")
        })
    //   this.$refs['contractForm'].validate(async valid => {
    //     if (valid) {
        //   console.log("验证成功")
        // } else {
        //   return false
        // }
    //   })

    },
    handleReset() {
      this.contractForm = {}
    },
    handleCancel(){
        this.$emit("close","")
    }
  }

}
</script>

<style style="scss" scoped>
::v-deep .dialog-footer{
    display: flex;
    justify-content: flex-end;
}
.vue-select{
    width:100%;
}
::v-deep .el-date-editor{
    width:100%;
}
</style>
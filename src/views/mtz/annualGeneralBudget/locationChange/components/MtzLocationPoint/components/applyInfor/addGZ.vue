<!-- 维护MTZ原材料规则新增弹窗 -->
<template>
    <div style="padding-bottom:30px;">
         <div class="form-wrapper">
            <iFormGroup
            :row="2"
            :model="contractForm"
            :rules="rules"
            ref="contractForm"
            >
            <!-- <iFormItem prop="ruleNo">
                <iLabel :label="language('GUIZEBIANHAO','规则编号')" slot="label"></iLabel>
                <iInput
                v-model="contractForm.ruleNo"
                type="text"
                placeholder="请输入规则编号"
                :disabled="disabled"
                />
            </iFormItem> -->
            <iFormItem prop="effectFlag">
                <iLabel :label="language('SHIFOUSHENGXIAO','是否生效')" slot="label"></iLabel>
                <custom-select v-model="contractForm.effectFlag"
                         :user-options="effectFlag"
                         clearable
                         :placeholder="language('QINGXUANZE', '请选择')"
                         display-member="message"
                         value-member="code"
                         value-key="code">
                </custom-select>
            </iFormItem>
            <iFormItem prop="materialGroup">
                <iLabel :label="language('MTZCAILIAOZU','MTZ-材料组')" slot="label"></iLabel>
                <custom-select v-model="contractForm.materialGroup"
                         :user-options="materialGroup"
                         clearable
                         :placeholder="language('QINGXUANZE', '请选择')"
                         display-member="materialGroupNameZh"
                         value-member="materialGroupCode"
                         value-key="materialGroupCode">
                </custom-select>
            </iFormItem>
            <iFormItem prop="carline">
                <iLabel :label="language('CHEXING','车型')" slot="label"></iLabel>
                <iInput
                v-model="contractForm.carline"
                type="number"
                placeholder="请输入车型"
                :disabled="disabled"
                />
            </iFormItem>
            <iFormItem prop="supplierId">
                <iLabel :label="language('GONGYINGSHANGBIANHAO','供应商编号')" slot="label"></iLabel>
                <iInput
                v-model="contractForm.supplierId"
                type="text"
                placeholder="请输入供应商编号"
                :disabled="disabled"
                />
            </iFormItem>
            <iFormItem prop="trueCompMoney">
                <iLabel :label="language('GONGYINGSHANGMINGCHENG','供应商名称')" slot="label"></iLabel>
                <iInput
                v-model="contractForm.trueCompMoney"
                type="text"
                placeholder="请输入供应商名称"
                :disabled="disabled"
                />
            </iFormItem>
            <iFormItem prop="materialCode">
                <iLabel :label="language('YUANCAILIAOPAIHAO','原材料牌号')" slot="label"></iLabel>
                <custom-select v-model="contractForm.materialCode"
                         :user-options="materialCode"
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
                type="text"
                placeholder="请输入原材料"
                :disabled="disabled"
                />
            </iFormItem>
            <iFormItem prop="price">
                <iLabel :label="language('JIJIA','基价')" slot="label"></iLabel>
                <iInput
                v-model="contractForm.price"
                type="text"
                placeholder="请输入基价"
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
            <iFormItem prop="source">
                <iLabel :label="language('SHICHANGJIALAIYUAN','市场价来源')" slot="label"></iLabel>
                <iInput
                v-model="contractForm.source"
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
                <iInput
                v-model="contractForm.thresholdCompensationLogic"
                type="text"
                placeholder="请输入阈值补差逻辑"
                :disabled="disabled"
                />
            </iFormItem>
            <iFormItem prop="startDate">
                <iLabel :label="language('YOUXIAOQIQI','有效期起')" slot="label"></iLabel>
                <iInput
                v-model="contractForm.startDate"
                type="text"
                placeholder="请选择有效期起"
                :disabled="disabled"
                />
            </iFormItem>
            <iFormItem prop="endDate">
                <iLabel :label="language('YOUXIAOQIZHI','有效期止')" slot="label"></iLabel>
                <iInput
                v-model="contractForm.endDate"
                type="text"
                placeholder="请选择有效期止"
                :disabled="disabled"
                />
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
import {
  addAppRule,//维护MTZ原材料规则-新增
} from '@/api/mtz/annualGeneralBudget/replenishmentManagement/mtzLocation/details';
import { 
    getRawMaterialNos
} from '@/api/mtz/annualGeneralBudget/replenishmentManagement/supplementary/details';
import {
  fetchRemoteMtzMaterial,//查询MTZ材料组
} from '@/api/mtz/annualGeneralBudget/annualBudgetEdit';
import {
  iButton,
  iMessage,
  iInput,
  iFormGroup,
  iText,
  iFormItem,
  iLabel,
  iSelect
} from 'rise'
// import inputCustom from '@/components/inputCustom'
export default {components: {
    iButton,
    iMessage,
    iInput,
    iFormGroup,
    iText,
    iFormItem,
    iLabel,
    iSelect,
    // inputCustom
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
            // code: [{ required: true, message: '请输入编码', trigger: 'blur' }],
            // name: [{ required: true, message: '请输入中文名', trigger: 'blur' }],
            // nameEn: [{ required: true, message: '请输入英文名', trigger: 'blur' }],
            // orderNum: [{ required: true, message: '请输入排序', trigger: 'blur' }],
            // describe: [{ required: true, message: '请输入描述', trigger: 'blur' }]
        },
        effectFlag:[
            {
                code:0,
                message:"无效"
            },{
                code:1,
                message:"有效"
            }
        ],
        materialCode:[],
        materialGroup:[],
    }
  },
  created(){
    getRawMaterialNos({}).then(res=>{
        this.materialCode = res.data;
    })
    fetchRemoteMtzMaterial({}).then(res=>{
        this.materialGroup = res.data;
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
    handleSave() {
    //   this.$refs['contractForm'].validate(async valid => {
        // if (valid) {
            addAppRule({
                ...this.contractForm,
                ttMtzAppId:this.mtzObject.mtzAppId || this.$route.query.mtzAppId || JSON.parse(sessionStorage.getItem('MtzLIst')).mtzAppId
            }).then(res=>{
                if(res.code == 200 && res.result){
                    iMessage.success(res.desZh)
                    this.$emit("addDialogGZ","")
                }
            })
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
</style>
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
            <iFormItem prop="effectFlag">
                <iLabel :label="language('SHIFOUSHENGXIAO','是否生效')" slot="label" :required="true"></iLabel>
                <i-select v-model="contractForm.effectFlag"
                         clearable
                         :placeholder="language('QINGSHURU', '请输入')"
                        >
                    <el-option
                        v-for="item in effectFlag"
                        :key="item.code"
                        :label="item.message"
                        :value="item.code">
                    </el-option>
                </i-select>
            </iFormItem>
            <iFormItem prop="materialGroup">
                <iLabel :label="language('MTZCAILIAOZU','MTZ-材料组')" slot="label" :required="true"></iLabel>
                <custom-select v-model="contractForm.materialGroup"
                         :user-options="materialGroup"
                         clearable
                         filterable
                         :placeholder="language('QINGXUANZE', '请选择')"
                         display-member="materialGroupNameZh"
                         value-member="materialGroupCode"
                         value-key="materialGroupCode">
                </custom-select>
            </iFormItem>
            <iFormItem prop="carline">
                <iLabel :label="language('CHEXING','车型')" slot="label" :required="true"></iLabel>
                <custom-select v-model="contractForm.carline"
                         :user-options="carline"
                         clearable
                         multiple
                         filterable
                         :placeholder="language('QINGXUANZE', '请选择')"
                         display-member="materialGroupNameZh"
                         value-member="materialGroupCode"
                         value-key="materialGroupCode">
                </custom-select>
            </iFormItem>
            <iFormItem prop="supplierId">
                <iLabel :label="language('GONGYINGSHANGBIANHAO','供应商编号')" slot="label" :required="true"></iLabel>
                <i-select v-model="contractForm.supplierId"
                         clearable
                         filterable
                         :placeholder="language('QINGSHURU', '请输入')"
                         @change="supplierBH"
                        >
                    <el-option
                        v-for="item in supplierList"
                        :key="item.code"
                        :label="item.code"
                        :value="item.code">
                    </el-option>
                </i-select>
            </iFormItem>
            <iFormItem prop="supplierName">
                <iLabel :label="language('GONGYINGSHANGMINGCHENG','供应商名称')" slot="label" :required="true"></iLabel>
                <i-select v-model="contractForm.supplierName"
                         clearable
                         filterable
                         :placeholder="language('QINGSHURU', '请输入')"
                         @change="supplierNC"
                        >
                    <el-option
                        v-for="item in supplierList"
                        :key="item.message"
                        :label="item.message"
                        :value="item.message">
                    </el-option>
                </i-select>
            </iFormItem>
            <iFormItem prop="materialCode">
                <iLabel :label="language('YUANCAILIAOPAIHAO','原材料牌号')" slot="label" :required="true"></iLabel>
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
                <iLabel :label="language('YUANCAILIAO','原材料')" slot="label" :required="true"></iLabel>
                <iInput
                v-model="contractForm.materialName"
                type="text"
                placeholder="请输入原材料"
                :disabled="true"
                />
            </iFormItem>
            <iFormItem prop="price">
                <iLabel :label="language('JIJIA','基价')" slot="label" :required="true"></iLabel>
                <iInput
                v-model="contractForm.price"
                type="text"
                placeholder="请输入基价"
                :disabled="disabled"
                />
            </iFormItem>
            <iFormItem prop="priceMeasureUnit">
                <iLabel :label="language('JIJIAJILIANGDANWEI','基价计量单位')" slot="label" :required="true"></iLabel>
                <custom-select v-model="contractForm.priceMeasureUnit"
                         :user-options="priceMeasureUnit"
                         clearable
                         :placeholder="language('QINGXUANZE', '请选择')"
                         display-member="message"
                         value-member="code"
                         value-key="code">
                </custom-select>
            </iFormItem>
            <iFormItem prop="platinumPrice">
                <iLabel :label="language('BOJIJIA','铂基价')" slot="label" :required="true"></iLabel>
                <iInput
                v-model="contractForm.platinumPrice"
                type="text"
                placeholder="请输入铂基价"
                :disabled="disabled"
                />
            </iFormItem>
            <iFormItem prop="platinumDosage">
                <iLabel :label="language('BOYONGLIANG','铂用量')" slot="label" :required="true"></iLabel>
                <iInput
                v-model="contractForm.platinumDosage"
                type="text"
                placeholder="请输入铂用量"
                :disabled="disabled"
                />
            </iFormItem>
            <iFormItem prop="palladiumPrice">
                <iLabel :label="language('BAJIJIA','钯基价')" slot="label" :required="true"></iLabel>
                <iInput
                v-model="contractForm.palladiumPrice"
                type="text"
                placeholder="请输入钯基价"
                :disabled="disabled"
                />
            </iFormItem>
            <iFormItem prop="palladiumDosage">
                <iLabel :label="language('BAYONGLIANG','钯用量')" slot="label" :required="true"></iLabel>
                <iInput
                v-model="contractForm.palladiumDosage"
                type="text"
                placeholder="请输入钯用量"
                :disabled="disabled"
                />
            </iFormItem>
            <iFormItem prop="rhodiumPrice">
                <iLabel :label="language('LAOJIJIA','铑基价')" slot="label" :required="true"></iLabel>
                <iInput
                v-model="contractForm.rhodiumPrice"
                type="text"
                placeholder="请输入铑基价"
                :disabled="disabled"
                />
            </iFormItem>
            <iFormItem prop="rhodiumDosage">
                <iLabel :label="language('LAOYONGLIANG','铑用量')" slot="label" :required="true"></iLabel>
                <iInput
                v-model="contractForm.rhodiumDosage"
                type="text"
                placeholder="请输入铑用量"
                :disabled="disabled"
                />
            </iFormItem>
            <iFormItem prop="tcCurrence">
                <iLabel :label="language('HUOBI','货币')" slot="label" :required="true"></iLabel>
                <custom-select v-model="contractForm.tcCurrence"
                         :user-options="tcCurrence"
                         clearable
                         :placeholder="language('QINGXUANZE', '请选择')"
                         display-member="message"
                         value-member="code"
                         value-key="code">
                </custom-select>
            </iFormItem>
            <iFormItem prop="tcExchangeRate">
                <iLabel :label="language('HUILV','汇率')" slot="label" :required="true"></iLabel>
                <iInput
                v-model="contractForm.tcExchangeRate"
                type="text"
                placeholder="请输入汇率"
                :disabled="disabled"
                />
            </iFormItem>
            <iFormItem prop="source">
                <iLabel :label="language('SHICHANGJIALAIYUAN','市场价来源')" slot="label" :required="true"></iLabel>
                <iInput
                v-model="contractForm.source"
                type="text"
                placeholder="请输入市场价来源"
                :disabled="true"
                />
            </iFormItem>
            <iFormItem prop="compensationRatio">
                <iLabel :label="language('BUCHAXISHU','补差系数')" slot="label" :required="true"></iLabel>
                <iInput
                v-model="contractForm.compensationRatio"
                type="text"
                placeholder="请输入补差系数"
                :disabled="disabled"
                />
            </iFormItem>
            <iFormItem prop="compensationPeriod">
                <iLabel :label="language('BUCHAZHOUQI','补差周期')" slot="label" :required="true"></iLabel>
                <custom-select v-model="contractForm.compensationPeriod"
                         :user-options="compensationPeriod"
                         clearable
                         :placeholder="language('QINGXUANZE', '请选择')"
                         display-member="message"
                         value-member="code"
                         value-key="code">
                </custom-select>
            </iFormItem>
            <iFormItem prop="threshold">
                <iLabel :label="language('YUZHI','阈值')" slot="label" :required="true"></iLabel>
                <iInput
                v-model="contractForm.threshold"
                type="text"
                placeholder="请输入阈值"
                :disabled="disabled"
                />
            </iFormItem>
            <iFormItem prop="thresholdCompensationLogic">
                <iLabel :label="language('YUZHIBUCHALUOJI','阈值补差逻辑')" slot="label" :required="true"></iLabel>
                <custom-select v-model="contractForm.thresholdCompensationLogic"
                         :user-options="thresholdCompensationLogic"
                         clearable
                         :placeholder="language('QINGXUANZE', '请选择')"
                         display-member="message"
                         value-member="code"
                         value-key="code">
                </custom-select>
            </iFormItem>
            <iFormItem prop="startDate">
                <iLabel :label="language('YOUXIAOQIQI','有效期起')" slot="label" :required="true"></iLabel>
                <iDatePicker v-model="contractForm.startDate"
                            type="date"
                            >
                </iDatePicker>
            </iFormItem>
            <iFormItem prop="endDate">
                <iLabel :label="language('YOUXIAOQIZHI','有效期止')" slot="label" :required="true"></iLabel>
                <iDatePicker v-model="contractForm.endDate"
                            type="date"
                            >
                </iDatePicker>
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
  getMtzSupplierList,//维护MTZ原材料规则-新增
} from '@/api/mtz/annualGeneralBudget/mtzReplenishmentOverview';
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
  iSelect,
  iDatePicker
} from 'rise'
export default {components: {
    iButton,
    iMessage,
    iInput,
    iFormGroup,
    iText,
    iFormItem,
    iLabel,
    iSelect,
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
        thresholdCompensationLogic:[//阈值补差逻辑,全额补差/超额补差

        ],
        compensationPeriod:[//补差周期 年/半年/季度/月

        ],
        tcCurrence:[//货币

        ],
        priceMeasureUnit:[//基价计量单位

        ],
        supplierList:[],//供应商
        carline:[],//车型
        contractForm: {
            effectFlag:0,
            tcExchangeRate:1,
            compensationRatio:1,
            threshold:0,
            endDate:"2999-12-31"
        },
        rules: {
            effectFlag: [{ required: true, message: '请选择', trigger: 'blur' }],
            materialGroup: [{ required: true, message: '请选择', trigger: 'blur' }],
            carline: [{ required: true, message: '请选择', trigger: 'blur' }],
            supplierId: [{ required: true, message: '请选择', trigger: 'blur' }],
            supplierName: [{ required: true, message: '请选择', trigger: 'blur' }],
            materialCode: [{ required: true, message: '请选择', trigger: 'blur' }],
            materialName: [{ required: true, message: '请选择', trigger: 'blur' }],
            price: [{ required: true, message: '请输入', trigger: 'blur' }],
            priceMeasureUnit: [{ required: true, message: '请选择', trigger: 'blur' }],
            platinumPrice: [{ required: true, message: '请输入', trigger: 'blur' }],
            platinumDosage: [{ required: true, message: '请输入', trigger: 'blur' }],
            palladiumPrice: [{ required: true, message: '请输入', trigger: 'blur' }],
            palladiumDosage: [{ required: true, message: '请输入', trigger: 'blur' }],
            rhodiumPrice: [{ required: true, message: '请输入', trigger: 'blur' }],
            rhodiumDosage: [{ required: true, message: '请输入', trigger: 'blur' }],
            tcCurrence: [{ required: true, message: '请选择', trigger: 'blur' }],
            tcExchangeRate: [{ required: true, message: '请输入', trigger: 'blur' }],
            source: [{ required: true, message: '请输入', trigger: 'blur' }],
            compensationRatio: [{ required: true, message: '请输入', trigger: 'blur' }],
            compensationPeriod: [{ required: true, message: '请选择', trigger: 'blur' }],
            threshold: [{ required: true, message: '请输入', trigger: 'blur' }],
            thresholdCompensationLogic: [{ required: true, message: '请选择', trigger: 'blur' }],
            startDate: [{ required: true, message: '请选择', trigger: 'blur' }],
            endDate: [{ required: true, message: '请选择', trigger: 'blur' }],
        },
        effectFlag:[
            {
                code:0,
                message:"否"
            },{
                code:1,
                message:"是"
            }
        ],
        materialCode:[],
        materialGroup:[],

        supplierType1:false,
        supplierType2:false,
    }
  },
  created(){
    getMtzSupplierList({}).then(res=>{
        this.supplierList = res.data;
    })
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
    supplierBH(value){
        if(this.supplierType2 == true) return false;
        this.supplierType1 = true;
        try{
            this.supplierList.forEach(e => {
                if(e.code == value){
                    console.log(e.message,1111111)
                    console.log(value,1111111)
                    this.contractForm.supplierName = e.message;
                    this.contractForm.supplierId = value;
                    setTimeout(() => {
                        this.supplierType1 = false;
                    }, 100);
                    throw new Error("EndIterative");
                }
            });
        }catch(e){
            if(e.message != "EndIterative") throw e;
        }
    },
    supplierNC(value){
        if(this.supplierType1 == true) return false;
        this.supplierType2 = true;
        try{
            this.supplierList.forEach(e => {
                if(e.message == value){
                    console.log(e.code,2222222)
                    console.log(value,2222222)
                    this.contractForm.supplierName = value;
                    this.contractForm.supplierId = e.code;
                    setTimeout(() => {
                        this.supplierType2 = false;
                    }, 100);
                    throw new Error("EndIterative");
                }
            });
        }catch(e){
            if(e.message != "EndIterative") throw e;
        }
    },
    handleSave() {
      this.$refs['contractForm'].validate(async valid => {
        if (valid) {
            addAppRule({
                ...this.contractForm,
                ttMtzAppId:this.$route.query.mtzAppId || JSON.parse(sessionStorage.getItem('MtzLIst')).mtzAppId
            }).then(res=>{
                if(res.code == 200 && res.result){
                    iMessage.success(res.desZh)
                    this.$emit("addDialogGZ","")
                }
            })
          console.log("验证成功")
        } else {
          return false
        }
      })
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
    width:100%!important;
}
</style>
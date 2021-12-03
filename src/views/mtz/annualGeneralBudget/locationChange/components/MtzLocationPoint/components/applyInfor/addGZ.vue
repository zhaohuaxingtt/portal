<!-- 维护MTZ原材料规则新增弹窗 -->
<template>
    <div style="padding-bottom:30px;">
        <!-- :rules="metalType?rules1:rules2" -->
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
                <i-select v-model="contractForm.materialGroup"
                         clearable
                         :placeholder="language('QINGSHURU', '请输入')"
                        >
                    <el-option
                        v-for="item in materialGroup"
                        :key="item.materialGroupCode"
                        :label="item.materialGroupNameZh"
                        :value="item.materialGroupCode">
                    </el-option>
                </i-select>
            </iFormItem>
            <iFormItem prop="carline">
                <iLabel :label="language('CHEXING','车型')" slot="label" :required="true"></iLabel>
                <custom-select v-model="carlineNumber"
                         :user-options="carline"
                         clearable
                         multiple
                         filterable
                         :placeholder="language('QINGXUANZE', '请选择')"
                         display-member="modelNameZh"
                         value-member="modelNameZh"
                         value-key="modelNameZh">
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
                        :label="item.codeMessage"
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
                <i-select v-model="contractForm.materialCode"
                         clearable
                         @change="MaterialGrade"
                         :placeholder="language('QINGSHURU', '请输入')"
                        >
                    <el-option
                        v-for="item in materialCode"
                        :key="item.code"
                        :label="item.codeMessage"
                        :value="item.code">
                    </el-option>
                </i-select>
            </iFormItem>
            <iFormItem prop="materialName">
                <iLabel :label="language('YUANCAILIAO','原材料')" slot="label" :required="true"></iLabel>
                <el-input
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
                type="number"
                placeholder="请输入基价"
                :disabled="metalType"
                />
            </iFormItem>
            <iFormItem prop="priceMeasureUnit">
                <iLabel :label="language('JIJIAJILIANGDANWEI','基价计量单位')" slot="label" :required="true"></iLabel>
                <el-input
                v-model="contractForm.priceMeasureUnit"
                type="text"
                placeholder="请输入"
                :disabled="true"
                />
            </iFormItem>
            <iFormItem prop="tcCurrence">
                <iLabel :label="language('HUOBI','货币')" slot="label" :required="true"></iLabel>
                <custom-select v-model="contractForm.tcCurrence"
                         :user-options="tcCurrence"
                         clearable
                         :placeholder="language('QINGXUANZE', '请选择')"
                         display-member="code"
                         value-member="code"
                         value-key="code">
                </custom-select>
            </iFormItem>
            <iFormItem prop="tcExchangeRate">
                <iLabel :label="language('HUILV','汇率')" slot="label" :required="true"></iLabel>
                <iInput
                v-model="contractForm.tcExchangeRate"
                type="number"
                placeholder="请输入汇率"
                :disabled="disabled"
                />
            </iFormItem>
            <iFormItem prop="source">
                <iLabel :label="language('SHICHANGJIALAIYUAN','市场价来源')" slot="label" :required="true"></iLabel>
                <i-select v-model="contractForm.source"
                    clearable
                    :placeholder="language('QINGXUANZE', '请选择')"
                    >
                    <el-option
                        v-for="item in getMtzMarketSourceList"
                        :key="item.code"
                        :label="item.message"
                        :value="item.code">
                    </el-option>
                </i-select>
            </iFormItem>
            <iFormItem prop="compensationRatio">
                <iLabel :label="language('BUCHAXISHU','补差系数')" slot="label" :required="true"></iLabel>
                <iInput
                v-model="contractForm.compensationRatio"
                type="number"
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
                type="number"
                placeholder="请输入阈值"
                :disabled="disabled"
                />
            </iFormItem>
            <iFormItem prop="thresholdCompensationLogic">
                <iLabel :label="language('YUZHIBUCHALUOJI','阈值补差逻辑')" slot="label" :required="true"></iLabel>
                <i-select v-model="contractForm.thresholdCompensationLogic"
                    clearable
                    :placeholder="language('QINGXUANZE', '请选择')"
                    >
                    <el-option
                        v-for="item in thresholdCompensationLogic"
                        :key="item.code"
                        :label="item.message"
                        :value="item.code">
                    </el-option>
                </i-select>
            </iFormItem>
            <iFormItem prop="startDate">
                <iLabel :label="language('YOUXIAOQIQI','有效期起')" slot="label" :required="true"></iLabel>
                <iDatePicker v-model="contractForm.startDate"
                            type="date"
                            value-format="yyyy-MM-dd"
                            >
                </iDatePicker>
            </iFormItem>
            <iFormItem prop="endDate">
                <iLabel :label="language('YOUXIAOQIZHI','有效期止')" slot="label" :required="true"></iLabel>
                <iDatePicker v-model="contractForm.endDate"
                            type="date"
                            value-format="yyyy-MM-dd"
                            >
                </iDatePicker>
            </iFormItem>
            
            <iFormItem prop="preciousMetalDosageUnit" v-if="metalType">
                <iLabel :label="language('GUIJINSHUYONGLIANGJIJIADANWEI','贵金属用量&基价单位')" slot="label" :required="true"></iLabel>
                <i-select v-model="contractForm.preciousMetalDosageUnit"
                    clearable
                    :placeholder="language('QINGXUANZE', '请选择')"
                    >
                    <el-option
                        v-for="item in getPreciousMetalDosageUnit"
                        :key="item.code"
                        :label="item.code"
                        :value="item.code">
                    </el-option>
                </i-select>
            </iFormItem>

            <iFormItem prop="platinumPrice">
                <iLabel :label="language('BOJIJIA','铂基价')" slot="label" icons="iconxinxitishi" tip="M01006002-Pt"></iLabel>
                <iInput
                v-model="contractForm.platinumPrice"
                type="number"
                placeholder="请输入铂基价"
                :disabled="!metalType"
                @change="jijiaCompute"
                />
            </iFormItem>
            <iFormItem prop="platinumDosage">
                <iLabel :label="language('BOYONGLIANG','铂用量')" slot="label" icons="iconxinxitishi" tip="M01006002-Pt"></iLabel>
                <iInput
                v-model="contractForm.platinumDosage"
                type="number"
                placeholder="请输入铂用量"
                :disabled="!metalType"
                @change="jijiaCompute"
                />
            </iFormItem>
            <iFormItem prop="palladiumPrice">
                <iLabel :label="language('BAJIJIA','钯基价')" slot="label" icons="iconxinxitishi" tip="M01006002-Pd"></iLabel>
                <iInput
                v-model="contractForm.palladiumPrice"
                type="number"
                placeholder="请输入钯基价"
                :disabled="!metalType"
                @change="jijiaCompute"
                />
            </iFormItem>
            <iFormItem prop="palladiumDosage">
                <iLabel :label="language('BAYONGLIANG','钯用量')" slot="label" icons="iconxinxitishi" tip="M01006002-Pd"></iLabel>
                <iInput
                v-model="contractForm.palladiumDosage"
                type="number"
                placeholder="请输入钯用量"
                :disabled="!metalType"
                @change="jijiaCompute"
                />
            </iFormItem>
            <iFormItem prop="rhodiumPrice">
                <iLabel :label="language('LAOJIJIA','铑基价')" slot="label" icons="iconxinxitishi" tip="M01006002-Rh"></iLabel>
                <iInput
                v-model="contractForm.rhodiumPrice"
                type="number"
                placeholder="请输入铑基价"
                :disabled="!metalType"
                @change="jijiaCompute"
                />
            </iFormItem>
            <iFormItem prop="rhodiumDosage">
                <iLabel :label="language('LAOYONGLIANG','铑用量')" slot="label" icons="iconxinxitishi" tip="M01006002-Rh"></iLabel>
                <iInput
                v-model="contractForm.rhodiumDosage"
                type="number"
                placeholder="请输入铑用量"
                :disabled="!metalType"
                @change="jijiaCompute"
                />
            </iFormItem>
            </iFormGroup>
        </div>
        <span slot="footer" class="dialog-footer">
            <!-- <span class="time_color" v-if="timeShow">重叠时间段为：{{startTime}}&nbsp;&nbsp;~&nbsp;&nbsp;{{endTime}}</span> -->
            <i-button @click="handleSave">保存</i-button>
            <i-button @click="handleReset">重置</i-button>
            <i-button @click="handleCancel">取消</i-button>
        </span>

    </div>
</template>

<script>
import {
  getMtzSupplierList,//获取原材料牌号
} from '@/api/mtz/annualGeneralBudget/mtzReplenishmentOverview';
import {
  cartypePaged,//车型
  currencyDict,
} from '@/api/mtz/annualGeneralBudget/replenishmentManagement/mtzLocation/firstDetails';
import {
  addAppRule,//维护MTZ原材料规则-新增
  checkPreciousMetal,
  queryMaterialList,
  getMtzMarketSourceList,
  getPreciousMetalDosageUnit
} from '@/api/mtz/annualGeneralBudget/replenishmentManagement/mtzLocation/details';
import { 
    getRawMaterialNos
} from '@/api/mtz/annualGeneralBudget/replenishmentManagement/supplementary/details';
import {
  fetchRemoteMtzMaterial,//查询MTZ材料组
} from '@/api/mtz/annualGeneralBudget/annualBudgetEdit';
import { isNumber,timeCoincide,timeTransformation,Mul,numAdd,formatDecimal } from "./util";

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
    iDatePicker,
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
    resetNum:{
        type: Boolean,
    },
    dataObject:{
        type: Object,
        default: () => {
            return {}
        }
    }
  },
  data() {
    var validatePass1 = (rule, value, callback) => {//非负数字
        if (value < 0) {
            callback(new Error('不能为负数'));
        }else{
            callback();
        }
    };
    var validatePass2 = (rule, value, callback) => {//阈值
        if(value.toString().split(".")[1] !== undefined){
            if (value.toString().split(".")[1].length>4) {
                callback(new Error('最多输入小数点后4位'));
            }else{
                callback();
            }
        }else{
            callback();
        }
    };
    var validatePass3 = (rule, value, callback) => {//用量
        if(value == "" || value == undefined){
            callback();
        }else{
            if(value.toString().split(".")[1] !== undefined){
                if (value.toString().split(".")[1].length>6) {
                    callback(new Error('最多输入小数点后6位'));
                }else{
                    callback();
                }
            }else{
                callback();
            }
        }
    }
    var validatePass4 = (rule, value, callback) => {
        if(timeTransformation(this.contractForm.startDate)>=timeTransformation(this.contractForm.endDate)){
            callback(new Error('有效期起不能大于等于有效期止'));
        }else{
            callback();
        }
    }
    return {
        thresholdCompensationLogic:[//阈值补差逻辑,全额补差/超额补差
            {
                code:"A",
                message:"全额补差"
            },{
                code:"B",
                message:"超额补差"
            }
        ],
        compensationPeriod:[//补差周期 年/半年/季度/月
            {
                code:"A",
                message:"年度"
            },{
                code:"H",
                message:"半年度"
            },{
                code:"Q",
                message:"季度"
            },{
                code:"M",
                message:"月度"
            },
        ],
        tcCurrence:[],
        supplierList:[],//供应商
        carline:[],//车型
        contractForm: {
            thresholdCompensationLogic:"A",
            effectFlag:0,
            tcExchangeRate:1,
            compensationRatio:1,
            materialName:'',
            threshold:0,
            endDate:"2999-12-31",
            source:"",
            price:"",
            carline:"",
            priceMeasureUnit:"",
            platinumPrice:'',
            platinumDosage:'',
            palladiumDosage:'',
            rhodiumPrice:'',
            rhodiumDosage:'',
            palladiumPrice:"",
        },
        carlineNumber:[],
        rules: {
            effectFlag: [{ required: true, message: '请选择', trigger: 'blur' }],
            materialGroup: [{ required: true, message: '请选择', trigger: 'blur' }],
            carline: [{ required: true, message: '请选择', trigger: 'blur' }],
            supplierId: [{ required: true, message: '请选择', trigger: 'blur' }],
            supplierName: [{ required: true, message: '请选择', trigger: 'blur' }],
            materialCode: [{ required: true, message: '请选择', trigger: 'blur' }],
            materialName: [{ required: true, message: '请选择', trigger: 'blur' }],
            price: [{ required: true, message: '请输入或补全铂钯铑基价和用量', trigger: 'blur' }],//基价
            priceMeasureUnit: [{ required: true, message: '请选择', trigger: 'blur' }],
            platinumPrice:[
                { validator:validatePass3, trigger: 'blur' }
            ],
            platinumDosage:[
                { validator:validatePass3, trigger: 'blur' }
            ],
            palladiumPrice:[
                { validator:validatePass3, trigger: 'blur' }
            ],
            palladiumDosage:[
                { validator:validatePass3, trigger: 'blur' }
            ],
            rhodiumPrice:[
                { validator:validatePass3, trigger: 'blur' }
            ],
            rhodiumDosage:[
                { validator:validatePass3, trigger: 'blur' }
            ],
            preciousMetalDosageUnit:[{ required: true, message: '请选择', trigger: 'blur' }],
            tcCurrence: [{ required: true, message: '请选择', trigger: 'blur' }],
            tcExchangeRate: [{ required: true, message: '请输入', trigger: 'blur' }],
            source: [{ required: true, message: '请输入', trigger: 'blur' }],
            compensationRatio: [
                { required: true, message: '请输入', trigger: 'blur' },
                { validator:validatePass1, trigger: 'blur' }
            ],
            compensationPeriod: [{ required: true, message: '请选择', trigger: 'blur' }],
            threshold: [{ 
                required: true, message: '请输入', trigger: 'blur' },
                { validator:validatePass2, trigger: 'blur' }
            ],
            thresholdCompensationLogic: [{ required: true, message: '请选择', trigger: 'blur' }],
            startDate: [
                { required: true, message: '请选择', trigger: 'blur' },
                { validator:validatePass4, trigger: 'blur' }
            ],
            endDate: [
                { required: true, message: '请选择', trigger: 'blur' },
                { validator:validatePass4, trigger: 'blur' }
            ],
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
        getMtzMarketSourceList:[],
        getPreciousMetalDosageUnit:[],

        supplierType1:false,
        supplierType2:false,
        metalType:false,
        timeShow:false,//重叠时间显示
        startTime:"",
        endTime:"",
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
    cartypePaged({
        current:1,
        size:99999,
    }).then(res=>{
        this.carline = res.data;
    })

    currencyDict().then(res=>{
        this.tcCurrence = res.data;
    })

    getMtzMarketSourceList({}).then(res=>{
        this.getMtzMarketSourceList = res.data;
    })

    getPreciousMetalDosageUnit({}).then(res=>{
        this.getPreciousMetalDosageUnit = res.data;
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
    jijiaCompute(){
        if(isNumber(this.contractForm.platinumPrice) && isNumber(this.contractForm.platinumDosage) && isNumber(this.contractForm.palladiumPrice) && isNumber(this.contractForm.palladiumDosage) && isNumber(this.contractForm.rhodiumPrice) && isNumber(this.contractForm.rhodiumDosage)){
            var number = 0;
            // this.contractForm.price = Mul(Number(this.contractForm.platinumPrice),Number(this.contractForm.platinumDosage)) + Mul(Number(this.contractForm.palladiumPrice),Number(this.contractForm.palladiumDosage)) + Mul(Number(this.contractForm.rhodiumPrice),Number(this.contractForm.rhodiumDosage))

            number = numAdd(Mul(Number(this.contractForm.platinumPrice),Number(this.contractForm.platinumDosage)),Mul(Number(this.contractForm.palladiumPrice),Number(this.contractForm.palladiumDosage)))
            number = numAdd(number,Mul(Number(this.contractForm.rhodiumPrice),Number(this.contractForm.rhodiumDosage)));

            this.contractForm.price = formatDecimal(number,6);

        }else{
            this.contractForm.price = "";
        }
    },
    MaterialGrade(value){
        this.contractForm.priceMeasureUnit = "",
        this.contractForm.price = "",
        this.contractForm.platinumPrice = "",
        this.contractForm.platinumDosage = "",
        this.contractForm.palladiumPrice = "",
        this.contractForm.palladiumDosage = "",
        this.contractForm.rhodiumPrice = "",
        this.contractForm.rhodiumDosage = "",
        checkPreciousMetal({code:value}).then(res=>{
            this.metalType = res.data;
        })
        queryMaterialList({materialCode:value}).then(res=>{
            this.contractForm.priceMeasureUnit = res.data.countUnit;
        })
        try{
            this.materialCode.forEach(e => {
                if(e.code == value){
                    this.contractForm.materialName = e.message;
                    throw new Error("EndIterative");
                }
            });
        }catch(e){
            if(e.message != "EndIterative") throw e;
        }
    },
    supplierBH(value){
        if(this.supplierType2 == true) return false;
        this.supplierType1 = true;
        if(value == ""){
            this.contractForm.supplierName = "";
            this.contractForm.supplierId = "";
            setTimeout(() => {
                this.supplierType1 = false;
            }, 100);
        }
        try{
            this.supplierList.forEach(e => {
                if(e.code == value){
                    console.log(e.message,5555555555)
                    console.log(value,5555555555)
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
        if(value == ""){
            this.contractForm.supplierName = "";
            this.contractForm.supplierId = "";
            setTimeout(() => {
                this.supplierType2 = false;
            }, 100);
        }
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
        this.contractForm.carline = this.carlineNumber.toString();
        this.$refs['contractForm'].validate(async valid => {
            if (valid) {
                console.log("验证成功")
                // var num = 0; 
                // this.dataObject.forEach(e=>{
                //     if(e.supplierId.toString() == this.contractForm.supplierId && e.materialCode == this.contractForm.materialCode && Number(e.price) == Number(this.contractForm.price) && timeCoincide(e.startDate,e.endDate,this.contractForm.startDate,this.contractForm.endDate)){
                //         this.startTime = e.startDate;
                //         this.endTime = e.endDate;
                //         this.timeShow = true;
                //         num++;
                //     }
                // })
                // if(num !== 0){
                //     iMessage.error(this.language("CZXTZJBNJXXZCZ","存在相同主键时，所有时间段均不能重叠"))
                //     return false;
                // }
                // this.timeShow = false;
                addAppRule({
                    ...this.contractForm,
                    ttMtzAppId:this.$route.query.mtzAppId || JSON.parse(sessionStorage.getItem('MtzLIst')).mtzAppId
                }).then(res=>{
                    if(res.code == 200 && res.result){
                        iMessage.success(this.language(res.desEn,res.desZh))
                        this.$emit("addDialogGZ","")
                    }else{
                        iMessage.error(this.language(res.desEn,res.desZh))
                    }
                })
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
    },
  }

}
</script>

<style style="scss" scoped>
::v-deep .dialog-footer{
    display: flex;
    justify-content: flex-end;
    align-items: center;
}
.time_color{
    color:red;
    display: inline-block;
    margin-right:20px;
}
.vue-select{
    width:100%;
}
::v-deep .el-date-editor{
    width:100%!important;
}
::v-deep .el-form-item__label{
    width:13.5rem!important;
}
</style>
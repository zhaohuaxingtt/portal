<template>
  <iDialog
    :visible.sync="show"
    :title="papgeTitle"
    @close="closeDialog"
    width="480px"
  >
    <el-form label-position="left" label-width="150px" :rules="rules" :model="formContent" ref="rulesRef" class="validate-required-form">
        <iFormItem :label='formLabel.mtzRawMateriel' prop='generalCategoryCode'>
            <iSelect v-model="formContent.generalCategoryCode"  placeholder="请选择" v-if='!editBtnSta' @change="selectedCode" :disabled='this.papgeTitle!= "新增"'>
                <el-option
                    v-for="item in materielBigOption"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                ></el-option>
            </iSelect>
            <iInput v-model="formContent.generalCategoryCode" disabled v-else></iInput>
        </iFormItem>
        <iFormItem :label='formLabel.generalShortName'>
            <iInput v-model="formContent.generalShortName" disabled></iInput>
        </iFormItem>
        <iFormItem :label='formLabel.middleNumber' prop='rawMaterialDesc'>
            <div v-if='this.papgeTitle== "新增"'>
                <el-autocomplete v-model="formContent.rawMaterialDesc" filterable placeholder="请输入/请选择" class="inline-input"
                @change="changeDesc"  :fetch-suggestions="querySearch" @select="handleSelect" :disabled='this.papgeTitle!= "新增"'
                style="width:100%;" >
                </el-autocomplete>
            </div>
            <div v-else>
                <iInput v-model="formContent.rawMaterialDesc" :disabled='editBtnSta'  ></iInput>
            </div>
        </iFormItem>
        <iFormItem :label='formLabel.middleName' prop='rawMaterialCode'>
            <p v-if="!editBtnSta" style='display: flex;justify-content: space-around;  '>
                <iInput v-model="rawMaterialCode.first" disabled ></iInput>
                <iInput v-model="rawMaterialCode.seconde" :disabled='RawCodeSe' slot="append"  maxLength='3' @input="limitNumber" @blur="toChangemtzCode"></iInput>
            </p>
            <iInput v-model="formContent.rawMaterialCode" disabled v-else></iInput>
        </iFormItem>
        <iFormItem :label='formLabel.middleNameEn' prop='rawMaterialNameEn'>
            <iInput v-model="formContent.rawMaterialNameEn"  placeholder='请输入' :disabled="editBtnSta">
            </iInput>
        </iFormItem>
        <iFormItem :label='formLabel.middleUnit' prop='rawMaterialCountUnit'>
            <iSelect v-model="formContent.rawMaterialCountUnit" v-if="!editBtnSta" placeholder='请选择' @change.once="changeUnit">
                <el-option
                    v-for="item in unitOptions"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                ></el-option>
            </iSelect>
            <iInput v-model="formContent.rawMaterialCountUnit" disabled v-else></iInput>
        </iFormItem>
        <iFormItem :label="$t('是否为贵金属')" prop='isPreciousMetal'>
            <iSelect :disabled="editBtnSta" v-model="formContent.isPreciousMetal">
                <el-option
                    v-for="item in metalsOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                >
                </el-option>
            </iSelect>
        </iFormItem>
        <iFormItem :label='formLabel.smallBrandNumber' prop='mtzRawMaterialName'>
            <iInput v-model="formContent.mtzRawMaterialName" :disabled="editBtnSta" placeholder='请输入' >
            </iInput>
        </iFormItem>
        <iFormItem :label='formLabel.smallBrandName ' prop='mtzRawMaterialCode'>
            <p v-if="!editBtnSta" style='display: flex;justify-content: space-around;  '>
                <iInput v-model="mtzRawMaterialCode.first" disabled ></iInput>
                <iInput v-model="mtzRawMaterialCode.seconde" slot="append" @input="inputMtzRawCode" maxLength='3' :disabled='this.papgeTitle!= "新增"'></iInput>
            </p>
            <iInput v-model="formContent.mtzRawMaterialCode" disabled v-else></iInput>
        </iFormItem>
        <iFormItem :label='formLabel.smallUnit' prop='mtzRawMaterialCountUnit'>
            <iSelect v-model="formContent.mtzRawMaterialCountUnit" v-if="!editBtnSta" placeholder='请选择' >
                <el-option
                    v-for="item in smallUnitOption"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                ></el-option>
            </iSelect>
            <iInput v-model="formContent.mtzRawMaterialCountUnit" disabled v-else></iInput>
        </iFormItem>
    </el-form>
    <div slot="footer">
        <div v-if='editBtnSta'>
            <iButton @click="edit">编辑</iButton>
        </div>
        <div v-else>
            <iButton @click="save">保存</iButton>
            <iButton @click="reset">重置</iButton>
            <iButton @click="closeDialog">退出</iButton>
        </div>
    </div>
  </iDialog>
</template>

<script>
import {iDialog,iInput,iSelect,iButton,iFormItem} from 'rise'
import {saveOrUpdateMtzRaw,
        getDetailById,
        getMtzRawCodeOptions,
        getRawCodeOptions,
        getMaxCode
    } from '@/api/materiel/mtzRawMaterielInfor'
import {getunitSelect} from '@/api/materiel/partsMaterialGroup'
export default { 
    name:'editMtzRawMateriel',
    components:{iDialog,iInput,iSelect,iButton,iFormItem},
    props:{
        show:{
            type:Boolean,
            default:false
        },
        id:{
            type:String,
            default:''
        },
        editSta:{
            type:Boolean,
            default:false
        }
    },
    computed:{},
    data(){
        return{
            formLabel:{
                mtzRawMateriel:'原材料大类',
                generalShortName:'大类元素简称',
                middleNumber:'中类描述(中)',
                middleName:'材料中类',
                middleNameEn:'中类描述(英)',
                middleUnit:'中类计量单位',
                smallBrandNumber:'原材料名称',
                smallBrandName:'原材料牌号',
                smallUnit:'原材料计量单位',
                // status:'状态'
            },
            formContent:{
                generalCategoryCode:'',
                generalShortName:'',
                rawMaterialDesc:'',
                rawMaterialCode:'',
                rawMaterialNameEn:'',
                rawMaterialCountUnit:'',
                mtzRawMaterialName:'',
                mtzRawMaterialCode:'',
                mtzRawMaterialCountUnit:'',
                isPreciousMetal:''
            },
            rawMaterialCode:{
                first:'',
                seconde:''
            },
            mtzRawMaterialCode:{
                first:'',
                seconde:'',
            },
            editId:this.id,
            disabledSta:true,
            restaurants:[],
            restaurantsOption:[],
            materielBigOption:[],
            smallUnitOption:[],
            unitOptions:[],
            papgeTitle:'',
            editBtnSta:this.editSta,
            RawCodeSe:true,
            rules:{
                generalCategoryCode:[{required:true,message:'请选择原材料大类',trigger:'blur'}],
                rawMaterialDesc:[{required:true,message:'请输入/选择中类描述(中)',change:'blur'}],
                rawMaterialCode:[{required:true,message:'请输入材料中类',trigger:'blur'}],
                rawMaterialNameEn:[{required:true,message:'请输入中类描述(英)',trigger:'blur'}],
                rawMaterialCountUnit:[{required:true,message:'请选择中类计量单位',trigger:'blur'}],
                mtzRawMaterialName:[{required:true,message:'请输入原材料名称',trigger:'blur'}],
                mtzRawMaterialCode:[{required:true,message:'请输入原材料牌号',trigger:'blur'}],
                mtzRawMaterialCountUnit:[{required:true,message:'请输入原材料计量单位',trigger:'blur'}],
                isPreciousMetal:[{required:true,message:'请选择是否为贵金属',trigger:'blur'}]
            },
            metalsOption:[
                {
                    label:'是',
                    value:true
                },
                {
                    label:'否',
                    value:false
                }
            ]
        }
    },
    methods:{
        toChangemtzCode(val){
            this.rawMaterialCode.seconde =  this.rawMaterialCode.seconde.padStart(3,0)
            this.formContent.rawMaterialCode = this.rawMaterialCode.first + '' + this.rawMaterialCode.seconde
            this.mtzRawMaterialCode.first = 'M' + this.formContent.rawMaterialCode
            getMaxCode({rawMaterialCode:this.formContent.rawMaterialCode}).then((val)=>{
                if(val.code == 200){
                    if(val.data){
                        const data = val.data.mtzRawMaterialCode
                        this.mtzRawMaterialCode.seconde = (Number(data.substring(data.length-3,data.length)) + 1).toString().padStart(3,0)
                        this.formContent.mtzRawMaterialCode = this.formContent.rawMaterialCode + '' + this.mtzRawMaterialCode.seconde
                    }else{
                        this.mtzRawMaterialCode.seconde = '001'
                        this.formContent.mtzRawMaterialCode = this.formContent.rawMaterialCode + '' + this.mtzRawMaterialCode.seconde
                    }
                    this.formContent.rawMaterialCode = this.rawMaterialCode.first + '' + this.rawMaterialCode.seconde
                    this.mtzRawMaterialCode.first = 'M' + this.formContent.rawMaterialCode
                    this.formContent.mtzRawMaterialCode = this.formContent.rawMaterialCode + '' + this.mtzRawMaterialCode.seconde
                }
            })
        },
        querySearch(queryString, cb) {
            var restaurants = this.restaurants;
            var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
            // 调用 callback 返回建议列表的数据
            cb(results);
        },
        createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) > -1);
        };
        },
        limitNumber(val){
            this.rawMaterialCode.seconde = val.replace(/[^\d]/g, '')
        },
        inputMtzRawCode(val){
            this.mtzRawMaterialCode.seconde = val.replace(/[^\d]/g, '')
            this.formContent.mtzRawMaterialCode = this.mtzRawMaterialCode.first + '' +this.mtzRawMaterialCode.seconde
        },
        handleSelect(){
            let code = ''
            if(this.restaurantsOption){
                this.restaurantsOption.forEach((item) => {
                if(item.name == this.formContent.rawMaterialDesc.substring(6,this.formContent.rawMaterialDesc.length)){
                    code = item.code
                    this.formContent.rawMaterialNameEn = item.nameEn
                    this.rawMaterialCode.seconde = code.substring(this.rawMaterialCode.first.length)
                }
             })
            }
            getMaxCode({rawMaterialCode:code}).then((val)=>{
                if(val.code == 200){
                    if(val.data){
                        const data = val.data.mtzRawMaterialCode
                        this.mtzRawMaterialCode.seconde = (Number(data.substring(data.length-3,data.length)) + 1).toString().padStart(3,0)
                        this.formContent.mtzRawMaterialCode = 'M' +this.formContent.rawMaterialCode + '' + this.mtzRawMaterialCode.seconde
                    }else{
                        this.mtzRawMaterialCode.seconde = '001'
                        this.formContent.mtzRawMaterialCode = 'M' +this.formContent.rawMaterialCode + '' + this.mtzRawMaterialCode.seconde
                    }
                }
            })
            this.formContent.rawMaterialCode = this.rawMaterialCode.first + '' + this.rawMaterialCode.seconde
            this.mtzRawMaterialCode.first = 'M' + this.formContent.rawMaterialCode
            this.formContent.mtzRawMaterialCode = this.mtzRawMaterialCode.first + '' + this.mtzRawMaterialCode.seconde
            this.RawCodeSe = true
        },
        changeDesc(val){
            if(val){
                this.RawCodeSe = false
                this.formContent.rawMaterialCode = this.rawMaterialCode.first + '' + this.rawMaterialCode.seconde
                getMaxCode({rawMaterialCode:this.formContent.rawMaterialCode}).then((val)=>{
                if(val.code == 200){
                    if(val.data){
                        const data = val.data.mtzRawMaterialCode
                        this.mtzRawMaterialCode.seconde = (Number(data.substring(data.length-3,data.length)) + 1).toString().padStart(3,0)
                         this.formContent.mtzRawMaterialCode = 'M' +this.formContent.rawMaterialCode + '' + this.mtzRawMaterialCode.seconde
                    }else{
                        this.mtzRawMaterialCode.seconde = '001'
                         this.formContent.mtzRawMaterialCode = 'M' +this.formContent.rawMaterialCode + '' + this.mtzRawMaterialCode.seconde
                    }
                }
                })
                this.mtzRawMaterialCode.first = 'M' + this.formContent.rawMaterialCode
                this.formContent.mtzRawMaterialCode = this.mtzRawMaterialCode.first + '' + this.mtzRawMaterialCode.seconde
            }
        },
        changeUnit(val){
            this.formContent.mtzRawMaterialCountUnit = val
        },
        selectedCode(val){
            this.rawMaterialCode.first = val
            this.rawMaterialCode.seconde = ''
            this.rawMaterialDesc = ''
            this.materielBigOption.forEach((val) => {
                if(this.formContent.generalCategoryCode == val.code){
                    this.formContent.generalShortName = val.describe
                }
            })
            getRawCodeOptions({generalCategoryCode:val}).then((val)=>{
                if(val.code == 200){
                    const options= val.data
                    this.restaurantsOption = val.data
                    if(options){
                        this.restaurants  = options.map((item) => {
                            return {value: item.code+ '_' +item.value}
                        })
                        this.restaurants.pop()
                        this.rawMaterialCode.seconde = (Number(options.pop().code.substring(2,5)) + 1).toString().padStart(3,0)
                        // this.rawMaterialCode.seconde =  number + 1
                        this.formContent.rawMaterialCode = this.rawMaterialCode.first + '' + this.rawMaterialCode.seconde

                    }else{
                        this.rawMaterialCode.seconde = '001'
                        this.formContent.rawMaterialCode = this.rawMaterialCode.first + '' + this.rawMaterialCode.seconde
                    }
                }else if (val.code == 1){
                    this.$message.error(val.desZh)
                }
            })
        },
        save(){
            this.$refs['rulesRef'].validate((valid) => {
                if(valid){
                   let data = {}
                   let rawMaterialId  = ''
                   let rawMaterialNameZh = ''
                   console.log(this.formContent.rawMaterialDesc,'this.formContent.rawMaterialDesc');
                   if(this.restaurantsOption){
                    this.restaurantsOption.forEach((item) => {
                        if(this.formContent.rawMaterialDesc.substring(6,this.formContent.rawMaterialDesc.length) == item.name){
                            console.log('sss',item.name);
                            rawMaterialId = item.id
                            rawMaterialNameZh = item.name
                        }
                    })
                   }else{
                       rawMaterialId ='',
                       rawMaterialNameZh = this.formContent.rawMaterialDesc
                   }
                    if(this.papgeTitle!= '新增'){
                        if(this.restaurantsOption){
                            this.restaurantsOption.forEach((item) => {
                                if(this.formContent.rawMaterialCode == item.code){
                                    rawMaterialId = item.id
                                }
                            })
                            rawMaterialNameZh = this.formContent.rawMaterialDesc
                        }else{
                            rawMaterialId ='',
                            rawMaterialNameZh = this.formContent.rawMaterialDesc
                        }
                    }
                    if(!rawMaterialNameZh){
                        rawMaterialNameZh = this.formContent.rawMaterialDesc
                    }
                    if(this.id){
                        data = {
                            countUnit:this.formContent.mtzRawMaterialCountUnit,
                            generalCategoryCode:this.formContent.generalCategoryCode,
                            materialName:this.formContent.mtzRawMaterialName,
                            mtzMaterialCode:this.formContent.mtzRawMaterialCode,
                            rawMaterialCode:this.formContent.rawMaterialCode,
                            rawMaterialNameEn:this.formContent.rawMaterialNameEn,
                            rawMaterialNameZh:rawMaterialNameZh,
                            rawMaterialDesc:rawMaterialNameZh,
                            status:this.formContent.status,
                            rawMaterialCountUnit:this.formContent.rawMaterialCountUnit,
                            rawMaterialId:rawMaterialId,
                            isPreciousMetal:this.formContent.isPreciousMetal,
                            id:this.id
                        }
                    }else{
                        data={
                            countUnit:this.formContent.mtzRawMaterialCountUnit,
                            generalCategoryCode:this.formContent.generalCategoryCode,
                            materialName:this.formContent.mtzRawMaterialName,
                            mtzMaterialCode:this.formContent.mtzRawMaterialCode,
                            rawMaterialCode:this.formContent.rawMaterialCode,
                            rawMaterialNameEn:this.formContent.rawMaterialNameEn,
                            rawMaterialNameZh:rawMaterialNameZh,
                            rawMaterialDesc:rawMaterialNameZh,
                            isPreciousMetal:this.formContent.isPreciousMetal,
                            status:this.formContent.status,
                            rawMaterialCountUnit:this.formContent.rawMaterialCountUnit,
                            rawMaterialId:rawMaterialId,
                        }
                    }
                    saveOrUpdateMtzRaw(data).then((val)=>{
                        if(val.code == 200){
                            this.$message.success('保存成功')
                            this.$emit('getPageList')
                        }else if(val.code == 1){
                            this.$message.error(val.desZh)
                        }
                    }).finally(()=>{
                        this.closeDialog()
                    })
                }else{
                    console.log(this.formContent.rawMaterialCode,'this.formContent.rawMaterialCode');
                    return false
                }
            })
        },
        edit(){
            this.mtzRawMaterialCode.first =this.formContent.mtzRawMaterialCode.length > 0 ? this.formContent.mtzRawMaterialCode.substring(0,this.formContent.mtzRawMaterialCode.length-3) : ''
            this.mtzRawMaterialCode.seconde =this.formContent.mtzRawMaterialCode.length > 0? this.formContent.mtzRawMaterialCode.substring(this.formContent.mtzRawMaterialCode.length-3) : ''
            this.rawMaterialCode.first =this.formContent.rawMaterialCode.length > 0 ? this.formContent.rawMaterialCode.substring(0,this.formContent.rawMaterialCode.length-3) : ''
            this.rawMaterialCode.seconde =this.formContent.rawMaterialCode.length > 0 ?  this.formContent.rawMaterialCode.substring(this.formContent.rawMaterialCode.length-3) : ''
            this.formContent.rawMaterialDesc  =this.formContent.rawMaterialCode.length > 0 ? this.formContent.rawMaterialCode : ''
            getRawCodeOptions({generalCategoryCode:this.formContent.generalCategoryCode}).then((val)=>{
                if(val.code == 200){
                    this.restaurants = val.data
                    this.restaurantsOption = val.data
                    const data = val.data
                    data.forEach((item) => {
                        if(item.name == 'maxValue'){
                            item.code=Number(item.code) + 1
                        }
                        if(this.formContent.rawMaterialCode == item.code){
                            this.formContent.rawMaterialDesc = item.name
                        }
                    })
                }else if (val.code == 1){
                    this.$message.error(val.desZh)
                }
            })
            this.editBtnSta = false
            
        },
        reset(){
            this.formContent={
                generalCategoryCode:'',
                generalShortName:'',
                rawMaterialDesc:'',
                rawMaterialCode:'',
                materialNameEn:'',
                rawMaterialCountUnit:'',
                mtzRawMaterialName:'',
                mtzRawMaterialCode:'',
                mtzRawMaterialCountUnit:'',
            }
        },
        closeDialog(){
            this.$emit('update:show',false)
        },
        getDetailMess(){
            getDetailById({id:this.id}).then((val)=>{
                if(val.code == 200){
                    this.formContent = val.data
                    this.papgeTitle = val.data.generalCategoryName
                }else if (val.code == 1){
                    this.$message.error(val.desZh)
                }
            })
        }
    },
    created(){
        getMtzRawCodeOptions().then((val)=>{
            if(val.code == 200){
                this.materielBigOption = val.data
            }
        })
        getunitSelect().then((val) => {
            if(val.code == 200){
                const data = val.data
                this.unitOptions = data
                this.smallUnitOption = data
            }
        })
        if(this.id){
            this.getDetailMess()
        }else{
            this.papgeTitle = '新增'
        }
    }
}
</script>

<style lang="scss" scoped>
.inline-input{
    ::v-deep .el-input{
        .el-input__inner{
            height: 35px;
            line-height: 32px; 
        }
    }

}
</style>
<template>
  <iDialog
    :visible.sync="show"
    :title="papgeTitle"
    @close="closeDialog"
    width="480px"
  >
    <el-form label-position="left" label-width="150px" :rules="rules" class="validate-required-form" :model="formContent" ref="rulesRef">
        <iFormItem :label='formLabel.generalCategoryCode' prop='generalCategoryCode'>
            <iInput v-model="formContent.generalCategoryCode" :placeholder='language("请输入")' :disabled='propItem.id' maxLength='2' @input="limitNumber"></iInput>
        </iFormItem>
        <iFormItem :label='formLabel.generalCategoryNameZh' prop='generalCategoryNameZh'>
            <iInput v-model="formContent.generalCategoryNameZh" :placeholder='language("请输入")' :disabled='edit'></iInput>
        </iFormItem>
        <iFormItem :label='formLabel.generalCategoryNameEn' prop='generalCategoryNameEn'>
            <iInput v-model="formContent.generalCategoryNameEn" :placeholder='language("请输入")' :disabled='edit'></iInput>
        </iFormItem>
        <iFormItem :label='formLabel.rawMaterielElement' prop='generalShortName'>
            <iInput v-model="formContent.generalShortName" :placeholder='language("请输入")' :disabled='edit'></iInput>
        </iFormItem>
    </el-form>
    <div class="btnList" slot='footer'>
        <div v-if='edit'>
            <iButton @click="editForm">{{language('编辑')}}</iButton>
        </div>
        <div v-else>
            <iButton @click="save('rulesRef')">{{language('保存')}}</iButton>
            <iButton @click="reset">{{language('重置')}}</iButton>
            <iButton @click="closeDialog">{{language('退出')}}</iButton>
        </div>
    </div>
  </iDialog>
</template>

<script>
import {iDialog,iButton,iFormItem,iInput} from 'rise'
import {saveDetailMe} from  '@/api/materiel/rawMaterielInfor'
export default {
    name:'原材料详情或新增',
    components:{iDialog,iButton,iFormItem,iInput},
    props:{
        show:{
            type:Boolean,
            default:false
        },
        propItem:{
            type:Object,
            default:()=>{}
        }
    },
    computed:{},
    data(){
        return{
            edit:false,
            papgeTitle:'',
            formLabel:{
                generalCategoryCode:'原材料编号大类',
                generalCategoryNameZh:'原材料名称(中文)',
                generalCategoryNameEn:'原材料名称(英文)',
                rawMaterielElement:'大类元素简称',
            },
            formContent:{
                generalCategoryCode:'',
                generalCategoryNameZh:'',
                generalCategoryNameEn:'',
                generalShortName:'',
            },
            rules:{
                generalCategoryCode:[{required:true,message:'请输入原材料编号(大类)',trigger:'blur'}],
                generalCategoryNameZh:[{required:true,message:'请输入原材料名称(中文)',trigger:'blur'}],
                generalCategoryNameEn:[{required:true,message:'请输入原材料名称(英文)',trigger:'blur'}],
                // rawMaterielElement:[{required:true,message:'材料组大类元素简称',trigger:'blur'}],
            }
        }
    },
    methods:{
        limitNumber(val){
            this.formContent.generalCategoryCode = val.replace(/[^\d]/g, '')
        },
        reset(){
            this.formContent = {
                generalCategoryCode:'',
                generalCategoryNameZh:'',
                generalCategoryNameEn:'',
                generalShortName:'',
            }
        },
        save(formName){
            this.$refs[formName].validate((valid)=>{
                if(valid){
                    let data ={}
                    if(this.propItem.id){
                        data = {
                            id:this.propItem.id,
                            ...this.formContent
                        }
                    }else{
                        data = {
                            ...this.formContent
                        }
                    }
                    saveDetailMe(data).then((val) => {
                        if(val.code == 200){
                            this.$message.success('保存成功')
                            this.$emit('getRawMeterielPage')
                        }else if(val.code == 1){
                            this.$message.error(val.desZh)
                        }
                        
                    }).catch((err)=>{
                        this.$message.error(err)
                    }).finally(()=>{
                        this.closeDialog()
                    })
                }else{
                   return false
                }
            })
        },
        editForm(){
            this.edit = false
        },
        closeDialog(){
            this.$emit('update:show',false)
        },
    },
    created(){
        if(this.propItem.generalCategoryCode){
            this.formContent.generalCategoryCode=this.propItem.generalCategoryCode
            this.formContent.generalCategoryNameZh=this.propItem.generalCategoryNameZh
            this.formContent.generalCategoryNameEn=this.propItem.generalCategoryNameEn
            this.formContent.generalShortName=this.propItem.generalShortName
            this.papgeTitle = '编辑'
            this.edit = true
        }else{
            this.papgeTitle = '新增'
            this.edit = false
        
        }
        
    }
}
</script>

<style lang="scss" scoped>
.btnList{
    display:flex;
    justify-content:flex-end
}
</style>
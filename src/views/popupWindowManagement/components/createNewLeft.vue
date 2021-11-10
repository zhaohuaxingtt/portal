<template>
  <div>
      <el-form label-position="left" label-width="160px" :rules="rule" :model="formContent" ref="createNewForm" class="validate-required-form">
        <el-row :gutter="24">
          <el-col span="12">
            <iFormItem :label="language('弹窗标题')" prop='popupName'>
              <iInput :placeholder='language("请输入")' v-model="formContent.popupName"></iInput>
            </iFormItem>
          </el-col>
          <el-col span="12">
            <iFormItem :label="language('标题链接')">
              <iInput :placeholder='language("请输入")' v-model="formContent.linkUrl"></iInput>
            </iFormItem>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col span="12">
            <iFormItem :label="language('发布范围')" prop='publishRange'>
              <iInput :placeholder='language("请输入")' v-model="formContent.publishRange"></iInput>
            </iFormItem>
          </el-col>
          <el-col span="12">
            <iFormItem :label="language('历史查看有效期')" prop='deletePreTime'>
              <iDatePicker class="effect-time" :placeholder='language("请选择")' v-model="formContent.deletePreTime"></iDatePicker>
            </iFormItem>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col span="24">
            <iFormItem :label="language('发布时间')">
              <iDatePicker class="release-time" :placeholder='language("请选择")' v-model="formContent.publishPreTime"></iDatePicker>
            </iFormItem>
          </el-col>
          
        </el-row>
        <el-row :gutter="24">
          <el-col>
            <iFormItem :label="language('弹窗说明')" prop='content'>
              <el-input type="textarea" class="popup-explain" :placeholder='language("请输入")' v-model="formContent.content"></el-input>
            </iFormItem>
          </el-col>
          
        </el-row>
      </el-form>
  </div>
</template>

<script>
import {iFormItem,iDatePicker,iInput} from 'rise'
export default {
    name:'newLeft',
    components:{iFormItem,iDatePicker,iInput},
    props:{},
    data(){
      return{
        formContent:{
          popupName:'',
          linkUrl:'',
          publishRange:'',
          deletePreTime:'',
          publishPreTime:'',
          content:''
        },
        rule:{
          popupName:{required:'true',message:'请输入弹窗标题',trigger:'blur'},
          publishRange:{required:'true',message:'请输入发布范围',trigger:'blur'},
          deletePreTime:{required:'true',message:'请选择历史查看有效期',trigger:'blur'},
          content:{required:'true',message:'请输入弹窗说明',trigger:'blur'},
        },
      }
    },
    methods:{
      reset(){
        this.formContent = {}
      },
      save(){
        let isValidate = true
        this.$refs.createNewForm.validate((valid)=>{
          if(valid){
             isValidate 
          }else{
            isValidate = !isValidate
          }
        })
        return isValidate
      },
      formData(){
        return this.formContent
      }
    }
}
</script>

<style lang="scss" scoped>
.popup-explain{
  width: 960px;
  height: 400px;

  ::v-deep .el-textarea__inner{
    height: 100%;
    resize: none;
    &:focus-visible{
    outline-color: #D0D4D9;
    border: 1px solid #D0D4D9;
  }
  }
  
}
.effect-time,
.release-time{
  width: 100%;
}
</style>
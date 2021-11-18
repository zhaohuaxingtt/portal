<template>
  <div>
      <el-form label-position="left" label-width="160px" :rules="rule" :model="formContent" ref="createNewForm" class="validate-required-form">
        <el-row :gutter="24">
          <el-col span="12">
            <iFormItem :label="language('弹窗标题')" prop='popupName'>
              <iInput :placeholder='language("请输入")' v-model="formContent.popupName" maxlength='30'></iInput>
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
              <iSelect :placeholder='language("请选择")' v-model="formContent.publishRange">
                <el-option
                  v-for="item in publishRangeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </iSelect>
            </iFormItem>
          </el-col>
        </el-row>
        <el-row :gutter="24" v-if="formContent.publishRange == 15">
          <el-col span="12">
            <iFormItem
              :label="language('选择用户')"
            >
              <userSelector v-model="formContent.userList" @change="userListChange" />
            </iFormItem>
          </el-col>
          <el-col span="12">
            <iFormItem
              :label="language('选择供应商')"
            > 
              <sullpierSelect v-model="formContent.supplierList" @change="supplierListChange" />
            </iFormItem>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col span="24">
            <iFormItem :label="language('弹窗布局')"  prop='popupStyle'>
              <popupStyle :popupStyle.sync='formContent.popupStyle'></popupStyle>
            </iFormItem>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col span="24">
            <iFormItem :label="language('发布时间')">
              <iDatePicker class="release-time" :placeholder='language("请选择发布时间，若未选择发布时间则立即发送")' 
                v-model="formContent.publishPreTime" type='datetime' format='yyyy-MM-dd HH:mm'>
              </iDatePicker>
            </iFormItem>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col>
            <iFormItem :label="language('弹窗说明')" prop='content'>
              <div>
                <div class="btnList">
                  <el-radio v-model="radio" label="1">{{language('文字居左')}}</el-radio>
                  <el-radio v-model="radio" label="2">{{language('文字居中')}}</el-radio>
                  <el-radio v-model="radio" label="3">{{language('文字居右')}}</el-radio>
                </div>
                <el-input 
                    type="textarea" 
                    :class="{'popup-explain-left':radio == 1,'popup-explain-center':radio == 2,'popup-explain-right':radio == 3}" 
                    :placeholder='language("请输入")' 
                    v-model="formContent.content" 
                    maxlength="300"
                  >
                </el-input>
              </div >
            </iFormItem>
          </el-col>
          
        </el-row>
      </el-form>
  </div>
</template>

<script>
import {iFormItem,iDatePicker,iInput,iSelect,iButton} from 'rise'
import {PUBLISH_SCOPE_OPTIONS} from './data.js'
import userSelector from './userSelector.vue'
import sullpierSelect from './supplierSelect.vue'
import popupStyle from './popupStyle.vue'
export default {
    name:'newLeft',
    components:{iFormItem,iDatePicker,iInput,iSelect,userSelector,sullpierSelect,popupStyle,iButton},
    props:{},
    data(){
      return{
        radio:'1',
        publishRangeOptions:PUBLISH_SCOPE_OPTIONS,
        formContent:{
          popupName:'',
          linkUrl:'',
          publishRange:0,
          deletePreTime:'',
          publishPreTime:'',
          content:'',
          popupStyle:0,
          userList:[],
          supplierList:[],
        },
        pickerOptions:{
          disabledDate(time){
            return time.getTime() <  Date.now() - 8.64e7
          }
        },
        rule:{
          popupName:{required:'true',message:'请输入弹窗标题',trigger:'blur'},
          publishRange:{required:'true',message:'请输入发布范围',trigger:'blur'},
          // deletePreTime:{required:'true',message:'请选择历史查看有效期',trigger:'blur'},
          content:{required:'true',message:'请输入弹窗说明',trigger:'blur'},
          popupStyle:{required:'true',message:'请选择弹窗布局',trigger:'blur'}
        },
      }
    },
    created(){
      this.formContent.publishRange = 0
    },
    methods:{
      userListChange(val){
        this.formContent.userList = val
      },
      supplierListChange(val){
        this.formContent.supplierList = val
      },  
      reset(){
        this.formContent = {
          popupName:'',
          linkUrl:'',
          publishRange:0,
          deletePreTime:'',
          publishPreTime:'',
          content:'',
          popupStyle:0,
          userList:[],
          supplierList:[],
        }
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
.popup-explain-left{
  width: 960px;
  height: 200px;
  ::v-deep .el-textarea__inner{
    height: 100%;
    resize: none;
    &:focus-visible{
    outline-color: #D0D4D9;
    border: 1px solid #D0D4D9;
  }
  }
}
.popup-explain-center{
  width: 960px;
  height: 200px;
  ::v-deep .el-textarea__inner{
    text-align: center;
    height: 100%;
    resize: none;
    &:focus-visible{
    outline-color: #D0D4D9;
    border: 1px solid #D0D4D9;
  }
  }
}
.popup-explain-right{
  width: 960px;
  height: 200px;
  ::v-deep .el-textarea__inner{
    text-align: right;
    height: 100%;
    resize: none;
    &:focus-visible{
    outline-color: #D0D4D9;
    border: 1px solid #D0D4D9;
  }
  }
}
.btnList{
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
}
.effect-time,
.release-time{
  width: 100%;
}
</style>
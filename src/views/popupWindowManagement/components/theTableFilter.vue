<template>
  <iCard>
      <div class="main">
        <el-form class="form-content">
            <el-row :gutter="24"> 
                <el-col span='6'>
                    <iFormItem :label="language('弹窗标题')">
                        <iInput v-model="searchContent.popupName" :placeholder='language("请输入")'></iInput>
                    </iFormItem>
                </el-col>
                <el-col span='6'>
                    <iFormItem :label="language('弹窗说明')">
                        <iInput v-model="searchContent.content" :placeholder='language("请输入")'></iInput>
                    </iFormItem>
                </el-col>
                <el-col span='6'>
                    <iFormItem :label="language('发送日期')">
                        <iDatePicker class="send-time" v-model="searchContent.sendDate" :placeholder='language("请选择")'></iDatePicker>
                    </iFormItem>
                </el-col>
            </el-row>
        </el-form>
        <div class="btnItems">
            <iButton @click="sure">{{language('确定')}}</iButton>
            <iButton @click="cancel">{{language('重置')}}</iButton>
        </div>
      </div>
      
  </iCard>
</template>

<script>
import {iCard,iFormItem,iInput,iDatePicker,iButton} from 'rise'
import {INI_SEARCH_FORM} from './data.js'
export default {
    name:'theTableFilter',
    components:{iCard,iFormItem,iInput,iDatePicker,iButton},
    data(){
        return{
            searchContent:_.cloneDeep(INI_SEARCH_FORM)
        }
    },
    methods:{
        sure(){
            this.$emit('search',this.searchContent)
        },
        cancel(){
            this.searchContent=_.cloneDeep(INI_SEARCH_FORM)
            this.sure()
        }
    }
}
</script>

<style lang="scss" scoped>
.main{
    display: flex;
    justify-content: space-between;
    .form-content{
        width: 1000px;
        .el-row{
            .send-time{
                width: 100%;
            }
            .el-col{
                margin-right: 50px;
            }
        }
        

    }
    .btnItems{
        margin-top: 36px;
    }
}
</style>
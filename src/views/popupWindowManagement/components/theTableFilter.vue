<template>
  <iCard>
      <div class="main">
        <el-form>
            <el-row :gutter="24"> 
                <el-col span='8'>
                    <iFormItem :label="language('弹框标题')">
                        <iInput></iInput>
                    </iFormItem>
                </el-col>
                <el-col span='8'>
                    <iFormItem :label="language('弹框说明')">
                        <iInput></iInput>
                    </iFormItem>
                </el-col>
                <el-col span='8'>
                    <iFormItem :label="language('发送日期')">
                        <iDatePicker></iDatePicker>
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
export default {
    name:'theTableFilter',
    components:{iCard,iFormItem,iInput,iDatePicker,iButton},
    data(){
        return{

        }
    },
    methods:{
        sure(){

        },
        cancel(){
            
        }
    }
}
</script>

<style lang="scss" scoped>
.main{
    display: flex;
    justify-content: space-between;
    .btnItems{
        margin-top: 30px;
    }
}
</style>
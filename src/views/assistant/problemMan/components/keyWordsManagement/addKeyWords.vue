<template>
  <iDialog
    :visible.sync="show"
    :title="papgeTitle"
    @close="closeDialog"
    width="600px"
    height='400px'
  >
  <el-form label-position="left" label-width="100px">
    <el-row gutter='24'>
      <el-col :span='24'>
        <iFormItem :label='language("关键词")'>
          <iInput v-model="keyWord" :placeholder='language("请输入")'></iInput>
        </iFormItem>
      </el-col>
    </el-row>
  </el-form>
  <iButton slot="footer" @click="sure">{{language('确认')}}</iButton>
  </iDialog>
</template>

<script>
import {iDialog,iInput,iFormItem,iButton} from 'rise'
export default {
    name:'addKeyWordsDialog',
    components:{iDialog,iInput,iFormItem,iButton},
    props:{
      show:{
        type:Boolean,
        default:false
      }
    },
    data(){
      return{
        papgeTitle:'新建关键词',
        keyWord:''
      }
    },
    methods:{
      closeDialog(){
        this.$emit('update:show',false)
      },
      sure(){
        this.$emit('refresh')
        this.closeDialog()
      }
    }
}
</script>

<style>

</style>
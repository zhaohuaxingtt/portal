<template>
  <iDialog
    :visible.sync="show"
    :title="language(papgeTitle)"
    @close="closeDialog"
    width="600px"
    height='400px'
  >
  <el-form label-position="left" label-width="80px">
    <el-row gutter='24'>
      <el-col :span='24'>
        <iFormItem :label='language("关键词")' prop="keyWord">
          <iInput v-model="form.keyWord" @keydown.native.enter="sure" :placeholder='language("请输入")'></iInput>
        </iFormItem>
      </el-col>
    </el-row>
  </el-form>
  <iButton slot="footer" @click="sure">{{language('确认')}}</iButton>
  </iDialog>
</template>

<script>
import {iDialog,iInput,iFormItem,iButton} from 'rise'
import { saveKeyword } from "@/api/assistant"
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
        form:{
          keyWord:''
        }
      }
    },
    methods:{
      closeDialog(){
        this.$emit('update:show',false)
      },
      async sure(){
        if(!this.form.keyWord) return this.$message.warning("请输入关键字")
        await saveKeyword(this.form)
        this.$emit('refresh')
        this.closeDialog()
      }
    }
}
</script>

<style>

</style>